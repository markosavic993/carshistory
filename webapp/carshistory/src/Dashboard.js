import {useEffect, useState} from "react";
import axios from "axios";

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
      <h2>Dashboard</h2>
      <ul>
        {data.cars.map(car => (
          <li key={car.name}>{car.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
