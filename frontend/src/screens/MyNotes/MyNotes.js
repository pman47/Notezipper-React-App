import { Button } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";

const MyNotes = () => {
  return (
    <MainScreen title="Welcome back Manish Prajapati...">
      <Link to="createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Note
        </Button>
      </Link>
    </MainScreen>
  );
};

export default MyNotes;
