import React from 'react'
import { Navbar, NavbarBrand } from "reactstrap";

export default function Nav() {
  return (
    <Navbar className="navbar navbar-dark bg-primary">
      <NavbarBrand href="/">JSON Transform: Team Techinatorz</NavbarBrand>
    </Navbar>
  )
}
