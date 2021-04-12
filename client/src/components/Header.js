import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { HelmetProvider } from "react-helmet-async";
import { Redirect, useHistory } from "react-router";
const Header = () => {
  const history = useHistory();
  const buyer = localStorage.getItem("buyerToken");
  useEffect(() => {
    if (!buyer) {
      <Redirect to={"/login"} />;
    } else {
      <Redirect to={"/"} />;
    }
  }, [buyer, history]);

  const logout = (e) => {
    e.preventDefault();
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
            {buyer ? (
              <>
                {buyer && (
                  <LinkContainer to="/user">
                    <Nav.Link>Profile</Nav.Link>
                  </LinkContainer>
                )}
                <LinkContainer to="/echere">
                  <Nav.Link>Enchere</Nav.Link>
                </LinkContainer>
                <LinkContainer onClick={logout} to="/">
                  <Nav.Link>logout</Nav.Link>
                </LinkContainer>
              </>
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
