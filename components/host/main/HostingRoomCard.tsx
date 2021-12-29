import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { RoomType } from "../../../types/room";
import palette from "../../../styles/palette";

const Container = styled.li`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid ${palette.gray_76};

  .hosting-room-card-wrapper {
    width: 100%;
    height: 100px;
    padding: 6px;
    display: flex;
    flex-direction: row;
    border: 1px solid red;

    .hosting-room-card-photo-wrapper {
      position: relative;
      width: 100px;
      height: 75px;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .hosting-room-card-texts {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }
`;

interface IProps {
  room: RoomType;
}

const HostingRoomCard: React.FC<IProps> = ({ room }) => {
  return (
    <Container>
      <div className="hosting-room-card-wrapper">
        <div className="hosting-room-card-photo-wrapper">
          <img src={room.photos[0]} alt="" />
        </div>
        <div className="hosting-room-card-texts">
          <p className="hosting-room-title">{room.title}</p>
          <p className="hosting-room-location">
            {room.city} {room.district}
          </p>
          <p className="hosting-room-building-type">{room.buildingType}</p>
          <p className="hosting-room-room-type">{room.roomType}</p>
          <p className="hosting-room-maximum-guest-count">
            {room.maximumGuestCount}
          </p>
          <p className="hosting-room-bedroom-count">{room.bedroomCount}</p>
          <p className="hosting-room-price">₩ {room.price}원</p>
        </div>
      </div>
    </Container>
  );
};

export default HostingRoomCard;

/*
  1. 메뉴내용
    - 대표사진 : photos[0]
    - 위치 : city, district
    - 건물 유형 : buildingType
    - 방 유형 : roomType
    - 제목 : title
    - 숙박가능인원 : maximumGuestCount
    - 침실 : bedroomCount
    - 숙박요금 : price
*/
