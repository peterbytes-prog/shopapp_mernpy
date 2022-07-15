import React, { Component } from 'react';
import {
  Container,
  Row ,
  DropdownItem,
} from 'reactstrap';
import DepartmentCard from './department_card';
import ShopJumbotron from './shop_jumbotron';
import MainCarousel from './carousel';



export default class Home extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    return (
      <div>
        <ShopJumbotron />
        <div className='mb-5 mt-3 mx-sm-0 mx-md-2 mx-lg-4' >

          <br/>
          <DropdownItem divider />
          <h1><strong>Promotions</strong></h1>
          <DropdownItem divider />
          <br/>
          <Container fluid>
            <MainCarousel items={this.props.deals.map((deal)=>({
              caption:deal.detail,
              detail:"",
              image:deal.product.images[0].path,
              src:deal.product.images[0].path

            }))}/>
          </Container>

          <br/>
          <DropdownItem divider />
          <h1><strong>Explore</strong></h1>
          <DropdownItem divider />
          <br/>
          <Container fluid>
            <Row className="p-0">
              <DepartmentCard src='fruits.jpg' title='Fruits' text='Our Fruits Are More Than Just Another Refreshment, They Are Delicacies!'/>
              <DepartmentCard src='vegetables.jpg' title='Vegetables' text='Healthiest Vegetables You Can Eat, According to a Nutritionist'/>
              <DepartmentCard src='sales.jpg' title='Promos' text='With All These Sales, You Might Accidentally Over Ordered. Shop Carefully!'/>
            </Row>
          </Container>
        </div>

      </div>
    )
  }
}
