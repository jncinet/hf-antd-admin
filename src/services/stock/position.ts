// @ts-ignore
/* eslint-disable */
import {request} from 'umi';
import ApiConfig from "@/api-config";

/** 根据仓库ID获取仓位列表 */
export async function updatePet(id: number, options?: { [key: string]: any }) {
  return request<any>(`${ApiConfig.stockPosition}/${id}`, {
    method: 'GET',
    params: {id},
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
