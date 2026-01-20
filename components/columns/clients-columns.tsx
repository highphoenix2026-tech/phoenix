"use client";

import { ColumnDef } from "@tanstack/react-table";
import { NewClient } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

export const ClientsColumns: ColumnDef<NewClient>[] = [
 
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
    cell: ({ row }) => {
      const name = row.getValue("name_en") as string;
      return <div className="text-gray-800 font-medium">{name}</div>;
    },
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
    cell: ({ row }) => {
      const name = row.original.name_ar;
      return (
        <div className="text-gray-800 font-medium" >
          {name}
        </div>
      );
    },
    enableSorting: true,
    
  },

  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => {
      const logo = row.getValue("logo") as string;
      const name = row.getValue("name_en") as string;

      return (
        <div className="flex items-center gap-2">
          <Image
            src={logo || "/placeholder-logo.png"}
            alt={name}
            width={48}
            height={48}
            className="rounded-full object-cover"
            unoptimized
          />
        </div>
      );
    },
    enableSorting: false,
  },
];
