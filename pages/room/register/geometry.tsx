import React from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";

const RegisterRoomGeometry = dynamic(
  import("../../../components/register/RegisterRoomGeometry"),
  { ssr: false }
);

const geometry: NextPage = () => {
  return <RegisterRoomGeometry />;
};

export default geometry;

/*
 * 지도 사용시 window 객체를 사용해야 하기 때문에 서버사이드 렌더링을 방지하기 위해 dynamic을 사용
 */
