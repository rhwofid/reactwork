import { useEffect, useState } from "react"
import axios from "axios";
// import {Link} from 'react-router-dom';
// import { Link } from "@mui/material";
import { Link } from "react-router-dom";

const MapList = () => {

    const [datas, setDatas ] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/course')
            .then(response => {
                console.log(response);
                setDatas(response.data);
            })
    },[]);

return(
    <>
    <div clsaaName='container'>
        <h2>지도 목록</h2>
        <table className='map_list'>
            <colgroup>
                <col width="15%" />
                <col width="*" />
                <col width="15%" />
                <col width="15%" />
            </colgroup>
            <thead>
                <tr>
                    <th scope="col">글번호</th>
                    <th scope="col">제목</th>
                    <th scope="col">조회수</th>
                    <th scope="col">작성일</th>
                </tr>
            </thead>
            <tbody>
                {
                    datas.length === 0 && (
                        <tr>
                            <td colSpan='4'>일치하는 지도가 없다.</td>
                        </tr>
                    )
                }
                {
                    datas && datas.map(course => (
                        <tr key={course.travelcourseIdx}>
                            <td>{course.travelcourseIdx}</td>
                            <td className="title">
                                <Link to={`/course/Mapdetail/${course.travelcourseIdx}`}>{course.travelcourseTitle}</Link></td>
                            <tb>{course.travelcourseCnt}</tb>
                            <tb>{course.travelcourseCreatedtime}</tb>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <Link to="/course/mapwrite" className="btn">글쓰기</Link>
    </div>
    </>
);
};

export default MapList;