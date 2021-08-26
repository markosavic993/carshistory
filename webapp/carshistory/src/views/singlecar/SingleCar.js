import './SingleCar.scss';
import {useEffect, useState} from "react";
import axios from "axios";
import {
  useParams
} from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';

function SingleCar() {
  const {carId} = useParams();
  const [carData, setCarDara] = useState({images: [], serviceHistory: []});
  const [working, setWorking] = useState(false);
  const [serviceHistoryDate, setServiceHistoryDate] = useState(Date.now());
  const [serviceHistoryMileage, setServiceHistoryMileage] = useState(0);
  const [serviceHistoryType, setServiceHistoryType] = useState('INTERIM_SERVICE');
  const [serviceHistoryDescription, setServiceHistoryDescription] = useState('');

  useEffect(async () => {
    if(!working) {
      const result = await axios(
        `http://localhost:5000/cars/${carId}`,
      );

      setCarDara(result.data);
    }
  }, [working]);

  const submitHandler = async (event) => {
    setWorking(true);
    event.preventDefault();
    await axios.post(`http://localhost:5000/cars/${carId}/services`,
      {
        date: serviceHistoryDate,
        mileage: serviceHistoryMileage,
        serviceType: serviceHistoryType,
        description: serviceHistoryDescription
      });


    setServiceHistoryMileage(0);
    setServiceHistoryDate(Date.now());
    setServiceHistoryType('INTERIM_SERVICE');
    setServiceHistoryDescription('');
    setWorking(false);
  };

  const deleteServiceHistoryHandler = async (event, serviceHistoryEntryId) => {
    setWorking(true);
    await axios.delete(`http://localhost:5000/cars/${carId}/services/${serviceHistoryEntryId}`);
    setWorking(false);
  };

  return (
    <div>
      <p className="title">{carData.name}</p>
      <Carousel className="appCarousel">
        {carData.images.map(imageUrl => (
          <div>
            <img src={imageUrl} alt=""/>
          </div>
        ))}
      </Carousel>

      <div className="mainData">
        <details>
          <summary className="subtitle">Main data</summary>
          <p className="mainDataItem">VIN: {carData.vin}</p>
          <p className="mainDataItem">Color: {carData.color}</p>
          <p className="mainDataItem">Mileage: {carData.mileage}</p>
          <p className="mainDataItem">Production Year: {carData.productionYear}</p>
          <p className="mainDataItem">Transmission: {carData.transmission}</p>
          <p className="mainDataItem">Country: {carData.countryOrigin}</p>
          <p className="mainDataItem">Engine: {carData.engineData?.name}</p>
          <p className="mainDataItem">Engine Fuel: {carData.engineData?.engineType}</p>
          <p className="mainDataItem">Volume: {carData.engineData?.volume}</p>
          <p className="mainDataItem">Volume: {carData.engineData?.power}</p>
        </details>
      </div>

      <div>
        <details>
          <summary className="subtitle">Service history</summary>
          {carData.serviceHistory.map(historyEntry => (
            <div className="serviceHistoryEntry">
              <p className="mainDataItem">Service type: {historyEntry.serviceType}</p>
              <p className="mainDataItem">Mileage: {historyEntry.mileage}</p>
              <p className="mainDataItem">Date: {historyEntry.date}</p>
              <p className="mainDataItem">Description: {historyEntry.description}</p>

              <div className="actions">
                <a className="infoButton">Update</a>
                <a className="dangerButton" onClick={(e) => deleteServiceHistoryHandler(e, historyEntry._id)}>Delete</a>
              </div>
            </div>
          ))}
        </details>
      </div>

      <div>
        <details>
          <summary className="subtitle">Add Service Data</summary>
          <form className="serviceHistoryForm" onSubmit={submitHandler}>
            <label className="formField">
              Date
              <input type="date"
                     value={serviceHistoryDate}
                     onChange={e => setServiceHistoryDate(e.target.value)}
                     placeholder="Enter date..."
                     required/>
            </label>

            <label className="formField">
              Mileage
              <input type="text"
                     value={serviceHistoryMileage}
                     onChange={e => setServiceHistoryMileage(e.target.value)}
                     required/>
            </label>

            <label className="formField">
              Service type
              <select id="serviceType" onChange={e => setServiceHistoryType(e.target.value)} value={serviceHistoryType}>
                <option value="INTERIM_SERVICE">Interim service</option>
                <option value="FULL_SERVICE">Full service</option>
                <option value="AC_SERVICE">Air condition service</option>
                <option value="REPAIR">Repair (other)</option>
              </select>
            </label>

            <label className="formField">
              Description
              <textarea className="descriptionField"
                        value={serviceHistoryDescription}
                        onChange={e => setServiceHistoryDescription(e.target.value)}
                        placeholder="Enter placeholder..."
                        required/>
            </label>

            <input className="infoButton" type="submit" value="Create"/>
          </form>
        </details>
      </div>
    </div>
  );
}

export default SingleCar;
