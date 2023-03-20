import { Button } from "antd";
import { CSVLink } from "react-csv";

export const ExportReactCSV = ({ csvData, fileName }: any) => {
  return (
    <Button type="primary">
      <CSVLink data={csvData} filename={fileName}>
        Export Data
      </CSVLink>
    </Button>
  );
};
