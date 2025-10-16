"use client";

import { useState } from "react";
import { getColumns, Payment } from "./columns";
import { DataTable } from "./data-table";
import { AddColumnDialog } from "./add-modal";

// Mock data function
function getData(): Payment[] {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d0e",
      amount: 250,
      status: "processing",
      email: "john@example.com",
    },
    {
      id: "629f3a2b",
      amount: 75,
      status: "success",
      email: "sarah@example.com",
    },
    {
      id: "837c4d5f",
      amount: 320,
      status: "failed",
      email: "alex@example.com",
    },
    {
      id: "945b6e8a",
      amount: 150,
      status: "pending",
      email: "emma@example.com",
    },
    {
      id: "156d7f9c",
      amount: 500,
      status: "success",
      email: "mike@example.com",
    },
    {
      id: "267e8a1d",
      amount: 89,
      status: "processing",
      email: "lisa@example.com",
    },
    {
      id: "378f9b2e",
      amount: 425,
      status: "failed",
      email: "david@example.com",
    },
    {
      id: "489a0c3f",
      amount: 199,
      status: "success",
      email: "anna@example.com",
    },
    {
      id: "590b1d4a",
      amount: 67,
      status: "pending",
      email: "chris@example.com",
    },
    {
      id: "601c2e5b",
      amount: 380,
      status: "processing",
      email: "kate@example.com",
    },
  ];
}

export default function DemoPage() {
  const data = getData();

  // State to track dynamic column names
  const [dynamicColumns, setDynamicColumns] = useState<string[]>([]);
  const [openAddColumn, setOpenAddColumn] = useState(false);

  // Handler to add a new column
  const handleAddColumn = (columnName: string) => {
    if (columnName.trim() && !dynamicColumns.includes(columnName.trim())) {
      setDynamicColumns([...dynamicColumns, columnName.trim()]);
    }
  };

  const handleOpenAddColumn = () => {
    setOpenAddColumn(true);
  };

  // Generate columns with the add column callback and current dynamic columns
  const columns = getColumns(handleOpenAddColumn, dynamicColumns);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />

      <AddColumnDialog
        open={openAddColumn}
        setOpen={setOpenAddColumn}
        onAddColumn={handleAddColumn}
      />
    </div>
  );
}
