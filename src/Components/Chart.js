//@ts-check
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React, { useState } from "react";
import { CircularProgress } from "@mui/material";

function Chart({ histogramData }) {

  return (
    <>
      <AreaChart width={500} height={400} data={histogramData}>
        <CircularProgress />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="alpha" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="red"
          stackId="1"
          stroke="#CD6155 "
          fill="#CD6155 "
        />
        <Area
          type="monotone"
          dataKey="green"
          stackId="1"
          stroke="#82E0AA"
          fill="#82E0AA"
        />
        <Area
          type="monotone"
          dataKey="blue"
          stackId="1"
          stroke="#5499C7"
          fill="#5499C7"
        />
      </AreaChart>
    </>
  );
}

export default Chart;
