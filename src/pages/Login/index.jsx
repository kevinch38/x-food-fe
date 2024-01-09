import * as Yup from "yup";
import LogoLogin from "../../assets/images/logo-login.png";
import InnerShape from "../../assets/images/shape.png";
import ShapeCircle from "../../assets/images/shape-circle.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { ServiceContext } from "../../context/ServiceContext";
import { authAction } from "../../slices/authSlice";
import { useFormik } from "formik";
import { jwtDecode } from "jwt-decode";

function Login() {
  const schema = Yup.object({
    adminEmail: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authService } = useContext(ServiceContext);

  const {
    values: { adminEmail, password },
    errors,
    dirty,
    isValid,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      adminEmail: "",
      password: "",
    },
    onSubmit: async (values) => {
      dispatch(
        authAction(async () => {
          const result = await authService.login(values);
          if (result.statusCode === 200) {
            localStorage.setItem("token", result.data.token);
            const token = authService.getTokenFromStorage();
            if (token) {
              const decodedToken = jwtDecode(token);
              var adminRole = decodedToken.role;
            }
            if (adminRole === "ROLE_PARTNERSHIP_HEAD") {
              navigate("/backoffice/merchants");
            } else if (adminRole === "ROLE_MARKETING_HEAD")
              navigate("/backoffice/promotions");
            else navigate("/backoffice/accounts");
          }
          return result;
        })
      );
    },
    validationSchema: schema,
  });

  useEffect(() => {
    const onGetUserInfo = async () => {
      try {
        dispatch(
          authAction(async () => {
            try {
              const token = await authService.getTokenFromStorage();
              const check = await authService.verifyToken({
                token,
              });
              if (!check.data) {
                authService.removeTokenFromStorage();
                navigate("/login");
              } else {
                navigate("/backoffice");
              }
              return check;
            } catch (error) {
              authService.removeTokenFromStorage();
              navigate("/login");
            }
          })
        );
      } catch (error) {
        authService.removeTokenFromStorage();
        navigate("/login");
      }
    };
    onGetUserInfo();
  }, [authService, dispatch, navigate]);

  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-8">
              <div className="card" style={{ borderRadius: 24 }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src={InnerShape}
                      alt={"InnerShape"}
                      className="img-fluid position-absolute"
                      style={{ left: 174, width: "40%" }}
                    />
                    <img
                      src={ShapeCircle}
                      alt={"ShapeCircle"}
                      className="img-fluid position-absolute"
                      style={{
                        width: "20%",
                        bottom: -60,
                        left: -60,
                      }}
                    />
                    <img
                      src={LogoLogin}
                      alt={"Logo"}
                      className="img-fluid"
                      style={{
                        borderTopLeftRadius: 24,
                        borderBottomLeftRadius: 24,
                      }}
                    />
                  </div>

                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black text-center">
                      <div
                        className="container"
                        style={{
                          paddingTop: 30,
                          paddingBottom: 30,
                        }}
                      >
                        <form onSubmit={handleSubmit}>
                          <div className="d-flex align-items-center mb-3 pb-1 justify-content-center">
                            <span
                              className="h1 fw-semibold"
                              style={{
                                fontSize: 26,
                                color: "#F08D18",
                              }}
                            >
                              Sign In to X-FOOD
                            </span>
                          </div>

                          <div className="input-group input-group-lg flex-nowrap mb-3">
                            <span className="input-group-text">
                              <i className="bi bi-envelope"></i>
                            </span>
                            <input
                              type="email"
                              name="adminEmail"
                              className={`form-control text-normal border-0 border-bottom rounded-0 outline-none ${
                                touched.adminEmail &&
                                errors.adminEmail &&
                                "is-invalid"
                              }`}
                              id="adminEmail"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={adminEmail}
                              style={{
                                height: 40,
                              }}
                              placeholder="Email"
                            />
                            <div className="invalid-feedback">
                              {touched.adminEmail && errors.adminEmail}
                            </div>
                          </div>

                          <div className="input-group input-group-lg flex-nowrap mb-5">
                            <span className="input-group-text bg-white">
                              <i className="bi bi-lock"></i>
                            </span>
                            <input
                              type="password"
                              name="password"
                              className={`form-control text-normal border-0 border-bottom rounded-0 outline-none ${
                                touched.password &&
                                errors.password &&
                                "is-invalid"
                              }`}
                              id="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={password}
                              style={{
                                height: 40,
                              }}
                              placeholder="Password"
                            />
                            <div className="invalid-feedback">
                              {touched.password && errors.password}
                            </div>
                          </div>

                          <div className="pt-1 mb-4">
                            <button
                              className="btn btn-primary btn-lg btn-block text-uppercase border-0 py-3"
                              style={{
                                backgroundColor: "#F08D18",
                                borderRadius: 24,
                                paddingLeft: 59,
                                paddingRight: 59,
                              }}
                              disabled={!isValid || !dirty}
                              type="submit"
                            >
                              Sign In
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
