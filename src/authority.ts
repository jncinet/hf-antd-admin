export default class Authority {
  /**
   * 保存token
   *
   * @param data
   * @param key
   * @return void
   */
  public saveToken(data: {
    token_type?: string;
    expires_in?: number;
    access_token?: string;
    refresh_token?: string;
  }, key: string = "jwtToken"): void {
    const nowTime: number = new Date().getTime();
    let {expires_in} = data;
    expires_in = expires_in === undefined ? 0 : expires_in;
    const tokenData = {
      ...data,
      // 将token过期秒数更新为过期时间戳 15天
      expires_in: expires_in * 1000 + nowTime,
      // refresh_token的过期时间戳 30天
      refresh_expires_in: expires_in * 1000 * 2 + nowTime,
    }
    const tokenString: string = JSON.stringify(tokenData);
    localStorage.setItem(key, tokenString);
  }

  /**
   * 获取TOKEN
   *
   * @param key
   */
  public getToken(key: string = "jwtToken"): {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_expires_in: number;
    refresh_token: string;
  } {
    const token = localStorage.getItem(key);
    if (typeof token === "string") {
      const tokenJson: {
        token_type: string;
        expires_in: number;
        access_token: string;
        refresh_expires_in: number;
        refresh_token: string;
      } = JSON.parse(token);
      const {expires_in, refresh_expires_in} = tokenJson;
      return {
        ...tokenJson,
        expires_in: this.checkExpiresTime(expires_in) ? expires_in : 0,
        refresh_expires_in: this.checkExpiresTime(refresh_expires_in) ? refresh_expires_in : 0,
      };
    }
    return {
      token_type: "Bearer",
      expires_in: 0,
      access_token: "",
      refresh_expires_in: 0,
      refresh_token: "",
    };
  }

  /**
   * 验证TOKEN是否在有效期内
   *
   * @param time
   */
  public checkExpiresTime(time: number): boolean {
    const nowTime = new Date().getTime();
    return time > nowTime;
  }

  /**
   * 删除TOKEN
   *
   * @param key
   */
  public removeToken(key: string = "jwtToken"): void {
    localStorage.removeItem(key)
  }
}
