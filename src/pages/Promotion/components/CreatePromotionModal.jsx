import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { ServiceContext } from "../../../context/ServiceContext";
import { useContext } from "react";
import {
  promotionAction,
  selectPromotionAction,
} from "../../../slices/promotionSlice";
import { useEffect } from "react";
import validationSchema from "./validationSchema";
import { useFormik } from "formik";

CreatePromotionModal.propTypes = {
  promotionID: PropTypes.any,
  setPromotionID: PropTypes.func,
};

export default function CreatePromotionModal({ setPromotionID, promotionID }) {
  const dispatch = useDispatch();
  const { promotionService } = useContext(ServiceContext);
  const { promotions } = useSelector((state) => state.promotion);

  const {
    values: {
      merchantID,
      promotionName,
      promotionDescription,
      maxRedeem,
      promotionValue,
      cost,
      quantity,
      expiredDate,
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
  } = useFormik({
    initialValues: {
      promotionID: null,
      merchantID: "",
      promotionName: "",
      promotionDescription: "",
      maxRedeem: "",
      promotionValue: "",
      cost: "",
      quantity: "",
      expiredDate: "",
    },
    onSubmit: async (values) => {
      if (!isValid) return;

      if (!promotionID) {
        const data = {
          ...values,
        };
        delete data.promotionID;
        dispatch(
          promotionAction(async () => {
            const result = await promotionService.savePromotion({
              ...data,
            });
            const a = [...promotions, result.data];
            return { data: a };
          })
        );
        setPromotionID(null);
        handleReset();
        return;
      }

      dispatch(
        promotionAction(async () => {
          const result = await promotionService.updatePromotion({
            ...values,
          });
          const a = [...promotions, result.data];
          return { data: a };
        })
      );
      setPromotionID(null);
      handleReset();
      return;
    },
    validationSchema: validationSchema(),
  });

  useEffect(() => {
    if (promotionID) {
      const onGetPromotionById = async () => {
        const result = await dispatch(
          selectPromotionAction(() =>
            promotionService.fetchPromotionById(promotionID)
          )
        );

        if (result.payload) {
          const {
            promotionID,
            merchantID,
            promotionName,
            promotionDescription,
            maxRedeem,
            promotionValue,
            cost,
            quantity,
            expiredDate,
          } = result.payload.data;
          setValues({
            promotionID: promotionID,
            merchantID: merchantID,
            promotionName: promotionName,
            promotionDescription: promotionDescription,
            maxRedeem: maxRedeem,
            promotionValue: promotionValue,
            cost: cost,
            quantity: quantity,
            expiredDate: expiredDate,
          });
        }
      };
      onGetPromotionById();
    } else {
      setValues({
        promotionID: null,
        merchantID: "",
        promotionName: "",
        promotionDescription: "",
        maxRedeem: "",
        promotionValue: "",
        cost: "",
        quantity: "",
        expiredDate: "",
      });
    }
  }, [dispatch, setValues, promotionID, promotionService]);

  return (
    <div
      className="modal fade"
      id={`createPromotionModal`}
      tabIndex="-1"
      aria-labelledby={`createPromotionModal`}
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
              <h1 className="modal-title fw-bold">Promotion</h1>
              <button
                onClick={() => {
                  setPromotionID(null);
                  handleReset();
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
              {`${promotionID ? "Update" : "Create New"}`} Promotion
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
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={merchantID}
                          id="merchantID"
                          className={`form-control  ${
                            touched.merchantID &&
                            errors.merchantID &&
                            "is-invalid"
                          }`}
                          type="text"
                          placeholder="Promo ID (Generated): | Merchant ID: "
                          name="merchantID"
                        />
                      </td>
                      <td>
                        <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={promotionValue}
                          id="promotionValue"
                          className={`form-control  ${
                            touched.promotionValue &&
                            errors.promotionValue &&
                            "is-invalid"
                          }`}
                          type="number"
                          placeholder="Value"
                          name="promotionValue"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={promotionName}
                          id="promotionName"
                          className={`form-control  ${
                            touched.promotionName &&
                            errors.promotionName &&
                            "is-invalid"
                          }`}
                          type="text"
                          placeholder="Name"
                          name="promotionName"
                        />
                      </td>
                      <td>
                        <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={cost}
                          id="cost"
                          className={`form-control  ${
                            touched.cost && errors.cost && "is-invalid"
                          }`}
                          type="number"
                          placeholder="Cost"
                          name="cost"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={maxRedeem}
                          id="maxRedeem"
                          className={`form-control  ${
                            touched.maxRedeem &&
                            errors.maxRedeem &&
                            "is-invalid"
                          }`}
                          type="number"
                          placeholder="Max Redeem"
                          name="maxRedeem"
                        />
                      </td>
                      <td>
                        <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={quantity}
                          id="quantity"
                          className={`form-control  ${
                            touched.quantity && errors.quantity && "is-invalid"
                          }`}
                          type="number"
                          placeholder="Quantity"
                          name="quantity"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={promotionDescription}
                          id="promotionDescription"
                          className={`form-control  ${
                            touched.promotionDescription &&
                            errors.promotionDescription &&
                            "is-invalid"
                          }`}
                          type="text"
                          placeholder="Description"
                          name="promotionDescription"
                        />
                      </td>
                      <td>
                        <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={expiredDate}
                          id="expiredDate"
                          className={`form-control  ${
                            touched.expiredDate &&
                            errors.expiredDate &&
                            "is-invalid"
                          }`}
                          type="text"
                          placeholder="Expired Date"
                          name="expiredDate"
                        />
                      </td>
                    </tr>
                    <tr>
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
