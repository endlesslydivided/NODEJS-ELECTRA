import React, {useEffect,useState,useRef}from 'react';
import {Button, Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts";
import {fetchOneBrand,fetchAllRatingsByDevice} from "../http/deviceAPI"
import Star from '@mui/icons-material/Star';
import StarHalf from '@mui/icons-material/StarHalf';
import StarBorder from '@mui/icons-material/StarBorder';
import ReactStars from "react-rating-stars-component";
import { Divider } from '@mui/material';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";

const DeviceItem = ({device}) => {
  const navigate = useNavigate ();
  const [brandName,setBrandName] = useState('')
  const [rateDevice,setRateDevice] = useState(0)

  let ratingEnd = 0;

  fetchAllRatingsByDevice(device.id).then(ratings =>
    {
      ratings.map((rate) => {ratingEnd +=Number.parseFloat(rate.rate)});
      ratingEnd = ratingEnd / (ratings.length === 0? 1 : ratings.length);
      setRateDevice(Number.parseFloat(ratingEnd.toFixed(1)));
    });
    useEffect(() =>
    {
  
        
    },[rateDevice])  

  useEffect(() =>
  {
    fetchOneBrand(device.brandId).then(data =>
      {
        setBrandName(data.name);
      })
      
      
  },[])  

  
  
  
  return (
      <Col md={3} xs={6} className={"mt-3"} >

        <Card className="shadow-sm h-100" style={{borderRadius:'17px'}} border={"light "}>
            <Card.Img variant="top" className="mt-2" style={{cursor:'pointer',borderRadius:'17px'}}  src={process.env.REACT_APP_API_URL + device.image}/>
            <Divider/>

            <Card.Title className="text-center mt-1">{device.name}</Card.Title>
                
            <Card.Body className="py-2 " >
                <Container className='px-0 align-content-center justify-content-center mb-2'>
                <Card.Subtitle className=" text-muted">{brandName}</Card.Subtitle>

                  <Row className="d-flex flex-row align-items-center">
                  <h6 className="col-2  pe-0 my-0 align-self-center">{rateDevice}</h6>
                  <Star color={"warning"} className="col-1 ps-1 pe-4  align-self-center mx-1 w-25 m-0"/>
                       
                  </Row>
                  <Row>
                        <div style={{fontWeight:"light",fontStyle:"italic"}}>{device.price}$</div>
                  </Row>
                </Container>
              
            </Card.Body>
            <Card.Footer>
            <Button 
                    onClick={() =>navigate(DEVICE_ROUTE + '/' + device.id)} 
                    className="btn-glow w-100 text-center">Просмотр</Button>
            </Card.Footer>
                
        </Card>
      </Col>
)
}



export default DeviceItem