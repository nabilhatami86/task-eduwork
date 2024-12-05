import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CloseButton, Toast, ToastContainer } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setError("Email & Password harus di isi");
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      return setError("Email tidak valid");
    }

    axios
      .post("http://localhost:5000/auth/login", { email, password })
      .then((result) => {
        console.log(result.data); // Periksa hasil response
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("role", result.data.user.role);
        localStorage.setItem("name", result.data.user.full_name);
        localStorage.setItem("userId", result.data.user._id);
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/product");
        }, 2000);
      })
      .catch((err) => setError(err.response?.data?.message || "Login failed"));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#008000", height: "100vh" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h1 className="text-center mb-4">LOGIN</h1>
        {error && (
          <div className="alert alert-danger d-flex justify-content-between">
            <p className="mb-0">{error}</p>
            <CloseButton onClick={() => setError("")} />
          </div>
        )}
        <label className="form-label">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control mb-3"
            placeholder="email@gmail.com"
          />
        </label>
        <label className="form-label">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control mb-3"
            placeholder="******"
          />
        </label>
        <button onClick={login} className="btn btn-success w-100 btn-lg mb-3">
          LOGIN
        </button>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-success">
            Register
          </Link>
        </p>
      </div>

      <ToastContainer position="center-center" className="p-3">
        <Toast
          onClose={() => setShowSuccess(false)}
          show={showSuccess}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Login berhasil</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Login;
