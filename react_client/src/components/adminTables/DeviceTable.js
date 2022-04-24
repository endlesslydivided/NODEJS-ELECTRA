import React, {useContext, useEffect,useState} from 'react';
import {Container} from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchBrands, fetchDevices, fetchTypes,deleteDevice,fetchOneDevice, fetchOneType,fetchOneBrand} from "../../http/deviceAPI";
import Pages from "../../components/Pages";
import Table from 'react-bootstrap/Table'
import {Button} from "@mui/material";
import CreateDevice from "../modals/Device/CreateDevice";
import UpdateDevice from '../modals/Device/UpdateDevice';

const DeviceTable = observer(() => 
    {
        const [deviceVisible,setDeviceVisible] = useState(false)
        const [deviceVisibleUpdate,setDeviceVisibleUpdate] = useState(false)

        const {device} = useContext(Context)

        useEffect(() =>
        {
            getDevices();   
        },[])
    
        useEffect(() =>
        {
            fetchDevices(device.selectedType.id, device.selectedBrand.id,[0,100], device.page, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
        }, [device.page,])

        const getDevices = () =>
        {
            fetchDevices(null, null,[0,100], 1, device.limit).then(data => {
                device.setDevices(data.rows)
                device.setTotalCount(data.count)
            })
        }

        const setDeviceUpdate = (id) =>
        {
            fetchOneDevice(id).then(data => {
                device.setUpdateName(data.name)
                device.setUpdatePrice(Number(data.price))
                fetchOneType(data.typeId).then(data => device.setSelectedType(data))
                fetchOneBrand(data.brandId).then(data => device.setSelectedBrand(data))
                device.setUpdateInfo(data.info)
                device.setUpdateId(id)
            })
        }

        return ( 
        <Container >      
        <Table striped bordered hover responsive className={"table-light shadow"}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>CreatedAt</th>
                    <th>UpdatedAt</th>
                    <th>TypeId</th>
                    <th>BrandId</th>
                    <th>Action</th>

                </tr>
            </thead>
            <tbody>
            {device !== undefined ?
                
                device.devices.map(device =>
                    (<tr key={device.id}>
                        <td>{device.id}</td>
                        <td>{device.name}</td>
                        <td>{device.price}</td>
                        <td>{device.image}</td>
                        <td>{device.createdAt}</td>
                        <td>{device.updatedAt}</td>
                        <td>{device.typeId}</td>
                        <td>{device.brandId}</td>
                        <td>
                        <Button
                        variant={"outline-dark"}
                        className="w-100 rounded-0"
                        startIcon={<DeleteIcon />}

                        onClick={()=>deleteDevice(device.id).then(() => getDevices())}
                        >
                            Удалить
                        </Button>
                        <Button
                        variant={"outline-dark"}
                        startIcon={<EditIcon />}

                        className="w-100 rounded-0"
                        onClick={()=> {setDeviceVisibleUpdate(true);setDeviceUpdate(device.id)}}
                        >
                            Изменить
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
                <td colSpan={3}>
                    <Button
                    startIcon={<AddIcon />}

                    variant={"outline-dark"}
                    className="w-100 rounded-0"
                    onClick={()=> setDeviceVisible(true)}
                    >
                        Добавить устройство
                    </Button>
                </td>
                <td colSpan={7}>
                <Pages 
                    totalCount={device.totalCount}
                    limit={device.limit}
                    pageO={device.page}
                    updateData ={(value) => device.setPage(value)}
                />

                </td>
            </tr>

            </tfoot>
            </Table>  
            <CreateDevice show={deviceVisible} onHide={() => {setDeviceVisible(false);getDevices()}}/>
            <UpdateDevice show={deviceVisibleUpdate} onHide={() => {setDeviceVisibleUpdate(false);getDevices()}}/>

        </Container>
        )
    })

export default DeviceTable