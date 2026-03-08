import React from "react";
import { motion } from "framer-motion";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const problems = [
  "Tidak tahu apakah usaha untung atau rugi",
  "Pemasukan dan pengeluaran tidak tercatat rapi",
  "Uang pribadi bercampur dengan uang usaha",
  "Kesulitan membuat laporan keuangan",
  "Sulit mengambil keputusan bisnis",
];

const solutions = [
  "Mudah digunakan oleh siapa saja",
  "Pencatatan rapi dan terstruktur",
  "Data aman dan terdokumentasi",
  "Siap digunakan kapan saja",
];

const ListItem = ({ icon: Icon, text, color }) => (
  <motion.li
    whileHover={{ x: 4 }}
    className="flex items-start gap-3"
  >
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="flex-shrink-0"
    >
      <Icon className={`w-5 h-5 mt-0.5 ${color}`} />
    </motion.div>
    <span className="leading-relaxed">{text}</span>
  </motion.li>
);

const Card = ({ title, items, icon, iconColor, footer }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
    whileHover={{ y: -6 }}
    className="
      relative
      rounded-2xl
      backdrop-blur-xl
      border
      p-8 md:p-10
      shadow-lg
      hover:shadow-2xl
      transition-all
      duration-300
      bg-white/40
      border-white/30
      overflow-hidden
    "
  >
    {/* shimmer glow */}
    <motion.div
      animate={{ x: ["-100%", "100%"] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
    />

    <div className="relative z-10">
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">
        {title}
      </h3>

      <ul className="space-y-4 text-sm md:text-base text-gray-900">
        {items.map((item, index) => (
          <ListItem
            key={index}
            icon={icon}
            text={item}
            color={iconColor}
          />
        ))}
      </ul>

      {footer && (
        <p className="mt-6 text-sm md:text-base text-gray-900 leading-relaxed">
          {footer}
        </p>
      )}
    </div>
  </motion.div>
);

const ProblemSectionComponents = () => {
  return (
    <section className="relative mt-10 px-4 md:px-6 font-poppins">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="
          relative overflow-hidden
          max-w-7xl mx-auto
          rounded-3xl
          py-20 md:py-28
          px-6 md:px-10
        "
      >
        {/* floating glow accents */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-24 -right-24 w-[320px] h-[320px] bg-white/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-[120px] -left-[120px] w-[360px] h-[360px] bg-white/20 rounded-full blur-3xl"
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl mx-auto text-center mb-16 md:mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            Masalah Keuangan <span className="text-indigo-400">UMKM</span> Yang Sering Terjadi
          </h2>

          <p className="mt-4 text-sm md:text-base text-gray-900 leading-relaxed">
            Banyak pelaku UMKM menjalankan usaha dengan kerja keras, namun tanpa
            sistem keuangan yang jelas dan terstruktur.
          </p>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

          <Card
            title="Masalah Nyata yang Dihadapi UMKM"
            items={problems}
            icon={XCircleIcon}
            iconColor="text-red-500"
            footer="Masalah ini bukan karena kurang usaha, tetapi karena belum adanya sistem keuangan yang tepat."
          />

          <Card
            title="SIKASIR Hadir sebagai Solusi"
            items={solutions}
            icon={CheckCircleIcon}
            iconColor="text-green-900"
            footer={
              <>
                Dengan <strong>SIKASIR</strong>, pelaku UMKM dapat fokus
                mengembangkan usaha tanpa dibebani pencatatan keuangan yang
                rumit.
              </>
            }
          />
        </div>
      </motion.div>
    </section>
  );
};

export default ProblemSectionComponents;