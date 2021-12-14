import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://us.123rf.com/450wm/in8finity/in8finity2102/in8finity210200010/163266187-cute-man-character-with-mustache-cartoon-style-userpic-icon-vector.jpg?ver=6"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwords Do not Match");
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        setLoading(true);

        const { data } = await axios.post(
          "/api/users",
          { name, pic, email, password },
          config
        );
        console.log(data);

        setLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
        setError(error.response.data.message);
      }
    }
  };

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "noteZipper");
      data.append("cloud_name", "pmanish47");
      fetch("https://api.cloudinary.com/v1_1/pmanish47/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please select an Image");
    }
  };

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic" className="mb-3">
            <Form.Label>Profile Pic</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mb-3">
            Register
          </Button>
        </Form>
        <Row>
          <Col>
            Already Have an Account ?{" "}
            <Link to="/login" style={{ color: "blue" }}>
              Login here
            </Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
