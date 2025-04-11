import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./layout/Layout";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import {
  FaUserAlt,
  FaMale,
  FaFemale,
  FaHome,
  FaInfoCircle,
} from "react-icons/fa";

import "./Dashboard.css";

const Dashboard = () => {
  const [dataPendaftar, setDataPendaftar] = useState([]);
  const [total, setTotal] = useState(0);
  const [lakiLaki, setLakiLaki] = useState(0);
  const [perempuan, setPerempuan] = useState(0);

  const COLORS = ["#0088FE", "#FF69B4"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://prayata.rikpetik.site/api/v1/pendaftar"
        );
        const data = res.data.data;

        setDataPendaftar(data);
        setTotal(data.length);

        const jumlahLaki = data.filter(
          (d) => d.jenis_kelamin === "Laki-laki"
        ).length;
        const jumlahPerempuan = data.filter(
          (d) => d.jenis_kelamin === "Perempuan"
        ).length;

        setLakiLaki(jumlahLaki);
        setPerempuan(jumlahPerempuan);
      } catch (error) {
        console.error("Gagal mengambil data pendaftar:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = [
    { name: "Laki-laki", value: lakiLaki },
    { name: "Perempuan", value: perempuan },
  ];

  return (
    <Layout>
      <div className="dashboard-container">
        <h2>
          <FaHome className="icon" /> Dashboard
        </h2>
        <p className="subtext">Statistik Data Pendaftar Siswa Baru</p>

        <div className="dashboard-cards">
          <div className="card card-total">
            <FaUserAlt size={35} />
            <h4>Total Pendaftar</h4>
            <p>{total}</p>
          </div>
          <div className="card card-laki">
            <FaMale size={35} />
            <h4>Laki-laki</h4>
            <p>{lakiLaki}</p>
          </div>
          <div className="card card-perempuan">
            <FaFemale size={35} />
            <h4>Perempuan</h4>
            <p>{perempuan}</p>
          </div>
        </div>

        <div className="section-flex">
          <div className="chart-container">
            <h5>Perbandingan Jenis Kelamin</h5>
            <PieChart width={350} height={300}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div className="dashboard-info">
            <h5>
              <FaInfoCircle className="icon" /> Informasi Penting
            </h5>
            <ul>
              <li>Batas pendaftaran: 30 April 2025</li>
              <li>Pengumuman seleksi: 10 Mei 2025</li>
              <li>Hubungi admin jika ada kendala teknis.</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
