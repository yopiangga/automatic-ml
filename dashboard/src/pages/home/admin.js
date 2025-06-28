import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { MdErrorOutline } from "react-icons/md";
import { LineChart } from "@mui/x-charts/LineChart";
import LoadComponent from "src/components/load";

export function HomeAdminPage() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get use axios
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.1.6:5001/evaluate");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        console.log("Response:", response);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full col-span-12 h-screen bg-white">
        <LoadComponent />
      </div>
    );
  }

  return (
    <div className="col-span-12 grid lg:grid-cols-6 grid-cols-2 gap-3">
      <Card
        title="Mean Absolute Error"
        icon={<MdErrorOutline />}
        value={data?.last_evaluate?.mae ?? "-"}
      />
      <Card
        title="Mean Squared Error"
        icon={<MdErrorOutline />}
        value={data?.last_evaluate?.mse ?? "-"}
      />
      <Card
        title="R2 Score"
        icon={<MdErrorOutline />}
        value={data?.last_evaluate?.r2 ?? "-"}
      />
      <div className="flex flex-col items-center justify-between p-4 bg-white shadow-lg rounded-lg shadow-xs col-span-6">
        <span className="text-xs text-gray-500 line-clamp-1">
          Predict (next week)
        </span>

        <div className="w-full">
          <LineChart
            id="line-chart-predict"
            series={[
              {
                data: data
                  ? data?.current_predict?.predict
                  : [0, 0, 0, 0, 0, 0, 0],
              },
            ]}
            height={300}
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-between p-4 bg-white shadow-lg rounded-lg shadow-xs col-span-6">
        <span className="text-xs text-gray-500 line-clamp-1">
          Evaluate (last week)
        </span>

        <div className="w-full">
          <LineChart
            id="line-chart-evaluate"
            series={[
              {
                data: data
                  ? data?.last_evaluate_prices?.predict
                  : [0, 0, 0, 0, 0, 0, 0],
              },
              {
                data: data
                  ? data?.last_evaluate_prices?.buy
                  : [0, 0, 0, 0, 0, 0, 0],
              },
            ]}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}

function Card({ title, icon, value }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg shadow-xs col-span-2">
      <div className="flex items-center">
        <div className="flex flex-col">
          <div className="flex ">{icon}</div>
          <span className="text-sm font-semibold text-gray-900 line-clamp-1 mt-2">
            {value}
          </span>
          <span className="text-xs text-gray-500 line-clamp-1">{title}</span>
        </div>
      </div>
    </div>
  );
}
