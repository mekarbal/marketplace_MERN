import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PayementSuccess = () => {
  return (
    <div className="mb-5">
      Payement Pass Successfully
      <Link to="/">
        <Button>Go To Home</Button>
      </Link>
    </div>
  );
};

export default PayementSuccess;
