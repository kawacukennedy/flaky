import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface FlakyTest {
  test_id: string;
  flakiness_score: number;
  root_cause: string;
}

interface TableComponentProps {
  data: FlakyTest[];
}

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

const TableComponent = ({ data }: TableComponentProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-border dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-surface_dark">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-muted dark:text-gray-400 uppercase tracking-wider"
                >
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
        <tbody className="bg-surface_light dark:bg-surface_dark divide-y divide-border dark:divide-gray-700">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-text_light dark:text-text_dark">
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