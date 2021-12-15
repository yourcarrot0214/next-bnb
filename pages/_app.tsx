import App, { AppContext, AppProps } from "next/app";
import axios from "../lib/api";
import Header from "../components/Header";
import GlobalStyle from "../styles/GlobalStyle";
import { wrapper } from "../store";
import { cookieStringToObject } from "../lib/utils";
import { meAPI } from "../lib/api/auth";
import { userActions } from "../store/user";

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
};

app.getInitialProps = async (context: AppContext) => {
  console.log(":: getInitialProps ::");
  const appInitialProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  console.log("req.headers : ", context.ctx.req?.headers);
  console.log("headers cookie : ", context.ctx.req?.headers.cookie);
  const { store } = context.ctx;
  const { isLogged } = store.getState().user;
  console.log("cookieObject : ", cookieObject);
  try {
    if (!isLogged && cookieObject.access_token) {
      console.log(":: TRY ::");
      axios.defaults.headers.cookie = cookieObject.access_token;

      console.log("axios.cookie : ", axios.defaults.headers.cookie);
      console.log("axios.defaults.headers : ", axios.defaults.headers);
      // ! meAPI request를 보내기 전에 headers.cookie에 값을 저장 했는데 req.headers에 없다. cookie가.
      const { data } = await meAPI();
      console.log("data", data);
      store.dispatch(userActions.setLoggedUser(data));
    }
  } catch (e) {
    console.log("error");
    console.log("error message :: ", e.message);
    // ! error 객체를 분석해 보면, req.headers에 cookie값 자체가 존재하지 않음.
    // ! 그럼 meAPI를 요청하기 전에 axios.defaults.headers.cookie에 토큰값을 저장하는게 안되고 있다는 의미.
  }
  return { ...appInitialProps };
};

export default wrapper.withRedux(app);
