import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook, faInstagram, faTwitter, faYoutube
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope, faPhone, faLocationDot
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 pt-16 pb-8">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              EG<span className="text-indigo-400">-Devil</span>
            </h2>
            <p className="text-indigo-200/70 text-sm leading-relaxed">
              Shop bold. Shop smart. Your ultimate destination for premium products delivered fast.
            </p>
            {/* Socials */}
            <div className="flex gap-3 mt-2">
              {[
                { icon: faFacebook, href: "#" },
                { icon: faInstagram, href: "#" },
                { icon: faTwitter, href: "#" },
                { icon: faYoutube, href: "#" },
              ].map((s, i) => (
                <a key={i} href={s.href}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-indigo-500 flex items-center justify-center
                    text-indigo-200 hover:text-white transition-all duration-200 hover:scale-110"
                >
                  <FontAwesomeIcon icon={s.icon} className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {["Home", "Products", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`}
                    className="text-indigo-200/70 hover:text-indigo-300 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest">
              Categories
            </h3>
            <ul className="flex flex-col gap-2">
              {["Electronics", "Clothing", "Accessories", "Home & Living", "Sports"].map((item) => (
                <li key={item}>
                  <Link href="#"
                    className="text-indigo-200/70 hover:text-indigo-300 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { icon: faLocationDot, text: "Cairo, Egypt" },
                { icon: faPhone, text: "+20 100 000 0000" },
                { icon: faEnvelope, text: "support@egdevil.com" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-indigo-200/70 text-sm">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <FontAwesomeIcon icon={item.icon} className="text-indigo-400 text-xs" />
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-indigo-200/50 text-xs">
          <p>© 2026 EG-Devil. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#"
                className="hover:text-indigo-300 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
