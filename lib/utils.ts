import { Payment } from "@/app/table/columns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to validate column name before adding
export function validateColumnName(
  columnName: string,
  existingColumns: string[]
): boolean {
  return (
    columnName.trim() !== "" && !existingColumns.includes(columnName.trim())
  );
}

// Utility function to check if an element is editable
export function isEditableElement(target: HTMLElement | null): boolean {
  if (!target) return false;

  const tagName = target.tagName;
  return (
    !!target.isContentEditable ||
    tagName === "INPUT" ||
    tagName === "TEXTAREA" ||
    tagName === "SELECT"
  );
}

// Utility function to process table data with cell values
export function processTableData(
  baseData: Payment[],
  dynamicColumns: string[],
  cellValues: Record<string, Record<string, string>>
): Payment[] {
  return baseData.map((row) => ({
    ...row,
    // Spread dynamic columns into key: value pairs
    ...dynamicColumns.reduce((acc, column) => {
      acc[column] = cellValues[row.id]?.[column] ?? null;
      return acc;
    }, {} as Record<string, string | null>),
  }));
}

// Utility function to clean up cell values when a column is deleted
export function cleanupCellValuesForColumn(
  cellValues: Record<string, Record<string, string>>,
  columnName: string
): Record<string, Record<string, string>> {
  const newValues = { ...cellValues };
  Object.keys(newValues).forEach((rowId) => {
    if (newValues[rowId][columnName]) {
      delete newValues[rowId][columnName];
    }
  });
  return newValues;
}

// Utility function to update cell values
export function updateCellValue(
  cellValues: Record<string, Record<string, string>>,
  rowId: string,
  columnId: string,
  value: string
): Record<string, Record<string, string>> {
  return {
    ...cellValues,
    [rowId]: {
      ...cellValues[rowId],
      [columnId]: value,
    },
  };
}

// Mock data function
export function getData(dynamicColumns: string[]): Payment[] {
  const data = dynamicColumns.reduce((acc, column) => {
    acc[column] = null;
    return acc;
  }, {} as Record<string, string | null>);

  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: "$100.00",
      status: "pending",
      email: "m@example.com",
      ...data,
    },
    {
      id: "489e1d0e",
      amount: "$250.00",
      status: "processing",
      email: "john@example.com",
      ...data,
    },
    {
      id: "629f3a2b",
      amount: "$75.00",
      status: "success",
      email: "sarah@example.com",
      ...data,
    },
    {
      id: "837c4d5f",
      amount: "$320.00",
      status: "failed",
      email: "alex@example.com",
      ...data,
    },
    {
      id: "945b6e8a",
      amount: "$150.00",
      status: "pending",
      email: "emma@example.com",
      ...data,
    },
    {
      id: "156d7f9c",
      amount: "$500.00",
      status: "success",
      email: "mike@example.com",
      ...data,
    },
    {
      id: "267e8a1d",
      amount: "$89.00",
      status: "processing",
      email: "lisa@example.com",
      ...data,
    },
    {
      id: "378f9b2e",
      amount: "$425.00",
      status: "failed",
      email: "david@example.com",
      ...data,
    },
    {
      id: "489a0c3f",
      amount: "$199.00",
      status: "success",
      email: "anna@example.com",
      ...data,
    },
    {
      id: "590b1d4a",
      amount: "$67.00",
      status: "pending",
      email: "chris@example.com",
      ...data,
    },
    {
      id: "601c2e5b",
      amount: "$380.00",
      status: "processing",
      email: "kate@example.com",
      ...data,
    },
  ];
}
