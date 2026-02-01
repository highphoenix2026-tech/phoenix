import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-[#0b1236] overflow-hidden text-white font-sans px-4">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#c9a24d 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        {/* Large Decorative "404" */}
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-black text-[#c9a24d] select-none">
          404
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        {/* Gold Border Icon Wrapper */}
        <div className="mb-8 p-4 border border-[#c9a24d]/30 rounded-full animate-pulse">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c9a24d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z"></path>
            </svg>
        </div>

        <h1 className="text-[#c9a24d] text-sm uppercase tracking-[0.5em] mb-4 font-bold">
            Alert: Deviation from Flight Path
        </h1>
        
        <h2 className="text-4xl md:text-5xl font-light mb-6">
            Destination <span className="font-bold">Unreachable</span>
        </h2>

        <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light">
            The coordinates you requested are currently outside our monitored airspace. 
            This may be due to a retired route or a data discrepancy. 
            Please utilize our navigation links to return to base.
        </p>

        {/* Navigation Options (Detailed CTAs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Link 
            href="/" 
            className="flex flex-col items-start p-6 border border-white/10 bg-white/5 hover:border-[#c9a24d]/50 hover:bg-white/10 transition-all group"
          >
            <span className="text-[#c9a24d] text-xs font-bold uppercase mb-1">Return Home</span>
            <span className="text-sm text-slate-300">Back to Main Terminal</span>
          </Link>

          <Link 
            href="/advisory" 
            className="flex flex-col items-start p-6 border border-white/10 bg-white/5 hover:border-[#c9a24d]/50 hover:bg-white/10 transition-all group"
          >
            <span className="text-[#c9a24d] text-xs font-bold uppercase mb-1">Consultancy</span>
            <span className="text-sm text-slate-300">Explore Aviation Services</span>
          </Link>

          <Link 
            href="/training" 
            className="flex flex-col items-start p-6 border border-white/10 bg-white/5 hover:border-[#c9a24d]/50 hover:bg-white/10 transition-all group"
          >
            <span className="text-[#c9a24d] text-xs font-bold uppercase mb-1">Capacity Building</span>
            <span className="text-sm text-slate-300">Institutional Training</span>
          </Link>

          <Link 
            href="/contact" 
            className="flex flex-col items-start p-6 border border-white/10 bg-white/5 hover:border-[#c9a24d]/50 hover:bg-white/10 transition-all group"
          >
            <span className="text-[#c9a24d] text-xs font-bold uppercase mb-1">Report Issue</span>
            <span className="text-sm text-slate-300">Contact Control Tower</span>
          </Link>
        </div>

        {/* Technical Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 w-full flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest gap-4">
            <span>HighPhoenix | Phoenix Aviation Consultancy</span>
            <span>Ref: 404_NOT_FOUND</span>
            <span>Sys: Global Regulatory Support</span>
        </div>
      </div>
    </main>
  );
}