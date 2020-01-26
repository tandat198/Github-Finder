import React, {useState} from "react";
import PropTypes from "prop-types";

const Search = ({setAlert, searchUsers, showClear, clearUsers}) => {
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
      {showClear && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default Search;
