import React, { Component } from 'react';
import {
  Container,
  DropdownItem,
} from 'reactstrap';
import DepartmentCard from './department_card';


export default function DepartmentHeader(){
  return (
    <div>
      <br/>
      <DropdownItem divider />
      <h3><strong>Explore</strong></h3>
      <DropdownItem divider />
      <br/>
      <Container style={{'overflow-y':'hidden'}} fluid>
        <div className="p-0 header-cards-container">
          <DepartmentCard src='fruits.jpg' title='Fruits' text='Our Fruits Are More Than Just Another Refreshment, They Are Delicacies!'/>
          <DepartmentCard src='vegetables.jpg' title='Vegetables' text='Healthiest Vegetables You Can Eat, According to a Nutritionist'/>
          <DepartmentCard src='sales.jpg' title='Sales' text='With All These Sales, You Might Accidentally Over Ordered. Shop Carefully!'/>
        </div>
      </Container>
    </div>
  );
}
