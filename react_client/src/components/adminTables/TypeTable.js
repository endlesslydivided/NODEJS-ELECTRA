import React, {useContext, useEffect,useState} from 'react';
import {Container} from "react-bootstrap";

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchTypes,fetchAllTypes,deleteType} from "../../http/deviceAPI";
import Pages from "../Pages";
import Table from 'react-bootstrap/Table'
import {Button} from "@mui/material";
import CreateType from '../modals/Type/CreateType';

const TypeTable = observer(() => 
    {
        const [typeVisible,setTypeVisible] = useState(false)
        const {type} = useContext(Context)
        const {device} = useContext(Context)


        useEffect(() =>
        {
            getTypes()
        }
    
        ,[])
    
        useEffect(() =>
        {
            fetchTypes(type.page, type.limit).then(data => {
                type.setTypes(data.rows)
                type.setTotalCount(data.count)
        })
        }, [type.page,])

        const getTypes = () => {
            fetchTypes(1, type.limit).then(data => 
                {
                    type.setTypes(data.rows)
                    type.setTotalCount(data.count)
                }
            )
            fetchAllTypes().then(data => device.setTypes(data))
        }

        return ( 
        <Container>      
        <Table striped bordered hover responsive className={"table-light shadow"}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>CreatedAt</th>
                    <th>UpdatedAt</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {type !== undefined ?
                
                type.types.map((type) =>
                    (<tr>
                        <td>{type.id}</td>
                        <td>{type.name}</td>
                        <td>{type.createdAt}</td>
                        <td>{type.updatedAt}</td>
                        <td>
                        <Button
                        startIcon={<DeleteIcon />}
                        variant={"outline-dark"}
                        className="w-100 rounded-0"
                        onClick={()=> deleteType(type.id).then(()=>getTypes())}
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
                <td colSpan={1}>
                    <Button
                    startIcon={<AddIcon />}

                    variant={"outline-dark"}
                    className="w-100 rounded-0"
                    onClick={()=> setTypeVisible(true)}
                    >
                        Добавить тип
                    </Button>
                </td>
                <td colSpan={4}>
                <Pages 
                    totalCount={type.totalCount}
                    limit={type.limit}
                    pageO={type.page}
                    updateData ={(value) => type.setPage(value)}
                />

                </td>
            </tr>

            </tfoot>
            </Table>  
            <CreateType show={typeVisible} onHide={() => {setTypeVisible(false);getTypes()}}/>
        </Container>
        )
    })

export default TypeTable