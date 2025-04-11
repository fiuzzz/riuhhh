import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditPendaftar.css";
import Layout from "./layout/Layout";

const EditPendaftar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama_pendaftar: "",
    alamat: "",
    jenis_kelamin: "",
    no_hp: "",
    asal_sekolah: "",
    jurusan: "",
    tgl_lahir: "",
    NISN: "",
  });

  const [errors, setErrors] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/pendaftar/${id}`
        );
        if (res.data?.data) {
          setFormData(res.data.data);
        }
      } catch (err) {
        console.error("Gagal fetch data:", err);
        setMessage("Gagal mengambil data pendaftar.");
      }
    };
    fetchData();
  }, [id]);

  const validate = () => {
    let tempErrors = {};

    if (!formData.nama_pendaftar) {
      tempErrors.nama_pendaftar = "Nama wajib diisi";
    } else if (!/^[A-Za-z\s]*$/.test(formData.nama_pendaftar)) {
      tempErrors.nama_pendaftar = "Nama hanya boleh huruf dan spasi.";
    }

    if (!formData.no_hp) {
      tempErrors.no_hp = "No HP wajib diisi";
    } else if (!/^[0-9]*$/.test(formData.no_hp)) {
      tempErrors.no_hp = "No HP hanya boleh berisi angka.";
    }

    if (!formData.NISN) {
      tempErrors.NISN = "NISN wajib diisi";
    } else if (!/^\d*$/.test(formData.NISN)) {
      tempErrors.NISN = "NISN harus berupa angka.";
    } else if (formData.NISN.length !== 10) {
      tempErrors.NISN = "NISN harus terdiri dari tepat 10 digit.";
    }

    if (!formData.alamat) tempErrors.alamat = "Alamat wajib diisi";
    if (!formData.jenis_kelamin)
      tempErrors.jenis_kelamin = "Pilih jenis kelamin";
    if (!formData.asal_sekolah)
      tempErrors.asal_sekolah = "Asal sekolah wajib diisi";
    if (!formData.jurusan) tempErrors.jurusan = "Pilih jurusan";
    if (!formData.tgl_lahir) tempErrors.tgl_lahir = "Tanggal lahir wajib diisi";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "nama_pendaftar" && value && !/^[A-Za-z\s]*$/.test(value)) {
      error = "Nama hanya boleh huruf dan spasi.";
    }

    if (name === "no_hp" && value && !/^[0-9]*$/.test(value)) {
      error = "Nomor HP hanya boleh berisi angka.";
    }

    if (name === "NISN") {
      if (!/^\d*$/.test(value)) {
        error = "NISN harus berupa angka.";
      } else if (value.length !== 10) {
        error = "NISN harus terdiri dari tepat 10 digit.";
      }
    }

    setFieldErrors((prev) => ({ ...prev, [name]: error }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate() || Object.values(fieldErrors).some((err) => err)) {
      setMessage("Periksa kembali data yang diisi!");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/pendaftar/edit/${id}`,
        formData
      );

      if (res.data?.status === 200) {
        alert("Data berhasil diperbarui");
        navigate("/data_pendaftar");
      } else {
        setMessage("Gagal memperbarui data.");
      }
    } catch (err) {
      console.error("Gagal update data:", err);
      setMessage("Terjadi kesalahan saat update data.");
    }
  };

  return (
    <Layout>
      <div className="edit-container mt-5">
        <h2>Edit Data Pendaftar</h2>
        {message && <p className="error-msg">{message}</p>}
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="left-column">
            <label>Nama:</label>
            <input
              type="text"
              name="nama_pendaftar"
              value={formData.nama_pendaftar}
              onChange={handleChange}
            />
            {(errors.nama_pendaftar || fieldErrors.nama_pendaftar) && (
              <p className="error-text">
                {errors.nama_pendaftar || fieldErrors.nama_pendaftar}
              </p>
            )}

            <label>Jenis Kelamin:</label>
            <select
              name="jenis_kelamin"
              value={formData.jenis_kelamin}
              onChange={handleChange}
            >
              <option value="">-- Pilih --</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
            {errors.jenis_kelamin && (
              <p className="error-text">{errors.jenis_kelamin}</p>
            )}

            <label>Asal Sekolah:</label>
            <input
              type="text"
              name="asal_sekolah"
              value={formData.asal_sekolah}
              onChange={handleChange}
            />
            {errors.asal_sekolah && (
              <p className="error-text">{errors.asal_sekolah}</p>
            )}

            <label>Tanggal Lahir:</label>
            <input
              type="date"
              name="tgl_lahir"
              value={formData.tgl_lahir?.slice(0, 10)}
              onChange={handleChange}
            />
            {errors.tgl_lahir && (
              <p className="error-text">{errors.tgl_lahir}</p>
            )}
          </div>

          <div className="right-column">
            <label>Alamat:</label>
            <input
              type="text"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
            />
            {errors.alamat && <p className="error-text">{errors.alamat}</p>}

            <label>No HP:</label>
            <input
              type="text"
              name="no_hp"
              value={formData.no_hp}
              onChange={handleChange}
            />
            {(errors.no_hp || fieldErrors.no_hp) && (
              <p className="error-text">{errors.no_hp || fieldErrors.no_hp}</p>
            )}

            <label>Jurusan:</label>
            <select
              name="jurusan"
              value={formData.jurusan}
              onChange={handleChange}
            >
              <option value="">-- Pilih --</option>
              <option value="PPW">PPW</option>
              <option value="PPM">PPM</option>
              <option value="PSJ">PSJ</option>
            </select>
            {errors.jurusan && <p className="error-text">{errors.jurusan}</p>}

            <label>NISN:</label>
            <input
              type="text"
              name="NISN"
              value={formData.NISN}
              onChange={handleChange}
            />
            {(errors.NISN || fieldErrors.NISN) && (
              <p className="error-text">{errors.NISN || fieldErrors.NISN}</p>
            )}
          </div>

          <button type="submit" className="btn-update">
            Update
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditPendaftar;
