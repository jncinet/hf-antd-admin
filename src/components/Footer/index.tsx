import { useIntl } from 'umi';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '恒丰启达技术部出品',
  });

  return (
    <DefaultFooter
      copyright={`2021 ${defaultMessage}`}
      links={[]}
    />
  );
};
