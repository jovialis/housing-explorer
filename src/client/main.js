import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import { render } from "react-dom";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RateHouses, {Index} from "./pages/rateHouses";
import {Header} from "./components/header";

import CompletedPage from "./pages/completed";
import LoginPage from "./pages/login";
import SelectZipPage from "./pages/selectZip";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "shards-react";

const StyledNavBar = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid #ebebeb;
`;

const GridBase = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "hd"
    "main"
    "ft";

  @media (min-width: 500px) {
    grid-template-columns: 40px 50px 1fr 50px 40px;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "hd hd hd hd hd"
      "sb sb main main main"
      "ft ft ft ft ft";
  }
`;


// this is the base of the website
class MyApp extends Component {
    constructor(props) {
        super(props);

        // If the user has logged in, grab info from sessionStorage
        const preloaded = window.__PRELOADED_STATE__ || {};
        this.state = {
            status: preloaded.state,
            respondent: preloaded.respondent,
            zip: preloaded.zip
        };

        // just gotta do this cause React
        this.renderStatus = this.renderStatus.bind(this);
        this.updateStatus = this.updateStatus.bind(this);

        this.setRespondent = this.setRespondent.bind(this);
        this.updateZIP = this.updateZIP.bind(this);
    }

    setRespondent(rid) {
        this.setState({
            respondent: rid
        });
    }

    updateZIP(zip) {
        this.setState({
            zip
        });
    }

    updateStatus(status) {
        this.setState({
            status
        });
    }

    // is the respondent logged in?
    renderStatus() {
        switch (this.state.status) {
            case 'select_zip':
                return <SelectZipPage
                    updateStatus={this.updateStatus}
                    updateZIP={this.updateZIP}
                />
            case 'rank_houses':
                return <RateHouses
                    updateStatus={this.updateStatus}
                />
            case 'completed':
                return <CompletedPage
                />
            default:
                return <LoginPage
                    updateStatus={this.updateStatus}
                    setRespondent={this.setRespondent}
                />
        }
    }

    render() {
        return (
            <div style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column"
            }}>
                <StyledNavBar>
                    <Navbar theme={"white"}>
                        <Nav>
                            <NavItem>
                                <NavLink disabled style={{
                                    display: "inline-flex",
                                    alignItems: "center"
                                }}>
                                    🏡 Housing Explorer
                                    {this.state.respondent && (
                                        ` (${this.state.respondent}${ this.state.zip ? `, ZIP: ${this.state.zip}` : ""})`
                                    )}
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </StyledNavBar>
                <div style={{
                    flexGrow: 1
                }}>
                    {this.renderStatus()}
                    {/*<Routes>*/}
                    {/*    <Route path={"/"} render={this.renderStatus}/>*/}
                    {/*</Routes>*/}
                </div>
                <div style={{
                    marginTop: "4rem",
                    height: "6rem",
                    backgroundColor: "#ebebeb",
                    color: "gray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    Copyright {new Date().getFullYear()}
                </div>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <MyApp />
        </BrowserRouter>
    </React.StrictMode>
);


// render(<MyApp />, document.getElementById("app"));
