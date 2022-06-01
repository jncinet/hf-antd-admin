// @ts-ignore
/* eslint-disable */
import {request} from 'umi';
import ApiConfig from "@/api-config";

/** 发起登录 */
export async function login(
  data: API.LoginParams,
  options?: { [key: string]: any },
) {
  return request<API.SuccessResponse<API.LoginResult> | API.ErrorResponse>(ApiConfig.userLogin, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
}

/** 退出登录 */
export async function logout(options?: { [key: string]: any }) {
  return request<API.SuccessResponse<any>>(ApiConfig.userLogout, {
    method: 'POST',
    ...(options || {}),
  });
}
