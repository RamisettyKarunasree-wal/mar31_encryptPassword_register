import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function CreateFile() {
  //   const [error, setError] = useState('');
  //   const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const [usernameMsg, setUsernameMsg] = useState('');
  const [msg, setMsg] = useState('');
  const checkUsername = () => {
    axios
      .get(`/users/checkUser/${username}`)
      .then((res) => {
        if (res.data.status === 1) {
          setUsernameStatus(true);
          setUsernameError('');
          setUsernameMsg(res.data.msg);
        } else {
          setUsernameMsg('');
          setUsernameError(res.data.debug_data);
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const checkEmail = () => {
    axios
      .get(`/users/checkEmail/${email}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 1) {
          setEmailError('');
          setEmailStatus(true);
          setEmailMsg(res.data.msg);
        } else {
          setEmailError(res.data.debug_data);
          setEmailMsg('');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addUser = (event) => {
    setMsg('');
    event.preventDefault();
    checkUsername();
    checkEmail();
    if (emailStatus && usernameStatus) {
      const user = {
        username: event.target.username.value,
        password: event.target.password.value,
        email: event.target.email.value,
        dob: event.target.dob.value,
      };
      axios
        .post('/users', user)
        .then((res) => {
          setMsg(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="file-form">
      <h1>Register Here</h1>
      <form onSubmit={addUser}>
        <div className="form-label">
          <b>Enter Username:</b>
        </div>
        <p className="msg">{usernameMsg}</p>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="input-check"
          required
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <button
          className="check btn btn-primary w-auto"
          type="button"
          onClick={checkUsername}
        >
          {usernameStatus ? <i className="bi bi-person-check" /> : <i>Check</i>}
        </button>

        <br />
        <p className="error">{usernameError}</p>

        <div className="form-label">
          <b>Enter Password:</b>
        </div>
        <input
          type="password"
          placeholder="Filename"
          name="password"
          required
        />
        <br />
        <div className="form-label">
          <b>Enter Email:</b>
        </div>
        <p className="msg">{emailMsg}</p>
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="input-check"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button
          className="check btn btn-primary w-auto"
          type="button"
          onClick={checkEmail}
        >
          {emailStatus ? <i className="bi bi-envelope-check" /> : <i>Check</i>}
        </button>
        <br />
        <p className="error">{emailError}</p>
        <div className="form-label">
          <b>Select Date of Birth</b>
        </div>
        <input type="date" placeholder="date of birth" name="dob" required />
        <br />
        <button type="submit" className="btn btn-success m-2">
          Register
        </button>
      </form>
      <p className="msg">{msg}</p>
    </div>
  );
}
