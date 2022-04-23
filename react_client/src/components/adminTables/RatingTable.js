import React, {useContext, useEffect,useState} from 'react';
import {Container} from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';

import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchRatings,deleteRating,fetchDevices} from "../../http/deviceAPI";
import Pages from "../Pages";
import Table from 'react-bootstrap/Table'
import {Button} from "@mui/material";

const RatingTable = observer(() => 
    {
        const {rating} = useContext(Context)
        const {device} = useContext(Context)


        useEffect(() =>
        {
            getRatings()
        }
    
        ,[])
    
        useEffect(() =>
        {
            fetchRatings(rating.page, rating.limit).then(data => {
                rating.setRatings(data.rows)
                rating.setTotalCount(data.count)
        })
        }, [rating.page,])

        const getRatings = () => {
            fetchRatings(1, rating.limit).then(data => 
                {
                    rating.setRatings(data.rows)
                    rating.setTotalCount(data.count)
                }
                
            )
            fetchDevices(null, null, 1, device.limit).then(data => {
                device.setDevices(data.rows)
                device.setTotalCount(data.count)
            })
        }

        return ( 
        <Container >      
        <Table striped bordered hover responsive className={"table-light shadow"}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>UserId</th>
                    <th>DeviceId</th>
                    <th>Rate</th>
                    <th>CreatedAt</th>
                    <th>UpdatedAd</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {rating !== undefined ?
                
                rating.ratings.map((rating) =>
                    (<tr key={rating.id}>
                        <td>{rating.id}</td>
                        <td>{rating.userId}</td>
                        <td>{rating.deviceId}</td>
                        <td>{rating.rate}</td>
                        <td>{rating.createdAt}</td>
                        <td>{rating.updatedAt}</td>
                        <td>
                        <Button
                        variant={"outline-dark"}
                        startIcon={<DeleteIcon />}
                        className="w-100 rounded-0"
                        onClick={()=>deleteRating(rating.id).then(() => getRatings())}
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
                    totalCount={rating.totalCount}
                    limit={rating.limit}
                    pageO={rating.page}
                    updateData ={(event, value) => rating.setPage(value)}
                />

                </td>
            </tr>

            </tfoot>
            </Table>  
        </Container>
        )
    })

export default RatingTable