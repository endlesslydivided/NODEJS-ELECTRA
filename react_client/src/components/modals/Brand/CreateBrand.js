import React, {useContext, useState} from 'react';
import {Context} from "../../../index";
import Modal from "react-bootstrap/Modal";
import { Form} from "react-bootstrap";
import {createBrand} from "../../../http/deviceAPI";
import {Button} from "@mui/material";

const CreateBrand = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const {errorResult,successResult} = useContext(Context);

    const addBrand = () => {
        if(value === "")
        {
        errorResult.setMessage("Заполните поле - бренд")
        return;

        }
        createBrand({name: value}).then(data => {
            setValue('')
            onHide()
            successResult.setMessage("Бренд успешно добавлен")

        })
    }

   
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="rounded-0 w-100"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название бренда"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button color="error" onClick={onHide}>Закрыть</Button>
                <Button color="success" onClick={addBrand}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;