import React, { useCallback, useEffect, useRef, useState } from "react";
import Maptest from "./Maptest";
import { Add } from "@mui/icons-material";
import { Button, Input } from "@mui/material";
import CourseWrite from "./CourseWrite";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const MapWrite = () => {

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');

    const handlerChangeTitle = e => setTitle(e.target.value);
    const handlerChangeContents = e => setContents(e.target.value);

    const MapList = () => {
        const navigate = useNavigate();
    }

    const handlerSubmit = e => {
        e.preventDefault();
       

        axios.post(`http://localhost:8080/api/course/write`, {title, contents,})
        .then(response => {
            console.log(response);
            if (response.data === 1 ) {
                alert('${response.data.message} (게시판 번호: ${response.data.travelcourseIdx})');
                // history.push('./course');
                navigate('/');
            }else{
                alert(response.data.message);
                return;
            }
        })
        .catch(error => {
            console.log(error);
            alert('${error.response.data.message} (${error.message})');
            return;
        });
    };
    

    //지도 불러옴, 장소 검색 후 출력된 장소를 '장소 저장'버튼 누름으로써 장소이름을 일시적으로 코스 소개로 넘겨줌 
    // Maptest컴포넌트에서 lat, lng, placeName, date, id(1) 상태변수를 장소저장 버튼의 Click핸들러를 가지고 axios를 서버로 전달.
    // 1) Maptest컴포넌트에 props로 전달.
    // 2) 장소저장 버튼 Click시 setLat, setLng 좌표정보 저장.
    //    axios.post(백주소. lat, lng 정보 전달, 토큰도 전달.) 처리.
    //    then(response) 되면 axios.get 으로 장소명(placeName) 가져와야 함. 
    //    가져온 장소명 setPlaceName해서 반영.
    // 3) MapWrite에서 placeName이 있다면 CourseWrite로 props 전달하여 장소명으로 된 chip을 Map()으로 생성

    //코스 소개 작성시 날짜 선택 필수(안누를시 새창 추가 못함)
    //일정 추가 버튼 누를시 코스소개 창 밑에 추가됨
    //'파일 등록' 버튼으로 소개할 코스의 사진 등록할수 있음
    //등록 버튼을 누르면 게시판 저장됨,코스 소개 있던 장소들 디비로 넘겨줌 

    //props 위아래로만 전달가능 maptest(좌표,장소 이름 출력) => coursewrite(넘겨받은 정보 임시저장후 던짐) => mapwrite(받은 정보 출력)


    return (
        <>
            <div className="container">
            <h1>여행코스등록</h1>
            <from id='frm' name='frm' onSubmit={handlerSubmit}/>
            
            <Maptest/>
            </div>
            <h3>제목</h3>
            <Input placeholder="Write title" id='title' name='title' value={title}
            onChange={handlerChangeTitle}/>
            <hr></hr>
            <CourseWrite />

            <Button variant="contained" endIcon={<Add />}>
                일정추가
            </Button>


            <p>첨부파일</p>
            <Button variant="contained">
                파일등록
            </Button>
            <hr></hr>
            <td colSpan='5'><textarea id='contents' name='contents' value={contents}
            onChange={handlerChangeContents}></textarea></td>
            <hr></hr>
            <Button type='submit' id='submit' variant="contained">
                등록
            </Button>
            <Button variant="contained" onClick={navigate}>
                목록
            </Button>
            <input type='submit' id='submit' value='목록' className="btn" onClick={MapList}/>
            <Link to="/course" id='submit' className="btn">목록</Link>
                    
        </>
    );
}

export default MapWrite;
