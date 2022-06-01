// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    id?: number,
    username?: string;
    nickname?: string;
    avatar?: string;
    status?: number;
    role?: number;
    created_at?: string;
  };

  // 登录成功返回数据
  type LoginResult = {
    token_type?: string;
    expires_in?: number;
    access_token?: string;
    refresh_token?: string;
  };

  // 分页参数
  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  // 登录提交数据
  type LoginParams = {
    username?: string;
    password?: string;
  };

  // 返回错误
  type ErrorResponse = {
    message?: string;
    errors?: { [key: string]: string[] };
  };

  // 返回成功
  type SuccessResponse<T> = {
    message?: string;
    data: T;
  };

  // 返回分页资源
  type PaginateResponse<T> = {
    data: T[],
    links: PaginateLinks,
    meta: PaginateMeta,
  };

  // 分页链接
  type PaginateLinks = {
    first: string | null,
    last: string | null,
    prev: string | null,
    next: string | null
  };

  // 分页信息
  type PaginateMeta = {
    current_page: number,
    from: number | null,
    last_page: number,
    links: any,
    path: string,
    per_page: number,
    to: number | null,
    total: number
  };
}
