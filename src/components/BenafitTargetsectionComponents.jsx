import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

/* ================= DATA ================= */

const benefits = [
  "Tidak perlu paham akuntansi",
  "Cocok untuk UMKM kecil hingga menengah",
  "Membantu pengambilan keputusan bisnis",
  "Mengurangi risiko kesalahan pencatatan",
  "Data keuangan tersimpan dengan aman",
];

const targets = [
  "Usaha kuliner & makanan",
  "Toko kelontong & retail",
  "Jasa dan freelancer",
  "UMKM rumahan",
  "Usaha jasa lokal",
];

/* ================= ANIMATION ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ================= COMPONENT ================= */

const BenafitTargetsectionComponents = () => {
  return (
    <section className="relative py-24 px-6 font-poppins overflow-hidden bg-white">

      {/* Glow Background */}
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-customBluedark/10 rounded-full blur-[160px]" />
      <div className="absolute -bottom-40 -right-40 w-[460px] h-[460px] bg-indigo-400/10 rounded-full blur-[170px]" />

      <div className="relative max-w-7xl mx-auto space-y-28">

        {/* ================= BENEFIT ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
              Kenapa UMKM Memilih{" "}
              <span className="bg-gradient-to-r text-indigo-400 bg-clip-text text-transparent">
                SIKASIR?
              </span>
            </h2>

            {/* Animated highlight line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-4 h-[4px] bg-gradient-to-r from-customBluedark to-indigo-400 rounded-full"
            />
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {benefits.map((text, i) => (
              <motion.div
                key={i}
                variants={item}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                }}
                className="
                  group relative
                  p-6 rounded-xl
                  bg-white
                  border border-gray-200
                  shadow-sm
                  hover:shadow-2xl
                  transition-all duration-300
                  hover:border-customBluedark/40
                "
              >
                {/* Glow hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-customBluedark/5 blur-xl" />

                <div className="relative flex items-start gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-customBluedark group-hover:scale-110 transition" />
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    {text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-14 max-w-2xl"
          >
            <p className="text-lg text-gray-800 leading-relaxed font-medium">
              <span className="text-indigo-400 font-semibold">
                SIKASIR
              </span>{" "}
              bukan hanya alat pencatat, tetapi{" "}
              <span className="bg-indigo-400/20 px-2 py-1 rounded-md">
                partner digital untuk perkembangan usahamu.
              </span>
            </p>
          </motion.div>
        </motion.div>

        {/* ================= TARGET ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Cocok untuk Berbagai Jenis Usaha
            </h2>

            <p className="mt-3 text-gray-600">
              SIKASIR fleksibel & mudah digunakan oleh:
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap gap-4"
          >
            {targets.map((text, i) => (
              <motion.div
                key={i}
                variants={item}
                whileHover={{
                  scale: 1.08,
                  y: -4,
                }}
                className="
                  group relative
                  flex items-center gap-2
                  px-5 py-3
                  rounded-full
                  bg-gradient-to-r from-white to-gray-50
                  border border-gray-200
                  shadow-sm
                  hover:shadow-xl
                  transition
                "
              >
                {/* Glow hover */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-customBluedark/5 blur-lg transition" />

                <UserGroupIcon className="w-5 h-5 text-customBluedark relative" />
                <span className="text-sm text-gray-700 font-medium relative">
                  {text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-lg text-gray-800 font-medium"
          >
            Selama ada transaksi,{" "}
            <span className="text-indigo-400 font-semibold">
              SIKASIR
            </span>{" "}
            siap membantu 🚀
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default BenafitTargetsectionComponents;