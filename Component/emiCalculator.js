import { useEffect, useState } from "react";
import styled from "styled-components";
import { PieChart } from "../Component/PieChart";
const Container = styled.div`
  border: 1px solid black;
  padding: 20px;
`;
const LoanAmount = styled.input`
  border: 1px solid black;
  height: 40px;
  font-size: 15px;
  color: green;
`;
const InputRange = styled.input`
  margin: 10px 0px;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 100%;
  ::-moz-range-track {
    background: #053a5f;
    height: 15px;
  }
  ::-webkit-slider-runnable-track {
    background: #053a5f;
    height: 15px;
  }
  ::-webkit-slider-thumb {
    appearance: none;
    margin-top: -12px; /* Centers thumb on the track */
    background-color: #5cd5eb;
    height: 2rem;
    width: 1rem;
  }
  ::-moz-range-thumb {
    border: none; /*Removes extra border that FF applies*/
    border-radius: 0; /*Removes default border-radius that FF applies*/
    background-color: #5cd5eb;
    height: 2rem;
    width: 1rem;
  }
  :focus {
    outline: none;
  }
  :focus::-moz-range-thumb {
    border: 1px solid #053a5f;
    outline: 3px solid #053a5f;
  }
`;
// const Months = styled.span`
//   font-size: 10px;
//   margin: 0px 10px;
//   border: 1px solid black;
//   border-radius: 5px;
//   padding: 10px;
// `;
const SubContainer = styled.div`
  margin-bottom: 30px;
`;
const MinAndMan = styled.div`
  display: flex;
  justify-content: space-between;
  /* margin-top: 10px; */
`;
export const EmiCalculator = () => {
  const [InterestValue, setInterestValue] = useState(7);
  const [loanAmount, setLoanAmount] = useState(10000);
  const [downPayment, setDownpayment] = useState(0);
  const [numOfMonth, setNumOfmonth] = useState(6);
  const [montlyEmiCal, setMonthlyAmountCal] = useState(0);
  const [totalAmountPaid, setTotalAmountPaid] = useState(0);
  const calculateMonthlyEmi = () => {
    // [P x R x (1+R)^N]/[(1+R)^N-1]
    const R = InterestValue / (12 * 100);
    const monthlyEmi =
      (loanAmount * R * Math.pow(1 + R, numOfMonth)) /
      (Math.pow(1 + R, numOfMonth) - 1);
    console.log(monthlyEmi, "monthlyEmi", 1700.85 * 6);
    setMonthlyAmountCal(Math.round(monthlyEmi));
  };
  const calculateTotalAmount = () => {
    const TotalAmount =
      loanAmount * Math.pow(1 + InterestValue / 100, numOfMonth / 12);
    console.log(TotalAmount, "TotalAmount");
    setTotalAmountPaid(Math.round(TotalAmount));
  };
  useEffect(() => {
    console.log("i am called");
    calculateTotalAmount();
    calculateMonthlyEmi();
  }, [loanAmount, numOfMonth, InterestValue]);

  return (
    <Container>
      <LoanAmount
        placeholder="Enter the loan amount in Rs"
        onChange={(e) => {
          setLoanAmount(e.target.value);
        }}
        value={loanAmount}
      />{" "}
      <br /> <br />
      <label> InterestRate</label>
      <SubContainer>
        <InputRange
          type="range"
          min="0"
          max="100"
          onChange={(e) => {
            setInterestValue(e.target.value);
          }}
          value={InterestValue}
        />
        <MinAndMan>
          <span>0</span>
          <span>{InterestValue}%</span> <span>100%</span>
        </MinAndMan>
      </SubContainer>
      <label> Months</label>
      <SubContainer>
        <InputRange
          type="range"
          min="0"
          max="36"
          value={numOfMonth}
          onChange={(e) => {
            setNumOfmonth(e.target.value);
          }}
        />
        <MinAndMan>
          <span>0</span>
          <span>{numOfMonth} months</span> <span>36</span>
        </MinAndMan>
      </SubContainer>
      <div>
        Monthly Paid : <b>Rs. {montlyEmiCal.toLocaleString("en")}</b>
      </div>
      <div>
        Total Amount Paid : <b>Rs. {totalAmountPaid.toLocaleString("en")}</b>
      </div>
      <div style={{ marginBottom: "50px" }}>
        Total interest paid:{" "}
        <b>Rs. {(totalAmountPaid - loanAmount).toLocaleString("en")}</b>
      </div>
      <PieChart
        totalAmountPaid={totalAmountPaid}
        totalInterestpaid={totalAmountPaid - loanAmount}
        loanAmount={loanAmount}
      />
    </Container>
  );
};
