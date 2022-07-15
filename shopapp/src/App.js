import logo from './logo.svg';
import React, { Component } from 'react';
import Navigation from './component/navigation';
import Home from './component/home';
import PromoPage from './component/promos';
import VegetablesPage from './component/vegetables';
import FruitsPage from './component/fruits';
import Footer from './component/footer';
import './App.css';
import { Router, BrowserRouter, Route, Routes, Link } from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      deals:[
                {
                   "_id": "62ce9ab78c6c7df2b24e681f",
                   "product": {
                       "_id": "62ce93d8b31e1af421762079",
                       "description": "Whether sautéed, raw or chopped up in a salad, these rainbow peppers bring flavour, crunch and colour to any meal. Cut them into slices and serve with hummus for a great appetizer, or cook them in a stir fry as a tasty entrée. Invigorate your cooking with this multi-pack. The colour options may change depending on the season and availability.",
                       "name": "Mixed Bell Peppers",
                       "price": 89,
                       "unit": "piece",
                       "images": [
                           {
                               "path": "http://localhost:3001/images/products/bellpepper_2.jpg",
                               "_id": "62ce93d8b31e1af42176207b"
                           },
                           {
                               "path": "http://localhost:3001/images/products/bellpepper_1.jpg",
                               "_id": "62ce93d8b31e1af42176207c"
                           }
                       ],
                       "createdAt": "2022-07-13T09:43:52.734Z",
                       "updatedAt": "2022-07-13T09:43:52.737Z",
                       "__v": 0
                   },
                   "detail": "Summer sizzle",
                   "price": 50,
                   "createdAt": "2022-07-13T10:13:11.351Z",
                   "updatedAt": "2022-07-13T10:13:11.351Z",
                   "__v": 0
               },
                {
                   "_id": "62ce9b568c6c7df2b24e6822",
                   "product": {
                       "_id": "62ce91c5b31e1af42176206b",
                       "description": "Oranges are round, orange-colored citrus fruits that grow on trees. They originally came from China, but today these nutritious powerhouses are grown in warm climates around the world.",
                       "name": "Seasonal Orange",
                       "price": 399,
                       "unit": "ea",
                       "images": [
                           {
                               "path": "http://localhost:3001/images/products/oranges_1.jpg",
                               "_id": "62ce91c6b31e1af42176206d"
                           },
                           {
                               "path": "http://localhost:3001/images/products/oranges_2.jpg",
                               "_id": "62ce91c6b31e1af42176206e"
                           },
                           {
                               "path": "http://localhost:3001/images/products/oranges_3.jpg",
                               "_id": "62ce91c6b31e1af42176206f"
                           }
                       ],
                       "createdAt": "2022-07-13T09:35:01.970Z",
                       "updatedAt": "2022-07-13T09:35:01.990Z",
                       "__v": 0
                   },
                   "detail": "Seen Orange",
                   "price": 299,
                   "createdAt": "2022-07-13T10:15:50.833Z",
                   "updatedAt": "2022-07-13T10:15:50.833Z",
                   "__v": 0
               }
             ],
      products:[
                {
                    "_id": "62ce8dc4ddd16cd7f2d8bc7f",
                    "description": "lorem ipsum demo product",
                    "name": "scotch pepper",
                    "price": 299,
                    "images": [
                        {
                            "path": "http://localhost:3001/images/products/martin-adams-_LGlGi3KJIA-unsplash.jpg",
                            "_id": "62ce8dc4ddd16cd7f2d8bc81"
                        }
                    ],
                    "createdAt": "2022-07-13T09:17:56.075Z",
                    "updatedAt": "2022-07-13T09:17:56.090Z",
                    "__v": 0,
                    "department": "vegetables",
                    "unit": "lb",
                    "promo": []
                },
                {
                    "_id": "62ce91c5b31e1af42176206b",
                    "description": "Oranges are round, orange-colored citrus fruits that grow on trees. They originally came from China, but today these nutritious powerhouses are grown in warm climates around the world.",
                    "name": "Seasonal Orange",
                    "price": 399,
                    "unit": "ea",
                    "images": [
                        {
                            "path": "http://localhost:3001/images/products/oranges_1.jpg",
                            "_id": "62ce91c6b31e1af42176206d"
                        },
                        {
                            "path": "http://localhost:3001/images/products/oranges_2.jpg",
                            "_id": "62ce91c6b31e1af42176206e"
                        },
                        {
                            "path": "http://localhost:3001/images/products/oranges_3.jpg",
                            "_id": "62ce91c6b31e1af42176206f"
                        }
                    ],
                    "createdAt": "2022-07-13T09:35:01.970Z",
                    "updatedAt": "2022-07-13T09:35:01.990Z",
                    "__v": 0,
                    "department": "fruits",
                    "promo": [
                        {
                            "_id": "62ce9b568c6c7df2b24e6822",
                            "product": "62ce91c5b31e1af42176206b",
                            "detail": "Seen Orange",
                            "price": 299,
                            "createdAt": "2022-07-13T10:15:50.833Z",
                            "updatedAt": "2022-07-13T10:15:50.833Z",
                            "__v": 0
                        }
                    ]
                },
                {
                    "_id": "62ce92b5b31e1af421762071",
                    "description": "Carrots are a cool-season crop grown in spring. They are an excellent source of vitamin A and add color to a meal. They can be served cooked or raw.",
                    "name": "Long Carrot",
                    "price": 99,
                    "unit": "ea",
                    "images": [
                        {
                            "path": "http://localhost:3001/images/products/carrot.jpg",
                            "_id": "62ce92b5b31e1af421762073"
                        }
                    ],
                    "createdAt": "2022-07-13T09:39:01.759Z",
                    "updatedAt": "2022-07-13T09:39:01.763Z",
                    "__v": 0,
                    "department": "vegetables",
                    "promo": []
                },
                {
                    "_id": "62ce932bb31e1af421762075",
                    "description": "Strawberries are low-growing herbaceous plants with a fibrous root system and a crown from which arise basal leaves.",
                    "name": "Strawberries",
                    "price": 599,
                    "unit": "lb",
                    "images": [
                        {
                            "path": "http://localhost:3001/images/products/strawberry.jpg",
                            "_id": "62ce932bb31e1af421762077"
                        }
                    ],
                    "createdAt": "2022-07-13T09:40:59.195Z",
                    "updatedAt": "2022-07-13T09:40:59.199Z",
                    "__v": 0,
                    "department": "fruits",
                    "promo": []
                },
                {
                    "_id": "62ce93d8b31e1af421762079",
                    "description": "Whether sautéed, raw or chopped up in a salad, these rainbow peppers bring flavour, crunch and colour to any meal. Cut them into slices and serve with hummus for a great appetizer, or cook them in a stir fry as a tasty entrée. Invigorate your cooking with this multi-pack. The colour options may change depending on the season and availability.",
                    "name": "Mixed Bell Peppers",
                    "price": 89,
                    "unit": "piece",
                    "images": [
                        {
                            "path": "http://localhost:3001/images/products/bellpepper_2.jpg",
                            "_id": "62ce93d8b31e1af42176207b"
                        },
                        {
                            "path": "http://localhost:3001/images/products/bellpepper_1.jpg",
                            "_id": "62ce93d8b31e1af42176207c"
                        }
                    ],
                    "createdAt": "2022-07-13T09:43:52.734Z",
                    "updatedAt": "2022-07-13T09:43:52.737Z",
                    "__v": 0,
                    "department": "vegetables",
                    "promo": [
                        {
                            "_id": "62ce9ab78c6c7df2b24e681f",
                            "product": "62ce93d8b31e1af421762079",
                            "detail": "Summer sizzle",
                            "price": 50,
                            "createdAt": "2022-07-13T10:13:11.351Z",
                            "updatedAt": "2022-07-13T10:13:11.351Z",
                            "__v": 0
                        }
                    ]
                }
            ]
    }
  }
  render(){
    console.log(this.state.products.filter((product)=>product.department==='vegetables'))
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path='/' element={<Home deals={this.state.deals}/>} />
            <Route path='/promos' element={<PromoPage products={this.state.products.filter((product)=>product.promo.length>0)}/>} />
            <Route path='/vegetables' element={<VegetablesPage products={this.state.products.filter((product)=>product.department==='vegetables')}/>} />
            <Route path='/fruits' element={<FruitsPage products={this.state.products.filter((product)=>product.department==='fruits')}/>} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
