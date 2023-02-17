import "./styles.css";
import { useState } from "react";
import { Button, Space, Form, Modal, Input, Spin } from "antd";
import { useLocalStorage } from "react-use";

export default function App() {
  const [form] = Form.useForm();
  const [list, setValue] = useLocalStorage("page-list", []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentName, setCurrentName] = useState(-1);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const addPage = () => {
    // setValue([]);
    showModal();
  };
  const onFinish = (value) => {
    const newList = [...list, value];
    setValue(newList);
    handleCancel();
  };
  const removeAll = () => {
    setValue([]);
  };
  const refreshAll = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  const removeAt = (pageName) => {
    const newList = list.filter((item) => item.pageName !== pageName);
    setValue(newList);
  };
  const setUpdateName = (pageName) => {
    setCurrentName(pageName);
    setTimeout(() => {
      setCurrentName(-1);
    }, 500);
  };
  return (
    <div className="App">
      <Space>
        <Button type="primary" onClick={addPage}>
          添加网址
        </Button>
        <Button type="primary" onClick={refreshAll}>
          全部刷新
        </Button>
        <Button onClick={removeAll}>全部删除</Button>
      </Space>
      <div className="grid-container" style={{ marginTop: 10 }}>
        {list.map((item) => (
          <Space direction="vertical">
            <Space>
              <div style={{ fontSize: 18 }}>{item.pageName}</div>
              <Button
                type="primary"
                size="small"
                onClick={() => removeAt(item.pageName)}
              >
                删除
              </Button>
              <Button
                type="primary"
                size="small"
                onClick={() => setUpdateName(item.pageName)}
              >
                刷新
              </Button>
            </Space>

            {loading || currentName === item.pageName ? (
              <Spin spinning={true}>
                <div style={{ height: 400 }}></div>
              </Spin>
            ) : (
              <iframe
                width="100%"
                key={item.pageName}
                height="400px"
                src={item.pageUrl}
                title={item.pageName}
              ></iframe>
            )}
          </Space>
        ))}
      </div>
      <Modal
        title="添加网页"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose
      >
        <Form
          name="basic"
          form={form}
          preserve={false}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="网址"
            name="pageUrl"
            rules={[
              {
                required: true,
                message: "Please input your url!"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="名称"
            name="pageName"
            rules={[
              {
                required: true,
                message: "Please input your pagename!"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 20,
              span: 10
            }}
          >
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
