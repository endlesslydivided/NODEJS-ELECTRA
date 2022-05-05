import React, {useEffect, useState,useContext} from 'react';
import { Context } from "../index";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchOneDevice,fetchOneBrand,fetchAllRatingsByDevice, createBasketDevice, createRating,fetchBasketDevicesByUser} from "../http/deviceAPI";
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
  const {rating,user,basketDevice,successResult} = useContext(Context);
  const {id} = useParams();
  const [ratingAdd,setRatingAdd] = useState(0);

  
  const addToCart = () =>
  {
    const basketDeviceForm = new FormData();
    
    basketDeviceForm.append('userId', user.user.id);
    basketDeviceForm.append('deviceId',id);
    createBasketDevice(basketDeviceForm);
    if(user.isAuth && user.user.role !== "ADMIN")
    {
        fetchBasketDevicesByUser(basketDevice.page,basketDevice.limit,user.user.id).then((data)=>
        {
            basketDevice.setBasketDevices(data.rows);
            basketDevice.setTotalCount(data.count)
        })
    }
    successResult.setMessage("Товар успешно добавлен в корзину!");
  }

  const sendRating = (value) =>
  {
    const formData = new FormData()
    formData.append('userId', user.user.id)
    formData.append('deviceId', id)
    formData.append('rate', value)

    let ratingEnd = 0;

    createRating(formData).then(()=>
    {
      fetchAllRatingsByDevice(id).then(ratings =>
        {
          ratings.map((rate) => {ratingEnd +=Number.parseFloat(rate.rate)});
          ratingEnd = ratingEnd / (ratings.length === 0? 1 : ratings.length);
          rating.setRate(Number.parseFloat(ratingEnd.toFixed(1)));
          setRatingAdd(rating.rate);

        });
    }
    );
   
  }

  

  useEffect(() =>
  {
    fetchOneDevice(id).then(data => 
      {
        setDevice(data);
        fetchOneBrand(data.brandId).then(dataBrand =>
          setBrandName(dataBrand.name))

         
      }
    )
    let ratingEnd = 0;
    fetchAllRatingsByDevice(id).then(ratings =>
      {
        rating.setDeviceId(id);
        ratings.map((rate) => { ratingEnd +=Number.parseFloat(rate.rate)});
        ratingEnd = ratingEnd / (ratings.length === 0? 1 : ratings.length);
        rating.setRate(Number.parseFloat(ratingEnd.toFixed(1)));
        setRatingAdd(rating.rate);
      });
   
  },[])

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
              <div className="d-flex flex-row align-items-end" >
                <h1>{rating.rate}</h1>
              <ReactStars
                          style={{paddingTop:"-40px"}}
                          edit={true}
                          count={5}
                          value={ratingAdd}
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
              <Typography className={"w-25 text-center align-self-center  rounded-5"} style={{minHeight:'80px',fontWeight:"lighter",fontStyle:"italic"}} variant="h5" component="h5">
              $ {device.price} 
              </Typography>
              <Button variant={"outline-dark"} disabled={user.isAuth && user.user.role ==="ADMIN"} onClick={() => addToCart()} className={"w-75"}>Добавить в корзину</Button>
            </Row>
        </Col>
      </Row>
    
    </Container>
  )
})

export default DevicePage