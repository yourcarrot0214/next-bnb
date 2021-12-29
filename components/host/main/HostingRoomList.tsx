import React from "react";
import styled from "styled-components";
import { useSelector } from "../../../store";
import HostingRoomCard from "./HostingRoomCard";

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  width: 100%;
`;

const HostingRoomList: React.FC = () => {
  const hostingRooms = useSelector((state) => state.host.rooms);

  return (
    <Container>
      {hostingRooms.map((room) => (
        <HostingRoomCard room={room} />
      ))}
    </Container>
  );
};

export default HostingRoomList;
