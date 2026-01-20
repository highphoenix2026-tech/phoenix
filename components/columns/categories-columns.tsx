"use client";
import { ColumnDef } from "@tanstack/react-table";
import { NewCategory } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

export const CategoryColumns: ColumnDef<NewCategory>[] = [
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
    accessorKey: "category_name_en",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Name (EN)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const name = row.getValue("category_name_en") as string;
      return <div className="text-gray-800 font-medium">{name}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "category_name_ar",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Name (AR)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const name = row.getValue("category_name_ar") as string;
      return (
        <div className="text-gray-800 font-medium" dir="rtl">
          {name}
        </div>
      );
    },
    enableSorting: true,
    meta: { hiddenByDefault: true }, 
  },
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => {
      const logo = row.getValue("logo") as string | null;
      const name = row.getValue("category_name_en") as string;
      return (
        <div className="flex items-center gap-2">
          <Image
            src={logo || "/placeholder-logo.png"}
            alt={name}
            width={50}
            height={50}
            className="rounded-full object-cover"
            unoptimized
          />
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "category_description_en",
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
      const desc = row.getValue("category_description_en") as string | null;
      return (
        <div className="text-gray-800 font-medium">
          {desc ? desc.slice(0, 35) + "..." : "-"}
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "category_description_ar",
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
      const desc = row.getValue("category_description_ar") as string | null;
      return (
        <div className="text-gray-800 font-medium" dir="rtl">
          {desc ? desc.slice(0, 35) + "..." : "-"}
        </div>
      );
    },
    enableSorting: true,
    meta: { hiddenByDefault: true },
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Slug
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const slug = row.getValue("slug") as string;
      return <div className="text-gray-800 font-medium">{slug}</div>;
    },
    enableSorting: true,
  },
];
