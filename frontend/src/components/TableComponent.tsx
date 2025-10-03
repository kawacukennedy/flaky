// Purpose: Paginated test table with sorting

import React from 'react';

interface TableColumn {
  key: string;
  header: string;
  render?: (item: any) => React.ReactNode;
}

interface TableComponentProps {
  data: any[];
  columns: TableColumn[];
  onRowClick?: (item: any) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({ data, columns, onRowClick }) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className="py-3 px-6">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              onClick={() => onRowClick && onRowClick(item)}
            >
              {columns.map((column) => (
                <td key={column.key} className="py-4 px-6">
                  {column.render ? column.render(item) : item[column.key]}
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