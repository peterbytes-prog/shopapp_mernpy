import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';


export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <section id='header'>
        <div>
          <Navbar expand="md" className='fixed-top' fixed='top'>
            <NavbarBrand href="/" className="mr-auto logo">
              <img src={require('../public/logo192.png')}/>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle}>
              <FontAwesomeIcon icon={faBars} />
            </NavbarToggler>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mx-auto" navbar>
                <NavItem>
                  <NavLink className='nav-link' to='/promos'>Deals</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='nav-link' to='/vegetables'>Vegetable</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='nav-link' to='/fruits'>Fruit</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      About Us
                    </DropdownItem>
                    <DropdownItem>
                      Contact Us
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Career
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </section>
    );
  }
}
