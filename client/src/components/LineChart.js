import React from 'react';
// import { Chart } from 'chart.js/auto'
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
    // Line Chart Animation: https://www.chartjs.org/docs/latest/samples/animations/progressive-line.html
    const totalDuration = 4000;
    const delayBetweenPoints = totalDuration / priceData.length;
    const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const animation = {
        x: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: NaN, // the point is initially skipped
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.xStarted) {
                    return 0;
                }
                ctx.xStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        },
        y: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: previousY,
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.yStarted) {
                    return 0;
                }
                ctx.yStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        }
    };

    const options = {
        animation,
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
            <Line
                data={data}
                options={options}
            />
        </div>
    )
}

export default LineChart;
