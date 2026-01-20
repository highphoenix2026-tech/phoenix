"use client";

import { ColumnDef } from "@tanstack/react-table";
import { NewMember } from "@/types/index";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";

export const MemberColumns: ColumnDef<NewMember>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name_en",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Name (EN)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => <div className="text-gray-800 font-medium">{row.original.name_en}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "name_ar",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Name (AR)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => <div className="text-gray-800 font-medium" dir="rtl">{row.original.name_ar}</div>,
    enableSorting: true,
    meta:{hiddenByDefault:true}
  },
  {
    accessorKey: "description_en",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Description (EN)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const desc = row.original.description_en ?? "";
      return <div className="text-gray-800 font-medium">{desc.slice(0, 50) + (desc.length > 50 ? "..." : "")}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "description_ar",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Description (AR)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const desc = row.original.description_ar ?? "";
      return <div className="text-gray-800 font-medium" dir="rtl">{desc.slice(0, 50) + (desc.length > 50 ? "..." : "")}</div>;
    },
    enableSorting: true,
    meta:{hiddenByDefault:true}
  },
  {
    accessorKey: "position_en",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Position (EN)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => <div className="text-gray-800 font-medium">{row.original.position_en}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "position_ar",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Position (AR)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => <div className="text-gray-800 font-medium" dir="rtl">{row.original.position_ar}</div>,
    enableSorting: true,
    meta:{hiddenByDefault:true}
  },
  {
    accessorKey: "display_order",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Display Order
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => <div className="text-gray-800 font-medium">{row.original.display_order}</div>,
    enableSorting: true,
    meta:{hiddenByDefault:true}
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      row.original.image ? <img src={row.original.image} alt={row.original.name_en} className="w-10 h-10 rounded-full" /> : null
    ),
    enableSorting: false,
    
  },
];
