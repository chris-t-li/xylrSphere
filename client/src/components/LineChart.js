import React from 'react';
import { Chart } from 'chart.js/auto'
import { Line } from 'react-chartjs-2';

function LineChart({ priceData, timeData }) {
    const data = {
        labels: timeData,
        datasets: [
            {
                label: 'NFT Price Chart for [...]',
                data: priceData,
                borderColor: 'rgb(0, 71, 171)',
                backgroundColor: 'rgb(0, 71, 171)',
            }
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    return (
        <div id="nft-price-chart">
            <Line data={data} />
        </div>
    )

}

export default LineChart;
