"use client"

import Image from "next/image"
import { Inter, Cairo } from "next/font/google"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const inter = Inter({ subsets: ["latin"] })
const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "700", "900"] })

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  name: string
  role: string
  image: string
  description?: string
  locale: string
}

export default function TeamMemberDialog({
  open,
  onOpenChange,
  name,
  role,
  description,
  locale,
  image
}: Props) {
  const isArabic = locale === "ar"
  const fontClass = isArabic ? cairo.className : inter.className

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir={isArabic ? "rtl" : "ltr"}
        className={`
          ${fontClass}
          w-[min(92vw,42rem)]
          h-[75vh]
          overflow-hidden
          rounded-none
          bg-white
          border border-slate-200
          shadow-2xl
          p-0
          /* Improved Close Button Styling */
          [&>button]:text-[#c9a24d] 
          [&>button]:opacity-100 
          [&>button]:scale-125
          [&>button]:transition-transform
          [&>button]:hover:scale-150
          [&>button]:z-50
          ${isArabic ? "[&>button]:left-4 [&>button]:right-auto" : "[&>button]:right-4 [&>button]:left-auto"}
        `}
      >
        <style jsx global>{`
          .scroll-area::-webkit-scrollbar { width: 4px; }
          .scroll-area::-webkit-scrollbar-thumb {
            background: #c9a24d;
          }
          .scroll-area { scrollbar-width: thin; scrollbar-color: #c9a24d transparent; }
        `}</style>

        <div className="flex flex-col h-full min-h-0">
          {/* Header Section with Navy Background */}
          <DialogHeader className="px-8 pt-12 pb-10 bg-[#0b1236] text-white relative">
            {/* Gold Accent Corner - Adjusted to not hide behind close button */}
            <div className={`absolute top-0 ${isArabic ? "left-0" : "right-0"} w-16 h-16 border-t-4 ${isArabic ? "border-l-4" : "border-r-4"} border-[#c9a24d]/20`} />
            
            <div className={`flex flex-col sm:flex-row items-center gap-6 w-full min-w-0`}>
              <div className="shrink-0">
                <div className="relative w-24 h-24 border-2 border-[#c9a24d] p-1 bg-[#0b1236]">
                    <Image
                      src={image || "/placeholder-avatar.png"}
                      alt={name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover "
                    />
                </div>
              </div>

              <div className={`flex flex-col min-w-0 ${isArabic ? "text-right" : "text-left"}`}>
                <DialogTitle className="text-lg font-black text-white uppercase italic tracking-tighter leading-none mb-2">
                  {name}
                </DialogTitle>
                <DialogDescription className="text-[#c9a24d] font-mono text-[11px] font-black uppercase tracking-[0.2em]">
                  {role}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Body Section */}
          <div className="flex-1 overflow-y-auto px-8 py-10 scroll-area min-h-0 bg-slate-50/50">
            <div className="max-w-prose">
                <div className="w-12 h-1 bg-[#c9a24d] mb-6" />
                {description ? (
                  <p className={`text-slate-600 text-sm leading-relaxed font-medium whitespace-pre-line ${
                      isArabic ? "text-right" : "text-left"
                      }`}
                  >
                      {description}
                  </p>
                ) : (
                  <p className="text-sm text-slate-400 italic">
                      {isArabic ? "لا يوجد وصف متاح" : "No description available."}
                  </p>
                )}
            </div>
          </div>

          {/* Footer Decor */}
          <div className="h-2 bg-[#c9a24d]" />
        </div>
      </DialogContent>
    </Dialog>
  )
}