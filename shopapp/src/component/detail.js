import React from 'react';
import {
    Row,
    Container,
    DropdownItem,
    Button
} from 'reactstrap';
import MainCarousel from './carousel';
import DepartmentHeader from './department_header';
import DepartmentProductList from './department_product_list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';



export default function DetailPage({products, productId}){

  let product = products.filter((product)=>product._id === productId)[0];

  const other_products = products.filter((prd)=>prd.department== product.department);
  const deal_price = product.promo.length>0?<span className="text-muted sale-original-price">{(product.price/100).toFixed(2)}</span>:null;
  const price = product.promo.length>0?product.promo[0].price:product.price;
  const items = product.images.map((image)=>({
    image:image.path,
    detail:"",
    src:image.path
  }));
  return(
    <Container className="mt-5" fluid>

      <DepartmentHeader />

      <br/>
      <DropdownItem divider />
      <h4><strong>{product.name}</strong></h4>
      <DropdownItem divider />
      <br/>

      <Row>

        <div className="col-xs-12 col-sm-12 col-md-6">
          <MainCarousel items={items}/>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6">
          <Container>
            <p>{product.description}</p>
            <p>${deal_price} {(price/100).toFixed(2)}/{ product.unit }</p>
            <p><Button className='btn-success px-5'><FontAwesomeIcon icon={faPlus}/> Cart</Button></p>
          </Container>
        </div>
        <div className="col-xs-12 col-sm-12">
          <br/>
          <DropdownItem divider />
          <h5><strong>Related Items</strong></h5>
          <DropdownItem divider />
          <br/>
          <DepartmentProductList products={other_products}/>
        </div>
      </Row>
    </Container>
  );
}
