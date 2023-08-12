import { useEffect, useState } from "react";
import styled from "styled-components";
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: relative;
  margin: auto;
  background-image: ${(props) =>
    props.greenAngel
      ? `conic-gradient(green 0deg,green ${props.greenAngel}deg,red ${
          props.greenAngel
        }deg, red ${360 - props.greenAngel}deg )`
      : null};

  ::before {
    content: " ";
    position: absolute;
    background-color: white;
    z-index: 1;
    width: 180px;
    height: 180px;
    left: 10px;
    top: 10px;
    border-radius: 50%;
  }
`;
const PieContainer = styled.div``;
const Description = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 10px 0px;
`;
export const PieChart = (props) => {
  const [greenAngel, setGreenAngel] = useState(0);
  const covertAmountIndegreeRatio = () => {
    const loanAmountDegree = (props.loanAmount / props.totalAmountPaid) * 360;
    setGreenAngel(loanAmountDegree);
  };
  useEffect(() => {
    covertAmountIndegreeRatio();
  }, [props.loanAmount, props.totalInterestpaid]);
  return (
    <PieContainer>
      <strong>Chart</strong>
      <br />
      <br />
      <Circle greenAngel={greenAngel} />
      <Description>
        <div>Principal Amount</div>
        <div
          style={{
            backgroundColor: "green",
            width: "50px",
            height: "10px",
            marginLeft: "30px",
          }}
        ></div>
      </Description>
      <Description>
        <div>Interest paid</div>
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "10px",
            marginLeft: "30px",
          }}
        ></div>
      </Description>
    </PieContainer>
  );
};
