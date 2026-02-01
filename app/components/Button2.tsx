import Link from "next/link";
import { FaPlane } from "react-icons/fa";

interface ButtonLinkProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Button2({
  href = "#",
  children,
  className = "",
}: ButtonLinkProps) {
  return (
    <div className={`eng-element  group relative ${className}`}>
      <div className="absolute -inset-2 border flex  border-slate-100 group-hover:border-[#c9a24d]/30 transition-colors duration-500" />

      <Link
        href={href}
        className="relative flex items-center gap-6 bg-[#0b1236] text-white px-8 py-4 transition-all duration-500 hover:bg-[#c9a24d] hover:text-[#0b1236] shadow-xl"
      >
        <span className="font-black uppercase tracking-[0.2em] text-xs sm:text-[12px]">
          {children}
        </span>

        <div className="relative w-5 h-5 sm:w-5  sm:h-5 overflow-hidden">
          <FaPlane className="text-lg -rotate-45 no-flip transition-transform duration-500 group-hover:translate-x-6 group-hover:-translate-y-6" />
          <FaPlane className="text-lg no-flip absolute -left-6 top-6 sm:-left-5 sm:top-5 -rotate-45 transition-transform duration-500 group-hover:translate-x-5 group-hover:-translate-y-5" />
        </div>
      </Link>
    </div>
  );
}
