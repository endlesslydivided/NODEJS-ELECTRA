import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "@mui/material";

const Pages =observer( (props) => {
    const pageCount = Math.ceil(props.totalCount / props.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

   

    return (
        <Pagination className="w-100" 
        showFirstButton showLastButton
        variant="outlined"
        count={pages.length}
        onChange={props.updateData}
        
        >
            
        </Pagination>
    );
})

export default Pages