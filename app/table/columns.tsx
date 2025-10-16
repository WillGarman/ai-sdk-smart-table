"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const getColumns: (
  onAddColumn: () => void,
  dynamicColumns: string[]
) => ColumnDef<Payment>[] = (onAddColumn, dynamicColumns) => {
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
                ? "default"
                : row.original.status === "processing"
                ? "secondary"
                : row.original.status === "success"
                ? "default"
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
      header: column,
      cell: ({ row, column }: CellContext<Payment, unknown>) => {
        return (
          <div>
            {column.id}-{row.original.email}
          </div>
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
            <PlusIcon className="size-4" /> Add
          </Button>
        );
      },
    },
  ];
};
