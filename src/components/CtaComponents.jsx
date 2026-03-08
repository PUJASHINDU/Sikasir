import React from "react";
import { motion } from "framer-motion";

const CtaComponents = () => {
  return (
    <section className="py-28 px-6 font-poppins bg-white">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="
          relative
          max-w-5xl
          mx-auto
          rounded-3xl
          p-14 md:p-20
          text-center
          overflow-hidden
          shadow-[0_25px_70px_rgba(0,0,0,0.12)]
          bg-gradient-to-br
          from-[#050816] via-[#0B1120] to-[#0D1A63]
        "
      >
        {/* Animated Gradient Overlay */}
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10"
        />

        {/* Shimmer Sweep */}
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        {/* Glow Orbs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl" />

        {/* Sparkles */}
        <motion.div
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-16 right-20 w-1.5 h-1.5 bg-white rounded-full"
        />

        {/* CONTENT */}
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight font-poppins">
            Saatnya UMKM{" "}
            <span className="text-indigo-400 font-poppins">Naik Kelas</span>
          </h2>

          <p className="mt-8 text-lg md:text-xl text-white/90 leading-relaxed font-poppins">
            Kelola keuangan dengan lebih rapi,
            <br className="hidden md:block font-poppins" />
            ambil keputusan bisnis dengan lebih pasti.
          </p>

          <p className="mt-10 text-xl font-semibold text-indigo-400 font-poppins">
            SIKASIR – Catat Keuangan, Kendalikan Usaha.
          </p>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 25px rgba(255,255,255,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="
              mt-14
              px-10 py-4
              rounded-xl
              bg-white
              text-[#0D1A63]
              font-semibold
              text-lg
              shadow-lg
              transition-all
              duration-300
            "
          >
            Daftar Sekarang
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default CtaComponents;