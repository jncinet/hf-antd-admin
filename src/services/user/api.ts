// @ts-ignore
/* eslint-disable */
import {request} from 'umi';
import ApiConfig from "@/api-config";

/** 获取当前的用户 GET /api/user */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.SuccessResponse<API.CurrentUser>>(ApiConfig.userInfo, {
    method: 'GET',
    ...(options || {}),
  });
}
