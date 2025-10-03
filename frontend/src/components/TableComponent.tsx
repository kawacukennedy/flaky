import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type FlakyTest = {
  test_id: string;
  flakiness_score: number;
  root_cause: string;
};

const columnHelper = createColumnHelper<FlakyTest>();

const columns = [
  columnHelper.accessor('test_id', {
    cell: info => info.getValue(),
    header: () => <span>Test ID</span>,
  }),
  columnHelper.accessor('flakiness_score', {
    cell: info => <span>{(info.getValue() * 100).toFixed(1)}%</span>,
    header: () => <span>Flakiness Score</span>,
  }),
  columnHelper.accessor('root_cause', {
    cell: info => info.getValue(),
    header: () => <span>Root Cause</span>,
  }),
];

const TableComponent = ({ data }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="border-b p-2 text-left">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-b">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;