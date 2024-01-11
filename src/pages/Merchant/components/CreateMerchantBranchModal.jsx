import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { ServiceContext } from "../../../context/ServiceContext";
import { useContext } from "react";
import {
  merchantBranchAction,
  selectMerchantBranchAction,
} from "../../../slices/merchantBranchSlice";
import { useEffect } from "react";
import validationSchemaBranch from "./validationSchemaBranch";
import { useFormik } from "formik";
import { useState } from "react";

CreateMerchantBranchModal.propTypes = {
  cities: PropTypes.any,
  merchantID: PropTypes.any,
  merchantBranchID: PropTypes.any,
  idx: PropTypes.any,
  onGetMerchantBranches: PropTypes.func,
  setMerchantBranchID: PropTypes.func,
};

export default function CreateMerchantBranchModal({
  merchantID,
  merchantBranchID,
  idx,
  onGetMerchantBranches,
  setMerchantBranchID,
  cities,
}) {
  const dispatch = useDispatch();
  const { merchantBranchService } = useContext(ServiceContext);
  const [key, setKey] = useState();

  const gmt = [
    "GMT-11",
    "GMT-10",
    "GMT-9",
    "GMT-8",
    "GMT-7",
    "GMT-6",
    "GMT-5",
    "GMT-4",
    "GMT-3",
    "GMT-2",
    "GMT-1",
    "GMT+0",
    "GMT+1",
    "GMT+2",
    "GMT+3",
    "GMT+4",
    "GMT+5",
    "GMT+6",
    "GMT+7",
    "GMT+8",
    "GMT+9",
    "GMT+10",
    "GMT+11",
    "GMT+12",
    "GMT+13",
    "GMT+14",
  ];

  const {
    values: {
      branchName,
      cityID,
      address,
      timezone,
      picName,
      picNumber,
      picEmail,
    },
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
      branchID: null,
      merchantID: merchantID,
      branchName: "",
      cityID: "",
      address: "",
      timezone: "",
      picName: "",
      picNumber: "",
      picEmail: "",
      image: null,
      branchWorkingHours: [{ openHour: "", closeHour: "", days: "" }],
    },
    onSubmit: async (values) => {
      if (!isValid) return;

      if (!merchantBranchID) {
        const data = {
          ...values,
        };
        delete data.branchID;
        dispatch(
          merchantBranchAction(async () => {
            const result = await merchantBranchService.saveMerchantBranch({
              ...data,
            });
            await merchantBranchService.saveMerchantBranchImage(
              data.image,
              result.data.branchID
            );
            await onGetMerchantBranches(
              merchantID,
              "Branch Data Successfully Inserted"
            );
          })
        );
        setMerchantBranchID(null);
        handleReset();
        clearImage();
        return;
      }

      dispatch(
        merchantBranchAction(async () => {
          const result = await merchantBranchService.updateMerchantBranch({
            ...values,
          });
          console.log(result);
          await onGetMerchantBranches(
            merchantID,
            "Branch Data Successfully Updated"
          );
        })
      );
      setMerchantBranchID(null);
      handleReset();
      clearImage();
      return;
    },
    validationSchema: validationSchemaBranch(),
  });
  const clearImage = () => {
    let randomString = Math.random().toString(36);
    setKey(randomString);
  };

  useEffect(() => {
    if (merchantBranchID) {
      const onGetMerchantBranchById = async () => {
        const result = await dispatch(
          selectMerchantBranchAction(() =>
            merchantBranchService.fetchMerchantBranchByBranchId(
              merchantBranchID
            )
          )
        );
        if (result.payload) {
          const {
            branchID,
            branchName,
            address,
            timezone,
            city,
            picName,
            picNumber,
            picEmail,
          } = result.payload.data;
          setValues({
            branchID: branchID,
            branchName: branchName,
            address: address,
            timezone: timezone,
            cityID: city.cityID,
            picName: picName,
            picNumber: picNumber,
            picEmail: picEmail,
          });
        }
      };
      onGetMerchantBranchById();
    } else {
      setValues({
        branchID: null,
        merchantID: merchantID,
        branchName: "",
        address: "",
        timezone: "",
        cityID: "",
        picName: "",
        picNumber: "",
        picEmail: "",
        image: null,
      });
    }
  }, [
    dispatch,
    setValues,
    merchantBranchService,
    merchantBranchID,
    merchantID,
  ]);

  const handleChangeFile = (e) => {
    setFieldValue(e.currentTarget.name, e.currentTarget.files[0]);
  };

  return (
    <div
      className="modal fade"
      id={`createMerchantBranchModal${merchantID}`}
      tabIndex="-1"
      aria-labelledby={`createMerchantBranchModal${merchantID}`}
      aria-hidden="true"
      style={{
        borderRadius: "50px",
        marginTop: "4vh",
        overflowY: "auto",
        maxHeight: "90vh",
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
              <h1 className="modal-title fw-bold">Branch</h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => {
                  clearImage();
                  setMerchantBranchID(null);
                  handleReset();
                  onGetMerchantBranches(merchantID);
                }}
                data-bs-toggle="modal"
                data-bs-target={`#exampleModal${idx}`}
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
              {`${merchantBranchID ? "Update" : "Create New"}`} Branch
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
                    <tr>
                      <td>
                        <input
                          className={`form-control`}
                          type="text"
                          placeholder=""
                          name="merchantID"
                          value={`Merchant ID: ${merchantID ? merchantID : ""}`}
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
                          value={branchName}
                          id="branchName"
                          className={`form-control  ${
                            touched.branchName &&
                            errors.branchName &&
                            "is-invalid"
                          }`}
                          type="text"
                          placeholder="Branch Name:"
                          name="branchName"
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
                        {/* <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={cityID}
                          id="cityID"
                          className={`form-control  ${
                            touched.cityID && errors.cityID && "is-invalid"
                          }`}
                          type="text"
                          placeholder="City"
                          name="cityID"
                        /> */}
                        <select
                          name="cityID"
                          id="cityID"
                          onChange={handleChange}
                          value={cityID ? cityID : `abcde`}
                          // value={'8a8ae47e8cd256be018cd2570983011a'}
                          onBlur={handleBlur}
                          className={`form-control  ${
                            touched.cityID &&
                            errors.cityID &&
                            "is-invalid p-2 w-100 border-1 border-dark-subtle rounded"
                          }`}
                        >
                          <option hidden disabled value="abcde">
                            City
                          </option>

                          {cities.map((city, index) => (
                            <option key={index} value={city.cityID}>
                              {city.cityName}
                            </option>
                          ))}
                        </select>
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
                          placeholder="PIC Email"
                          name="picEmail"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          className={`form-control ${
                            touched.address && errors.address && "is-invalid"
                          }`}
                          key={key}
                          type="text"
                          name="address"
                          id="address"
                          value={address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Address"
                        />
                      </td>
                      <td>
                        <select
                          name="timezone"
                          id="timezone"
                          onChange={handleChange}
                          value={timezone ? timezone : `abcde`}
                          onBlur={handleBlur}
                          className={`form-control  ${
                            touched.timezone &&
                            errors.timezone &&
                            "is-invalid p-2 w-100 border-1 border-dark-subtle rounded"
                          }`}
                        >
                          <option hidden disabled value="abcde">
                            Timezone
                          </option>

                          {gmt.map((gmt, index) => (
                            <option key={index} value={gmt.gmtID}>
                              {gmt}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="w-50">
                        <div className="d-flex justify-content-between ps-0 pe-0">
                          <label htmlFor="image" className="h-auto">
                            Merchant Branch Image:
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
                          className="btn bg-dark text-white pe-3 ps-3"
                          type="submit"
                          data-bs-toggle="modal"
                          data-bs-target={`#exampleModal${idx}`}
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
