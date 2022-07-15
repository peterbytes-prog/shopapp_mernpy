import React from 'react';
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText
} from 'reactstrap';
import { Link } from 'react-router-dom';



export default function DepartmentCard(props){
  return (
    <div className='col-xs-12 col-md-6 col-lg-4 p-0 my-2'>
      <Card className='mx-md-2'>
        <div>
        <CardImg width='100%' src={props.src} />
        </div>

        <CardImgOverlay>
          <div className="cardoverlay-contents">
            <CardText>
              {props.text}
            </CardText>
            <div className="text-left">
              <Link to={`/${props.title.toLowerCase()}`} className='btn btn-outline-success text-light px-5'>
                {props.title}
              </Link>
            </div>
          </div>
        </CardImgOverlay>
      </Card>
    </div>

  )
}
