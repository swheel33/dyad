import {
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
  Table,
} from "@nextui-org/react";
import React from "react";

interface TableComponentProps {
  columns: any;
  rows: any;
  size?: "default" | "compact";
  onRowClick?: (key: string | number) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  rows,
  onRowClick,
  size = "default",
}) => {
  return (
    <Table
      aria-label="Table"
      removeWrapper
      shadow="none"
      classNames={{
        th: " table-header",
        tbody: "px-0",
        tr: `${onRowClick ? "cursor-pointer hover:text-[#FAFAFA]" : ""} ${
          size === "compact" ? "h-[35px]" : ""
        } table-row`,
        td: "px-0",
      }}
    >
      <TableHeader columns={columns}>
        {(column: any) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item: any) => (
          <TableRow
            key={item.key}
            onClick={onRowClick ? () => onRowClick(item.key) : () => {}}
          >
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
export default TableComponent;
