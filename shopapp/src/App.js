import logo from './logo.svg';
import React, { Component } from 'react';
import Navigation from './component/navigation';
import Home from './component/home';
import PromoPage from './component/promos';
import VegetablesPage from './component/vegetables';
import FruitsPage from './component/fruits';
import DetailPage from './component/detail';
import Footer from './component/footer';
import fecth from 'cross-fetch';

import './App.css';
import { useParams, Router, BrowserRouter, Route, Routes, Link } from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      deals:{
        loading: false,
        is_error:false,
        deals:[]
      },
      products:{
        loading: false,
        is_error:false,
        products:[]
      }
    }
  }
  componentDidMount(){
    this.setState({products:{...this.state.products, loading:true}})
    this.setState({deals:{...this.state.deals, loading:true}})

    //fetch product
    fecth('http://localhost:3001/products')
    .then((resp)=>{
      if(resp.ok){
        return resp.json()
      }
      throw new Error(resp.status_code)
    },(err)=>{ throw err})
    .then((data)=>{
      this.setState({products:{...this.state.products, loading:false, is_error:false, products:data}})
    },(err)=>{throw err})
    .catch(err => {
      this.setState({products:{...this.state.products, loading:false, is_error:true, products:[]}})
    });

    // fetch deals

    fecth('http://localhost:3001/deals')
    .then((resp)=>{
      if(resp.ok){
        return resp.json()
      }
      throw new Error(resp.status_code)
    },(err)=>{ throw err})
    .then((data)=>{
      this.setState({deals:{...this.state.deals, loading:false, is_error:false, deals:data}})
    },(err)=>{throw err})
    .catch(err => {
      this.setState({deals:{...this.state.deals, loading:false, is_error:true, deals:[]}})
    })



  }
  render(){
    let RouteDetail = (props) => {
      let params = useParams();
      return <DetailPage productId={params.productId} products={this.state.products.products}/>
    }
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path='/' element={<Home deals={this.state.deals.deals}/>} />
            <Route path='/products/:productId' element={<RouteDetail />} />

            <Route exact path='/promos' element={<PromoPage products={this.state.products.products.filter((product)=>product.promo.length>0)}/>} />
            <Route exact path='/vegetables' element={<VegetablesPage products={this.state.products.products.filter((product)=>product.department==='vegetables')}/>} />
            <Route exact path='/fruits' element={<FruitsPage products={this.state.products.products.filter((product)=>product.department==='fruits')}/>} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
