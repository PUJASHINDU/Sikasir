import React, { useEffect, useMemo, useState } from "react";
import { Card, Typography, Button, Input } from "@material-tailwind/react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import {
  MagnifyingGlassIcon,
  DocumentArrowDownIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID").format(value || 0);

const TransaksiComponents = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  // LOAD DATA DARI DASHBOARD (localStorage)
  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  // FILTER + SEARCH
  const filteredData = useMemo(() => {
    return transactions.filter((t) => {
      const matchSearch =
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase());

      const matchType =
        filterType === "all" ? true : t.type === filterType;

      return matchSearch && matchType;
    });
  }, [transactions, search, filterType]);

  const totalIncome = filteredData
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const totalExpense = filteredData
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  /* EXPORT PDF */
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("LAPORAN DATA TRANSAKSI", 14, 15);

    doc.setFontSize(11);
    doc.text(`Total Pemasukan : Rp ${formatRupiah(totalIncome)}`, 14, 25);
    doc.text(`Total Pengeluaran : Rp ${formatRupiah(totalExpense)}`, 14, 32);

    autoTable(doc, {
      startY: 40,
      head: [["Tanggal", "Jenis", "Kategori", "Deskripsi", "Nominal"]],
      body: filteredData.map((t) => [
        t.date,
        t.type === "income" ? "Pemasukan" : "Pengeluaran",
        t.category,
        t.title,
        `Rp ${formatRupiah(t.amount)}`,
      ]),
      styles: {
        fontSize: 10,
        cellPadding: 4,
      },
      headStyles: {
        fillColor: [79, 70, 229],
      },
    });

    doc.save("laporan-transaksi.pdf");
  };

  /* EXPORT EXCEL */
  const exportExcel = () => {
    const worksheetData = [
      ["Tanggal", "Jenis", "Kategori", "Deskripsi", "Nominal"],
      ...filteredData.map((t) => [
        t.date,
        t.type === "income" ? "Pemasukan" : "Pengeluaran",
        t.category,
        t.title,
        t.amount,
      ]),
      [],
      ["TOTAL PEMASUKAN", "", "", "", totalIncome],
      ["TOTAL PENGELUARAN", "", "", "", totalExpense],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Transaksi");
    XLSX.writeFile(workbook, "laporan-transaksi.xlsx");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] to-[#111827] p-6 font-poppins text-white">
      <Typography variant="h4" className="mb-6 text-indigo-400">
        Halaman Transaksi
      </Typography>

      {/* FILTER + SEARCH */}
      <Card className="bg-[#1E293B] p-4 mb-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Input
                label="Cari transaksi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>

            <select
              className="rounded-lg px-3 py-2 text-black"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Semua</option>
              <option value="income">Pemasukan</option>
              <option value="expense">Pengeluaran</option>
            </select>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={exportPDF}
              className="bg-red-500 flex items-center gap-2"
            >
              <DocumentArrowDownIcon className="h-4 w-4" />
              PDF
            </Button>

            <Button
              size="sm"
              onClick={exportExcel}
              className="bg-green-500 flex items-center gap-2"
            >
              <TableCellsIcon className="h-4 w-4" />
              Excel
            </Button>
          </div>
        </div>
      </Card>

      {/* TABLE */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card className="bg-[#1E293B] p-4 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="border-b border-white/10 text-white/70">
                <tr>
                  <th className="py-3 text-left">Tanggal</th>
                  <th>Jenis</th>
                  <th>Kategori</th>
                  <th>Deskripsi</th>
                  <th className="text-right">Nominal</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="py-2">{t.date}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          t.type === "income"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {t.type === "income"
                          ? "Pemasukan"
                          : "Pengeluaran"}
                      </span>
                    </td>
                    <td>{t.category}</td>
                    <td>{t.title}</td>
                    <td className="text-right font-semibold">
                      Rp {formatRupiah(t.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-6 text-white/50">
              Tidak ada data ditemukan
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default TransaksiComponents;