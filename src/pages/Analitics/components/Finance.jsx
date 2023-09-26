import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';

const Finance = () => {
  const [chartData] = useState({
    series: [
      {
        name: 'Sales',
        data: [4, 3, 120, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
      },
    ],
    options: {
      chart: {
        height: 450,
        type: 'line',
      },
      forecastDataPoints: {
        count: 7,
      },
      stroke: {
        width: 2,
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '1/11/2000',
          '2/11/2000',
          '3/11/2000',
          '4/11/2000',
          '5/11/2000',
          '6/11/2000',
          '7/11/2000',
          '8/11/2000',
          '9/11/2000',
          '10/11/2000',
          '11/11/2000',
          '12/11/2000',
          '1/11/2001',
          '2/11/2001',
          '3/11/2001',
          '4/11/2001',
          '5/11/2001',
          '6/11/2001',
        ],
        tickAmount: 10,
        labels: {
          formatter: function (value, timestamp, opts) {
            return opts.dateFormatter(new Date(timestamp), 'dd MMM');
          },
        },
      },
      title: {
        text: 'Forecast',
        align: 'left',
        style: {
          fontSize: '16px',
          color: '#fff',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['rgba(207, 84, 144, 1)'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      yaxis: {
        min: -10,
        max: 1000,
      },
    },
  });
  return (
    <div><div id="chart" style={{backgroundColor:'rgba(28, 28, 36, 1)',padding:'10px',borderRadius:'10px',color:'#000'}}>
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="line"
      height={450}
     
    />
  </div></div>
  )
}

export default Finance