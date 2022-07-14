import React, { Component } from 'react';
import {
  Container,
  Row ,
  DropdownItem,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import DepartmentCard from './department_card';


class PromoCarousel extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeIndex: 0,
      items : [
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
              ]
    }
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }
  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  render(){


    const items = this.state.items;
    const activeIndex = this.state.activeIndex;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.product.images[0].path}
        >
          <img src={item.product.images[0].path} alt={item.detail} className='carousel-images'/>
          <CarouselCaption captionText={item.detail} captionHeader={item.caption} className="carousel-caption"/>
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );

  }

}

export default class Home extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    return (
      <div className='mb-5 mt-3 mx-sm-0 mx-md-2 mx-lg-4' >

        <br/>
        <DropdownItem divider />
        <h1><strong>Promotions</strong></h1>
        <DropdownItem divider />
        <br/>
        <Container fluid>
          <PromoCarousel />
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
            <DepartmentCard src='sales.jpg' title='Sales' text='With All These Sales, You Might Accidentally Over Ordered. Shop Carefully!'/>
          </Row>
        </Container>
      </div>
    )
  }
}
