import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store";
import { registerRoomActions } from "../../store/registerRoom";
import palette from "../../styles/palette";
import NvaigationIcon from "../../public/static/svg/register/navigation.svg";
import Button from "../common/Button";
import Selector from "../common/Selector";
import { countryList } from "../../lib/staticData";
import Input from "../common/Input";

const Container = styled.div`
  padding: 62px 30px 100px;
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

  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
  .register-room-location-button-wrapper {
    width: 176px;
    margin-bottom: 24px;
  }
  .register-room-location-country-selector-wrapper {
    width: 385px;
    margin-bottom: 24px;
  }
`;

const RegisterRoomLocation: React.FC = () => {
  const dispatch = useDispatch();

  const country = useSelector((state) => state.registerRoom.country);
  const city = useSelector((state) => state.registerRoom.city);
  const district = useSelector((state) => state.registerRoom.district);
  const streetAddress = useSelector(
    (state) => state.registerRoom.streetAddress
  );
  const detailAddress = useSelector(
    (state) => state.registerRoom.detailAddress
  );
  const postcode = useSelector((state) => state.registerRoom.postcode);

  const onChangeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setCountry(event.target.value));
  };

  const onChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setCity(event.target.value));
  };

  const onChangeDistrict = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setDistrict(event.target.value));
  };

  const onChangeStreetAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(registerRoomActions.setStreetAddress(event.target.value));
  };

  const onChangeDetailAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(registerRoomActions.setDetailAddress(event.target.value));
  };

  const onChangePostcode = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setPostcode(event.target.value));
  };

  // * 현재 위치 불러오기에 성공시
  const onSuccessGetLocation = ({ coords }: any) => {
    console.log("latitude : ", coords.latitude);
    console.log("longitude : ", coords.longitude);
  };

  // * 현재 위치 사용 클릭시
  const onClickGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccessGetLocation, (e) => {
      console.log(e);
      alert(e?.message);
    });
  };

  return (
    <Container>
      <h2>숙소의 위치를 알려주세요.</h2>
      <h3>4단계</h3>
      <p className="register-room-step-info">
        정확한 숙소 주소는 게스트가 예약을 완료한 후에만 공개됩니다.
      </p>
      <div className="register-room-location-button-wrapper">
        <Button
          color="dark_cyan"
          colorReverse
          icon={<NvaigationIcon />}
          onClick={onClickGetCurrentLocation}
        >
          현재 위치 사용
        </Button>
      </div>
      <div className="register-room-location-country-selector-wrapper">
        <Selector
          type="register"
          options={countryList}
          useValidation={false}
          defaultValue="국가/지역 선택"
          disabledOptions={["국가/지역 선택"]}
          value={country}
          onChange={onChangeCountry}
        />
      </div>
      <div className="register-room-location-city-district">
        <Input label="시/도" onChange={onChangeCity} />
        <Input label="시/군/구" onChange={onChangeDistrict} />
      </div>
      <div className="register-room-location-street-address">
        <Input label="도로명주소" onChange={onChangeStreetAddress} />
      </div>
      <div className="register-room-location-detail-address">
        <Input
          label="동호수(선택 사항)"
          onChange={onChangeDetailAddress}
          useValidation={false}
        />
      </div>
      <div className="register-room-location-postcode">
        <Input label="우편번호" onChange={onChangePostcode} />
      </div>
    </Container>
  );
};

export default RegisterRoomLocation;
