
import "./App.css";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import Header from "./components/Home/Header";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ModalPopUp from "./HOC/ModalPopUp";

import history from "./History/History";
import LoadingGIF from "./components/GlobalSetting/LoadingGIF/LoadingGIF";
import { UserProfileTemplate } from "./templates/UserTemplate/UserProfileTemplate";
import UserProfile from "./pages/UserProfile/UserProfile";

import ModalAntd from "./HOC/ModalAntd";
import { JiraTemplate } from "./templates/JiraTemplate/JiraTemplate";
import UserManagement from "./components/CyberBugJira/UserManagement/UserManagement";
import ProjectManagement from "./components/CyberBugJira/ProjectManagement/ProjectManagement";
import DrawerAntd from "./HOC/DrawerAntd";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import MainProjectDetail from "./components/CyberBugJira/ProjectDetail/MainProjectDetail";
function App() {
  return (
    <Router history={history}>
      <DrawerAntd></DrawerAntd>
      <ModalAntd></ModalAntd>
      <ModalPopUp></ModalPopUp>
      <LoadingGIF></LoadingGIF>
      <Header></Header>
      <Switch>
        <JiraTemplate
          exact
          path="/userManagement"
          Component={UserManagement}
        ></JiraTemplate>
        <JiraTemplate
          exact
          path="/projectManagement"
          Component={ProjectManagement}
        ></JiraTemplate>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/contact" component={Contact}></Route>
        <Route exact path="/login" component={Login}></Route>
        <UserProfileTemplate
          exact
          path="/profile"
          Component={UserProfile}
        ></UserProfileTemplate>
        <JiraTemplate
          exact
          path="/projectDetail/:projectId"
          Component={MainProjectDetail}
        ></JiraTemplate>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="*" component={PageNotFound}></Route>
      </Switch>
    </Router>
  );
}

export default App;
