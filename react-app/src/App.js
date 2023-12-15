import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import LandingPage from "./components/LandingPage"
import CreateBusiness from "./components/CreateBusiness";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import UserBusinesses from "./components/UserBusinesses";
import OneBusiness from "./components/OneBusiness";
import BusinessRecent from "./components/BusinessRecent";
import BusinessSearch from "./components/BusinessSearch";

require("dotenv").config();
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/mybusinesses'>
            <UserBusinesses />
          </Route>
          <Route exact path='/businesses/new'>
            <CreateBusiness />
          </Route>
          <Route exact path='/businesses/recent'>
            <BusinessRecent />
          </Route>
          <Route exact path='/businesses/search'>
            <BusinessSearch />
          </Route>
          <Route exact path='/businesses/:busiId'>
            <OneBusiness />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          {/* <Route path="/mybusinesses" >
            <MyBusinesses />
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;
