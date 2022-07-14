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
import ShopJumbotron from './shop_jumbotron';


class PromoCarousel extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeIndex: 0,
      items : props.deals || []
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
      <div>
        <ShopJumbotron />
        <div className='mb-5 mt-3 mx-sm-0 mx-md-2 mx-lg-4' >

          <br/>
          <DropdownItem divider />
          <h1><strong>Promotions</strong></h1>
          <DropdownItem divider />
          <br/>
          <Container fluid>
            <PromoCarousel deals={this.props.deals}/>
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

      </div>
    )
  }
}
