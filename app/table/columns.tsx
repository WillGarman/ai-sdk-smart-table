"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { PlusIcon, XIcon } from "lucide-react";
import { SmartCell } from "./smart-cell";
import { Kbd } from "@/components/ui/kbd";

export type Payment = {
  id: string;
  amount: string;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const getColumns: (
  onAddColumn: () => void,
  dynamicColumns: string[],
  onCellValueUpdate: (rowId: string, columnId: string, value: string) => void,
  onDeleteColumn: (columnName: string) => void
) => ColumnDef<Payment>[] = (
  onAddColumn,
  dynamicColumns,
  onCellValueUpdate,
  onDeleteColumn
) => {
  return [
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <Badge
            variant={
              row.original.status === "pending"
                ? "yellow"
                : row.original.status === "processing"
                ? "blue"
                : row.original.status === "success"
                ? "success"
                : "destructive"
            }
          >
            {row.original.status}
          </Badge>
        );
      },
    },

    {
      accessorKey: "amount",
      header: "Amount",
    },

    ...dynamicColumns.map((column) => ({
      accessorKey: column,
      header: () => {
        return (
          <div className="flex items-center justify-between">
            <span>{column}</span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onDeleteColumn(column)}
              className="hover:text-red-300 text-gray-300"
            >
              <XIcon className="h-3 w-3 " />
            </Button>
          </div>
        );
      },
      cell: ({ row, column }: CellContext<Payment, unknown>) => {
        const value = row.original[column.id as keyof Payment] as string | null;

        return (
          <SmartCell
            key={column.id}
            row={row.original}
            valueToGenerate={column.id}
            currentValue={value}
            onValueGenerated={onCellValueUpdate}
          />
        );
      },
    })),

    {
      accessorKey: "actions",
      header: () => {
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={onAddColumn}
            className="cursor-pointer"
          >
            <PlusIcon className="size-4" /> Add <Kbd>N</Kbd>
          </Button>
        );
      },
    },
  ];
};
