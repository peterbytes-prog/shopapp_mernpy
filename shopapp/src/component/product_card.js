import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({product}) => {
  const deal_price = product.promo.length>0?<span className="text-muted sale-original-price">{(product.price/100).toFixed(2)}</span>:null;
  const price = product.promo.length>0?product.promo[0].price:product.price;
  return (
    <div>
      <Card className='product-cards'>
        <div className="product-card-image-wrapper">
          <CardImg top width="100%" src={product.images[0].path} alt="Card image cap" />
        </div>
        <CardBody>

          <Link to={`/products/${product._id}`} className='card-title'>{product.name}</Link>
          <CardSubtitle>$ {deal_price} {(price/100).toFixed(2)}/{product.unit}</CardSubtitle>
          <CardText>{product.description}</CardText>
          <Button className='btn-success'><FontAwesomeIcon icon={faPlus}/> Cart</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductCard;
