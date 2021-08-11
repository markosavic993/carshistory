import {useEffect, useState} from "react";
import axios from "axios";
import {
  useParams
} from "react-router-dom";

function SingleCar() {
  const {carId} = useParams();
  const [carData, setCarDara] = useState({});

  useEffect(async () => {
    const result = await axios(
      `http://localhost:5000/cars/${carId}`,
    );

    setCarDara(result.data);
  }, []);

  return (
    <div>
      <h2>Single car - {carData.name}</h2>
      <div>
        <p>{carData.color}</p>
      </div>
    </div>
  );
}

export default SingleCar;
