import React, {useEffect,useState}from 'react';
import {Button, Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts";
import {fetchOneBrand} from "../http/deviceAPI"
import Star from '@mui/icons-material/Star';
import StarHalf from '@mui/icons-material/StarHalf';
import StarBorder from '@mui/icons-material/StarBorder';
import ReactStars from "react-rating-stars-component";

const DeviceItem = ({device}) => {
  const navigate = useNavigate ();
  const [brandName,setBrandName] = useState('')

  useEffect(() =>
  {

    fetchOneBrand(device.brandId).then(data =>
      setBrandName(data.name))
   
  },[])  
  
  return (
      <Col md={3} xs={6} className={"mt-3"}  >

        <Card className="shadow-sm" style={{borderRadius:'17px'}} border={"light "}>
            <Card.Img variant="top" className="mt-1" style={{cursor:'pointer',borderRadius:'17px'}}  src={process.env.REACT_APP_API_URL + device.image}/>

            <Card.Title className="text-center mt-1">{device.name}</Card.Title>
            <Card.Subtitle className="text-center text-muted">{brandName}</Card.Subtitle>
                
            <Card.Body className="text-center py-2 " >
                <div className='d-flex align-content-center justify-content-center mb-2'>

                        <div>{device.rating}</div>
                        <ReactStars
                        edit={false}
                        count={5}
                        value={device.rating}
                        size={17}
                        isHalf={true}
                        emptyIcon={<StarBorder/>}
                        halfIcon={<StarHalf/>}
                        fullIcon={<Star/>}
                        activeColor="#ffd700"
                        /> 
                </div>
                <Button 
                    onClick={() =>navigate(DEVICE_ROUTE + '/' + device.id, { replace: true })} 
                    className="btn-glow text-center">Просмотр</Button>
            </Card.Body>
            
                
        </Card>
      </Col>
)
}



export default DeviceItem