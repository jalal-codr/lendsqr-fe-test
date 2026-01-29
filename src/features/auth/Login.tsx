import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/_login.module.scss";
import logo from "../../assets/images/group.svg";
import illustration from "../../assets/images/pablo-sign-in.svg";

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      navigate("/users");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* LEFT */}
      <div className={styles.left}>
        <img src={logo} alt="Lendsqr" className={styles.logo} />
        <img
          src={illustration}
          alt="Login illustration"
          className={styles.illustration}
        />
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        <div className={styles.formWrapper}>
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>

          <form onSubmit={handleSubmit} aria-label="login-form">
            <input
              type="email"
              required
              placeholder="Email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>

            <a href="#" className={styles.forgot}>
              FORGOT PASSWORD?
            </a>

            <button type="submit" className={styles.loginBtn}>
              {loading ? "LOADING..." : "LOG IN"}
            </button>
          </form>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;