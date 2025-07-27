import React, { useContext, useState } from "react";
import "../../CSS/Admin/ChangePenaltyAmount.css";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LMSContext from "../../Context/LMSContext.jsx";
const ChangePenaltyAmount = () => {
  const [penaltyAmount, setPenaltyAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { apiUrl } = useContext(LMSContext);

  const handleSubmit = async () => {
   

    setIsLoading(true);
 

    try {
      const response = await axios.post(
        `${apiUrl}/api/allottedBooks/penaltyPerDay`,
        {
          penalty: penaltyAmount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // console.log(response.data.message);

      if (response.data.success) {
       
         toast.success(response.data.message, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
      } else {
        throw new Error("Failed to update penalty amount");
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
      setPenaltyAmount('')
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(value) && parseFloat(value) >= 0)) {
      setPenaltyAmount(value);
    }
  };

  return (
    <>
     <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />

     
      <div className="main">
        <div className="form-container">
          <h2 className="form-title">Update per day Penalty amount</h2>

          <div className="form">
            <div className="input-group">
              <label className="label">Penalty Per Day (₹)</label>
              <input
                type="number"
                value={penaltyAmount}
                onChange={handleInputChange}
                placeholder="Enter penalty amount per day"
                step="1"
                min="0"
                className="input"
                disabled={isLoading}
                required
              />
            </div>



            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? "Updating..." : "Update Penalty Amount"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePenaltyAmount;
