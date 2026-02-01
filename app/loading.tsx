

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0b1236] overflow-hidden">
      <div className="relative flex items-center justify-center">
        
        {/* Layer 1: The Outer Atmosphere (Slow Pulse) */}
        <div className="absolute w-48 h-48 border border-[#c9a24d]/10 rounded-full animate-[ping_3s_linear_infinite]"></div>
        
        {/* Layer 2: Technical Radar Grid (Dashed) */}
        <div className="absolute w-36 h-36 border border-dashed border-[#c9a24d]/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
        
        {/* Layer 3: The Navigation Ring (Fast Sweep) */}
        <div className="absolute w-24 h-24 border-t-2 border-r-2 border-transparent border-t-[#c9a24d] border-r-[#c9a24d] rounded-full animate-spin"></div>
        
        {/* Layer 4: The Core Symbol (Abstract Phoenix Wing) */}
        <div className="relative z-10 animate-pulse">
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#c9a24d" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="drop-shadow-[0_0_8px_rgba(201,162,77,0.5)]"
          >
            {/* Minimalist Wing Icon */}
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" className="opacity-30" />
            <path d="M12 9l-4 3 4 3 4-3-4-3Z" />
            <path d="M12 5v2m0 10v2M5 12H3m18 0h-2" />
          </svg>
        </div>

        {/* Decorative Compass Points */}
        <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-1 h-2 bg-[#c9a24d]"></div>
        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-1 h-2 bg-[#c9a24d]/20"></div>
        <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-2 h-1 bg-[#c9a24d]/20"></div>
        <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-2 h-1 bg-[#c9a24d]/20"></div>
        
      </div>
    </div>
  );
}