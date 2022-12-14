import { Chart } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

function LineChartSell({ priceData, timeData, nftData }) {
    const data = {
        labels: timeData,
        datasets: [
            {
                label: `Recent Price Trend for ${nftData.name}`,
                data: priceData,
                borderColor: "black",
                backgroundColor: "black",
                fill: {
                    target: 'origin',
                    below: "green"
                }
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        elements: {
            point: {
                radius: 0
            }
        },
        scales: {
            x: {
                display: false,
                ticks: {
                    display: false,
                    callback: function (val, index) {
                        return index % 10 === 0 ? this.getLabelForValue(val) : "";
                    },
                    color: 'black',
                }
            }
        }
    };

    return (
        <div id="nft-price-chart"
            style={{
                width: "100%",
                height: "100%",

            }}>
            <Line
                data={data}
                options={options}
            />
        </div>
    )
}

export default LineChartSell;
