import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { ServiceContext } from "../../../context/ServiceContext";
import { useContext, useEffect, useState } from "react";
import { merchantAction } from "../../../slices/merchantSlice";
import { useFormik } from "formik";

ApproveRejectMerchantModal.propTypes = {
  merchantID: PropTypes.any,
  idx: PropTypes.any,
  onGetMerchants: PropTypes.func,
  action: PropTypes.string,
};

export default function ApproveRejectMerchantModal({ merchantID, action }) {
  const dispatch = useDispatch();
  const [merchant, setMerchant] = useState();
  const { merchantService } = useContext(ServiceContext);
  const { merchants } = useSelector((state) => state.merchant);

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
    if (merchantID) {
      const fetchMerchantDetails = async () => {
        try {
          const result = await merchantService.fetchMerchantById(merchantID);
          setMerchant(result.data);
        } catch (error) {
          console.error("Error fetching merchant details:", error);
        }
      };
      fetchMerchantDetails();
    }
  }, [merchantID, merchantService]);

  const handleApprove = () => {
    dispatch(
      merchantAction(async () => {
		const request = {merchantID: merchantID, notes: notes}
        await merchantService.approveMerchant(request);

        const data = merchants.filter(
          (merchant) => merchant.branchID !== merchantID
        );
        let messageBox;
        // if (action == 'Reject') {
        // 	if (merchant?.status === 'WAITING_FOR_DELETION_APPROVAL') {
        // 		messageBox = 'Deletion merchant successfully rejected';
        // 	} else if (
        // 		merchant?.status === 'WAITING_FOR_CREATION_APPROVAL'
        // 	) {
        // 		messageBox = 'Creation merchant successfully rejected';
        // 	}
        // } else {
        // 	if (merchant?.status === 'WAITING_FOR_DELETION_APPROVAL') {
        // 		messageBox = 'Deletion merchant successfully approved';
        // 	} else if (
        // 		merchant?.status === 'WAITING_FOR_CREATION_APPROVAL'
        // 	) {
        // 		messageBox = 'Creation merchant successfully approved';
        // 	} else if (
        // 		merchant?.status === 'WAITING_FOR_UPDATE_APPROVAL'
        // 	) {
        // 		messageBox = 'Updates merchant successfully approved';
        // 	}
        // }
        if (merchant?.status === "WAITING_FOR_DELETION_APPROVAL") {
          messageBox = "Deletion merchant successfully rejected";
        } else if (merchant?.status === "WAITING_FOR_CREATION_APPROVAL") {
          messageBox = "Creation merchant successfully approved";
        } else if (merchant?.status === "WAITING_FOR_UPDATE_APPROVAL") {
          messageBox = "Update merchant successfully approved";
        }
        return { messageBox, data };
      })
    );
  };

  const handleApproveInactive = () => {
    console.log(notes);
    dispatch(
      merchantAction(async () => {
		const request = {merchantID: merchantID, notes: notes}
        await merchantService.approveInactiveMerchant(request);

        const data = merchants.filter(
          (merchant) => merchant.merchantID !== merchantID
        );
        let messageBox;
        // if (action == 'Reject') {
        // 	if (merchant?.status === 'WAITING_FOR_DELETION_APPROVAL') {
        // 		messageBox = 'Deletion merchant successfully rejected';
        // 	} else if (
        // 		merchant?.status === 'WAITING_FOR_CREATION_APPROVAL'
        // 	) {
        // 		messageBox = 'Creation merchant successfully rejected';
        // 	}
        // } else {
        // 	if (merchant?.status === 'WAITING_FOR_DELETION_APPROVAL') {
        // 		messageBox = 'Deletion merchant successfully approved';
        // 	} else if (
        // 		merchant?.status === 'WAITING_FOR_CREATION_APPROVAL'
        // 	) {
        // 		messageBox = 'Creation merchant successfully approved';
        // 	} else if (
        // 		merchant?.status === 'WAITING_FOR_UPDATE_APPROVAL'
        // 	) {
        // 		messageBox = 'Updates merchant successfully approved';
        // 	}
        // }

        if (merchant?.status === "WAITING_FOR_DELETION_APPROVAL") {
          messageBox = "Deletion merchant successfully approved";
        } else if (merchant?.status === "WAITING_FOR_CREATION_APPROVAL") {
          messageBox = "Creation merchant successfully rejected";
        }
        return { messageBox, data };
      })
    );
  };

  return (
    <div
      className="modal fade"
      id={`approveRejectMerchantModal${merchantID}`}
      tabIndex="-1"
      aria-labelledby={`approveRejectMerchantModal${merchantID}`}
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
                  <p>Merchant Name:</p>
                  <p>PIC:</p>
                  <p>Request Type:</p>
                </div>
                <div style={{ width: "400px" }}>
                  <p>| {merchantID}</p>
                  <p>| {merchant?.merchantName}</p>
                  <p>
                    | {merchant?.picName} - {merchant?.picNumber} (
                    {merchant?.picEmail})
                  </p>
                  <p>
                    {merchant?.status.match(/WAITING_FOR_(\w+)_APPROVAL/)
                      ? merchant?.status.match(/WAITING_FOR_(\w+)_APPROVAL/)[1]
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
                        merchant?.status === "WAITING_FOR_DELETION_APPROVAL"
                      ) {
                        handleApprove(merchant?.branchID);
                      } else if (
                        merchant?.status === "WAITING_FOR_CREATION_APPROVAL"
                      ) {
                        handleApproveInactive(merchant?.branchID);
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
                        merchant?.status === "WAITING_FOR_DELETION_APPROVAL"
                      ) {
                        handleApproveInactive(merchant?.branchID);
                      } else if (
                        merchant?.status === "WAITING_FOR_CREATION_APPROVAL" ||
                        merchant?.status === "WAITING_FOR_UPDATE_APPROVAL"
                      ) {
                        handleApprove(merchant?.branchID);
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
