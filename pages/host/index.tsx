import React from "react";
import { NextPage } from "next";
import HostMain from "../../components/host/main/HostMain";
import { getHostRoomListAPI } from "../../lib/api/host";
import { hostActions } from "../../store/host";

const index: NextPage = () => {
  return <HostMain />;
};

index.getInitialProps = async ({ store, query }) => {
  console.log(query);
  const { userId } = query;
  console.log(userId, typeof userId);

  try {
    // ? 1. rooms 정보에서 hostId와 userId가 일치하는 목록을 추출한다.
    const { data } = await getHostRoomListAPI({ userId });
    console.log(data);
    // ? 2. 추출한 정보를 store.dispatch 한다.
    store.dispatch(hostActions.setHostingRooms(data));
  } catch (error) {
    console.log(error);
  }

  return {};
};

export default index;
