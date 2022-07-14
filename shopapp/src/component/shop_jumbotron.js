import React, { Component } from 'react';
import { Jumbotron, Container } from 'reactstrap';


class ShopJumbotron extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <Jumbotron text='center' className='text-center main-jumbotron' fluid>
        <Container fluid className='intro'>
          <img src='logo192.png'/>
          <h1>Proudly Serving Produce <br/>From Local Farmers To Local Customers</h1>
          <button className='btn btn-outline-light'>View Deals</button>
        </Container>
      </Jumbotron>)
  }
}

export default ShopJumbotron;
