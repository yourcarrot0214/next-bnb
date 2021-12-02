import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import palette from "../../styles/palette";
import RegisterRoomFooter from "./RegisterRoomFooter";
import { useSelector } from "../../store";
import Input from "../common/Input";
import { makeMoneyString } from "../../lib/utils";
import { registerRoomActions } from "../../store/registerRoom";

const Container = styled.div`
  padding: 62px 30px 100px;
  width: 445px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
`;

const RegisterRoomPrice: React.FC = () => {
  const dispatch = useDispatch();
  const price = useSelector((state) => state.registerRoom.price);

  const onChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    if (!input) {
      dispatch(registerRoomActions.setPrice(0));
    }
    const numberPrice = Number(input.replace(/,/g, ""));
    if (numberPrice) {
      dispatch(registerRoomActions.setPrice(numberPrice));
    }
  };

  return (
    <Container>
      <h2>숙소 요금 설정하기</h2>
      <h3>10단계</h3>
      <Input
        label="기본요금"
        value={makeMoneyString(String(price))}
        onChange={onChangePrice}
      />
      <RegisterRoomFooter
        prevHref="/room/register/title"
        nextHref="/room/register/date"
      />
    </Container>
  );
};

export default RegisterRoomPrice;
