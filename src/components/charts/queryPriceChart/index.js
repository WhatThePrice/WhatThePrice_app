import React from "react";
import Chart from 'chart.js';

class QueryPriceChart extends React.Component{
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }
    
    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
            type: 'line',
            options:{
                scales:{
                    yAxes:[{
                        ticks:{
                            stepSize:100
                        }
                    }]
                }
            },
            data: {
                labels:this.props.data.map((item) => item.created_at.substr(0,10)),
                datasets:[{
                    label: this.props.title,
                    data: this.props.data,
                    parsing:{
                        xAxisKey:'created_at'
                    },
                    backgroundColor: this.props.color,
                }]
            }
        });

        console.log("data", this.props.data)
        console.log("date", this.props.data.created_at)
        console.log("price", this.props.data.price_analytics)
    }

    render() {
        return(
            <div>
                <h1>BarChart</h1>
                <canvas ref={this.chartRef} className="myChart" style={{width:"200", height:"200"}}></canvas>
            </div>
        )
    }
}

export default QueryPriceChart;