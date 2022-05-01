import { Box } from '@mui/system';
import React,{useEffect,useContext, useState} from 'react'
import { Container } from 'react-bootstrap';
import { fetchBasketDevices,fetchAllBasketDeviceByUser } from '../http/deviceAPI';
import { Dropdown} from "react-bootstrap";

import {Context} from '../index'
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from 'react-bootstrap/Table'
import {observer} from "mobx-react-lite";
import BasketTable from '../components/BasketTable';

import LocalAtmTwoToneIcon from '@mui/icons-material/LocalAtmTwoTone';
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';
import {Button} from "@mui/material";

const Basket = observer(() => {

  const [fullCost,setFullCost] = useState(0);
  const [payWay,setPayWay] = useState('');
        
  const {user,basketDevice} = useContext(Context);
  
  useEffect(() =>
  {
      getAllBasketDevices();
  },[])

  useEffect(() =>
  {
     
  },[payWay])
  
 
  const getAllBasketDevices = () =>
  {
      fetchAllBasketDeviceByUser(user.user.id).then(data => {
        setFullCost(data.reduce(function(p,c){return p+c.device.price;},0));
      })
  }
 
  
  return (<Container className="my-4  mx-3 mx-sm-auto glass-light p-3 ">
    <Row className=" align-items-center">
      <Col md={8}   >
        <BasketTable />
      </Col>
      <Col md={4} >
        <Table  className={"p-0 p-sm-0 bg-light border-none   p-md-0"}>
          <tbody>
            <tr>
              <td className={"p-0 px-2 pt-2"}><h5>Итого</h5></td>
              <td className={"p-0 px-2 pt-2"}><h5 className=" text-end">{fullCost}$</h5></td>
            </tr>
            <tr>
              <td  className={"p-0 px-2 pt-2"}><h6 className="text-muted">Товары,{basketDevice.totalCount} штуки</h6></td>
              <td  className={"p-0 px-2 pt-2"}><h6 className="text-end text-muted">{fullCost}$</h6></td>
            </tr>
            <tr>
              <td  className={"p-0 px-2 pt-2"}><h6 className="text-muted">Скидка</h6></td>
              <td  className={"p-0 px-2 pt-2"}><h6 className="text-end text-muted">0$</h6></td>
            </tr>
            <tr>
              <td  className={"p-0 px-2 pt-2"}><h6 className="text-muted">Доставка</h6></td>
              <td  className={"p-0 px-2 pt-2"}><h6 className="text-end text-muted">Бесплатно</h6></td>
            </tr>

          </tbody>    
        </Table>
        <Table  className={"p-0 p-sm-0 bg-light border-none   p-md-0"}>
          <tbody>
            <tr>
              <td className={"p-0 px-2 pt-2"}><h5>Способ оплаты:</h5></td>
            </tr>
            <tr>
              <td  className={"p-0 px-2 py-2"}>
              <Dropdown >
                  <Dropdown.Toggle className="rounded-0  w-100" variant={"outline-dark"}> 
                  {
                    payWay ?
                    (
                      payWay === "Картой" ?
                    <span><CreditCardTwoToneIcon className="mx-2"/> {payWay}</span>
                    :
                    <span className="text-wrap"><LocalAtmTwoToneIcon className="mx-2"/> {payWay}</span>
                  )
                  :
                  "Способ оплаты"
                   
                  }</Dropdown.Toggle>
                  <Dropdown.Menu className={"m-0"}>
                    <Dropdown.Item
                        onClick={e => setPayWay(e.target.text)}
                        value={"Картой"}
                        key={0}
                    >
                        <CreditCardTwoToneIcon className="mx-2"/>Картой
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={e => setPayWay(e.target.text)}
                        value={"Наличными"}
                        key={2}
                    >
                        <LocalAtmTwoToneIcon className="mx-2"/> Наличными, картой курьеру
                    </Dropdown.Item>
                   
                     
                  </Dropdown.Menu>
              </Dropdown>
              </td>
              
            </tr>
            <tr>
              <td>
              <Button
                        variant="contained"
                        color="secondary"
                        className="rounded-100 neo  w-100"
                    >
                       Заказать
                    </Button>
              </td>
            </tr>

          </tbody>
          
        </Table>
      </Col>
    </Row>
  </Container>
  )
})

export default Basket