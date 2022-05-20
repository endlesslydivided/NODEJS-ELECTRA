import React, {useContext, useEffect,useState} from 'react';
import {Container, Image} from "react-bootstrap";

import Clear from '@mui/icons-material/Clear';
import { fetchAllBasketDeviceByUser, deleteBasketDevice, fetchBasketDevicesByUser } from '../http/deviceAPI';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Pages from "./Pages";
import Table from 'react-bootstrap/Table'
import {Button} from "@mui/material";



const BasketTable = observer(({tableCallback}) => 
    {
        
        
        const {user,basketDevice} = useContext(Context);
        
        
        useEffect(() =>
        {
            fetchBasketDevices();
        },[basketDevice.page,])
        
        const fetchBasketDevices = ()=>
        {
            fetchBasketDevicesByUser(basketDevice.page,basketDevice.limit,user.user.id).then((data)=>
          {
              basketDevice.setBasketDevices(data.rows);
              basketDevice.setTotalCount(data.count)

          })
        }
    
        
        const handleDeleteBasketDevice = async (id) =>
        {
            let count = 0;
            deleteBasketDevice(id).then(() =>
            {
                if(user.isAuth && user.user.role !== "ADMIN")
                {
                    fetchBasketDevicesByUser(basketDevice.page,basketDevice.limit,user.user.id).then((data)=>
                    {
                        basketDevice.setBasketDevices(data.rows);
                        basketDevice.setTotalCount(data.count);
                        
                    })
                    fetchAllBasketDeviceByUser(user.user.id).then(data => 
                    {
                        data.map((bd) => {count +=Number.parseFloat(bd.device.price)});
                        tableCallback(count);
                      })
                }
                
            })
           
        }
        
        return ( <Container className='p-0 p-sm-0    p-md-0'>      
        <Table striped responsive className={" neo table-light shadow"}>
            
            <thead className={"bg-light"}>
                <tr>
                    <th colSpan={3}>Корзина, {basketDevice.totalCount}</th>
                
                </tr>
            </thead>
            <tbody className=" text-center align-middle">
            {basketDevice !== undefined ?
                
                basketDevice.basketDevices.map((basketDeviceItem) =>
                    (
                    <tr key={basketDeviceItem.id} >
                        <td className="col-1" >
                        <Button
                        startIcon={<Clear />}
                        variant={"outline-dark"}
                        className="p-0 m-0"
                        onClick={()=> handleDeleteBasketDevice(basketDeviceItem.id).then(()=>basketDevice.setPage(1))}
                        >
                        </Button>
                        </td>
                        <td className="col-2 ">
                            <Image className="text-center w-100 h-100  "  src={process.env.REACT_APP_API_URL +"static/" +basketDeviceItem.device.image}/>
                        </td>
                        <td className="col-9">
                            <h4 className={"m-1"}>{basketDeviceItem.device.price}$</h4>
                            <h5 className={"fw-light m-1 p-0"}>{basketDeviceItem.device.brand.name} - {basketDeviceItem.device.name}</h5>
                            <h6 className={"fw-light m-1 text-muted"}>{basketDeviceItem.device.type.name}</h6>
                        </td>

                        
                    </tr>)               
                    )
                :
                <tr></tr>
            }  
            </tbody>
            <tfoot>
            <tr>
               
                <td colSpan={3} className="align-self-center">
                <Pages 
                    totalCount={basketDevice.totalCount}
                    limit={basketDevice.limit}
                    pageO={basketDevice.page}
                    updateData ={(event, value) => basketDevice.setPage(value)}
                />
             </td>
            </tr>

            </tfoot>
            </Table>  
        </Container>
        )
    })

export default BasketTable