import React from "react";
import { motion } from "framer-motion";
import {
  ArrowDownTrayIcon,
  ChartBarIcon,
  DocumentTextIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    title: "Pencatatan Pemasukan & Pengeluaran",
    desc: "Catat setiap transaksi harian dengan cepat dan mudah. Data tersimpan otomatis dan dapat diakses kapan saja.",
    icon: ArrowDownTrayIcon,
  },
  {
    title: "Dashboard Keuangan Pintar",
    desc: "Pantau kondisi keuangan usaha melalui dashboard informatif lengkap dengan grafik pemasukan, pengeluaran, dan laba bersih.",
    icon: ChartBarIcon,
  },
  {
    title: "Invoice Profesional",
    desc: "Buat invoice digital dengan nomor otomatis dan tampilan profesional. Unduh invoice dalam format PDF untuk pelangganmu.",
    icon: DocumentTextIcon,
  },
  {
    title: "Laporan Keuangan Otomatis",
    desc: "Dapatkan laporan keuangan harian, bulanan, dan tahunan tanpa perlu menghitung manual.",
    icon: PresentationChartLineIcon,
  },
];

const FeatureSectionComponents = () => {
  return (
    <section id="fitur" className="relative py-24 px-6 font-poppins overflow-hidden bg-white">

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-customBluedark/10 rounded-full blur-[160px]" />
      <div className="absolute -bottom-40 -right-40 w-[460px] h-[460px] bg-indigo-400/10 rounded-full blur-[170px]" />

      <div className="max-w-7xl mx-auto relative">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            Fitur Unggulan{" "}
            <span className="bg-gradient-to-r text-indigo-400 bg-clip-text text-transparent">
              SIKASIR
            </span>
          </h2>

          <p className="mt-4 text-gray-600 text-base leading-relaxed">
            Semua fitur dirancang untuk membantu UMKM mengelola keuangan usaha
            dengan lebih mudah, cepat, dan profesional.
          </p>

          {/* Animated Accent Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 140 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-4 h-[4px] bg-gradient-to-r from-customBluedark to-indigo-400 rounded-full"
          />
        </motion.div>

        {/* GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="
                  group relative
                  rounded-2xl
                  p-8
                  bg-white
                  border border-gray-200
                  shadow-sm
                  hover:shadow-2xl
                  transition-all duration-500
                  overflow-hidden
                "
              >
                {/* Animated Gradient Glow */}
                <motion.div
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="
                    absolute inset-0
                    bg-gradient-to-br
                    from-customBluedark/5
                    via-transparent
                    to-indigo-400/5
                  "
                />

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-customBluedark/5 blur-xl" />

                <div className="relative z-10">

                  {/* ICON */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 3 }}
                    className="
                      w-12 h-12
                      rounded-xl
                      flex items-center justify-center
                      bg-gradient-to-br from-customBluedark/10 to-indigo-400/10
                      mb-5
                      transition
                    "
                  >
                    <Icon className="w-6 h-6 text-customBluedark" />
                  </motion.div>

                  {/* TITLE */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>

                  {/* DESC */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Animated Bottom Line */}
                <motion.span
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                  className="
                    absolute bottom-0 left-0 h-[3px]
                    bg-gradient-to-r from-customBluedark to-indigo-400
                  "
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureSectionComponents;