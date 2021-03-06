import './CarPreview.scss';
import {Link} from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function CarPreview(props) {
  const { car, onDeleteCarTriggered } = props;

  const deleteCarHandler = async (event) => {
    onDeleteCarTriggered(car);
  };

  return (
    <div className="card">
      <div className="data">
        <div>
          <p>Name: {car.name}</p>
          <p>Mileage: {car.mileage}</p>
          <p>Production year: {car.productionYear}</p>
          <Link to={`/cars/${car._id}`} className="detailsLink" >Details</Link>
        </div>
        <div className="actions">
          <a className="dangerButton" onClick={deleteCarHandler}>Delete</a>
        </div>
      </div>
      <img src={`${BASE_URL}/${car.images[0]}`} alt="" className="cardImage"/>
    </div>
  );
}

export default CarPreview;
