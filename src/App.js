import logo from './logo.svg';
import './App.css';
// import { Route } from './react-router-dom';
// import Map3 from './Map3';
// import Map4 from './Map4';
// import Mapxy from './Mapxy';
// import Maptest from './Maptest';
import MapWrite from './course/MapWrite';
import MapList from './course/MapList';
import MapDetail from './course/Mapdetail';
import { Route, Routes } from 'react-router-dom';



// import MapMarker from './MapMarker';
// import Mapsearch from './Mapsearch';
// import Mapss from './Mapss';



function App() {
  return (
    <>
      {/* <Map3/> */}
      {/* <MapMarker/> */}
      {/* <Mapsearch/> */}
      {/* <MapList/> */}
      {/* <MapWrite/> */}
      {/* <MapDetail/> */}
      <Routes>
        <Route path="/course" element={<MapList />} exact={true} />
        <Route path="/course/mapwrite" element={<MapWrite />} />
        <Route path="/course/Detail/:travlecourseIdx" element={<MapDetail />} />
      </Routes>
    </>
  );
}

export default App;
