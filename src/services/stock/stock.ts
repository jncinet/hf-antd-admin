// @ts-ignore
/* eslint-disable */
import {request} from 'umi';
import ApiConfig from "@/api-config";

/** 获取仓库列表 */
export async function getStocks(options?: { [key: string]: any }) {
  return request<any>(ApiConfig.stock, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** 获取仓库详细 */
export async function findStock(id: number, options?: { [key: string]: any }) {
  return request<any>(`${ApiConfig.stock}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** 创建仓库 */
export async function createStock(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<any>(ApiConfig.stock, {
    method: 'POST',
    data: {
      ...data,
    },
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** 更新仓库 */
export async function updateStock(id: number, data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<any>(`${ApiConfig.stock}/${id}`, {
    method: 'PATCH',
    data: {
      ...data,
    },
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}


/** 删除仓库 */
export async function deleteStock(id: number, options?: { [key: string]: any }) {
  return request<any>(`${ApiConfig.stock}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
