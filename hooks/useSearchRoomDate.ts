import { useDispatch } from "react-redux";
import { useSelector } from "../store";
import { searchRoomActions } from "../store/searchRoom";

const useSearchRoomDate = () => {
  const checkInDate = useSelector((state) => state.searchRoom.checkInDate);
  const checkOutDate = useSelector((state) => state.searchRoom.checkOutDate);
  const dispatch = useDispatch();

  // * cheange the check in date
  function setCheckInDateDispatch(date: Date | null): void {
    if (date) {
      dispatch(searchRoomActions.setCheckInDate(date.toISOString()));
    } else {
      dispatch(searchRoomActions.setCheckInDate(null));
    }
  }

  // * chnage the check out date
  function setCheckOutDateDispatch(date: Date | null): void {
    if (date) {
      dispatch(searchRoomActions.setCheckOutDate(date.toISOString()));
    } else {
      dispatch(searchRoomActions.setCheckOutDate(null));
    }
  }

  return {
    checkInDate: checkInDate ? new Date(checkInDate) : null,
    checkOutDate: checkOutDate ? new Date(checkOutDate) : null,
    setCheckInDateDispatch,
    setCheckOutDateDispatch,
  };
};

export default useSearchRoomDate;
