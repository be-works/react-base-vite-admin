import {
  Avatar,
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  List,
  Row,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { requestToken } from "src/api/axios";
import API_URL from "src/api/url";
import { Alert } from "src/common/components/Alert";
import WrapContent from "src/common/components/WrapContent";
import { ProfileContext } from "src/common/context/NavigatorContext";
import Create from "./Create";
import Edit from "./Edit";
import { SInnerSidebar } from "./styles";

export default function User() {
  const { data } = useContext(ProfileContext);
  const [state, setstate] = useState<any>();
  const [reload, setReload] = useState(false);

  const mustReload = () => {
    setReload(!reload);
  };

  useEffect(() => {
    requestToken({
      method: "GET",
      url: API_URL.USER.GET,
      params: {
        limit: 100,
      },
    })
      .then((res) => {
        let resData = res.data.result.data;
        setstate({ data: resData });
      })
      .catch();
  }, [reload, data]);

  const onFinish = (values: any) => {
    if (values?.key) {
      requestToken({ method: "GET", url: API_URL.USER.SEARCH(values?.key) })
        .then((res) => {
          let resData = res?.data.result.data;
          setstate({ data: resData });
        })
        .catch();
    } else {
      requestToken({
        method: "GET",
        url: API_URL.USER.GET,
      })
        .then((res) => {
          let resData = res.data.result.data;
          setstate({ data: resData });
        })
        .catch();
    }
  };

  return (
    <WrapContent title="Quản lý người dùng">
      <SInnerSidebar>
        <div className="handle" style={{ marginBottom: "20px" }}>
          <p>Thêm mới Người dùng</p>
          <Create
            callback={() => {
              mustReload();
            }}
          />
        </div>

        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          size={"middle"}
          onFinish={onFinish}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <Form.Item label="" style={{ width: "30%" }} name="key">
            <Input placeholder="Tìm kiếm người dùng" />
          </Form.Item>

          <Form.Item label="">
            <Button htmlType="submit">Tìm kiếm</Button>
          </Form.Item>
        </Form>

        <div className="body">
          <h3>Danh sách Người dùng</h3>
          <ListData data={state?.data ?? []} mustReload={mustReload} />
        </div>
      </SInnerSidebar>
    </WrapContent>
  );
}

const ListData = ({ data, mustReload }: any) => {
  const [state, setState] = useState({ visible: false });
  const onClose = () => {
    setState({
      visible: false,
    });
  };
  const [user, setUser] = useState<any>();

  const showDrawer = (id: any) => {
    requestToken({ method: "GET", url: API_URL.USER.GETID(id) }).then(
      (res: any) => {
        setState({
          visible: true,
        });
        let resData = res?.data?.result.data[0];
        setUser(resData);
      }
    );
  };

  const deleteUser = (id: any) => {
    requestToken({
      method: "DELETE",
      url: API_URL.USER.DELETE(id),
    })
      .then((res: any) => {
        Alert({ name: "Xóa thành công", icon: "success" });
        mustReload();
      })
      .catch(() => {
        Alert({ name: "Xóa không thành công", icon: "error" });
      });
  };

  return (
    <>
      <List
        dataSource={data.map((i: any) => ({
          name: i.full_name,
          id: i.id,
          address: i.address,
        }))}
        bordered
        renderItem={(item: any) => (
          <List.Item
            key={item.id}
            actions={[
              <div
                className="handle-button"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className="edit" style={{ marginRight: "5px" }}>
                  <Edit
                    item={item}
                    callback={() => {
                      mustReload();
                    }}
                  />
                </div>

                <Button
                  style={{ marginRight: "5px" }}
                  onClick={() => deleteUser(item.id)}
                  key={`a-${item.id}`}
                >
                  Xóa
                </Button>

                <Button
                  onClick={() => showDrawer(item.id)}
                  key={`a-${item.id}`}
                >
                  Xem chi tiết
                </Button>
              </div>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
              }
              title={<a>{item.name}</a>}
              description={item.address}
            />
          </List.Item>
        )}
      />

      {user && (
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={onClose}
          visible={state.visible}
        >
          <p
            className="site-description-item-profile-p"
            style={{ marginBottom: 24 }}
          >
            Thông tin người dùng
          </p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Mã người dùng" content={user?.id} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Role" content={user?.position} />
            </Col>
          </Row>

          <Divider />

          <Row>
            <Col span={12}>
              <DescriptionItem title="Họ và Tên" content={user?.full_name} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Tên tài khoản" content={user?.username} />
            </Col>
          </Row>

          <Divider />

          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Giời tính"
                content={user?.sex ? "Nữ" : "Nam"}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Số điện thoại" content={user?.mobile} />
            </Col>
          </Row>

          <Divider />

          <Row>
            <Col span={12}>
              <DescriptionItem title="Địa chỉ" content={user?.address} />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Ngày sinh"
                content={`${new Date(user?.date_of_birth).getDate()}-${new Date(
                  user?.date_of_birth
                ).getMonth()}-${new Date(user?.date_of_birth).getFullYear()}`}
              />
            </Col>
          </Row>
        </Drawer>
      )}
    </>
  );
};

const DescriptionItem = ({ title, content }: any) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);
