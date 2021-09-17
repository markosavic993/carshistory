import './Dashboard.scss';
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import CarPreview from "../../components/carpreview/CarPreview";
import {UserContext} from "../../context/UserContext";

function Dashboard() {
  const [data, setData] = useState({cars: []});
  const [working, setWorking] = useState(false);
  const [userContext, setUserContext] = useContext(UserContext)

  useEffect(async () => {
    if (!working) {
      const result = await axios.get(
        'http://localhost:5000/cars',
        {
          headers: {
            'Authorization': `Bearer ${userContext.token}`
          }
        }
      );

      setData(result.data);
    }
  }, [working]);

  const onDeleteCarTriggered = async (car) => {
    setWorking(true);
    await axios.delete(`http://localhost:5000/cars/${car._id}`,
      {
        headers: {
          'Authorization': `Bearer ${userContext.token}`
        }
      });
    setWorking(false);
  };

  return (
    <div>
      <h2 className="title">Dashboard</h2>
      <div className="container">
        <div className="cars">
          <p className="subtitle">Cars</p>
          {data.cars.map(car => (
            <CarPreview car={car} onDeleteCarTriggered={onDeleteCarTriggered}/>
          ))}
        </div>
        <div className="otherSections">
          <div className="recentActivities">
            <p className="subtitle">Recent activities</p>
          </div>
          <div className="scheduledServices">
            <p className="subtitle">Scheduled services</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
