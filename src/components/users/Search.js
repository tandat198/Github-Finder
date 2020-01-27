import React, {useContext, useState} from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const {users, searchUsers, clearUsers} = githubContext;
  const {setAlert} = alertContext;

  const [text, setText] = useState("");

  const onChange = e => {
    setText(e.target.value);
    // tao key bang cach lay gia tri cua bien
    // key = [bien]
  };
  const onSubmit = e => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "light");
    } else {
      searchUsers(text);
      setText("");
    }

    // Truyen tham so vao seachUsers roi gui nguoc lai cho App
    // Truyen tu duoi len
  };
  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input onChange={onChange} type='text' name='text' value={text} placeholder='Search User...' />
        <input type='submit' value='Search' className='btn btn-dark btn-block' />
      </form>
      {users.length > 0 && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
