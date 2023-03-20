import {
  Button,
  Col,
  Divider,
  Drawer,
  List,
  Row,
  Space,
  Tabs,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { requestToken } from "src/api/axios";
import API_URL from "src/api/url";
import { ExportReactCSV } from "src/common/components/ExportReactCSV";
import WrapContent from "src/common/components/WrapContent";
import { SInnerSidebar } from "./styles";

import { formatNumber } from "src/common/helper/formatNumber";

const { Text } = Typography;

export default function Statistic() {
  const onClose = () => {};

  const showDrawer = (id: any) => {};

  const showDrawerUser = (id: any) => {};

  return (
    <WrapContent title="Thống kê">
      <SInnerSidebar>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Thống kê" key="1">
            <Space direction="vertical">
              <Text>
                Tổng số laptop: <Text type="warning"></Text>
              </Text>
            </Space>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Hình thức vận chuyển" key="2">
            <div style={{ marginBottom: "10px" }}>
              <ExportReactCSV csvData={[]} fileName={"text"} />
            </div>
            <div style={{ width: "95%", marginBottom: "30px" }}>
              {/* <CanvasJSChart options={[]} /> */}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Laptop đã bán" key="3">
            <div style={{ marginBottom: "10px" }}>
              <ExportReactCSV csvData={[]} fileName={"text"} />
            </div>
            <div style={{ width: "95%", marginBottom: "30px" }}>
              {/* <CanvasJSChart options={[]} /> */}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Người dùng thanh toán" key="4">
            <div style={{ marginBottom: "10px" }}>
              <ExportReactCSV csvData={[]} fileName={"text"} />
            </div>
            <div style={{ width: "95%", marginBottom: "30px" }}>
              {/* <CanvasJSChart options={[]} /> */}
            </div>
          </Tabs.TabPane>
        </Tabs>
      </SInnerSidebar>
    </WrapContent>
  );
}

const DescriptionItem = ({ title, content }: any) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);
