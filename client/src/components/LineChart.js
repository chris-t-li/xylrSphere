import React from 'react';
// import { Chart } from 'chart.js/auto'
import { Line } from 'react-chartjs-2';

function LineChart({ trimmedPriceData, trimmedTimeData, selectBuyNFT }) {
    const randColor = () => {
        return `rgb(0,0,0)`
    }

    const data = {
        labels: trimmedTimeData,
        datasets: [
            {
                label: `Recent Price Trend for ${selectBuyNFT.name}`,
                data: trimmedPriceData,
                borderColor: randColor(),
                backgroundColor: randColor(),
            }
        ],
    };

    // Line Chart Animation: https://www.chartjs.org/docs/latest/samples/animations/progressive-line.html
    const totalDuration = 2000;
    const delayBetweenPoints = totalDuration / trimmedPriceData.length;
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
        elements: {
            point: {
                radius: 0
            }
        },
        plugins: {
            legend: {
                position: 'top',
            }
        },
        scales: {
            x: {
                display: false,
                ticks: {
                    display: false,
                    callback: function (val, index) {
                        return index % 2 === 0 ? this.getLabelForValue(val) : "";
                    },
                    color: 'black',
                }
            }
        }
    };

    return (
        <div id="nft-price-chart"
            style={{
                height: "100%",
            }}>
            <Line
                data={data}
                options={options}
            />
        </div>
    )
}

export default LineChart;
