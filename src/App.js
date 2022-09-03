import React, {Suspense, useState, useEffect} from 'react';
import './App.scss';
import {screens} from './components/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {data, createDoc, updateEntry, resumeLink, ipInfo} from './firestore';
export const CountContext = React.createContext();
export const SetCountContext = React.createContext();
function App() {
  const [id, setId] = useState('');
  const [oldData, setOldData] = useState('');
  const [driveLink, setDriveLink] = useState('');
  useEffect(() => {
    resumeLink(setDriveLink);
    if (localStorage.getItem('id') !== null) {
      setOldData(
        localStorage.getItem('timestamp') + ' -- ' + localStorage.getItem('id')
      );
    }
    createDoc(data, setId);
  }, []);
  useEffect(() => {
    if (id !== '') {
      ipInfo(id);
    }
  }, [id]);
  useEffect(() => {
    if (id !== '' && oldData !== '') {
      updateEntry(id, oldData);
    }
  }, [id, oldData]);
  // useEffect(() => {//   navigator.geolocation.getCurrentPosition(function (position) {//     const latLong =//       'lat: ' +//       position.coords.latitude +//       ' | long: ' +//       position.coords.longitude;//     if ((latLong !== '') & (id !== '')) {//       updateCoords(id, latLong);//     }//   });// }, [id]);
  const [count, setCount] = useState(0);
  const [visitOrder, setVisitOrder] = useState(0);
  return (
    <div className="App">
      <div id="stars1"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <Suspense fallback={<div />}>
        <BrowserRouter>
          <CountContext.Provider
            value={[count, setCount, visitOrder, setVisitOrder, driveLink]}
          >
            <Routes>
              {screens.map((screen, index) => {
                return (
                  <Route
                    path={screen.link}
                    element={
                      // <CountContext.Provider
                      //   value={[
                      //     count,
                      //     setCount,
                      //     visitOrder,
                      //     setVisitOrder,
                      //     driveLink,
                      //   ]}
                      // >
                      <screen.view id={id} />
                      // </CountContext.Provider>
                    }
                    key={index}
                  />
                );
              })}
            </Routes>
          </CountContext.Provider>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}
export default App;
