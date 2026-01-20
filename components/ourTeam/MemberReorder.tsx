"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { MemberOrder } from "@/types";
import { Button } from "../ui/button";


export type Member = {
  id: string;
  name_en?: string;
  image?: string | null;
  display_order: number | null;
};

type Props = {
  // action must return a Promise<{ success:boolean, status:number, message:string }>
  action: (
    data: MemberOrder[]
  ) => Promise<{ success: boolean; status: number; message: string }>;
  initialMembers?: Member[];
  saving?: boolean;
};

// Sortable card
function SortableItem({ member }: { member: Member }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: member.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "manipulation",
    userSelect: "none",
  } as React.CSSProperties;

  return (
    <motion.li
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="select-none bg-white rounded-2xl shadow-sm p-4 hover:shadow-md border border-gray-100 flex flex-col items-start gap-3 cursor-grab"
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center gap-3 w-full">
        <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-gray-200 bg-gray-50 flex items-center justify-center">
          <img
            src={member.image ?? ""}
            alt={member.name_en ?? "member"}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24'%3E%3Ctext x='0' y='14'%3E%F0%9F%91%A4%3C/text%3E%3C/svg%3E";
            }}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-base font-medium truncate">{member.name_en}</div>
          <div className="text-sm text-gray-400 truncate">
            #{member.display_order ?? "—"}
          </div>
        </div>

        <div className="text-gray-400 text-xl select-none" aria-hidden>
          ≡
        </div>
      </div>
    </motion.li>
  );
}

export default function MemberReorder({
  initialMembers = [],
  action,
  saving: externalSaving,
}: Props) {
  const router = useRouter();

  // local members state (safe copy and sorted)
  const [members, setMembers] = useState<Member[]>(() =>
    (initialMembers ?? [])
      .slice()
      .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
  );
  const originalRef = useRef<Member[]>(members);

  // local saving indicator (don't mutate props)
  const [isSaving, setIsSaving] = useState(false);

  // sensors must be created at top-level
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    })
  );

  // handle drag end -> only update local UI (no server call here)
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    const oldIndex = members.findIndex((m) => m.id === active.id);
    const newIndex = members.findIndex((m) => m.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const newList = arrayMove(members, oldIndex, newIndex);
    const reordered = newList.map((m, index) => ({
      ...m,
      display_order: index + 1,
    }));

    // update local list for immediate visual feedback
    setMembers(reordered);
  };

  // Save button handler: call action (must return Promise)
  const handleSaveOrder = async () => {
    // prepare payload from current local state
    const payload: MemberOrder[] = members.map((m) => ({
      id: m.id,
      display_order: m.display_order ?? 0,
    }));

    setIsSaving(true);
    try {
      const res = await action(payload); // ensure parent passes a function that returns a Promise
      if (res.success) {
        toast.success(res.message || "Order saved");
        router.push("/admin/dashboard/ourTeam");
      } else {
        toast.error(res.message || "Failed to save order");
        // optional: rollback to original order
        setMembers(originalRef.current);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message ?? "Error saving order");
      setMembers(originalRef.current);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // restore original order and navigate away
    setMembers(originalRef.current);
    router.replace("/admin/dashboard/ourTeam");
  };

  const saving = externalSaving ?? isSaving;

  return (
    <div className="  w-[75vw] md:w-[65vw]   mx-auto ml-2 lg:ml-5 xl:w-[75vw] mt-3">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-semibold">Team Members</h3>
          <p className="text-sm text-gray-500">
            Drag cards to reorder. Click{" "}
            <span className="font-medium">Save Order</span> to persist.
          </p>
        </div>
      </div>

      <div
        className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
        style={{ touchAction: "none" }}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={members.map((m) => m.id)}
            strategy={rectSortingStrategy}
          >
            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {members.map((member) => (
                <SortableItem key={member.id} member={member} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </div>
      <div className="flex items-center gap-3 mt-5 flex-row justify-end">
        <Button type="button" onClick={handleCancel} disabled={saving}>
          Cancel
        </Button>
        <Button type="button" onClick={handleSaveOrder} disabled={saving}>
          {" "}
          {saving ? "Saving..." : "Save Order"}
        </Button>
      </div>

      <div className="mt-3 text-sm text-gray-400">
        Tip: drag any card to reorder. Use the Save button to persist changes.
      </div>
    </div>
  );
}
