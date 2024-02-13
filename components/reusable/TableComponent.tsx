import {
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
  Table,
} from "@nextui-org/react";
// import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import React from "react";

interface TableComponentProps {
  columns: any;
  rows: any;
}

const TableComponent: React.FC<TableComponentProps> = ({ columns, rows }) => {
  //   const [scrollerRef] = useInfiniteScroll({});
  return (
    <Table
      removeWrapper
      //   isHeaderSticky
      shadow="none"
      //   baseRef={scrollerRef}
      classNames={{
        th: " table-header",
        tbody: "px-0",
        tr: "table-row",
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
          <TableRow key={item.key}>
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
