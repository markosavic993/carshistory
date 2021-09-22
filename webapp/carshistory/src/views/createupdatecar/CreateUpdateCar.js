import './CreateUpdateCar.scss';
import {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {UserContext} from "../../context/UserContext";
import ImageUploading from 'react-images-uploading';
import {uploadFile} from "../../aws/s3Client";

function CreateUpdateCar() {
  const history = useHistory();
  const [userContext, setUserContext] = useContext(UserContext)

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
  const [images, setImages] = useState([]);

  const maxNumber = 69;

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

    await uploadImages(result.data._id);

    history.push(`/cars/${result.data._id}`);
  }

  const uploadImages = async (carId) => {
    for (let i = 0; i < images.length; i++){
      const file = images[i].file;
      console.log("Upload Image", file);
      const formData = new FormData();
      formData.append("myFile", file);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          'Authorization': `Bearer ${userContext.token}`
        }
      };
      const result = await axios.post(`http://localhost:5000/cars/${carId}/upload`, formData, config);
      console.log("REsult: ", result);
    }
  };

  const onChange = async (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList)
  };

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

        {/*IMAGES*/}
        <label className="formField">
          Insert images
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <button
                  className="actionItems"
                  style={isDragging ? {color: 'red'} : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    onImageUpload();
                  }}
                  {...dragProps}
                >
                  Click or Drop here
                </button>
                &nbsp;
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onImageRemoveAll();
                  }}
                  className="actionItems">
                  Remove all images
                </button>
                <div className="images">
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image['data_url']} alt="" width="100"/>
                      <div className="image-item__btn-wrapper">
                        <button
                          className="actionItems"
                          onClick={(e) => {
                            e.preventDefault();
                            onImageRemove(index);
                          }}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ImageUploading>

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
