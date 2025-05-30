import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FormRegristrasi.css";

const FormRegristrasiUser = () => {
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

  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    nama_pendaftar: "",
    no_hp: "",
    NISN: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "nama_pendaftar" && !/^[A-Za-z\s]*$/.test(value)) {
      error = "Nama hanya boleh huruf dan spasi.";
    }

    if (name === "no_hp" && !/^[0-9]*$/.test(value)) {
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
    setErrorMessage("");

    if (fieldErrors.nama_pendaftar || fieldErrors.no_hp || fieldErrors.NISN) {
      setErrorMessage("Periksa kembali data yang diisi!");
      return;
    }

    try {
      const response = await axios.post(
        "https://prayata.rikpetik.site/api/v1/pendaftar/add",
        formData
      );

      if (response.status === 201) {
        alert("Registrasi berhasil!");
        navigate("/data_pendaftar");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Terjadi kesalahan saat mengirim data.";
      setErrorMessage(msg);
    }
  };

  return (
    <div className="form-container m-auto mt-5">
      {errorMessage && <p className="error">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="form-box">
        <h2 className="fw-bold m-auto text-center pb-3">
          Formulir Pendaftaran
        </h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Nama:</label>
            <input
              type="text"
              name="nama_pendaftar"
              value={formData.nama_pendaftar}
              onChange={handleChange}
              required
            />
            {fieldErrors.nama_pendaftar && (
              <p className="error">{fieldErrors.nama_pendaftar}</p>
            )}
          </div>

          <div className="form-group">
            <label>Alamat:</label>
            <input
              type="text"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Jenis Kelamin:</label>
            <select
              name="jenis_kelamin"
              value={formData.jenis_kelamin}
              onChange={handleChange}
              required
            >
              <option value="">-- Pilih --</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div className="form-group">
            <label>No HP:</label>
            <input
              type="text"
              name="no_hp"
              value={formData.no_hp}
              onChange={handleChange}
              required
            />
            {fieldErrors.no_hp && <p className="error">{fieldErrors.no_hp}</p>}
          </div>

          <div className="form-group">
            <label>Asal Sekolah:</label>
            <input
              type="text"
              name="asal_sekolah"
              value={formData.asal_sekolah}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Jurusan:</label>
            <select
              name="jurusan"
              value={formData.jurusan}
              onChange={handleChange}
              required
            >
              <option value="">-- Pilih --</option>
              <option value="PPW">PPW</option>
              <option value="PPM">PPM</option>
              <option value="PSJ">PSJ</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tanggal Lahir:</label>
            <input
              type="date"
              name="tgl_lahir"
              value={formData.tgl_lahir}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>NISN:</label>
            <input
              type="text"
              name="NISN"
              value={formData.NISN}
              onChange={handleChange}
              maxLength="10"
              required
            />
            {fieldErrors.NISN && <p className="error">{fieldErrors.NISN}</p>}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Kirim
        </button>
      </form>
    </div>
  );
};

export default FormRegristrasiUser;
