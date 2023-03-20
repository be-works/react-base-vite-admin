import {  BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./app.css";
import 'antd/dist/antd.css';
import GlobalLoadingScreen from "./common/components/GlobalLoadingScreen";
import MyProvider from "./common/context";
import LayoutCommon from "./containers/Layout";
import Login from "./containers/Login";
import Onboarding from "./containers/Onboarding";
import Statistic from "./containers/Statistic";
import User from "./containers/User";

function App() {
  return (
    <MyProvider>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Onboarding />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>

          <Route>
            <LayoutCommon>
              <Switch>
                <Route exact path="/accounts">
                  <User />
                </Route>
                <Route exact path="/statistic">
                  <Statistic />
                </Route>
              </Switch>
            </LayoutCommon>
          </Route>
        </Switch>
      </Router>
      <GlobalLoadingScreen />
    </MyProvider>
  );
}

export default App;
