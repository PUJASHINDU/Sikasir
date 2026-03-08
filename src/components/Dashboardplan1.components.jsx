import React, { useMemo, useState } from "react";
import {
  Card,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
  MoonIcon,
  SunIcon,
  DocumentArrowDownIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import jsPDF from "jspdf";

const DashboardComponents = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [filter, setFilter] = useState("all");

  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    type: "income",
    title: "",
    amount: "",
  });

  /* FILTER LOGIC */
  const filteredTransactions = useMemo(() => {
    const today = new Date().toLocaleDateString();

    if (filter === "today") {
      return transactions.filter((t) => t.date === today);
    }

    if (filter === "month") {
      const thisMonth = new Date().getMonth();
      return transactions.filter(
        (t) => new Date(t.rawDate).getMonth() === thisMonth
      );
    }

    return transactions;
  }, [transactions, filter]);

  /* TOTALS */
  const totalIncome = useMemo(
    () =>
      filteredTransactions
        .filter((t) => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0),
    [filteredTransactions]
  );

  const totalExpense = useMemo(
    () =>
      filteredTransactions
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0),
    [filteredTransactions]
  );

  /* CHART DATA */
  const chartData = useMemo(() => {
    return filteredTransactions.map((t, i) => ({
      name: `T${i + 1}`,
      income: t.type === "income" ? t.amount : 0,
      expense: t.type === "expense" ? t.amount : 0,
    }));
  }, [filteredTransactions]);

  /* SAVE */
  const handleSave = () => {
    if (!form.title || !form.amount) return;

    const now = new Date();

    const newTransaction = {
      id: Date.now(),
      ...form,
      amount: Number(form.amount),
      date: now.toLocaleDateString(),
      rawDate: now,
    };

    setTransactions([newTransaction, ...transactions]);
    setForm({ type: "income", title: "", amount: "" });
  };

  /* EXPORT PDF */
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text("Laporan Transaksi", 14, 15);

    filteredTransactions.forEach((t, i) => {
      doc.text(
        `${i + 1}. ${t.date} | ${
          t.type === "income" ? "Pemasukan" : "Pengeluaran"
        } | ${t.title} | Rp ${t.amount.toLocaleString()}`,
        14,
        25 + i * 8
      );
    });

    doc.save("laporan.pdf");
  };

  /* MOCK AI SCAN NOTA */
  const handleUploadNota = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Simulasi AI baca struk 😎
    const fakeDetected = {
      title: "Belanja Minimarket",
      amount: Math.floor(Math.random() * 50000) + 10000,
    };

    const now = new Date();

    const newTransaction = {
      id: Date.now(),
      type: "expense",
      title: fakeDetected.title,
      amount: fakeDetected.amount,
      date: now.toLocaleDateString(),
      rawDate: now,
    };

    setTransactions([newTransaction, ...transactions]);
  };

  const bgMain = darkMode ? "bg-[#0B1120]" : "bg-gray-100";
  const cardBg = darkMode ? "bg-[#111827]" : "bg-white";
  const textMain = darkMode ? "text-white" : "text-gray-900";
  const textSub = darkMode ? "text-white/60" : "text-gray-500";

  return (
    <div className={`min-h-screen p-6 font-poppins ${bgMain} ${textMain}`}>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <Typography variant="h4" className="text-indigo-400">
            Dashboard Keuangan
          </Typography>
          <Typography className={textSub}>
            Monitoring pemasukan & pengeluaran
          </Typography>
        </div>

        <Button
          variant="text"
          onClick={() => setDarkMode(!darkMode)}
          className={textMain}
        >
          {darkMode ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* FILTER */}
      <div className="flex gap-2 mb-4">
        {[
          { id: "all", label: "Semua" },
          { id: "today", label: "Hari Ini" },
          { id: "month", label: "Bulan Ini" },
        ].map((f) => (
          <Button
            key={f.id}
            size="sm"
            onClick={() => setFilter(f.id)}
            className={
              filter === f.id
                ? "bg-indigo-500"
                : darkMode
                ? "bg-white/10"
                : "bg-gray-200 text-gray-700"
            }
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <AnimatedStat
          title="Total Pemasukan"
          value={totalIncome}
          icon={<ArrowUpCircleIcon className="h-6 w-6" />}
          color="text-green-400"
          cardBg={cardBg}
        />
        <AnimatedStat
          title="Total Pengeluaran"
          value={totalExpense}
          icon={<ArrowDownCircleIcon className="h-6 w-6" />}
          color="text-red-400"
          cardBg={cardBg}
        />
      </div>

      {/* FORM */}
      <Card className={`${cardBg} p-4 mb-6`}>
        <Typography variant="h6" className="mb-4">
          Tambah Transaksi
        </Typography>

        <div className="grid md:grid-cols-4 gap-3">
          <select
            className="border rounded-lg px-3 text-black"
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          >
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </select>

          <Input
            label="Deskripsi"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <Input
            label="Nominal"
            type="number"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
          />

          <Button onClick={handleSave} className="bg-indigo-500">
            Simpan
          </Button>
        </div>

        {/* UPLOAD NOTA */}
        <label className="mt-4 inline-flex cursor-pointer">
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleUploadNota}
          />
          <Button
            size="sm"
            className="bg-orange-500 flex items-center gap-2"
          >
            <PhotoIcon className="h-4 w-4" />
            Upload Nota
          </Button>
        </label>
      </Card>

      {/* CHART */}
      <Card className={`${cardBg} p-4 mb-6 h-[320px]`}>
        <Typography variant="h6" className="mb-4">
          Grafik Keuangan
        </Typography>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={2}
              name="Pemasukan"
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={2}
              name="Pengeluaran"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* TABLE */}
      <Card className={`${cardBg} p-4`}>
        <div className="flex justify-between mb-4">
          <Typography variant="h6">Riwayat</Typography>
          <Button
            size="sm"
            onClick={exportPDF}
            className="bg-green-500 flex items-center gap-2"
          >
            <DocumentArrowDownIcon className="h-4 w-4" />
            Export PDF
          </Button>
        </div>

        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="py-2 text-left">Tanggal</th>
              <th className="text-left">Jenis</th>
              <th className="text-left">Deskripsi</th>
              <th className="text-right">Nominal</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((t) => (
              <tr key={t.id} className="border-b">
                <td className="py-2">{t.date}</td>
                <td>
                  {t.type === "income"
                    ? "Pemasukan"
                    : "Pengeluaran"}
                </td>
                <td>{t.title}</td>
                <td className="text-right">
                  Rp {t.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

const AnimatedStat = ({ title, value, icon, color, cardBg }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <Card className={`${cardBg} p-4`}>
      <div className="flex justify-between">
        <div>
          <Typography className="text-sm opacity-60">
            {title}
          </Typography>
          <Typography variant="h5" className={color}>
            Rp {value.toLocaleString()}
          </Typography>
        </div>
        <div className={color}>{icon}</div>
      </div>
    </Card>
  </motion.div>
);

export default DashboardComponents;