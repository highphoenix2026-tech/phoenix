"use client";
import { useRouter, usePathname } from "next/navigation";

interface NavigationButtonProps {
  routeName: string;
  value: string;
  className?:string
}

export default function NavigationButton({ routeName, value ,className}: NavigationButtonProps) {
  const router = useRouter();
  const pathname = usePathname(); 

  const handleClick = () => {
    const normalizedRoute =
      routeName.startsWith("/")
        ? `${pathname}${routeName}`
        : `${pathname}/${routeName}`;

    router.push(normalizedRoute);
  };

  return (
    <button
      onClick={handleClick}
      className={` px-4 py-2 text-sm
        sm:px-5 sm:py-2.5 sm:text-base
        md:px-6 md:py-3 md:text-lg
        lg:px-4 lg:py-2 lg:text-lg

        rounded-full font-bold text-[#c9a24d]
        bg-[#0b1236] border-2 border-[#0b1236]
        relative overflow-hidden
        hover:bg-[#c9a24d] hover:text-[#0b1236] hover:border-[#c9a24d]
        /* Standard states */
        disabled:opacity-50 disabled:cursor-not-allowed

        /* Hover effect */
        before:absolute before:top-0 before:left-0 before:h-full before:w-0
        before:bg-white/10 before:transition-all before:duration-300
        hover:before:w-full

        transition-all duration-300 
        shadow-md hover:shadow-xl`}
    >
      {value}
    </button>
  );
}
