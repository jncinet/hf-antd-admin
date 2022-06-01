import type { FC } from 'react';
import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import type { ConnectProps, StockModelState, Loading} from 'umi';
import { connect } from 'umi';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id?: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  update_at?: string;
  children?: DataSourceType[];
};

// const defaultData: DataSourceType[] = [
//   {
//     id: 624748504,
//     title: '活动名称一',
//     decs: '这个活动真好玩',
//     state: 'open',
//     created_at: '2020-05-26T09:42:56Z',
//     update_at: '2020-05-26T09:42:56Z',
//     children: [
//       {
//         id: 6246912293,
//         title: '活动名称二',
//         decs: '这个活动真好玩',
//         state: 'closed',
//         created_at: '2020-05-26T08:19:22Z',
//         update_at: '2020-05-26T08:19:22Z',
//       },
//     ],
//   },
//   {
//     id: 624691229,
//     title: '活动名称二',
//     decs: '这个活动真好玩',
//     state: 'closed',
//     created_at: '2020-05-26T08:19:22Z',
//     update_at: '2020-05-26T08:19:22Z',
//   },
// ];

const loopDataSourceFilter = (
  data: DataSourceType[],
  id: React.Key | undefined,
): DataSourceType[] => {
  return data
    .map((item) => {
      if (item.id !== id) {
        if (item.children) {
          const newChildren = loopDataSourceFilter(item.children, id);
          return {
            ...item,
            children: newChildren.length > 0 ? newChildren : undefined,
          };
        }
        return item;
      }
      return null;
    })
    .filter(Boolean) as DataSourceType[];
};

interface StockProps extends ConnectProps {
  stockModel: StockModelState;
  loading: boolean;
}

const StockPage: FC<StockProps> = ({ stockModel, dispatch }) => {
  const { stocks } = stockModel;
  // const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  // const [dataSource, setDataSource] = useState<DataSourceType[]>(() => defaultData);
  const columns: ProColumns<API.Stock>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 2 ? [{ required: true, message: '此项为必填项' }] : [],
        };
      },
      width: '30%',
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', state: null },
        open: {
          text: '未解决',
          status: 0,
        },
        closed: {
          text: '已解决',
          status: 1,
        },
      },
    },
    {
      title: '描述',
      dataIndex: 'decs',
      fieldProps: (from, { rowKey, rowIndex }) => {
        if (from.getFieldValue([rowKey || '', 'title']) === '不好玩') {
          return {
            disabled: true,
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true,
          };
        }
        return {};
      },
    },
    {
      title: '操作',
      valueType: 'option',
      // width: 200,
      render: (text, record) => [
        <a
          key="delete"
          onClick={() => {
            // setDataSource(loopDataSourceFilter(dataSource, record.id));
          }}
        >
          {record.name}{text}
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<API.Stock>
        expandable={{
          defaultExpandAllRows: true,
        }}
        rowKey="id"
        headerTitle="仓库管理"
        maxLength={5}
        recordCreatorProps={{
          position: 'bottom',
          newRecordType: 'dataSource',
          parentKey: () => 624748504,
          record: () => ({ id: (Math.random() * 1000000), name:'', code: '', desc:'', status: 0 }),
        }}
        columns={columns}
        value={stocks}
        onChange={() => {}}
        editable={{
          type: 'multiple',
          editableKeys: [],
          onSave: async (rowKey, data, row) => {
            // eslint-disable-next-line no-console
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: ()=>{console.log('onchange')},
        }}
      />
    </>
  );
};

export default connect(
  ({ stockModel, loading }: { stockModel: StockModelState; loading: Loading }) => ({
    stockModel,
    loading: loading.models.index,
  }),
)(StockPage);

