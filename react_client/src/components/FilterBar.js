
import React, {useContext,useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Row from "react-bootstrap/Row";

import Dropdown from "react-bootstrap/Dropdown";
import { Container } from 'react-bootstrap';
import { Typography } from '@mui/material';
import "../pages/css/common.css"
import RangeSlider from './RangeSlider';
import {Button, Card, Col} from "react-bootstrap";



const FilterBar = observer(() => {
    const {device} = useContext(Context);
    const marks = [
        {
          value: 0,
          label: '0',
        },
        {
          value: 1,
          label: '1',
        },
        {
          value: 2,
          label: '2',
        },
        {
          value: 3,
          label: '3',
        },
        {
            value: 4,
            label: '4',
        },
        {
            value: 5,
            label: '5',
        },
      ];

      
      function valuetext(value) {
        return `${value}°C`;
      }
      
      function toDefault()
      {
        device.setSelectedBrand("");
        device.setSelectedType("");
        device.setSelectedRate([0,100]);
      }

     
  return (
      <Container className={"rounded-window  w-100 bg-light mt-3"}>
        <Row > 
            <Typography className={"mt-2"} variant="h4" component="h4">
                Фильтр:
            </Typography>   
        </Row>
        <Row >
        
            <Dropdown >
            <Dropdown.Toggle className="text-muted rounded-window shadow-sm overflow-hidden  w-100 my-2" 
            variant={"outline-dark"}>{device.selectedType.name || "Выберите тип устройства"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
            {
            Array.isArray(device.types) 
            ? 
                device.types.map
                (type =>
                    <Dropdown.Item
                    style={{cursor: 'pointer'}}
                        active={type.id === device.selectedType.id}
                        onClick={() => device.setSelectedType(type)}
                        key={type.id}
                    >
                        {type.name}
                    </Dropdown.Item>
                )
            :
            ""
            }
            </Dropdown.Menu>

            </Dropdown>
        </Row>
        <Row>
            <Dropdown >
            <Dropdown.Toggle  className="text-muted  text-left rounded-window shadow-sm overflow-hidden w-100 my-2"  
            variant={"outline-dark"}>{device.selectedBrand.name || "Выберите бренд устройства"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
            {
            Array.isArray(device.brands) 
            ? 
            device.brands.map(brand =>
                <Dropdown.Item
                style={{cursor: 'pointer'}}
                    active={brand.id === device.selectedBrand.id}
                    onClick={() => device.setSelectedBrand(brand)}
                    key={brand.id}
                >
                    {brand.name}
                </Dropdown.Item>
            )
            :
            ""
            }   
            </Dropdown.Menu>
            </Dropdown>
        </Row>
        <Row>
            <Typography className={"mt-2"} variant="h7" component="h5">
                Рейтинг:
            </Typography> 
        </Row>
        <Row>
            <RangeSlider currentRate={device.selectedRate} updateData={(event) => device.setSelectedRate(event.target.value)}/>
        </Row>
        <Row>
        <Button 
                    onClick={() =>{toDefault()}} 
                    className="btn-glow my-2 text-center">Сбросить фильтр</Button>
        </Row>
    </Container>
  )
})

export default FilterBar