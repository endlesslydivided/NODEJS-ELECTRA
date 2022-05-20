import React, {useContext, useEffect,useState} from 'react';
import {Container} from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';

import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchRatings,fetchDevices, fetchBasketDevices,deleteBasketDevice,} from "../../http/deviceAPI";
import Pages from "../Pages";
import Table from 'react-bootstrap/Table'
import {Button} from "@mui/material";

const BasketDeviceTable = observer(() => 
    {
        const {basketDevice} = useContext(Context)


      
    
        useEffect(() =>
        {
            fetchBasketDevices(basketDevice.page, basketDevice.limit).then(data => {
                basketDevice.setBasketDevices(data.rows)
                basketDevice.setTotalCount(data.count)
        })
        }, [basketDevice.page,])

        const getBasketDevices = () => {
            fetchBasketDevices(1, basketDevice.limit).then(data => 
                {
                    basketDevice.setBasketDevices(data.rows)
                    basketDevice.setTotalCount(data.count)
                }                
            )
            basketDevice.setPage(1);

        }

        return ( 
        <Container >      
        <Table striped bordered hover responsive className={"table-light shadow"}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>UserId</th>
                    <th>DeviceId</th>
                    <th>CreatedAt</th>
                    <th>UpdatedAd</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {basketDevice !== undefined ?
                
                basketDevice.basketDevices.map((basketDevice) =>
                    (<tr key={basketDevice.id}>
                        <td>{basketDevice.id}</td>
                        <td>{basketDevice.userId}</td>
                        <td>{basketDevice.deviceId}</td>
                        <td>{basketDevice.createdAt}</td>
                        <td>{basketDevice.updatedAt}</td>
                        <td>
                        <Button
                        variant={"outline-dark"}
                        startIcon={<DeleteIcon />}
                        className="w-100 rounded-0"
                        onClick={()=>deleteBasketDevice(basketDevice.id).then(() => getBasketDevices())}
                        >
                            Удалить
                        </Button>
                        </td>

                    </tr>)               
                    )
                :
                <tr></tr>
            }  
            </tbody>
            <tfoot>
            <tr>
                <td className="justify-content-center" colSpan={7}>
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

export default BasketDeviceTable