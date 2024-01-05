import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { ServiceContext } from "../../../context/ServiceContext";
import { useContext } from "react";
import {
  merchantAction,
  selectMerchantAction,
} from "../../../slices/merchantSlice";
import { useEffect } from "react";
import validationSchema from "./validationSchema";
import { useFormik } from "formik";
import { useState } from "react";

CreateMerchantModal.propTypes = {
  merchantID: PropTypes.any,
  setMerchantID: PropTypes.func,
};

export default function CreateMerchantModal({ setMerchantID, merchantID }) {
  const dispatch = useDispatch();
  const { merchantService } = useContext(ServiceContext);
  const { merchants } = useSelector((state) => state.merchant);
  const [key, setKey] = useState();

  const {
    values: { merchantName, picName, merchantDescription, picNumber, picEmail },
    errors,
    dirty,
    isValid,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: {
      merchantID: null,
      merchantName: "",
      picName: "",
      merchantDescription: "",
      picNumber: "",
      picEmail: "",
      logoImage: null,
      image: null,
    },
    onSubmit: async (values) => {
      if (!isValid) return;

      if (!merchantID) {
        const data = {
          ...values,
        };
        delete data.merchantID;
        dispatch(
          merchantAction(async () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, "0");
            const day = now.getDate().toString().padStart(2, "0");
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            const seconds = now.getSeconds().toString().padStart(2, "0");
            const joinDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

            const result = await merchantService.saveMerchant({
              ...data,
              joinDate: joinDate,
            });
            const a = [...merchants, result.data];
            return {
              messageBox: "Merchant Data Successfully Inserted",
              data: a,
            };
          })
        );
        setMerchantID(null);
        handleReset();
        clearImage();
        return;
      }
      dispatch(
        merchantAction(async () => {
          const result = await merchantService.updateMerchant({
            ...values,
          });
          const a = [...merchants, result.data];
          return { messageBox: "Merchant Data Successfully Updated", data: a };
        })
      );
      setMerchantID(null);
      handleReset();
      clearImage();
      return;
    },
    validationSchema: validationSchema(),
  });

  useEffect(() => {
    if (merchantID) {
      const onGetMerchantById = async () => {
        const result = await dispatch(
          selectMerchantAction(() =>
            merchantService.fetchMerchantById(merchantID)
          )
        );

        if (result.payload) {
          const {
            merchantID,
            merchantName,
            picName,
            merchantDescription,
            picNumber,
            picEmail,
          } = result.payload.data;
          setValues({
            merchantID: merchantID,
            merchantName: merchantName,
            picName: picName,
            merchantDescription: merchantDescription,
            picNumber: picNumber,
            picEmail: picEmail,
          });
        }
      };
      onGetMerchantById();
    } else {
      setValues({
        merchantID: null,
        merchantName: "",
        picName: "",
        merchantDescription: "",
        picNumber: "",
        picEmail: "",
        logoImage: null,
        image: null,
      });
    }
  }, [dispatch, setValues, merchantID, merchantService]);

  const handleChangeFile = (e) => {
    setFieldValue(e.currentTarget.name, e.currentTarget.files[0]);
  };
  const clearImage = () => {
    let randomString = Math.random().toString(36);
    setKey(randomString);
  };

  return (
    <div
      className="modal fade"
      id={`createMerchantModal`}
      tabIndex="-1"
      aria-labelledby={`createMerchantModal`}
      aria-hidden="true"
      style={{
        borderRadius: "50px",
        marginTop: "5%",
      }}
    >
      <div
        className="modal-dialog rounded-5"
        style={{
          maxWidth: "90vw",
        }}
      >
        <div className="p-5 modal-content border-0">
          <div className="row">
            <div className="d-flex justify-content-between">
              <h1 className="modal-title fw-bold">Merchant</h1>
              <button
                onClick={() => {
                  setMerchantID(null);
                  handleReset();
                  clearImage();
                }}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          </div>
          <div
            className="modal-body h-auto p-0 mt-4"
            style={{
              textAlign: "left",
            }}
          >
            <div className="alert alert-dark fw-bold" role="alert">
              <i
                id="boot-icon"
                className="bi bi-exclamation-circle-fill me-2"
                style={{
                  color: "rgb(84, 84, 84)",
                }}
              ></i>
              {`${merchantID ? "Update" : "Create New"}`} Merchant
            </div>
            <h3 className="fw-bold mt-5 position-relative mb-0">
              Personal Information
              <span className="position-absolute">
                <i
                  className="bi bi-asterisk"
                  style={{ color: "red", width: "1px" }}
                ></i>
              </span>
            </h3>
            <div
              style={{
                marginLeft: "-20px",
                marginRight: "-20px",
              }}
            >
              <form onSubmit={handleSubmit}>
                <table
                  className="table"
                  style={{
                    borderSpacing: "20px",
                    borderCollapse: "separate",
                  }}
                >
                  <tbody>
                    <tr key={merchantID}>
                      <td>
                        <input
                          className={`form-control`}
                          type="text"
                          placeholder="ID (Generated)"
                          name="merchantID"
                          value={`${merchantID ? merchantID : ""}`}
                          disabled
                        />
                      </td>
                      <td>
                        <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={picName}
                          id="picName"
                          className={`form-control  ${
                            touched.picName && errors.picName && "is-invalid"
                          }`}
                          type="text"
                          placeholder="PIC Name:"
                          name="picName"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={merchantName}
                          id="merchantName"
                          className={`form-control  ${
                            touched.merchantName &&
                            errors.merchantName &&
                            "is-invalid"
                          }`}
                          type="text"
                          placeholder="Name:"
                          name="merchantName"
                        />
                      </td>
                      <td>
                        <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={picNumber}
                          id="picNumber"
                          className={`form-control  ${
                            touched.picNumber &&
                            errors.picNumber &&
                            "is-invalid"
                          }`}
                          type="text"
                          placeholder="PIC Number:"
                          name="picNumber"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={merchantDescription}
                          id="merchantDescription"
                          className={`form-control  ${
                            touched.merchantDescription &&
                            errors.merchantDescription &&
                            "is-invalid"
                          }`}
                          type="text"
                          placeholder="Description:"
                          name="merchantDescription"
                        />
                      </td>
                      <td>
                        <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={picEmail}
                          id="picEmail"
                          className={`form-control  ${
                            touched.picEmail && errors.picEmail && "is-invalid"
                          }`}
                          type="text"
                          placeholder="PIC Email:"
                          name="picEmail"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="w-50">
                        <div className="d-flex justify-content-between">
                          <label htmlFor="logoImage" className="h-auto ps-0">
                            Merchant Logo:
                          </label>
                          <input
                            className={`form-control text-normal w-50 ${
                              touched.logoImage &&
                              errors.logoImage &&
                              "is-invalid"
                            }`}
                            key={key}
                            type="file"
                            accept=".png,.jpeg,.jpg"
                            name="logoImage"
                            id="logoImage"
                            onChange={handleChangeFile}
                            onBlur={handleBlur}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="w-50">
                        <div className="d-flex justify-content-between ps-0 pe-0">
                          <label htmlFor="image" className="h-auto">
                            Merchant Image:
                          </label>

                          <input
                            className={`form-control text-normal w-50 ${
                              touched.image && errors.image && "is-invalid"
                            }`}
                            key={key}
                            type="file"
                            accept=".png,.jpeg,.jpg"
                            name="image"
                            id="image"
                            onChange={handleChangeFile}
                            onBlur={handleBlur}
                          />
                        </div>
                      </td>
                      <td>
                        <button
                          disabled={!isValid || !dirty}
                          className="btn bg-dark text-white"
                          type="submit"
                          data-bs-dismiss="modal"
                        >
                          Submit
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
