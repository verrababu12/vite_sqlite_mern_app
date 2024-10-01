import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const navigate = useNavigate(); // Replacing `history` with `useNavigate`

  const onSubmitSuccess = () => {
    navigate("/login");
  };

  const onSubmitFailure = () => {
    setShowSubmitError(true);
  };

  const usernameHandleBlur = (e) => {
    const value = e.target.value.trim();
    if (value === "") {
      setUsernameError("*Required");
    } else {
      setUsernameError("");
    }
  };

  const nameHandleBlur = (e) => {
    const value = e.target.value.trim();
    if (value === "") {
      setNameError("*Required");
    } else {
      setNameError("");
    }
  };

  const emailHandleBlur = (e) => {
    const value = e.target.value.trim();
    if (value === "") {
      setEmailError("*Required");
    } else {
      setEmailError("");
    }
  };

  const passwordHandleBlur = (e) => {
    const value = e.target.value.trim();
    if (value === "") {
      setPasswordError("*Required");
    } else {
      setPasswordError("");
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { username, name, email, password };
    const url = "/api/register";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      onSubmitSuccess();
    } else {
      onSubmitFailure();
    }
  };

  const renderPasswordField = () => (
    <>
      <label className="input-label" htmlFor="password">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        className="input-filed"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={passwordHandleBlur}
      />
      {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}{" "}
      {/* Error message */}
    </>
  );

  const renderUsernameField = () => (
    <>
      <label className="input-label" htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="input-filed"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onBlur={usernameHandleBlur}
      />
      {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}{" "}
      {/* Error message */}
    </>
  );

  const renderNameField = () => (
    <>
      <label className="input-label" htmlFor="name">
        NAME
      </label>
      <input
        type="text"
        id="name"
        className="input-filed"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={nameHandleBlur}
      />
      {nameError && <p style={{ color: "red" }}>{nameError}</p>}{" "}
      {/* Error message */}
    </>
  );

  const renderEmailField = () => (
    <>
      <label className="input-label" htmlFor="email">
        EMAIL
      </label>
      <input
        type="text"
        id="email"
        className="input-filed"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={emailHandleBlur}
      />
      {emailError && <p style={{ color: "red" }}>{emailError}</p>}{" "}
      {/* Error message */}
    </>
  );

  return (
    <div className="login-form-container">
      <form className="login-card" onSubmit={submitForm}>
        <h1 className="main-heading">SignUp Form</h1>
        <div className="input-container">{renderUsernameField()}</div>
        <br />
        <div className="input-container">{renderNameField()}</div>
        <br />
        <div className="input-container">{renderEmailField()}</div>
        <br />
        <div className="input-container">{renderPasswordField()}</div>
        <br />
        <button type="submit" className="form-button">
          SIGN UP
        </button>
        {showSubmitError && <p className="error-message">*Bad Request</p>}
        <p className="paragraph">Already have an account?</p>
        <Link to="/login">
          <button type="button" className="sign-in-button">
            SIGN IN
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Register;
