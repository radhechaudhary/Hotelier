import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function ReportGraph({ Data, keyName }) {
  const [graphData, setGraphData] = useState([]);
  const [average, setAverage] = useState(0);
  const [total, setTotal] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const now = new Date();
    const arr = [];
    let count = 0;
    let sum = 0;
    const days = ["mon", "tue", "wed", "thur", "fri", "sat", "sun"];
    const months = [
      "jan",
      "feb",
      "mar",
      "april",
      "may",
      "june",
      "july",
      "aug",
      "sept",
      "oct",
      "nov",
      "dec",
    ];
    if (keyName === "Day") {
      setTime(
        `${months[now.getMonth()]} ${now.getDate() - now.getDay()} - Week`
      );
      count=7;
      Data.forEach((value, index) => {
        sum += value;
        
        arr.push({ [keyName]: days[index], entries: value });
      });
    } else if (keyName === "Year") {
      setTime(`${now.getFullYear()}`);
      count=12;
      Data.forEach((value, index) => {
        sum += value;
        
        arr.push({ [keyName]: months[index], entries: value });
      });
    } else {
      setTime(`${months[now.getMonth()]}`);
      Data.forEach((value, index) => {
        count++;
        sum += value;
        arr.push({ [keyName]: index + 1, entries: value });
      });
    }
    if (count !== 0) setAverage(Math.floor(sum / count));
    setTotal(sum);
    setGraphData(arr);
  }, [Data, keyName]);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-center font-medium text-xl">{time}</div>
      <div className="w-full h-[300px]">
        {" "}
        {/* ✅ Fix height issue */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={keyName} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="entries" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h1 className="text-lg font-medium ">Average: {average}</h1>
        <h1 className="text-lg font-medium ">Total: {total}</h1>
      </div>
    </div>
  );
}

export default ReportGraph;
