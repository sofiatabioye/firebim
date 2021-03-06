
import React from 'react';
import { Bar } from 'react-chartjs-2';


const FireBIMBarChart = (props) => {
   
  const {title, categories, data} = props;
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const labels = categories;
  const barData = {
    labels,
    datasets: [
      {
        label: 'Elements Distribution',
        data: data,
        backgroundColor: 'rgba(54, 142, 205)',
      }
    ],
  };

  return (
    <Bar options={options} data={barData} />
  )
}

export default FireBIMBarChart;