import './App.css';
import React, {useEffect, useState} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip } from 'recharts';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const formatData = (data) => {

  let result = []

  for (let i = 0; i < data.length; i++) {
    result.push({x:i*0.01,y: data[i]})
  }

  return result
}

function App() {

  const [data, setData] = useState([])
  const [kt, setKT] = useState(1)
  const [ke, setKE] = useState(1)
  const [J, setJ] = useState(1)
  const [b, setB] = useState(1)
  const [kp, setKP] = useState(1)
  const [ki, setKI] = useState(1)
  const [kd, setKD] = useState(1)
  const [maxTime, setMaxTime] = useState(0.5)
  const [tickCount, setTickCount] = useState(11)

  const handleChangeKT = (event) => {
    setKT(event.target.value);
  };

  const handleChangeKE = (event) => {
    setKE(event.target.value);
  };

  const handleChangeJ = (event) => {
    setJ(event.target.value);
  };

  const handleChangeB = (event) => {
    setB(event.target.value);
  };

  const handleChangeKP = (event) => {
    setKP(event.target.value);
  };

  const handleChangeKI = (event) => {
    setKI(event.target.value);
  };

  const handleChangeKD = (event) => {
    setKD(event.target.value);
  };

  const handleChangeMaxTime = (event) => {
    setMaxTime(event.target.value);
  };

  const getData = () => {
    fetch(`http://127.0.0.1:5000/get?kt=${kt}&ke=${ke}&J=${J}&b=${b}&kp=${kp}&ki=${ki}&kp=${kd}&maxTime=${maxTime}`, {
      'methods': 'GET',
      headers: {
        'Content-Type': "application/json"
      }
    })
    .then(resp => resp.json())
    .then(resp => setData(formatData(resp["data"].flat())))
    .then( () => setTickCount(20*maxTime+1))
    .catch(error => console.log(error))
  }

  useEffect(()=> {
    getData()
  }, [])

  const handleButton = () => {
    getData()
    
  }

  const style = {"margin": "10px 10px", "width": "100%", "height": "100%"}

  return (
    <div className="App">

      <table>
        <tr>
          <td>
            <div>
              <TextField id="standard-number" style={style} label="Motor Torque Constant (Kt)" type="number" InputLabelProps={{shrink: true,}} InputProps={{inputProps:{min:0}}} value={kt} onChange={handleChangeKT}/><br/>
              <TextField id="standard-number" style={style} label="Electromotive Force Constant (Ke)" type="number" InputLabelProps={{shrink: true,}} InputProps={{inputProps:{min:0}}} value={ke} onChange={handleChangeKE}/><br/>
              <TextField id="standard-number" style={style} label="Moment of Inertia of the rotor (J)" type="number" InputLabelProps={{shrink: true,}} InputProps={{inputProps:{min:0}}} value={J} onChange={handleChangeJ}/><br/>
              <TextField id="standard-number" style={style} label="Motor Viscous Friction Constant (b)" type="number" InputLabelProps={{shrink: true,}} InputProps={{inputProps:{min:0}}} value={b} onChange={handleChangeB}/><br/>
              <TextField id="standard-number" style={style} label="Proportional Gain (Kp)" type="number" InputLabelProps={{shrink: true,}} InputProps={{inputProps:{min:0}}} value={kp} onChange={handleChangeKP}/><br/>
              <TextField id="standard-number" style={style} label="Integral Gain (Ki)" type="number" InputLabelProps={{shrink: true,}} InputProps={{inputProps:{min:0}}} value={ki} onChange={handleChangeKI}/><br/>
              <TextField id="standard-number" style={style} label="Derivative Gain (Kd)" type="number" InputLabelProps={{shrink: true,}} InputProps={{inputProps:{min:0}}} value={kd} onChange={handleChangeKD}/><br/>
              <TextField id="standard-number" style={style} label="Time domain interval MAX" type="number" InputLabelProps={{shrink: true,}} InputProps={{inputProps:{min:0, step:0.1}}} value={maxTime} onChange={handleChangeMaxTime}/><br/>
              <Button variant="contained" color="primary" style={style} onClick={handleButton}>Update Graph</Button>
            </div>
          </td>
          <td>
            <div>
              <h3 style={{"textAlign": "center"}}>Unit Step Input System Response</h3>
              <LineChart width={1000} height={600} data={data}>
                
                <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false}/>
                <Tooltip />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="x" type="number" domain={['dataMin', 'dataMax']} tickCount={tickCount}>
                  <Label value="Time" offset={-5} position="insideBottom" />
                </XAxis>
                <YAxis />
              </LineChart>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;
