import React, {useContext, useEffect,useState} from 'react';
import {Container} from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchBrands, fetchAllBrands,deleteBrand} from "../../http/deviceAPI";
import Pages from "../Pages";
import Table from 'react-bootstrap/Table'
import {Button} from "@mui/material";
import CreateBrand from '../modals/Brand/CreateBrand';

const BrandTable = observer(() => 
    {
        const [brandVisible,setBrandVisible] = useState(false)
        const {brand} = useContext(Context)
        const {device} = useContext(Context)


        useEffect(() =>
        {
            getBrands()
        }
    
        ,[])
    
        useEffect(() =>
        {
            fetchBrands(brand.page, brand.limit).then(data => {
                brand.setBrands(data.rows)
                brand.setTotalCount(data.count)
        })
        }, [brand.page,])

        const getBrands = () => {
            fetchBrands(1, brand.limit).then(data => 
                {
                brand.setBrands(data.rows)
                brand.setTotalCount(data.count)
                }
                
            )
            fetchAllBrands().then(data => device.setBrands(data))
        }

        return ( 
        <Container >      
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
            {brand !== undefined ?
                
                brand.brands.map((brand) =>
                    (<tr  key={brand.id}>
                        <td>{brand.id}</td>
                        <td>{brand.name}</td>
                        <td>{brand.createdAt}</td>
                        <td>{brand.updatedAt}</td>
                        <td>
                        <Button
                        variant={"outline-dark"}
                        startIcon={<DeleteIcon />}
                        className="w-100 rounded-0"
                        onClick={()=>deleteBrand(brand.id).then(() => getBrands())}
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
                    onClick={()=> setBrandVisible(true)}
                    >
                        Добавить бренд
                    </Button>
                </td>
                <td colSpan={4}>
                <Pages 
                    totalCount={brand.totalCount}
                    limit={brand.limit}
                    pageO={brand.page}
                    updateData ={(event, value) => brand.setPage(value)}
                />

                </td>
            </tr>

            </tfoot>
            </Table>  
            <CreateBrand show={brandVisible} onHide={() => {setBrandVisible(false);getBrands()}}/>
        </Container>
        )
    })

export default BrandTable