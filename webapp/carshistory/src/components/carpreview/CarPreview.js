import './CarPreview.scss';
import {Link} from "react-router-dom";

function CarPreview(props) {
  const { car } = props;

  return (
    <div className="card">
      <div className="data">
        <p>Name: {car.name}</p>
        <p>Mileage: {car.mileage}</p>
        <p>Production year: {car.productionYear}</p>
        <Link to={`/cars/${car._id}`} className="detailsLink" >Details</Link>
      </div>
      <img src={car.images[0]} alt="" className="cardImage"/>
    </div>
  );
}

export default CarPreview;
