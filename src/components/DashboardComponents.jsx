import React, { useMemo, useState, useEffect } from "react";
import { Card, Typography, Button, Input } from "@material-tailwind/react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
  TrashIcon,
  PencilIcon,
  DocumentArrowDownIcon,
  TableCellsIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID").format(value || 0);

const parseRupiah = (value) => Number(value.replace(/\./g, ""));

const DashboardComponents = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [sortType, setSortType] = useState("newest");


  // LOAD dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) setTransactions(JSON.parse(saved));
  }, []);

  // SIMPAN ke localStorage setiap update
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const [form, setForm] = useState({
    id: null,
    type: "income",
    title: "",
    amount: "",
    category: "Umum",
  });

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    setForm({ ...form, amount: raw ? formatRupiah(raw) : "" });
  };

  const handleSave = () => {
    if (!form.title || !form.amount) return;
    const now = new Date();

    if (form.id) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === form.id
            ? { ...t, ...form, amount: parseRupiah(form.amount) }
            : t
        )
      );
    } else {
      const newTransaction = {
        id: Date.now(),
        type: form.type,
        title: form.title,
        amount: parseRupiah(form.amount),
        category: form.category,
        date: now.toLocaleDateString("id-ID"),
        rawDate: now,
      };
      setTransactions([newTransaction, ...transactions]);
    }

    setForm({ id: null, type: "income", title: "", amount: "", category: "Umum" });
  };

  const handleEdit = (trx) =>
    setForm({ ...trx, amount: formatRupiah(trx.amount) });

  const handleDelete = (id) =>
    setTransactions((prev) => prev.filter((t) => t.id !== id));

  /* FILTER + SORT */
  const processedTransactions = useMemo(() => {
    let data = [...transactions];

    if (filterType !== "all") {
      data = data.filter((t) => t.type === filterType);
    }

    if (sortType === "newest") {
      data.sort((a, b) => b.rawDate - a.rawDate);
    } else if (sortType === "oldest") {
      data.sort((a, b) => a.rawDate - b.rawDate);
    } else if (sortType === "highest") {
      data.sort((a, b) => b.amount - a.amount);
    }

    return data;
  }, [transactions, filterType, sortType]);

  /* TOTAL */
  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((a, b) => a + b.amount, 0),
    [transactions]
  );

  const totalExpense = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((a, b) => a + b.amount, 0),
    [transactions]
  );

  const balance = totalIncome - totalExpense;

  /* CHART */
  const chartData = useMemo(() => {
    return transactions.map((t, i) => ({
      name: `T${i + 1}`,
      income: t.type === "income" ? t.amount : 0,
      expense: t.type === "expense" ? t.amount : 0,
    }));
  }, [transactions]);

  /* EXPORT PDF */
  const exportPDF = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // ======================
    // HEADER (CENTER CLEAN)
    // ======================
    doc.setFillColor(17, 24, 39); // dark elegant navy
    doc.rect(0, 0, pageWidth, 34, "F");

    doc.setTextColor(255, 255, 255);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(19);
    doc.text("SIKASIR | [Nama UMKM Yang Terdaftar]", pageWidth / 2, 17, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.text(
      "Sistem Informasi Keuangan Pribadi",
      pageWidth / 2,
      24,
      { align: "center" }
    );

    // Divider simetris
    doc.setLineWidth(0.4);
    doc.setDrawColor(255, 255, 255);
    doc.line(pageWidth / 2 - 30, 28, pageWidth / 2 + 30, 28);

    doc.setTextColor(0, 0, 0);

    // ======================
    // TANGGAL CETAK (KIRI)
    // ======================
    const today = new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    doc.setFontSize(10);
    doc.text(`Tanggal Cetak : ${today}`, 14, 42);

    // ======================
    // SUMMARY BOX
    // ======================
    doc.setDrawColor(210);
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(14, 50, pageWidth - 28, 32, 3, 3, "FD");

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Total Pemasukan`, 20, 62);
    doc.text(`Rp ${formatRupiah(totalIncome)}`, pageWidth - 20, 62, {
      align: "right",
    });

    doc.text(`Total Pengeluaran`, 20, 70);
    doc.text(`Rp ${formatRupiah(totalExpense)}`, pageWidth - 20, 70, {
      align: "right",
    });

    doc.setFont("helvetica", "bold");
    doc.text(`Saldo Akhir`, 20, 78);
    doc.text(`Rp ${formatRupiah(balance)}`, pageWidth - 20, 78, {
      align: "right",
    });

    doc.setFont("helvetica", "normal");

    // ======================
    // TABLE
    // ======================
    autoTable(doc, {
      startY: 90,
      head: [["Tanggal", "Jenis", "Kategori", "Deskripsi", "Nominal"]],
      body: transactions.map((t) => [
        t.date,
        t.type === "income" ? "Pemasukan" : "Pengeluaran",
        t.category,
        t.title,
        `Rp ${formatRupiah(t.amount)}`,
      ]),
      styles: {
        font: "helvetica",
        fontSize: 9,
        cellPadding: 4,
        valign: "middle",
      },
      headStyles: {
        fillColor: [17, 24, 39],
        textColor: 255,
        halign: "center",
        fontStyle: "bold",
      },
      columnStyles: {
        4: { halign: "right" },
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { left: 14, right: 14 },
    });

    // ======================
    // FOOTER
    // ======================
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.text(
        `Halaman ${i} dari ${pageCount}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" }
      );
    }

    doc.save("laporan-sikasir.pdf");
  };

  /* EXPORT EXCEL */
  const exportExcel = () => {
    const wsData = [
      ["Tanggal", "Jenis", "Kategori", "Deskripsi", "Nominal"],
      ...transactions.map((t) => [
        t.date,
        t.type,
        t.category,
        t.title,
        t.amount,
      ]),
      [],
      ["TOTAL PEMASUKAN", "", "", "", totalIncome],
      ["TOTAL PENGELUARAN", "", "", "", totalExpense],
      ["SALDO AKHIR", "", "", "", balance],
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Laporan");
    XLSX.writeFile(wb, "laporan-sikasir.xlsx");
  };

  const bgMain = darkMode ? "bg-[#0B1120] text-white" : "bg-gray-100 text-gray-900";
  const cardBg = darkMode ? "bg-[#111827]" : "bg-white";

  return (
    <div
      className={`min-h-screen transition-all duration-500 font-sans ${darkMode
        ? "bg-[#050816] text-white"
        : "bg-slate-50 text-slate-800"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10"
        >
          <div>
            <h1
              className={`text-2xl sm:text-3xl font-bold  font-poppins ${darkMode ? "text-white" : "text-[#0D1A63]"
                }`}
            >
              Dashboard Keuangan
            </h1>
            <p
              className={`mt-2 text-sm font-poppins ${darkMode ? "text-slate-400" : "text-slate-500"
                }`}
            >
              Monitoring keuangan yang rapi & elegan
            </p>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-xl transition ${darkMode
              ? "bg-[#0B1120] hover:bg-[#0D1A63]"
              : "bg-white border border-slate-200 hover:bg-slate-100"
              }`}
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5 text-yellow-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-[#0D1A63]" />
            )}
          </button>
        </motion.div>

        {/* SUMMARY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-10 font-poppins">
          {[
            { title: "Total Pemasukan", value: totalIncome },
            { title: "Total Pengeluaran", value: totalExpense },
            { title: "Saldo Akhir", value: balance },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200 }}
              className={`p-6 sm:p-8 rounded-2xl shadow-lg transition ${darkMode
                ? "bg-[#0B1120] border border-[#0D1A63]/40"
                : "bg-white border border-slate-200"
                }`}
            >
              <p
                className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
              >
                {item.title}
              </p>

              <h2
                className={`text-xl sm:text-2xl font-semibold mt-3 ${item.title === "Saldo Akhir"
                  ? darkMode
                    ? "text-blue-400"
                    : "text-[#0D1A63]"
                  : item.title === "Total Pemasukan"
                    ? "text-green-500"
                    : "text-red-500"
                  }`}
              >
                Rp {formatRupiah(item.value)}
              </h2>
            </motion.div>
          ))}
        </div>

        {/* FORM */}
        <div
          className={`rounded-2xl p-6 sm:p-8 mb-10 shadow-md ${darkMode
            ? "bg-[#0B1120] border border-[#0D1A63]/40"
            : "bg-white border border-slate-200"
            }`}
        >
          <h3 className="text-lg font-semibold mb-6 font-poppins">Tambah Transaksi</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <select
              className={`rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0D1A63] outline-none font-poppins ${darkMode
                ? "bg-[#050816] border border-[#0D1A63]/40"
                : "bg-white border border-slate-300"
                }`}
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="income">Pemasukan</option>
              <option value="expense">Pengeluaran</option>
            </select>

            <input
              placeholder="Deskripsi"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={`rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0D1A63] font-poppins outline-none ${darkMode
                ? "bg-[#050816] border border-[#0D1A63]/40"
                : "bg-white border border-slate-300"
                }`}
            />

            <input
              placeholder="Nominal"
              value={form.amount}
              onChange={handleAmountChange}
              className={`rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0D1A63] outline-none font-poppins ${darkMode
                ? "bg-[#050816] border border-[#0D1A63]/40"
                : "bg-white border border-slate-300"
                }`}
            />

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              onClick={handleSave}
              className="w-full lg:w-auto bg-[#0D1A63] text-white rounded-xl px-4 py-3 shadow-md hover:opacity-90 transition font-poppins"
            >
              Simpan
            </motion.button>
          </div>
        </div>

        {/* TABLE */}
        <div
          className={`rounded-2xl p-6 sm:p-8 mb-10 shadow-md ${darkMode
            ? "bg-[#0B1120] border border-[#0D1A63]/40"
            : "bg-white border border-slate-200"
            }`}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 font-poppins">
            <h3 className="text-lg font-semibold">Riwayat Transaksi</h3>

            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportPDF}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${darkMode
                  ? "bg-[#050816] border border-[#0D1A63]/40 hover:bg-[#0D1A63]"
                  : "bg-slate-100 border border-slate-300 hover:bg-slate-200"
                  }`}
              >
                <DocumentArrowDownIcon className="h-4 w-4" />
                PDF
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportExcel}
                className={`flex-1 sm:flex-none flex items-center justify-center font-poppins gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${darkMode
                  ? "bg-[#050816] border border-[#0D1A63]/40 hover:bg-[#0D1A63]"
                  : "bg-slate-100 border border-slate-300 hover:bg-slate-200"
                  }`}
              >
                <TableCellsIcon className="h-4 w-4" />
                Excel
              </motion.button>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto font-poppins">
            <table className="w-full text-sm">
              <thead
                className={`border-b ${darkMode
                  ? "border-[#0D1A63]/40"
                  : "border-slate-200"
                  }`}
              >
                <tr>
                  <th className="py-3 text-left">Tanggal</th>
                  <th className="text-left">Jenis</th>
                  <th className="text-left">Deskripsi</th>
                  <th className="text-left">Nominal</th>
                  <th className="text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {processedTransactions.map((t) => (
                  <tr
                    key={t.id}
                    className={`border-b transition ${darkMode
                      ? "border-[#0D1A63]/20 hover:bg-[#0D1A63]/10"
                      : "border-slate-200 hover:bg-slate-50"
                      }`}
                  >
                    <td className="py-3">{t.date}</td>
                    <td
                      className={
                        t.type === "income"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {t.type === "income" ? "Pemasukan" : "Pengeluaran"}
                    </td>
                    <td>{t.title}</td>
                    <td>Rp {formatRupiah(t.amount)}</td>
                    <td className="flex gap-4">
                      <PencilIcon
                        className="h-5 w-5 cursor-pointer hover:text-[#0D1A63]"
                        onClick={() => handleEdit(t)}
                      />
                      <TrashIcon
                        className="h-5 w-5 cursor-pointer hover:text-red-500"
                        onClick={() => handleDelete(t.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card */}
          {/* Mobile Card - Improved */}
          <div className="sm:hidden space-y-5">
            {processedTransactions.map((t) => (
              <div
                key={t.id}
                className={`rounded-2xl p-5 shadow-sm border transition ${darkMode
                  ? "bg-[#0B1120] border-[#0D1A63]/30"
                  : "bg-white border-slate-200"
                  }`}
              >
                {/* TOP ROW */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-medium">{t.title}</p>
                    <p className="text-xs opacity-60 mt-1">{t.date}</p>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${t.type === "income"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                      }`}
                  >
                    {t.type === "income" ? "Pemasukan" : "Pengeluaran"}
                  </span>
                </div>

                {/* NOMINAL */}
                <div className="mb-4">
                  <p
                    className={`text-lg font-semibold ${t.type === "income"
                      ? "text-green-500"
                      : "text-red-500"
                      }`}
                  >
                    Rp {formatRupiah(t.amount)}
                  </p>
                </div>

                {/* ACTION */}
                <div className="flex justify-end gap-4 pt-3 border-t border-slate-200 dark:border-[#0D1A63]/30">
                  <button
                    onClick={() => handleEdit(t)}
                    className="flex items-center gap-1 text-sm text-slate-500 hover:text-[#0D1A63] transition"
                  >
                    <PencilIcon className="h-4 w-4" />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(t.id)}
                    className="flex items-center gap-1 text-sm text-slate-500 hover:text-red-500 transition"
                  >
                    <TrashIcon className="h-4 w-4" />
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHART */}
        <Card
          className={`${cardBg} p-4 mb-10 h-[250px] sm:h-[320px] lg:h-[350px]`}
        >
          <Typography variant="h6" className="mb-4 font-poppins">
            Grafik Keuangan
          </Typography>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="income" stroke="#22c55e" />
              <Line dataKey="expense" stroke="#ef4444" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

      </div>
    </div>
  );
};

export default DashboardComponents;