import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DataPendaftar.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Impor ikon
import { useNavigate } from "react-router-dom";
import Layout from "./layout/Layout";

const DataPendaftar = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://prayata.rikpetik.site/api/v1/pendaftar"
      );
      if (res.status === 200) {
        setData(res.data.data);
      }
    } catch (error) {
      console.error("Gagal fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit_data/${id}`);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirm) return;

    try {
      const res = await axios.delete(
        `https://prayata.rikpetik.site/api/v1/pendaftar/delete/${id}`
      );
      if (res.data.status === 200) {
        fetchData();
      }
    } catch (err) {
      setMessage(" Gagal menghapus data.");
      console.error("Delete error:", err);
    }
  };

  return (
    <>
      <Layout>
        <h2 className="fw-bold pt-4 ps-4 pb-0 m-0">Daftar Pendaftar</h2>
        <hr className="mb-0 mt-3" />
        <div className="table-container mt-3">
          {message && <p className="table-message">{message}</p>}
          <table>
            <thead>
              <tr>
                <th>
                  <div>No</div>
                </th>
                <th>
                  <div>Nama</div>
                </th>
                <th>
                  <div>Alamat</div>
                </th>
                <th>
                  <div>Jenis Kelamin</div>
                </th>
                <th>
                  <div>No HP</div>
                </th>
                <th>
                  <div>Asal Sekolah</div>
                </th>
                <th>
                  <div>Jurusan</div>
                </th>
                <th>
                  <div>Tanggal Lahir</div>
                </th>
                <th>
                  <div>NISN</div>
                </th>
                <th>
                  <div>Aksi</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={item.id_pendaftar}>
                    <td>{index + 1}</td>
                    <td>{item.nama_pendaftar}</td>
                    <td>{item.alamat}</td>
                    <td>{item.jenis_kelamin}</td>
                    <td>{item.no_hp}</td>
                    <td>{item.asal_sekolah}</td>
                    <td>{item.jurusan}</td>
                    <td>{item.tgl_lahir}</td>
                    <td>{item.NISN}</td>
                    <td className="table-actions">
                      <button
                        onClick={() => handleEdit(item.id_pendaftar)}
                        className="btn-edit pt-1"
                      >
                        <FaEdit className="btn-icon" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id_pendaftar)}
                        className="btn-delete"
                      >
                        <FaTrashAlt className="btn-icon" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="no-data">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export default DataPendaftar;
