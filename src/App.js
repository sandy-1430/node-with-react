import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import Home from './component/Home';
import Studentprofile from './component/Profile/Studentprofile';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Header from './component/Header/Header';
import Loadingbox from './component/Loadingbox';
import Studentlogin from './component/Login/Studentlogin';
import Admin from './Admin/Admin';
import AdminResults from './Admin/AdminResults';


function App() {
  const browserHistory = createBrowserHistory();
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo, loading } = userSignin;

  return (
    <div className="App">
      {loading && <Loadingbox />}
      <Router forceRefresh={true} history={browserHistory} basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/profile">
            {userInfo ? <Header /> : ''}
            <Studentprofile />
          </Route>
          <Route path="/admin/studentresult">
            <AdminResults />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            {userInfo ? <Header /> : ''}
            {userInfo ? <Home /> : <Studentlogin />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
