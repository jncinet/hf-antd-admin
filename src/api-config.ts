const DOMAIN = "http://www.hf.name/";

export default {
  // 本地物料型号库模板
  libTempUri: `${DOMAIN}lib_demo.xlsx`,
  // 本地入仓单模板
  locInTempUri: `${DOMAIN}loc_in_demo.xlsx`,
  // 本地出仓单模板
  locOutTempUri: `${DOMAIN}loc_out_demo.xlsx`,
  // 跨境入仓单模板
  csbInTempUri: `${DOMAIN}csb_in_demo.xlsx`,
  // 跨境出仓单模板
  csbOutTempUri: `${DOMAIN}csb_out_demo.xlsx`,
  // 会员资料
  userInfo: `${DOMAIN}api/user`,
  // 会员登录
  userLogin: `${DOMAIN}api/login`,
  // 会员登出
  userLogout: `${DOMAIN}api/logout`,
  // 刷新TOKEN
  userRefreshToken: `${DOMAIN}api/refresh-token`,
  // 单文件上传
  uploadFile: `${DOMAIN}api/upload`,
  // 多文件上传
  uploadFiles: `${DOMAIN}api/uploads`,
  // 入仓单
  inputOrder: `${DOMAIN}api/input-orders`,
  // 本地物料
  material: `${DOMAIN}api/materials`,
  // 本地物料导入
  materialImport: `${DOMAIN}api/import-materials`,
  // 跨境物料导入
  crossBorderImport: `${DOMAIN}api/import-cross-borders`,
  // 仓位管理
  stockPosition: `${DOMAIN}api/positions`,
  // 仓库管理
  stock: `${DOMAIN}api/stocks`,
};
