import React, { Component } from 'react';
import {
  Container,
  Row ,
  DropdownItem,
} from 'reactstrap';

import ProductCard from './product_card';


export default function DepartmentProductList({department_name, products}){
  const productCards = products.map((product)=>{
    return(
      <div key={product._id} className="col-sm-12 col-md-6 col-lg-4 my-1">
          <ProductCard  product={product} />
      </div>

    )
  });
  return(
    <div>
      <Container fluid>
        {department_name?<div>
          <DropdownItem divider />
          <h1><strong>{department_name}</strong></h1>
          <DropdownItem divider />
          <br/>
          </div>:null}
        <Container fluid>
          <Row className="p-0">
            { productCards }
          </Row>
        </Container>
      </Container>
    </div>
  )
}
