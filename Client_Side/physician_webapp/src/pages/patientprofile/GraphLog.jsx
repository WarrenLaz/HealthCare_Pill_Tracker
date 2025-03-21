import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import React from "react";
import { useState } from "react";

export const GraphLogs = ({ logs }) => {
  //console.log(Logs);
  const data = () => {
    const amounts = [0];
    const dates_ = [0];
    console.log(logs);
    for (var i = 0; i < logs.length; i++) {
      var e = logs[i];
      var day_ = String(new Date(e.date).getDate()).padStart(2, "0");
      var month_ = String(new Date(e.date).getMonth() + 1).padStart(2, "0");
      amounts.push(e.amount);
      dates_.push(parseFloat(month_) + parseFloat(day_) * 0.01);
    }
    //logs.foreach( (e) => {
    //})
    return { amnt: amounts, dates: dates_ };
  };
  const values = data();
  console.log(values.dates);
  var dataset = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div className="border border-gray-300 shadow-lg rounded-lg p-6 w-[90%] h-fit bg-white mt-4">
      <h1 className="text-xl font-semibold text-gray-800">Medication Logs</h1>
      <LineChart
        xAxis={[{ data: values.dates }]}
        series={[
          {
            data: values.amnt,
          },
        ]}
        width={400}
        height={300}
      />
    </div>
  );
};

export default GraphLogs;
