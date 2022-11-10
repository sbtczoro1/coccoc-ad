import React, { useState, lazy } from "react";
import AppContext from "./context/AppContext";
import useTranslate from "./hooks/useTranslate";
import { getStorage } from "./helpers/localstorage";
const Login = lazy(() => import("./auth/pages/Login/Login"));
import { Tick } from "./components/icons/Login";
import { EMAIL_COCCOC_STORAGE, TOKEN_COCCOC_STORAGE } from "./constants";

const App = () => {
  const [appData, setAppData] = useState({
    isLogged: getStorage(TOKEN_COCCOC_STORAGE) !== null,
    email: getStorage(EMAIL_COCCOC_STORAGE),
  });
  const translate = useTranslate();

  const renderWelcomeMessage = () => {
    const email = appData?.email?.split("@")[0];
    return (
      <div className="logged-in">
        <div className="logged-in__message">
          <Tick />
          <p className="ml-8">{`${translate.home.welcome} ${email}, ${translate.home.logged_in}`}</p>
        </div>
      </div>
    );
  };

  return (
    <AppContext.Provider value={[appData, setAppData]}>
      {appData?.isLogged ? renderWelcomeMessage() : <Login />}
    </AppContext.Provider>
  );
};

export default App;
