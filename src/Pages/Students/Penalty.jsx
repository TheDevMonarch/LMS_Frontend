import React, { useContext, useEffect, useState } from "react";
import "../../CSS/Students/Penalty.css";

import LMSContext from "../../Context/LMSContext.jsx";
import axios from "axios";

const Penalty = () => {
  const { menubt, penaltyData, user, apiUrl } = useContext(LMSContext);
  const [totalPenalty, setTotalPenalty] = useState(0);
  const [penaltyBookIds, setPenaltyBookIds] = useState([]);

  useEffect(() => {
    if (penaltyData && penaltyData.Data) {
      const total = penaltyData.Data.reduce((acc, data) => {
        return acc + data.daysOverDue * penaltyData.penaltyperDay;
      }, 0);

      setTotalPenalty(total);
    }
  }, [penaltyData]);

  //  console.log(totalPenalty)
  // console.log(penaltyData.Data);

  useEffect(() => {
    if (penaltyData?.Data) {
      const extractedBooks = penaltyData.Data.map((data) => ({
        bookId: data.bookId,
        title: data.bookData.title,
        DaysOverDue: data.daysOverDue,
      }));
      setPenaltyBookIds(extractedBooks);
    }
  }, [penaltyData]);

  // console.log(penaltyBookIds)
  // console.log(user.URN)

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post(
        `${apiUrl}/api/payment/checkout`,
        {
          amount: totalPenalty,
          bookIds: penaltyBookIds,
          studentId: user._id,
        }
      );

      // console.log(orderResponse.data);
      const { orderId, amount, bookIds } = orderResponse.data;

      const options = {
        key: "rzp_test_xD0hdRAzk5jBXJ", 
        amount: amount*100, 
        currency: "INR",
        name: "Library Management System", 
        description: "Penalty Transaction",
        order_id: orderId, 
         "handler":async function (response){

          const api = await axios.post(`${apiUrl}/api/payment/verify-payment`, {
            studentId: user._id,
            studentURN: user.URN,
            orderId: response.razorpay_order_id,
            amount,
            bookIds,
            razorpay_payment_id : response.razorpay_payment_id,
            razorpay_signature : response.razorpay_signature
          })
       
    },
        prefill: {
          
          name: user.name, 
          email: user.email,
          URN: user.URN, 
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {}
  };

  return (
    <div
      className={`main-page main-page-penalty-main-page ${
        menubt ? "shrink-main-page" : ""
      }`}
    >
      <div className="header">
        <h1>Penalty</h1>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Due Date</th>
              <th>Days Overdue</th>
              <th>Penalty per day</th>
              <th>Total Penalty</th>
            </tr>
          </thead>
          <tbody>
            {penaltyData.Data ? (
              penaltyData.Data.map((data) => {
                return (
                  <tr key={data._id}>
                    <td>{data.bookData.title}</td>
                    <td>{data.returnDate}</td>
                    <td>{data.daysOverDue}</td>
                    <td>₹{penaltyData.penaltyperDay}</td>
                    <td>₹{data.daysOverDue * penaltyData.penaltyperDay}</td>
                  </tr>
                );
              })
            ) : (
              <tr className="skeleton skeleton-text w-24 inline-block"></tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="total-penalty">Total Penalty: ₹{totalPenalty}</div>
      <button className="pay-button" onClick={handlePayment}>
        Pay Penalty
      </button>
    </div>
  );
};

export default Penalty;
