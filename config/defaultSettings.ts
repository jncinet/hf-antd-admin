import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  splitMenus: false,
  title: '恒丰启达仓管系统',
  pwa: false,
  logo: '/logo.png',
  iconfontUrl: '//at.alicdn.com/t/font_2533901_xhr8fgcz13.js',
};

export default Settings;
