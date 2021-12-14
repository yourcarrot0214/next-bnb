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
  axios.defaults.headers.cookie = cookieObject.access_token;
  console.log(context.ctx.req?.headers);
  const { store } = context.ctx;
  const { isLogged } = store.getState().user;
  console.log("cookieObject : ", cookieObject);
  try {
    if (!isLogged && cookieObject.access_token) {
      console.log(":: TRY ::");
      axios.defaults.headers.cookie = cookieObject.access_token;
      console.log("axios.cookie : ", axios.defaults.headers.cookie);
      const { data } = await meAPI();
      console.log("data", data);
      store.dispatch(userActions.setLoggedUser(data));
    }
  } catch (e) {
    console.log("error");
    console.log("error message :: ", e.message);
  }
  return { ...appInitialProps };
};

export default wrapper.withRedux(app);
