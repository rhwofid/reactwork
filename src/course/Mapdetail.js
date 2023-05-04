import { useStaticPicker } from '@mui/x-date-pickers/internals';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function MapDetail({ history }) {
    
    const {travlecourseIdx} = useParams;

    const {course, setCourse} = useState({});
    const { travlecourseContents, setTravlecourseContents} = useState('');
    const { travlecourseTitle, setTravlecourseTitle } = useState('');
    
    const handlerChangeTitle = e => setTravlecourseTitle(e.target.value);
    const handlerChangeContents = e => setTravlecourseContents(e.target.value);


    useEffect(()=> {
        axios.get(`http://localhost:8080/api/course/${travlecourseIdx}`)
        .then(response => {
            console.log(response);
            setCourse(response.data);

            setTravlecourseTitle(response.data.travlecoursetitle);
            setTravlecourseContents(response.data.travlecoursecontents);
        })
        .catch(error=> console.log(error));
    },[]);

    const handlerClickList = () => {
        console.log(history);   
        history.push('/course');
    };

    const handlerClickUpdate = () => {
        axios.put(`http://localhost:8080/api/course/${travlecourseIdx}`,
        { 'travlecoursetitle': travlecourseTitle, 'travlecoursecontents': travlecourseContents })
        .then(response => {
            console.log(response);
            if (response.data === 1) {
                alert('수정됨.');
            } else {
                alert('수정안됨.');
                return;
            }
        })
        .catch(error => { 
            console.log(error);
        alert(`수정에 실패. (${error.message})`);
        return;
    });
    };

    const handlerClickDelete = () => {
        axios.delete(`http://localhost:8080/api/course/${course.travlecourseIdx}`)
        .then(response => {
            console.log(response);
            if (response.data === 1) {
                alert('삭제됨');
                history.push('/course');
                return;
            }
        })
        .catch(error => {
            console.log(error);
            alert('삭제실패. (${error.message})');
            return;
        });
    };

    return(
        <>
        <div className="container">
        <h1>여행코스 목록</h1>
        <form acion='' method="POST" id="frm" name="frm">
            <input type='hidden' name='travlecourseIdx'/>
            <table className="map_detail">
            <colgroup>
                            <col width="15%" />
                            <col width="35%" />
                            <col width="15%" />
                            <col width="35%" />
                        </colgroup>
                        <tbody>
                        <tr>
                                <th scope="row">글번호</th>
                                <td>{course.travlecourseIdx}</td>
                                <th scope="row">조회수</th>
                                <td>{course.travlecourseCnt}</td>
                            </tr>
                            <tr>
                                <th scope="row">작성자</th>
                                <td>{course.userId}</td>
                                <th scope="row">작성일</th>
                                <td>{course.travlecourseCreatedtime}</td>
                            </tr>
                            <tr>
                                <th scope="row">제목</th>
                                <td colSpan="3">
                                    <input type="text" id="title" name="title" value={travlecourseTitle} 
                                    onChange={handlerChangeTitle} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="view_text">
                                    <textarea title="내용" id="contents" name="contents" value={travlecourseContents}
                                onChange={handlerChangeContents}></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <input type="button" id="list"   className="btn" value="목록으로" onClick={handlerClickList} />
                <input type="button" id="edit"   className="btn" value="수정하기" onClick={handlerClickDelete}/>
                <input type="button" id="delete" className="btn" value="삭제하기" onClick={handlerClickUpdate}/>
         </div>
        
        </>
    );

}
export default MapDetail;