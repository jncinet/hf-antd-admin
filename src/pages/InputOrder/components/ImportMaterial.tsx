import {Alert, Button, message, Space, Upload} from 'antd';
import {ModalForm,} from '@ant-design/pro-form';
import {InboxOutlined} from "@ant-design/icons";
import ApiConfig from "@/api-config";
import Authority from "@/authority";
import {useState} from "react";
import {importMaterial} from "@/services/material/api";

type PropsType = {
  /**
   * 类型类型
   *
   * @name type
   */
  type: number;
  /**
   * 入仓单ID
   *
   * @name id
   */
  id: number;
};

// 业务类型
const materialType = [
  {label: '本地入仓', tmpLink: ApiConfig.locInTempUri, savePath: "import/materials"},
  {label: '跨境入仓', tmpLink: ApiConfig.csbInTempUri, savePath: "import/cross-borders"},
];

// 允许的格式
const suffix = ".xlsx,.csv,.tsv,.ods,.xls,.slk,.xml,.gnumeric,.html";

export default (props: PropsType) => {
  const {type, id} = props;
  const authority: Authority = new Authority();
  const jwtToken = authority.getToken();
  const {token_type, access_token} = jwtToken;
  const [fileKey, setFileKey] = useState<string | undefined>();

  return (
    <ModalForm
      title={`上传${materialType[type].label}表格文件`}
      width={500}
      trigger={<Button type="link" style={{padding: 0, borderStyle: "none"}}>导入</Button>}
      onFinish={async () => {
        if (fileKey !== undefined) {
          const res = await importMaterial({id, path: fileKey});
          if (res.hasOwnProperty("data") && res.data.status === "success") {
            await message.success('导入成功');
            return true;
          }
          await message.error('导入失败');
        } else {
          await message.error('请先上传数据');
        }
        return false;
      }}
    >
      <Space direction={"vertical"}>
        {
          typeof fileKey === "string"
            ? <Alert message="表格文件上传成功，点击确定导入数据" type="success" showIcon/>
            : <Alert message={<a href={materialType[type].tmpLink} target="_blank">{materialType[type].label}表格模板下载</a>}
                     type="info"
                     showIcon/>
        }
        <Upload.Dragger
          headers={{
            Accept: 'application/json',
            Authorization: `${token_type} ${access_token}`,
          }}
          name={"file"}
          accept={suffix}
          data={{
            disk: "public",
            path: materialType[type].savePath
          }}
          action={ApiConfig.uploadFile}
          showUploadList={false}
          onChange={async (info) => {
            const {status, response} = info.file;
            if (status !== 'uploading') {
              message.loading({
                content: "文件上传中",
                key: "uploadKey"
              });
            }
            if (status === 'done') {
              if (response.hasOwnProperty('data')) {
                setFileKey(response.data.key);
              }
              message.success({
                content: `${info.file.name} 文件上传成功`,
                key: "uploadKey"
              });
            } else if (status === 'error') {
              message.error({
                content: `${info.file.name} 文件上传失败`,
                key: "uploadKey"
              });
            }
          }}
          onDrop={async (e) => {
            const {files} = e.dataTransfer;
            if (files.length > 0) {
              const fileExtension = (files[0] as any).name.toString().split('.').pop().toLowerCase();
              let checkExt = false;
              suffix.split(',').forEach(arrSuffixValue => {
                if (arrSuffixValue === `.${fileExtension}`) {
                  checkExt = true;
                }
              });
              // 文件格式不符合要求时，提示
              if (!checkExt) {
                message.error(`支持文件格式：${suffix}`);
              }
            }
            // 选择多个文件时，提示
            if (files.length > 1) {
              message.info('当前选择多个文件，只有第一个文件被上传');
            }
          }
          }>
          <p className="ant-upload-drag-icon">
            <InboxOutlined/>
          </p>
          <p className="ant-upload-text">单击或拖动文件到此区域以上传文件</p>
          <p className="ant-upload-hint">提示：只支持单个文件上传，支持文件格式：{suffix}；</p>
        </Upload.Dragger>
      </Space>
    </ModalForm>
  );
};
