import React, { useState } from "react";
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
import { getLocationInfoAPI } from "../../lib/api/map";
import RegisterRoomFooter from "./RegisterRoomFooter";

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
  const [loading, setLoading] = useState(false);

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

  // * ?????? ?????? ??????????????? ?????????
  const onSuccessGetLocation = async ({ coords }: any) => {
    try {
      const { data } = await getLocationInfoAPI({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      dispatch(registerRoomActions.setCountry(data.country));
      dispatch(registerRoomActions.setCity(data.city));
      dispatch(registerRoomActions.setDistrict(data.district));
      dispatch(registerRoomActions.setStreetAddress(data.streetAddress));
      dispatch(registerRoomActions.setPostcode(data.postcode));
      dispatch(registerRoomActions.setLatitude(data.latitude));
      dispatch(registerRoomActions.setLongitude(data.longitude));
    } catch (error) {
      console.log(error);
      alert(error?.message);
    }

    setLoading(false);
  };

  // * ?????? ?????? ?????? ?????????
  const onClickGetCurrentLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(onSuccessGetLocation, (e) => {
      console.log(e);
      alert(e?.message);
    });
  };

  return (
    <Container>
      <h2>????????? ????????? ???????????????.</h2>
      <h3>4??????</h3>
      <p className="register-room-step-info">
        ????????? ?????? ????????? ???????????? ????????? ????????? ????????? ???????????????.
      </p>
      <div className="register-room-location-button-wrapper">
        <Button
          color="dark_cyan"
          colorReverse
          icon={<NvaigationIcon />}
          onClick={onClickGetCurrentLocation}
        >
          {loading ? "???????????????..." : "?????? ?????? ??????"}
        </Button>
      </div>
      <div className="register-room-location-country-selector-wrapper">
        <Selector
          type="register"
          options={countryList}
          useValidation={false}
          defaultValue="??????/?????? ??????"
          disabledOptions={["??????/?????? ??????"]}
          value={country}
          onChange={onChangeCountry}
        />
      </div>
      <div className="register-room-location-city-district">
        <Input label="???/???" onChange={onChangeCity} value={city} />
        <Input label="???/???/???" onChange={onChangeDistrict} value={district} />
      </div>
      <div className="register-room-location-street-address">
        <Input
          label="???????????????"
          onChange={onChangeStreetAddress}
          value={streetAddress}
        />
      </div>
      <div className="register-room-location-detail-address">
        <Input
          label="?????????(?????? ??????)"
          onChange={onChangeDetailAddress}
          useValidation={false}
          value={detailAddress}
        />
      </div>
      <div className="register-room-location-postcode">
        <Input label="????????????" onChange={onChangePostcode} value={postcode} />
      </div>
      <RegisterRoomFooter
        prevHref="/room/register/bathroom"
        nextHref="/room/register/geometry"
      />
    </Container>
  );
};

export default RegisterRoomLocation;
