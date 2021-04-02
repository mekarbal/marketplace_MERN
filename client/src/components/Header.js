import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { HelmetProvider } from "react-helmet-async";
import { Redirect } from "react-router";
const Header = ({ history }) => {
  let [token, setToken] = useState("");
  const tokenFromStorage = localStorage.getItem("buyerToken");
  const sellerToken = localStorage.getItem("sellerToken");

  useEffect(() => {
    tokenFromStorage !== undefined && setToken(tokenFromStorage);
    if (token) {
      <Redirect to={"/"} />;
    }
  }, [token, history]);

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <HelmetProvider>
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>YouCode MarketPlace</Navbar.Brand>
          </LinkContainer>
          <Nav className="ml-auto">
            {token || sellerToken ? (
              <LinkContainer onClick={logout} to="/">
                <Nav.Link>logout</Nav.Link>
              </LinkContainer>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>SignIn/Sign Up</Nav.Link>
              </LinkContainer>
            )}
            <Nav.Link>
              <div id="google_translate_element"></div>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </HelmetProvider>
  );
};

export default Header;
