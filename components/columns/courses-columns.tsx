"use client";

import { ColumnDef } from "@tanstack/react-table";
import { NewCourse } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

export const CourseColumns: ColumnDef<NewCourse>[] = [
  /* ===================== Select ===================== */
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) =>
          row.toggleSelected(!!value)
        }
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  /* ===================== Image ===================== */
  {
    accessorKey: "course_image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("course_image") as string | null;
      const title = row.getValue("course_title_en") as string;

      return (
        <Image
          src={image || "/placeholder-logo.png"}
          alt={title}
          width={50}
          height={50}
          className="rounded-md object-cover"
          unoptimized
        />
      );
    },
    enableSorting: false,
  },

  /* ===================== EN Title ===================== */
  {
    accessorKey: "course_title_en",
    header: ({ column }) => (
      <button
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
        className="flex items-center gap-1"
      >
        English Title
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">
        {row.getValue("course_title_en")}
      </div>
    ),
  },

  /* ===================== AR Title ===================== */
  {
    accessorKey: "course_title_ar",
    header: ({ column }) => (
      <button
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
        className="flex items-center gap-1"
      >
        Arabic Title
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="font-medium" dir="rtl">
        {row.getValue("course_title_ar")}
      </div>
    ),
    meta: { hiddenByDefault: true },
  },

  /* ===================== EN Description ===================== */
  {
    accessorKey: "course_description_en",
    header: "English Description",
    cell: ({ row }) => {
      const desc = row.getValue(
        "course_description_en"
      ) as string | null;

      return (
        <div>
          {desc ? desc.slice(0, 40) + "..." : "—"}
        </div>
      );
    },
  },

  /* ===================== AR Description ===================== */
  {
    accessorKey: "course_description_ar",
    header: "Arabic Description",
    cell: ({ row }) => {
      const desc = row.getValue(
        "course_description_ar"
      ) as string | null;

      return (
        <div dir="rtl">
          {desc ? desc.slice(0, 40) + "..." : "—"}
        </div>
      );
    },
    meta: { hiddenByDefault: true },
  },

  /* ===================== Duration ===================== */
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => row.getValue("duration") || "—",
  },

  /* ===================== Start Date ===================== */
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => {
      const date = row.getValue("start_date") as Date;
      return new Date(date).toLocaleDateString();
    },
  },

  /* ===================== End Date ===================== */
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => {
      const date = row.getValue("end_date") as Date;
      return new Date(date).toLocaleDateString();
    },
  },
];
