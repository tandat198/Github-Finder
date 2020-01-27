import React, {useReducer} from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {SET_LOADING, SEARCH_USERS, CLEAR_USERS, GET_REPOS, GET_USER, GET_USERS} from "../types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Get User Home
  const getUsers = async () => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({type: GET_USERS, payload: res.data});
  };

  // Search Users
  const searchUsers = async text => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    ); // Sau dau / la params, sau dau ? la query
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });

    // seachUsers nhan tham so tu Search roi setState, truyen tu duoi len
    // Nhan ham searchUsers la mot ham async cho truyen vao tham so
  };

  // Get User
  const getUser = async username => {
    dispatch({type: SET_LOADING});
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    ); // Sau dau / la params, sau dau ? la query
    dispatch({type: GET_USER, payload: res.data});
  };

  // Get Repos
  const getUserRepos = async username => {
    dispatch({type: SET_LOADING});
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    ); // Sau dau / la params, sau dau ? la query
    dispatch({type: GET_REPOS, payload: res.data});
  };

  // Clear User
  const clearUsers = () => dispatch({type: CLEAR_USERS});
  // Set Loading

  const setLoading = () => dispatch({type: SET_LOADING});

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUsers,
        getUserRepos
      }}>
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
