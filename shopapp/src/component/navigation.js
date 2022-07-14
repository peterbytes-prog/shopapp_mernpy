import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


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
              <img src='logo192.png'/>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle}>
              <FontAwesomeIcon icon={faBars} />
            </NavbarToggler>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mx-auto" navbar>
                <NavItem>
                  <Link className='nav-link' to='/promos'>Deals</Link>
                </NavItem>
                <NavItem>
                  <Link className='nav-link' to='/promos'>Vegetable</Link>
                </NavItem>
                <NavItem>
                  <Link className='nav-link' to='/promos'>Fruit</Link>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Option 1
                    </DropdownItem>
                    <DropdownItem>
                      Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Reset
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
