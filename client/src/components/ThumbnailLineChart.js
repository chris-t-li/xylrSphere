// import React, { useState, useEffect } from 'react';
// import { Chart } from 'chart.js/auto';
// import { Line } from 'react-chartjs-2';

// function ThumbnailLineChart({ portfolioPriceData }) {
//     const [lineChartData, setLineChartData] = useState(portfolioPriceData.KPR);
//     let data;
//     console.log(portfolioPriceData)
//     console.log(lineChartData)
//     if (!lineChartData) {
//         return
//     } else {
//         data = {
//             labels: lineChartData.map(p => p.price_time),
//             setDatasets: [
//                 {
//                     // label: "NFT Price Chart for [...]",
//                     data: lineChartData.map(p => p.price_nft),
//                     borderColor: "black",
//                     backgroundColor: "black",
//                     fill: {
//                         target: 'origin',
//                         below: "green"
//                     }
//                 }
//             ]
//         }
//     }

//     console.log(data)

//     const options = {
//         responsive: true,
//     }

//     return (
//         <div style={{ maxHeight: "50px", overflow: "hidden" }}>
//             <Line data={lineChartData} options={options} />
//             <p>Small Price Chart goes here</p>
//         </div>
//     )
// }

// export default ThumbnailLineChart;