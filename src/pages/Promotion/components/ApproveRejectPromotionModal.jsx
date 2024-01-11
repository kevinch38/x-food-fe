import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { ServiceContext } from "../../../context/ServiceContext";
import { useContext, useEffect, useState } from "react";
import { promotionAction } from "../../../slices/promotionSlice";
import { useFormik } from "formik";

ApproveRejectPromotionModal.propTypes = {
  promotionID: PropTypes.string,
  idx: PropTypes.any,
  onGetPromotions: PropTypes.func,
  action: PropTypes.any,
};

export default function ApproveRejectPromotionModal({ promotionID, action }) {
  const dispatch = useDispatch();
  const [promotion, setPromotion] = useState();
  const { promotionService } = useContext(ServiceContext);
  const { promotions } = useSelector((state) => state.promotion);

  console.log(promotionID);

  const {
    values: { notes },
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: {
      notes: "",
    },
  });

  useEffect(() => {
    if (promotionID) {
      const fetchPromotionDetails = async () => {
        try {
          const result = await promotionService.fetchPromotionById(promotionID);
          setPromotion(result.data);
        } catch (error) {
          console.error("Error fetching promotion details:", error);
        }
      };
      fetchPromotionDetails();
    }
  }, [promotionID, promotionService]);

  const handleApprove = () => {
    dispatch(
      promotionAction(async () => {
        const request = { promotionID: promotionID, notes: notes };
        await promotionService.approvePromotion(request);

        const data = promotions.filter(
          (promotion) => promotion.branchID !== promotionID
        );
        return data;
      })
    );
  };

  const handleApproveInactive = () => {
    dispatch(
      promotionAction(async () => {
        const request = { promotionID: promotionID, notes: notes };
        await promotionService.approveInactivePromotion(request);

        const data = promotions.filter(
          (promotion) => promotion.branchID !== promotionID
        );
        return data;
      })
    );
  };

  return (
    <div
      className="modal fade"
      id={`approveRejectPromotionModal${promotionID}`}
      tabIndex="-1"
      aria-labelledby={`approveRejectPromotionModal${promotionID}`}
      aria-hidden="true"
      style={{
        borderRadius: "50px",
        marginTop: "50px",
      }}
    >
      <div
        className="modal-dialog rounded-5"
        style={{
          maxWidth: "80vw",
        }}
      >
        <div className="p-4 modal-content border-0">
          <div className="row">
            <div className="d-flex justify-content-center row">
              <span
                id="boot-icon"
                className="bi bi-exclamation-circle text-center"
                style={{
                  fontSize: "4rem",
                }}
              ></span>
              {action === "Reject" ? (
                <>
                  <h1 className="modal-title fw-bold text-center mt-2">
                    Are You Sure You Want To Decline?
                  </h1>
                  <p
                    className="modal-title text-center mt-3"
                    style={{ color: "grey" }}
                  >
                    Do you really want to decline this request? This process
                    cannot be undone
                  </p>
                </>
              ) : (
                <>
                  <h1 className="modal-title fw-bold text-center mt-2">
                    Are You Sure You Want To Approve?
                  </h1>
                  <p
                    className="modal-title text-center mt-3"
                    style={{ color: "grey" }}
                  >
                    Do you really want to approve this request? This process
                    cannot be undone
                  </p>
                </>
              )}

              <div className="justify-content-start text-start d-flex mt-5">
                <div style={{ width: "200px" }}>
                  <p>ID:</p>
                  <p>Promotion Name:</p>
                  <p>PIC:</p>
                  <p>Request Type:</p>
                </div>
                <div  style={{ width: "400px" }}>
                  <p>| {promotionID}</p>
                  <p>| {promotion?.promotionName}</p>
                  <p>
                    | {promotion?.picName} - {promotion?.picNumber} (
                    {promotion?.picEmail})
                  </p>
                  <p>
                    {promotion?.status.match(/WAITING_FOR_(\w+)_APPROVAL/)
                      ? promotion?.status.match(/WAITING_FOR_(\w+)_APPROVAL/)[1]
                      : null}
                  </p>
                </div>
                {action === "Reject" && (
                  <div className="flex-grow-1">
                    <div className="form-floating">
                      <textarea
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                        placeholder="Leave a comment here"
                        value={notes}
                        id="notes"
                        style={{ maxHeight: "100px" }}
                      ></textarea>
                      <label htmlFor="floatingTextarea">Notes</label>
                    </div>
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-around mt-5 w-75 ">
                <button
                  className="btn btn-primary w-25 rounded-pill"
                  style={{
                    color: "white",
                    borderColor: "rgb(217,217,217)",
                    backgroundColor: "rgb(217,217,217)",
                  }}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Cancel
                </button>
                {action === "Reject" ? (
                  <button
                    className="btn btn-danger w-25 rounded-pill"
                    style={{
                      color: "white",
                      borderColor: "rgb(245,5,5)",
                      backgroundColor: "rgb(245,5,5)",
                    }}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      if (
                        promotion?.status === "WAITING_FOR_DELETION_APPROVAL"
                      ) {
                        handleApprove(promotion?.branchID);
                      } else if (
                        promotion?.status === "WAITING_FOR_CREATION_APPROVAL"
                      ) {
                        handleApproveInactive(promotion?.branchID);
                      }
                    }}
                  >
                    Decline
                  </button>
                ) : (
                  <button
                    className="btn btn-danger w-25 rounded-pill"
                    style={{
                      color: "white",
                      borderColor: "#2BB51F",
                      backgroundColor: "#2BB51F",
                    }}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      if (
                        promotion?.status === "WAITING_FOR_DELETION_APPROVAL"
                      ) {
                        handleApproveInactive(promotion?.branchID);
                      } else if (
                        promotion?.status === "WAITING_FOR_CREATION_APPROVAL" ||
                        promotion?.status === "WAITING_FOR_UPDATE_APPROVAL"
                      ) {
                        handleApprove(promotion?.branchID);
                      }
                    }}
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
