import {ExclamationCircleOutlined} from "@ant-design/icons";
import {Modal} from "antd";

type PropsType = {
  onClickOK: () => void;
};

export default (props: PropsType) => {
  const {onClickOK} = props;
  const {confirm} = Modal;
  const handleDelete = () => {
    confirm({
      title: '是否确认删除此订单?',
      icon: <ExclamationCircleOutlined/>,
      content: '删除后将无法找回订单信息！',
      okText: '确认删除',
      okType: 'danger',
      onOk() {
        onClickOK();
      },
      cancelText: '取消',
    });
  }
  return <a onClick={handleDelete}>删除</a>;
};
