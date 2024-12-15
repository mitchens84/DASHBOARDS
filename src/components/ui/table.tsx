import React from 'react';

interface TableProps {
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ children }) => {
  return (
    <table className="min-w-full border-collapse border border-gray-200">
      {children}
    </table>
  );
};

export const TableHeader: React.FC<TableProps> = ({ children }) => {
  return (
    <thead className="bg-gray-100">
      <tr>{children}</tr>
    </thead>
  );
};

export const TableBody: React.FC<TableProps> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export const TableRow: React.FC<TableProps> = ({ children }) => {
  return <tr className="border-b border-gray-200">{children}</tr>;
};

export const TableCell: React.FC<TableProps> = ({ children }) => {
  return (
    <td className="p-4 border border-gray-200">
      {children}
    </td>
  );
};

export default Table;
