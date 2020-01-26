import React, {useState, Fragment} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import axios from "axios";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";

import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Search Github User
  const searchUsers = async text => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET_ID}`
    ); // Sau dau / la params, sau dau ? la query
    setUsers(res.data.items);
    setLoading(false);
    // seachUsers nhan tham so tu Search roi setState, truyen tu duoi len
    // Nhan ham searchUsers la mot ham async cho truyen vao tham so
  };

  // Get single Github user
  const getUser = async username => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET_ID}`
    ); // Sau dau / la params, sau dau ? la query
    setUser(res.data);
    setLoading(false);
  };

  const getUserRepos = async username => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET_ID}`
    ); // Sau dau / la params, sau dau ? la query
    setRepos(res.data);
    setLoading(false);
  };

  // Clear User from state
  const clearUsers = () => setUsers([]);

  const alertUser = (msg, type) => {
    setAlert({msg, type});
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={alertUser}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/user/:login'
              render={props => (
                <User {...props} getUser={getUser} user={user} getUserRepos={getUserRepos} repos={repos} />
              )}
              loading={loading}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
