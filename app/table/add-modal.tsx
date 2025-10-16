"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Component for the add column dialog
export const AddColumnDialog = ({
  open,
  setOpen,
  onAddColumn,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAddColumn: (name: string) => void;
}) => {
  const [fieldName, setFieldName] = useState("");

  // Handle adding a new column
  const handleAdd = () => {
    if (fieldName.trim()) {
      onAddColumn(fieldName);
      toast.success(`Column "${fieldName}" added successfully`);
      setFieldName("");
      setOpen(false);
    } else {
      toast.error("Please enter a field name");
    }
  };

  // Handle form submission on Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Column</DialogTitle>
        </DialogHeader>

        <Input
          type="text"
          placeholder="field name"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <DialogFooter>
          <Button type="submit" onClick={handleAdd}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
