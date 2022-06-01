import {Button, message} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {ModalForm, ProFormSelect, ProFormTextArea} from "@ant-design/pro-form";
import {createInputOrder} from "@/services/input/api";

/**
 * 创建表单中的字段
 *
 * @name FormRecord
 */
type FormRecord = {
  /**
   * 到货方式
   *
   * @name arrival_type
   */
  arrival_type: number;
  /**
   * 业务类型
   *
   * @name material_type
   */
  material_type: number;
  /**
   * 备注
   *
   * @name desc
   */
  desc: string;
}

type PropsType = {
  /**
   * 刷新列表数据
   *
   * @name reload
   */
  reload?: () => void;
};

export default (props: PropsType) => {
  const {reload} = props;
  return (
    <ModalForm<FormRecord>
      title="创建订单"
      width={400}
      trigger={
        <Button type="primary">
          <PlusOutlined/>
          创建订单
        </Button>
      }
      modalProps={{
        // 提交后删除数据
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        const response = await createInputOrder({
          // 提交订单的人员
          client_id: 1,
          ...values
        });
        if (response.hasOwnProperty("data")) {
          message.success('创建成功');
          // 刷新表单数据
          if (typeof reload === "function") {
            reload();
          }
          return true;
        }
        return false;
      }}
    >
      <ProFormSelect
        options={[
          {
            value: 0,
            label: '本地入仓',
          },
          {
            value: 1,
            label: '跨境入他',
          },
        ]}
        name="material_type"
        label="入仓类型"
      />
      <ProFormSelect
        options={[
          {
            value: 0,
            label: '自送',
          },
          {
            value: 1,
            label: '提货',
          },
        ]}
        name="arrival_type"
        label="到货方式"
      />
      <ProFormTextArea name="desc" label="订单备注"/>
    </ModalForm>
  );
}
