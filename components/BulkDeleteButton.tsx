"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface DeleteActionProps {
  ids: string[];
  deleteAction: (id: string) => Promise<{
    message: string;
    status: number;
  }>;
  onFinish?: () => void;
}

export default function BulkDeleteButton({
  ids,
  deleteAction,
  onFinish,
}: DeleteActionProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

 async function handleBulkDelete() {
  if (ids.length === 0) return;

  setLoading(true);

  try {
    const results = await Promise.all(
      ids.map((id) => deleteAction(id))
    );

    const failed = results.find((r) => r.status !== 201);

    if (failed) {
      toast.error(failed.message);
      return;
    }

    toast.success(`${ids.length} item(s) deleted successfully`);

    onFinish?.();
  } catch {
    toast.error("Error in deleting the selected items");
  } finally {
    setLoading(false);
    setOpen(false);
  }
}


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          disabled={ids.length === 0}
          className="flex items-center gap-2"
        >
          <Trash2 className="w-5 h-5" />
           ({ids.length})
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-100">
        <DialogHeader>
          <DialogTitle className="text-black">Confirm Delete</DialogTitle>
          <DialogDescription className="text-gray-700">
            Are you sure you want to delete {ids.length} item(s)?
            <br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
            className="bg-gray-200  hover:bg-gray-300 text-gray-700"
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleBulkDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
