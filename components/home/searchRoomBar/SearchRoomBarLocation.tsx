import React, { useState, useRef, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import { useSelector } from "../../../store";
import palette from "../../../styles/palette";
import { searchRoomActions } from "../../../store/searchRoom";
import { searchPlacesAPI, getPlaceAPI } from "../../../lib/api/map";
import useDebounce from "../../../hooks/useDebounce";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    border-color: ${palette.gray_dd};
  }

  .search-room-bar-location-texts {
    position: absolute;
    width: calc(100% - 40px);
    top: 16px;
    left: 20px;

    .search-room-bar-location-label {
      font-size: 10px;
      font-weight: 800;
      margin-bottom: 4px;
    }

    input {
      width: 100%;
      border: 0;
      font-size: 14px;
      font-weight: 600;
      outline: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &::placeholder {
        font-size: 14px;
        opacity: 0.7;
      }
    }
  }

  .search-room-bar-location-results {
    position: absolute;
    background-color: white;
    top: 78px;
    width: 500px;
    padding: 16px 0;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    border-radius: 32px;
    cursor: default;
    overflow: hidden;
    z-index: 10;

    li {
      display: flex;
      align-items: center;
      height: 64px;
      padding: 8px 32px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
  }
`;

const SearchRoomBarLocation: React.FC = () => {
  const location = useSelector((state) => state.searchRoom.location);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [popupOpened, setPopupOpened] = useState(false);
  const [results, setResults] = useState<
    { description: string; placeId: string }[]
  >([]);
  const searchKeyword = useDebounce(location, 150);

  // * change location
  const setLocationDispatch = (value: string) => {
    dispatch(searchRoomActions.setLocation(value));
  };

  // * change latitude
  const setLatitudeDispatch = (value: number) => {
    dispatch(searchRoomActions.setLatitude(value));
  };

  // * change longitude
  const setLongitudeDispatch = (value: number) => {
    dispatch(searchRoomActions.setLongitude(value));
  };

  // * 근처 추천 장소 클릭시
  const onClickNearPlaces = () => {
    setPopupOpened(false);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocationDispatch("근처 추천 장소");
        setLatitudeDispatch(coords.latitude);
        setLongitudeDispatch(coords.longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // * 검색된 결과 클릭시
  const onClickResult = async (placeId: string) => {
    try {
      const { data } = await getPlaceAPI(placeId);
      console.log(data);
      setLocationDispatch(data.location);
      setLatitudeDispatch(data.latitude);
      setLongitudeDispatch(data.longitude);
      setPopupOpened(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setPopupOpened(true);
  };

  const searchPlaces = async () => {
    try {
      const { data } = await searchPlacesAPI(encodeURI(location));
      setResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!searchKeyword) {
      setResults([]);
    }
    if (searchKeyword) {
      searchPlaces();
    }
  }, [searchKeyword]);

  return (
    <Container onClick={onClickInput}>
      <OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
        <div className="search-room-bar-location-texts">
          <p className="search-room-bar-location-label">위치</p>
          <input
            value={location}
            onChange={(e) => setLocationDispatch(e.target.value)}
            placeholder="어디로 여행 가세요?"
            ref={inputRef}
          />
        </div>
        {popupOpened && location !== "근처 추천 장소" && (
          <ul className="search-room-bar-location-results">
            {!location && (
              <li role="presentation" onClick={onClickNearPlaces}>
                근처 추천 장소
              </li>
            )}
            {!isEmpty(results) &&
              results.map((result, index) => (
                <li
                  role="presentation"
                  key={index}
                  onClick={() => onClickResult(result.placeId)}
                >
                  {result.description}
                </li>
              ))}
            {location && isEmpty(results) && <li>검색 결과가 없습니다.</li>}
          </ul>
        )}
      </OutsideClickHandler>
    </Container>
  );
};

export default SearchRoomBarLocation;
