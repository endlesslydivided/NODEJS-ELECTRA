import React, {useEffect, useState,useContext} from 'react';
import { Context } from "../index";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchOneDevice,fetchOneBrand,fetchAllRatingsByDevice, createBasketDevice, createRating} from "../http/deviceAPI";
import { Typography } from '@mui/material';
import ReactStars from "react-rating-stars-component";
import Star from '@mui/icons-material/Star';
import StarHalf from '@mui/icons-material/StarHalf';
import StarBorder from '@mui/icons-material/StarBorder';
import { Divider } from '@mui/material';
import { observer } from 'mobx-react-lite';

const DevicePage = observer(() => {
  const [device,setDevice] = useState({info: []});

  const [brandName,setBrandName] = useState("");
  const {rating,user} = useContext(Context);
  const {id} = useParams();

  useEffect(()=>
  {
    
    fetchOneDevice(id).then(data => 
      {
        setDevice(data);
        fetchOneBrand(data.brandId).then(dataBrand =>
          setBrandName(dataBrand.name))

          fetchAllRatingsByDevice(id).then(ratings =>
        {
          rating.setDeviceId(id);
          rating.setRate(((ratings.reduce((a, b) => a + b, 0) / ratings.length) || 0).toFixed(1))
        });
      }
    )
  },[])

  const addToCart = () =>
  {
    const basketDevice = new FormData();
    
    basketDevice.append('userId', user.user.id);
    basketDevice.append('deviceId',id);
    createBasketDevice(basketDevice);
    
  }

  const sendRating = (value) =>
  {


    const formData = new FormData()
    formData.append('userId', user.user.id)
    formData.append('deviceId', id)
    formData.append('rate', value)


    createRating(formData);
    fetchAllRatingsByDevice(id).then(ratings =>
      {
        rating.setRate(((ratings.reduce((a, b) => a.rate + b.rate, 0) / ratings.length) || 0).toFixed(1))
      });
  }

  return (
    <Container className="my-4 py-md-2 px-md-4  px-sm-4 
     bg-light ">
      <Row>
        <Col md={4} style={{minWidth:'200px',minHeight:'500px',}} className={"p-0  d-flex "} >
          <Image className={"align-self-center justify-self-center mx-auto d-block img-fluid"} src={process.env.REACT_APP_API_URL + device.image}/>
        </Col>
        <Col className={"d-flex flex-column"}  md={8}>
         
            <Typography className={"m-0 p-0"} variant="h3" component="h3">
                {device.name}
            </Typography>      
            <Typography className={"text-muted m-0 p-0"}  variant="h5" component="h4">
                {brandName}

            </Typography>  
              <div>{rating.rate}
              <ReactStars
                          style={{paddingTop:"-40px"}}
                          edit={true}
                          count={5}
                          value={rating.rate}
                          size={45}
                          isHalf={true}
                          onChange={(value) => sendRating(value)}
                          emptyIcon={<StarBorder/>}
                          halfIcon={<StarHalf/>}
                          fullIcon={<Star/>}
                          activeColor="#ffd700"
                          label={device.rating} 
                          />   
              </div> 
            <Divider/>
            <Row className=" m-3">
              <h1>Характеристики</h1>
              {device.info.map((info,index)=>
                <Row key={info.id} style={{background: index % 2 ===0?'lightgrey':'transparent'}}>
                  {info.title}: {info.description}
                </Row>)}
            </Row>
            <Divider/>
            <Row className={"my-3  m-0 d-flex  align-items-baseline"}>
              <Typography className={"w-25"} style={{fontWeight:"lighter",fontStyle:"italic"}} variant="h5" component="h5">
                  {device.price} $
              </Typography>
              <Button variant={"outline-dark"} onClick={() => addToCart()} className={"w-75"}>Добавить в корзину</Button>
            </Row>
        </Col>
      </Row>
    
    </Container>
  )
})

export default DevicePage