// @ts-ignore
/* eslint-disable */
import {request} from 'umi';
import ApiConfig from "@/api-config";

/** 获取入仓单列表 */
export async function getInputOrders(options?: { [key: string]: any }) {
  return request<API.PaginateResponse<API.InputOrder>>(ApiConfig.inputOrder, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取入仓单详细 */
export async function findInputOrder(id: number, options?: { [key: string]: any }) {
  return request<API.SuccessResponse<API.InputOrder>>(`${ApiConfig.inputOrder}/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 创建入仓单 */
export async function createInputOrder(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.SuccessResponse<API.InputOrder> | API.ErrorResponse>(ApiConfig.inputOrder, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
}

/** 更新入仓单 */
export async function updateInputOrder(id: number, data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.SuccessResponse<API.InputOrder> | API.ErrorResponse>(`${ApiConfig.inputOrder}/${id}`, {
    method: 'PATCH',
    data: {
      ...data,
    },
    ...(options || {}),
  });
}


/** 删除入仓单 */
export async function deleteInputOrder(id: number, options?: { [key: string]: any }) {
  return request<API.SuccessResponse<any> | API.ErrorResponse>(`${ApiConfig.inputOrder}/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
