import React, { useState } from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import { useSelector } from "../../../store";
import HostingRoomList from "./HostingRoomList";

const Container = styled.div`
  padding: 50px 80px;
  margin: auto;

  .room-list-info {
    margin-bottom: 8px;
  }
  .room-list-title {
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 24px;
  }
  .room-list-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .room-list-buttons-left-side {
      display: flex;
      button {
        height: 36px;
        padding: 0 16px;
        margin-right: 8px;
        border-radius: 30px;
        border: 1px solid ${palette.gray_b0};
        background-color: white;
        cursor: pointer;
        outline: none;
        &:hover {
          border-color: ${palette.black};
        }
      }
    }
    .room-list-show-map-button {
      display: flex;
      align-items: center;
      height: 42px;
      padding: 12px;
      background-color: white;
      border-radius: 8px;
      border: 0;
      background-color: white;
      cursor: pointer;
      outline: none;

      &:hover {
        background-color: ${palette.gray_f7};
      }
      svg {
        margin-right: 8px;
      }
    }
  }

  .room-list-wrapper {
    display: flex;
  }
`;

const HostMain: React.FC = () => {
  const rooms = useSelector((state) => state.host.rooms);

  return (
    <Container>
      <p className="room-list-info">{rooms.length}개의 숙소</p>
      <h1 className="room-list-title">숙소</h1>
      <div className="room-list-buttons">
        <div className="room-list-buttons-left-side">
          <button type="button">숙소 유형</button>
          <button type="button">요금</button>
        </div>
      </div>
      <div className="room-list-wrapper">
        <HostingRoomList />
      </div>
    </Container>
  );
};

export default HostMain;
