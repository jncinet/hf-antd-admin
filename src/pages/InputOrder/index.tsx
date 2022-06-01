import type {ProColumns} from '@ant-design/pro-table';
import {PageContainer} from "@ant-design/pro-layout";
import ProTable from '@ant-design/pro-table';
import {getInputOrders, deleteInputOrder} from "@/services/input/api";
import {useRef} from "react";
import type {ActionType} from "@ant-design/pro-table/lib/typing";
import CreateOrderForm from "@/pages/InputOrder/components/CreateOrderForm";
import {message} from "antd";
import DeleteOrder from "@/pages/InputOrder/components/DeleteOrder";
import CreateMaterialForm from "@/pages/InputOrder/components/CreateMaterialForm";
import CreateCrossBorderForm from "@/pages/InputOrder/components/CreateCrossBorderForm";
import ImportMaterial from "@/pages/InputOrder/components/ImportMaterial";
import Settlement from "@/pages/InputOrder/components/Settlement";
import RegisterFee from "@/pages/InputOrder/components/RegisterFee";

export default () => {
  const tableRef = useRef<ActionType>();
  const handleReload = () => tableRef?.current?.reload();
  // 删除订单
  const handleDeleteInputOrder = async (id: number) => {
    const response = await deleteInputOrder(id);
    if (response.hasOwnProperty('data')) {
      message.success("删除成功", 3, handleReload);
    } else {
      message.error("删除失败");
    }
  };
  const columns: ProColumns<API.InputOrder>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 48,
      search: false,
    },
    {
      title: '入仓类型',
      dataIndex: 'material_type',
      filters: true,
      onFilter: true,
      valueEnum: {
        0: {text: '本地入仓'},
        1: {text: '跨境入仓'},
      },
    },
    {
      title: '入仓号',
      dataIndex: 'order_sn',
      copyable: true,
    },
    {
      title: '到货方式',
      dataIndex: 'arrival_type',
      filters: true,
      onFilter: true,
      valueEnum: {
        0: {text: '自送'},
        1: {text: '提货'},
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      valueEnum: {
        0: {text: '制单中', status: 'Default'},
        1: {text: '到货中', status: 'Processing'},
        2: {text: '已入库', status: 'Success'},
      },
    },
    {
      title: "创建时间",
      width: 140,
      dataIndex: 'created_at',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '备注',
      dataIndex: 'desc',
      ellipsis: true,
      search: false,
    },
    {
      title: '操作',
      width: 180,
      key: 'option',
      valueType: 'option',
      render: (dom, entity) => {
        const {id, material_type, status} = entity;
        const elements = [];
        if (status < 2) {
          // 添加物料数据
          if (material_type === 0) {
            elements.push(<ImportMaterial key="import-material" type={0} id={entity.id}/>);
            elements.push(<CreateMaterialForm key="create-material"/>);
          } else {
            elements.push(<CreateCrossBorderForm key="create-cross-border"/>);
          }
          // 删除订单
          elements.push(<DeleteOrder key="delete-order" onClickOK={() => handleDeleteInputOrder(id)}/>);
        } else {
          // 登记费
          elements.push(<RegisterFee key="register-fee"/>);
          // 结算单
          elements.push(<Settlement key="settlement"/>);
        }
        return elements;
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.InputOrder>
        params={{
          // 默认参数
          // client_id: 0,
        }}
        actionRef={tableRef}
        columns={columns}
        request={async (params) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const {pageSize, current} = params;
          const newParams = {
            page: current,
            limit: pageSize,
            ...params,
          };
          const response: API.PaginateResponse<API.InputOrder> = await getInputOrders({params: newParams});
          return {
            data: response.data,
            success: true,
            total: response.meta.total,
          };
        }}
        pagination={{
          pageSize: 15,
        }}
        rowKey="id"
        search={{
          layout: 'vertical',
          defaultCollapsed: true,
        }}
        dateFormatter="string"
        toolbar={{
          title: '入仓单列表',
          tooltip: '列表包含本地入仓单和跨境入仓单，可根据类型分类查看',
        }}
        toolBarRender={() => [
          <CreateOrderForm reload={handleReload}/>
        ]}
      />

    </PageContainer>
  );
};
