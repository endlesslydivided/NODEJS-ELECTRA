import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import { Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../../index";
import {createDevice, fetchAllBrands, fetchDevices, fetchAllTypes} from "../../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import {Button} from "@mui/material";
import { validateDevice } from '../../../utils/validation';


const CreateDevice = observer(({show, onHide}) => {
    const {device,errorResult,successResult} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchAllTypes().then(data => device.setTypes(data))
        fetchAllBrands().then(data => device.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => 
    {
            let validation = validateDevice(device.selectedType.id,
                device.selectedBrand.id,
                name,
                price,
                file,
                info);
            if(validation.status)
            {
                errorResult.setMessage(validation.message)
            }
            else
            {
                const formData = new FormData()
                formData.append('name', name)
                formData.append('price', `${price}`)
                formData.append('img', file)
                formData.append('brandId', device.selectedBrand.id)
                formData.append('typeId', device.selectedType.id)
                formData.append('info', JSON.stringify(info))
                createDevice(formData).then(data => {onHide();successResult.setMessage("?????????? ?????????????? ???????????????? ?? ??????????????");})
                setInfo([]);setFile(null);setPrice(0);setName('');
                device.setSelectedBrand({});
                device.setSelectedType({});
            }

    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    ???????????????? ????????????????????
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Row md={12}>
                        <Col>
                        <Dropdown  className="mt-2">
                            <Dropdown.Toggle className="rounded-0 w-100" variant={"outline-dark"}>{device.selectedType.name || "???????????????? ??????"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {Array.isArray(device.types) ? 
                                device.types.map(type =>
                                    <Dropdown.Item
                                        onClick={() => device.setSelectedType(type)}
                                        key={type.id}
                                    >
                                        {type.name}
                                    </Dropdown.Item>
                                )
                                :
                                ""}
                            </Dropdown.Menu>
                        </Dropdown>
                        </Col>
                        <Col>
                        <Dropdown className="mt-2">
                            <Dropdown.Toggle className="rounded-0  w-100" variant={"outline-dark"}>{device.selectedBrand.name || "???????????????? ??????????"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                { Array.isArray(device.brands)  ? device.brands.map(brand =>
                                    <Dropdown.Item
                                        onClick={() => device.setSelectedBrand(brand)}
                                        key={brand.id}
                                    >
                                        {brand.name}
                                    </Dropdown.Item>
                                )
                                :
                                ""}
                            </Dropdown.Menu>
                        </Dropdown>
                        </Col>
                    </Row>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3 rounded-0  w-100"
                        placeholder="?????????????? ???????????????? ????????????????????"
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3  rounded-0  w-100"
                        placeholder="?????????????? ?????????????????? ????????????????????"
                        type="number"
                    />
                    <Form.Control
                        className="mt-3  rounded-0  w-100"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                        className="rounded-0  w-100"
                    >
                        ???????????????? ?????????? ????????????????
                    </Button>
                    {info.map(i =>
                        <Row className="mt-4" md={12} key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                className="rounded-0 w-100"
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="?????????????? ???????????????? ????????????????"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    className="rounded-0 w-100"
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="?????????????? ???????????????? ????????????????"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    className="rounded-0 w-100"
                                    color="error"
                                    onClick={() => removeInfo(i.number)}
                                    
                                >
                                    ??????????????
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button color="error" onClick={onHide}>??????????????</Button>
                <Button color="success" onClick={addDevice}>????????????????</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;