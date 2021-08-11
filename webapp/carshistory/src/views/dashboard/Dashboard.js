import './Dashboard.scss';
import {useEffect, useState} from "react";
import axios from "axios";
import CarPreview from "../../components/carpreview/CarPreview";

function Dashboard() {
  const [data, setData] = useState({ cars: [] });

  useEffect(async () => {
    const result = await axios(
      'http://localhost:5000/cars',
    );

    setData(result.data);
  }, []);

  return (
    <div>
      <h2 className="title">Dashboard</h2>
      <div className="container">
        <div className="cars">
          <p className="subtitle">Cars</p>
            {data.cars.map(car => (
                <CarPreview car={car} />
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
