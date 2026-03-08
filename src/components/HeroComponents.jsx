import React from "react";
import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";

const HeroComponents = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816]">

      {/* Dark Gradient Background */}
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-br from-[#050816] via-[#0B1120] to-[#0D1A63]"
      />

      {/* Subtle Light Sweep */}
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
      />

      {/* Glow Accent */}
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-160px] left-[-160px] w-[460px] h-[460px] bg-cyan-400/10 rounded-full blur-3xl" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 sm:pt-32 md:pt-36 lg:pt-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="font-poppins text-left max-w-xl md:max-w-2xl"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug text-white">
              Kelola Keuangan Bisnis
              <span className="block text-indigo-400">
                Tanpa Ribet
              </span>
            </h1>

            <p className="mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-white/70">
              Catat pemasukan dan pengeluaran, lalu pantau laba-rugi usahamu
              secara otomatis dalam satu sistem.
            </p>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/60">
              <strong className="text-white">SIKASIR</strong> membantu pelaku UMKM
              mengelola keuangan usaha dengan cara sederhana, tanpa perlu
              keahlian akuntansi dan tanpa catatan manual yang berantakan.
            </p>

            <p className="mt-4 text-sm sm:text-base font-medium text-white/80">
              Semua keuangan usahamu, rapi dalam satu dashboard.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">

              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="
                      bg-indigo-500
                      text-white
                      font-semibold
                      px-8
                      h-12
                      rounded-full
                      shadow-lg
                      hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]
                      transition-all
                    "
                  >
                    Mulai Sekarang
                  </Button>
                </motion.div>
              </Link>

              <Link to="#fitur">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    variant="outlined"
                    className="
                      border-white/20
                      text-white
                      font-semibold
                      px-8
                      h-12
                      rounded-full
                      hover:bg-white/5
                    "
                  >
                    Lihat Fitur
                  </Button>
                </motion.div>
              </Link>

            </div>
          </motion.div>

          {/* LOTTIE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full max-w-lg mx-auto"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Lottie
                path="https://lottie.host/48f562a2-ea4a-48dd-93f0-44f106433118/dWbojZohU4.lottie"
                loop
                autoplay
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroComponents;