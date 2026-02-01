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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    
    const form = e.currentTarget;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const passwordInput = form.elements.namedItem("password") as HTMLInputElement;

    // 1. Manual Email Regex Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email !== "" && !emailRegex.test(email)) {
      emailInput.setCustomValidity("Please enter a valid email address.");
      emailInput.reportValidity();
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      navigate("/users");
    } catch {
      passwordInput.setCustomValidity("Invalid email or password");
      passwordInput.reportValidity();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={logo} alt="Lendsqr" className={styles.logo} />
        <img src={illustration} alt="Login illustration" className={styles.illustration} />
      </div>

      <div className={styles.right}>
        <div className={styles.formWrapper}>
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>

          <form onSubmit={handleSubmit} noValidate={false}>
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className={styles.input}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                e.target.setCustomValidity("");
              }}
            />

            <div className={styles.passwordWrapper}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                className={styles.input}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  e.target.setCustomValidity("");
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>

            <a href="#" className={styles.forgot}>FORGOT PASSWORD?</a>

            <button type="submit" className={styles.loginBtn} disabled={loading}>
              {loading ? "LOADING..." : "LOG IN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;