import React from "react";
import Chart from 'chart.js';

class TrackChart extends React.Component{
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
                labels:this.props.data.map((item) => item.created_at),
                datasets:[{
                    label: this.props.title,
                    data: this.props.data.map((item) => item.price_analytics),
                    backgroundColor: this.props.color,
                }]
            }
        });
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

export default TrackChart;