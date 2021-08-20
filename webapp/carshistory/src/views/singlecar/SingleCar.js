import './SingleCar.scss';
import {useEffect, useState} from "react";
import axios from "axios";
import {
  useParams
} from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function SingleCar() {
  const {carId} = useParams();
  const [carData, setCarDara] = useState({images:[], serviceHistory: []});

  useEffect(async () => {
    const result = await axios(
      `http://localhost:5000/cars/${carId}`,
    );

    setCarDara(result.data);
  }, []);

  return (
    <div>
      <p className="title">{carData.name}</p>
      <Carousel className="appCarousel">
        {carData.images.map(imageUrl => (
          <div>
            <img src={imageUrl}  alt=""/>
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
              <p className="mainDataItem">Date: {historyEntry.description}</p>
            </div>
          ))}
        </details>
      </div>
    </div>
  );
}

export default SingleCar;
