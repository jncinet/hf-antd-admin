import type {Settings as LayoutSettings} from '@ant-design/pro-layout';
import {PageLoading} from '@ant-design/pro-layout';
import type {RequestConfig, RunTimeLayoutConfig} from 'umi';
import {history, Link, request as requestApi} from 'umi';
import type {Context} from 'umi-request';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import {currentUser as queryCurrentUser} from './services/user/api';
import {BookOutlined, LinkOutlined} from '@ant-design/icons';
import Authority from "@/authority";
import ApiConfig from "./api-config";

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading/>,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const response = await queryCurrentUser();
      return response.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({initialState}) => {
  return {
    rightContentRender: () => <RightContent/>,
    disableContentMargin: false,
    // 文档水印
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    footerRender: () => <Footer/>,
    onPageChange: () => {
      const {location} = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
        <Link to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined/>
          <span>OpenAPI 文档</span>
        </Link>,
        <Link to="/~docs">
          <BookOutlined/>
          <span>业务组件文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

const requestMiddleware = async (ctx: Context, next: () => void) => {
  const {req} = ctx;
  const {options} = req;
  let {headers} = options;

  // 基础header
  headers = {
    // 网页端获取数据格式不同于APP
    'Client-Name': 'Web',
    // 接受JSON数据
    'Accept': 'application/json',
    // 发送数据的数据类型
    'Content-Type': 'application/json',
    ...headers,
  };

  // 是否需要提供token
  if (headers && !headers.hasOwnProperty('isGuest')) {
    const authority: Authority = new Authority();
    const jwtToken = authority.getToken();
    const {token_type, access_token, expires_in} = jwtToken;
    // 本地access token有效时
    if (expires_in > 0 && access_token.length > 0) {
      // 附加token
      headers = {
        Authorization: `${token_type} ${access_token}`,
        ...headers,
      };
    } else {
      // 本地access token过期时，验证refresh token是否有效
      const {refresh_expires_in, refresh_token} = jwtToken;
      if (refresh_expires_in > 0 && refresh_token.length > 0) {
        // refresh token有效，发送请求获取access token
        const refreshResponse = await requestApi(ApiConfig.userRefreshToken, {
          method: 'POST',
          data: {refresh_token},
          headers: {isGuest: "true"},
        });
        // 刷新token的请求是否成功
        if (refreshResponse && refreshResponse.data !== undefined) {
          authority.saveToken(refreshResponse.data);
          // 附加新获取到的token继续发起原请求
          headers = {
            Authorization: `${refreshResponse.data.token_type} ${refreshResponse.data.access_token}`,
            ...headers,
          };
        } else {
          history.push(loginPath);
        }
      } else {
        history.push(loginPath);
      }
    }
  }

  ctx.req.options.headers = headers;

  await next();
};

export const request: RequestConfig = {
  middlewares: [requestMiddleware],
  errorConfig: {
    adaptor: (resData) => {
      if (resData.hasOwnProperty("errors")) {
        // 将ERRORS对象转换为字符串
        const {errors} = resData;
        let msg: string = '';
        if (typeof errors === "object" && Object.keys(errors).length > 0) {
          Object.keys(errors).forEach(errorsKey => {
            msg += typeof errors[errorsKey] === "object"
              ? errors[errorsKey].join("，")
              : `${errors[errorsKey].toString()}`;
            msg += "；";
          });
        } else {
          msg = resData.message;
        }
        // eslint-disable-next-line no-console
        console.error('Response error', resData.errors);
        return {
          success: false,
          data: resData.errors,
          errorCode: resData.code,
          errorMessage: msg,
        };
      }
      return {
        success: true,
        ...resData
      };
    },
  },
};
