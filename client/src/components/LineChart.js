import React from 'react';
import { Chart } from 'chart.js/auto'
import { Line } from 'react-chartjs-2';

function LineChart({ trimmedPriceData, trimmedTimeData, selectBuyNFT }) {
    const randColor = () => {

        // const r = Math.floor(256 * Math.random()), g = Math.floor(256 * Math.random()), b = Math.floor(256 * Math.random())
        // return `rgb(${r}. ${g}, ${b})`
        return `rgb(0,0,0)`
    }
    // console.log(Chart)
    const data = {
        labels: trimmedTimeData,
        datasets: [
            {
                label: `Price Chart for ${selectBuyNFT.name}`,
                data: trimmedPriceData,
                borderColor: randColor(),
                backgroundColor: randColor(),
                // fill: {
                //     target: 'origin',
                //     // below: randColor()
                // }
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

        plugins: {
            legend: {
                position: 'top',
            },

            // title: {
            //     display: true,
            //     text: 'Chart.js Line Chart',
            // },
        },
        scales: {
            x: {
                ticks: {
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
                // display: "inline-block",
                // position: "absolute",
                // left: "43em",
                // top: "6em"
            }}>
            <Line
                data={data}
                options={options}
            />
        </div>
    )
}

export default LineChart;
