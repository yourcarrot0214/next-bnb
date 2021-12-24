import { HYDRATE, createWrapper, MakeStore, Context } from "next-redux-wrapper";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createStore, AnyAction, Store } from "redux";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";
import user from "./user";
import common from "./common";
import auth from "./auth";
import registerRoom from "./registerRoom";
import searchRoom from "./searchRoom";
import room from "./room";

const rootReducer = combineReducers({
  user: user.reducer,
  common: common.reducer,
  auth: auth.reducer,
  registerRoom: registerRoom.reducer,
  searchRoom: searchRoom.reducer,
  room: room.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

// const reducer = (state: any, action: any) => {
//   if (action.type === HYDRATE) {
//     if (state === initialRootState) {
//       return {
//         ...state,
//         ...action.payload,
//       };
//     }
//     return state;
//   }
//   return rootReducer(state, action);
// };

const reducer = (state: RootState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default:
      return rootReducer(state, action);
  }
};

const makeStore = (context: Context) => createStore(reducer);

//* 타입 지원되는 커스텀 useSelector 만들기
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore: MakeStore = () => {
  const store = configureStore({
    reducer,
    devTools: true,
  });
  initialRootState = store.getState();
  return store;
};

// export const wrapper = createWrapper(initStore);
export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: true,
});
