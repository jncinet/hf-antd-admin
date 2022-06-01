// @ts-ignore
/* eslint-disable */
import {request} from 'umi';
import ApiConfig from "@/api-config";

/** 获取本地物料列表 */
export async function getMaterials(options?: { [key: string]: any }) {
  return request<API.PaginateResponse<API.InputOrder>>(ApiConfig.material, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取本地物料详细 */
export async function findMaterial(id: number, options?: { [key: string]: any }) {
  return request<API.SuccessResponse<API.InputOrder>>(`${ApiConfig.material}/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 创建本地物料 */
export async function createMaterial(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.SuccessResponse<API.InputOrder> | API.ErrorResponse>(ApiConfig.material, {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 导入本地物料 */
export async function importMaterial(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.SuccessResponse<any>>(ApiConfig.materialImport, {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 更新本地物料 */
export async function updateMaterial(id: number, data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.SuccessResponse<API.InputOrder> | API.ErrorResponse>(`${ApiConfig.material}/${id}`, {
    method: 'PATCH',
    data,
    ...(options || {}),
  });
}

/** 删除本地物料 */
export async function deleteMaterial(id: number, options?: { [key: string]: any }) {
  return request<API.SuccessResponse<any> | API.ErrorResponse>(`${ApiConfig.material}/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
