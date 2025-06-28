import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export function Monitoring() {
  const [data, resData] = useState();

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
        resData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Monitoring">
      <LineChart
        // xAxis={[
        //   { data: data ? data["last_emas"]["date"] : [0, 0, 0, 0, 0, 0] },
        // ]}
        series={[
          {
            data: data ? data["last_emas"]["buy"] : [0, 0, 0, 0, 0, 0],
          },
        ]}
        height={300}
      />
    </div>
  );
}
