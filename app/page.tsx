"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { getColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { AddColumnDialog } from "@/components/table/add-modal";
import {
  getData,
  validateColumnName,
  isEditableElement,
  processTableData,
  cleanupCellValuesForColumn,
  updateCellValue,
} from "@/lib/utils";
import { Kbd } from "@/components/ui/kbd";

export default function DemoPage() {
  // State to track dynamic column names
  const [dynamicColumns, setDynamicColumns] = useState<string[]>([]);
  const [openAddColumn, setOpenAddColumn] = useState(false);

  // State to store generated cell values
  const [cellValues, setCellValues] = useState<
    Record<string, Record<string, string>>
  >({});

  // Handler to add a new column
  const handleAddColumn = (columnName: string) => {
    if (validateColumnName(columnName, dynamicColumns)) {
      setDynamicColumns([...dynamicColumns, columnName.trim()]);
    }
  };

  // Handler to delete a column
  const handleDeleteColumn = useCallback((columnName: string) => {
    setDynamicColumns((prev) => prev.filter((col) => col !== columnName));
    // Clean up cell values for the deleted column
    setCellValues((prev) => cleanupCellValuesForColumn(prev, columnName));
  }, []);

  // Memoize the handler to prevent recreation on every render
  const handleOpenAddColumn = useCallback(() => {
    setOpenAddColumn(true);
  }, []);

  // Handler to update cell values when they are generated
  const handleCellValueUpdate = useCallback(
    (rowId: string, columnId: string, value: string) => {
      setCellValues((prev) => updateCellValue(prev, rowId, columnId, value));
    },
    []
  );

  // Keyboard shortcut: Pressing "n" opens the Add Column dialog, unless focus is in an editable field
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "n") return;

      const target = event.target as HTMLElement | null;

      if (isEditableElement(target)) return;

      event.preventDefault();
      setOpenAddColumn(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Memoize data to include stored cell values
  const data = useMemo(() => {
    const baseData = getData(dynamicColumns);
    return processTableData(baseData, dynamicColumns, cellValues);
  }, [dynamicColumns, cellValues]);

  const columns = useMemo(
    () =>
      getColumns(
        handleOpenAddColumn,
        dynamicColumns,
        handleCellValueUpdate,
        handleDeleteColumn
      ),
    [
      handleOpenAddColumn,
      dynamicColumns,
      handleCellValueUpdate,
      handleDeleteColumn,
    ]
  );

  return (
    <div className="container mx-auto py-10 gap-4 flex flex-col border-x h-screen">
      <div className="flex flex-col gap-2 px-2">
        <h1 className="text-xl font-bold">Data table with smart cells</h1>
        <h2 className="text-sm text-gray-500">
          This is a demo of a data table with smart cells. It uses the{" "}
          <a
            href="https://ai-sdk.dev/"
            target="_blank"
            className="text-blue-500"
          >
            AI SDK
          </a>{" "}
          to generate values for the cells.
        </h2>

        <h2 className="text-sm text-gray-500">
          Try it by pressing <Kbd>N</Kbd> to add a new column called
          &quot;Name&quot; and then press <Kbd>Enter</Kbd> to generate
        </h2>
      </div>

      <DataTable columns={columns} data={data} />

      <AddColumnDialog
        open={openAddColumn}
        setOpen={setOpenAddColumn}
        onAddColumn={handleAddColumn}
      />
    </div>
  );
}
