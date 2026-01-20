import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#080d24] text-slate-400 py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-24 grid md:grid-cols-4 gap-10">

        {/* LOGO & DESCRIPTION */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-[#c9a24d]">Phoenix Aviation</h2>
          <p className="text-sm leading-relaxed">
            Providing world-class strategic advisory and training solutions
            for the global aviation industry.
          </p>
          <div className="flex gap-4 mt-2">
            <Link href="#" className="hover:text-[#c9a24d] transition"><FaFacebookF /></Link>
            <Link href="#" className="hover:text-[#c9a24d] transition"><FaTwitter /></Link>
            <Link href="#" className="hover:text-[#c9a24d] transition"><FaLinkedinIn /></Link>
            <Link href="#" className="hover:text-[#c9a24d] transition"><FaInstagram /></Link>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-[#c9a24d] transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-[#c9a24d] transition">About Us</Link></li>
            <li><Link href="/services" className="hover:text-[#c9a24d] transition">Services</Link></li>
            <li><Link href="/training" className="hover:text-[#c9a24d] transition">Training</Link></li>
            <li><Link href="/contact" className="hover:text-[#c9a24d] transition">Contact</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 Al-Abdali, Omayya Bent Abd Shams St.</li>
            <li>📞 +962 79 123 4567</li>
            <li>✉ info@phoenixaviation.com</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase mb-4">Newsletter</h3>
          <p className="text-sm text-slate-400 mb-4">Subscribe to receive updates and insights.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-lg border border-slate-700 bg-[#0b1236] text-white focus:outline-none focus:ring-2 focus:ring-[#c9a24d]"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#c9a24d] text-[#0b1236] font-bold hover:bg-[#b8933f] transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-12 text-center centert text-sm border-t border-slate-700 pt-6">
        © 2026 Phoenix Aviation Consultancy. All rights reserved.
      </div>
    </footer>
  );
}
