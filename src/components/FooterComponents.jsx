import React from "react";
import { Typography } from "@material-tailwind/react";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const LINKS = [
  {
    title: "Produk",
    items: ["Fitur", "Invoice", "Laporan Keuangan", "Dashboard"],
  },
  {
    title: "Perusahaan",
    items: ["Tentang Kami", "Kontak", "Kebijakan Privasi", "Syarat & Ketentuan"],
  },
  {
    title: "Bantuan",
    items: ["Help Center", "Panduan", "FAQ"],
  },
];

const currentYear = new Date().getFullYear();

const FooterComponents = () => {
  return (
    <footer className="relative w-full font-poppins text-white overflow-hidden">

      {/* 🌌 Background Base */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* 🌈 Animated Gradient Glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-cyan-400/10"
      />

      {/* ✨ Floating Glow Orbs */}
      <div className="absolute -top-32 -left-32 w-[380px] h-[380px] bg-indigo-500/20 rounded-full blur-[140px]" />
      <div className="absolute -bottom-40 -right-32 w-[420px] h-[420px] bg-cyan-400/10 rounded-full blur-[160px]" />

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">

          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" className="font-bold mb-4 font-poppins">
              SIKASIR
            </Typography>

            <Typography className="text-sm text-white/60 leading-relaxed max-w-md">
              Solusi digital modern untuk membantu UMKM mengelola keuangan usaha
              dengan lebih cerdas, efisien, dan profesional.
            </Typography>

            {/* CONTACT */}
            <div className="mt-7 space-y-3 text-sm">

              {[
                { icon: EnvelopeIcon, text: "support@sikasir.com" },
                { icon: PhoneIcon, text: "+62 xxx xxxx xxxx" },
                { icon: MapPinIcon, text: "Indonesia" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-3 text-white/60 hover:text-indigo-300 transition"
                  >
                    <div className="p-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{item.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* LINKS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            {LINKS.map(({ title, items }, i) => (
              <motion.ul
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Typography
                  variant="small"
                  className="mb-3 font-semibold text-white font-poppins"
                >
                  {title}
                </Typography>

                {items.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="
                        block py-1.5 text-sm text-white/50
                        hover:text-cyan-300
                        hover:translate-x-1
                        transition-all duration-300
                      "
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </motion.ul>
            ))}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <Typography variant="small" className="text-white/40 text-sm">
            © {currentYear} SIKASIR. Crafted with precision ✨
          </Typography>

          {/* SOCIAL */}
          <div className="flex items-center gap-3">

            {["facebook", "instagram", "twitter"].map((social) => (
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                key={social}
                href="#"
                className="
                  p-2 rounded-xl
                  bg-white/5 backdrop-blur-md
                  border border-white/10
                  hover:border-indigo-400/40
                  hover:bg-indigo-500/10
                  transition-all duration-300
                "
              >
                <svg
                  className="w-4 h-4 text-white/60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {social === "facebook" && (
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  )}
                  {social === "instagram" && (
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z"/>
                  )}
                  {social === "twitter" && (
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.74 11.654 11.654 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477 4.073 4.073 0 01-1.86-.513v.051a4.106 4.106 0 003.292 4.024 4.09 4.09 0 01-1.852.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 014 18.29a11.616 11.616 0 006.29 1.84"/>
                  )}
                </svg>
              </motion.a>
            ))}

          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponents;