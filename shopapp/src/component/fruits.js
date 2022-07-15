import React, { Component } from 'react';
import ProductCard from './product_card';
import DepartmentHeader from './department_header';
import DepartmentProductList from './department_product_list';

export default class FruitsPage extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    const productCards = this.props.products.map((product)=>{
      return(
        <div className="col-sm-12 col-md-6 col-lg-4 my-1">
            <ProductCard product={product} />
        </div>

      )
    });
    return (
      <div className='mt-5'>
        <div style={{'overflow-x':'scroll'}} className='mb-5 mt-3 mx-sm-0 mx-md-2 mx-lg-4' >

          <DepartmentHeader />
          <DepartmentProductList products={this.props.products} department_name="Fruits" />
        </div>

      </div>
    )
  }
}
