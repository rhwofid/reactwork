import React, { useCallback, useEffect, useRef, useState } from "react";
import Maptest from "./Maptest";
import { Add } from "@mui/icons-material";
import { Button, Chip, Input} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Maptset from './Maptest';

function CourseWrite() {
    const [ placeName, setPlaceName ] = useState(['서울숲', '탑골공원' , '고재량']);

    const handleDelete = (e)=>{
        setPlaceName((places) => places.filter((place) => place.key !== e.key));
    }

    return (
        <>
            <br/>
            <DatePicker />
            <br/>
            <Input placeholder="코스 소개!" />
            <Chip label={placeName[0]} onDelete={handleDelete} />
            <Chip label={placeName[1]} onDelete={handleDelete} />
            <Chip label={placeName[2]} onDelete={handleDelete} />
            <hr></hr>
            <br/>
        </>
    );
}

export default CourseWrite;
