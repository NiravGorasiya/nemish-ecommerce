import Layout from "../components/layout/Layout";
import { useState } from "react";
import { useLoginUserMutation } from "../redux/reducer/authSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";

function Login() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(userData).unwrap();
      localStorage.setItem("token", response?.token);
      toast.success("Login successful!");
      router.push("/");
    } catch (err) {
      const errorMessage =
        err?.data?.message || "Login failed! Please check your credentials.";
      toast.error(errorMessage);
      console.error("Login error:", err);
    }
  };

  return (
    <Layout parent="Home" sub="Pages" subChild="Login & Register">
      <section className="pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 m-auto">
              <div className="row justify-content-center align-items-center">
                <div className="col-lg-5">
                  <div className="login_wrap widget-taber-content p-30 background-white border-radius-10 mb-md-5 mb-lg-0 mb-sm-5">
                    <div className="padding_eight_all bg-white">
                      <div className="heading_s1">
                        <h3 className="mb-30">Login</h3>
                      </div>
                      <form method="post" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            required
                            name="email"
                            onChange={handleInputChange}
                            placeholder="Your Email"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            required
                            name="password"
                            onChange={handleInputChange}
                            placeholder="Password"
                          />
                        </div>
                        <div className="login_footer form-group">
                          <div className="chek-form">
                            <div className="custome-checkbox">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="rememberMe"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="rememberMe"
                              >
                                <span>Remember me</span>
                              </label>
                            </div>
                          </div>
                          <a className="text-muted" href="#">
                            Forgot password?
                          </a>
                        </div>

                        <div className="form-group">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-fill-out btn-block hover-up"
                          >
                            {isLoading ? "Logging in..." : "Log in"}
                          </button>
                        </div>

                        <p className="text-center mt-3">
                          Don’t have an account?{" "}
                          <Link href="/register" className="text-brand">
                            Register now
                          </Link>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Login;
