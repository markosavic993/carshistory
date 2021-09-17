import './CreateUpdateCar.scss';
import {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {UserContext} from "../../context/UserContext";

function CreateUpdateCar() {
  const history = useHistory();

  const [vin, setVin] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [productionYear, setProductionYear] = useState(new Date().getFullYear());
  const [color, setColor] = useState('');
  const [countryOrigin, setCountryOrigin] = useState('');
  const [mileage, setMileage] = useState(0);
  const [transmission, setTransmission] = useState('MANUAL');
  const [engineName, setEngineName] = useState('');
  const [engineType, setEngineType] = useState('PETROL');
  const [engineVolume, setEngineVolume] = useState(0);
  const [enginePower, setEnginePower] = useState(0);
  const [userContext, setUserContext] = useContext(UserContext)

  const submitHandler = async (event) => {
    event.preventDefault();
    const result = await axios.post('http://localhost:5000/cars',
      {
        vin, make, model, productionYear, mileage, color, transmission, country: countryOrigin,
        engine: {
          name: engineName, type: engineType, power: enginePower, volume: engineVolume
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${userContext.token}`
        }
      });

    history.push(`/cars/${result.data._id}`);
  }

  return (
    <div>
      <p className="title">Add new car</p>
      <form className="createUpdateForm" onSubmit={submitHandler}>
        <label className="formField">
          VIN
          <input type="text"
                 value={vin}
                 onChange={e => setVin(e.target.value)}
                 placeholder="Enter vin..."
                 required/>
        </label>

        <label className="formField">
          Make
          <input type="text"
                 value={make}
                 onChange={e => setMake(e.target.value)}
                 placeholder="Enter make..."
                 required/>
        </label>

        <label className="formField">
          Model
          <input type="text"
                 value={model}
                 onChange={e => setModel(e.target.value)}
                 placeholder="Enter model..."
                 required/>
        </label>

        <label className="formField">
          Production year
          <input type="number"
                 value={productionYear}
                 onChange={e => setProductionYear(e.target.value)}
                 required/>
        </label>

        <label className="formField">
          Color
          <input type="text"
                 value={color}
                 onChange={e => setColor(e.target.value)}
                 placeholder="Enter color..."
                 required/>
        </label>

        <label className="formField">
          Country origin
          <input type="text"
                 value={countryOrigin}
                 onChange={e => setCountryOrigin(e.target.value)}
                 placeholder="Enter country origin..."
                 required/>
        </label>

        <label className="formField">
          Mileage
          <input type="number"
                 value={mileage}
                 onChange={e => setMileage(e.target.value)}
                 required/>
        </label>

        <label className="formField">
          Transmission
          <select id="transmission" onChange={e => setTransmission(e.target.value)} value={transmission}>
            <option value="MANUAL">Manual</option>
            <option value="AUTOMATIC">Automatic / Semi-automatic</option>
          </select>
        </label>

        {/*ENGINE DATA*/}
        <label className="formField">
          Engine name
          <input type="text"
                 value={engineName}
                 onChange={e => setEngineName(e.target.value)}
                 placeholder="Enter engine name..."
                 required/>
        </label>

        <label className="formField">
          Engine type
          <select id="engineType" onChange={e => setEngineType(e.target.value)} value={engineType}>
            <option value="PETROL">Petrol</option>
            <option value="DIESEL">Diesel</option>
            <option value="GAS">Gas</option>
            <option value="HYBRID">Hybrid</option>
            <option value="EV">Electric</option>
          </select>
        </label>

        <label className="formField">
          Volume (cm3)
          <input type="number"
                 value={engineVolume}
                 onChange={e => setEngineVolume(e.target.value)}
                 required/>
        </label>

        <label className="formField">
          Power (KW)
          <input type="number"
                 value={enginePower}
                 onChange={e => setEnginePower(e.target.value)}
                 required/>
        </label>

        <input className="submitButton" type="submit" value="Create"/>
      </form>
    </div>
  );
}

export default CreateUpdateCar;
