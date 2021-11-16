import React, { useState } from "react";
import { useDispatch } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import Link from "next/link";
import styled from "styled-components";
import AirbnbLogoIcon from "../public/static/svg/logo/logo.svg";
import AirbnbLogoTextIcon from "../public/static/svg/logo/logo_text.svg";
import HamburgerIcon from "../public/static/svg/header/hamburger.svg";
import palette from "../styles/palette";
import useModal from "../hooks/useModal";
import AuthModal from "./auth/AuthModal";
import { useSelector } from "../store";
import { authActions } from "../store/auth";

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;

  /* 로고 */
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    .header-logo {
      margin-right: 6px;
    }
  }

  /* 로그인 및 회원가입 버튼  */
  .header-auth-buttons {
    .header-sign-up-button {
      height: 42px;
      margin-right: 8px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-login-button {
      height: 42px;
      padding: 0 16px;
      border: 0;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
      }
    }
  }

  .header-user-profile {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 6px 0 16px;
    border: 0;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
    border-radius: 21px;
    background-color: white;
    cursor: pointer;
    outline: none;
    &:hover {
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
    }
    .header-user-profile-image {
      margin-left: 8px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }

  /* react-outside-click-handler */
  .header-logo-wrapper + div {
    position: relative;
  }
  .header-usermenu {
    position: absolute;
    right: 0;
    top: 52px;
    width: 240px;
    padding: 8px 0;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    background-color: white;
    li {
      display: flex;
      align-items: center;
      width: 100%;
      height: 42px;
      padding: 0 16px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-usermenu-divider {
      width: 100%;
      height: 1px;
      margin: 8px 0;
      background-color: ${palette.gray_dd};
    }
  }
`;

const Header: React.FC = () => {
  const { openModal, ModalPortal, closeModal } = useModal();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [isUsermenuOpened, setIsUsermenuOpened] = useState(false);
  return (
    <Container>
      <Link href="/">
        <a className="header-logo-wrapper">
          <AirbnbLogoIcon className="header-logo" />
          <AirbnbLogoTextIcon />
        </a>
      </Link>
      {!user.isLogged && (
        <div className="header-auth-buttons">
          <button
            className="header-sign-up-button"
            type="button"
            onClick={() => {
              dispatch(authActions.setAuthMode("signup"));
              openModal();
            }}
          >
            회원가입
          </button>
          <button
            className="header-login-button"
            type="button"
            onClick={() => {
              dispatch(authActions.setAuthMode("login"));
              openModal();
            }}
          >
            로그인
          </button>
        </div>
      )}
      {user.isLogged && (
        <OutsideClickHandler
          onOutsideClick={() => {
            if (isUsermenuOpened) {
              setIsUsermenuOpened(false);
            }
          }}
        >
          <button
            className="header-user-profile"
            type="button"
            onClick={() => setIsUsermenuOpened(true)}
          >
            <HamburgerIcon />
            <img
              src={user.profileImage}
              className="header-user-profile-image"
              alt="profile"
            />
          </button>
          {isUsermenuOpened && (
            <ul className="header-usermenu">
              <li>숙소 관리</li>
              <Link href="/room/register/building">
                <a
                  role="presentation"
                  onClick={() => {
                    setIsUsermenuOpened(false);
                  }}
                >
                  <li>숙소 등록하기</li>
                </a>
              </Link>
              <div className="header-usermenu-divider" />
              <li role="presentation" onClick={() => {}}>
                로그아웃
              </li>
            </ul>
          )}
        </OutsideClickHandler>
      )}
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default Header;
