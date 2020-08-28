import React from "react";
import Chart from 'chart.js';

class ProductPriceChart extends React.Component{
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }
    
    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
            type: 'line',
            backgroundColor:this.props.color,
            data:{
                labels: this.props.data.map((item) => item.x),
                datasets:[{
                    label: `Price trend for ${this.props.product}`,
                    data: this.props.data,
                    borderColor:"rgba(33, 150, 83, 1)",
                    backgroundColor: 'rgba(33, 150, 83, 0.2)' 
                }]
            },
            options:{
                scales:{
                    // xAxes:[{
                    //     type:"time",
                    //     time:{
                    //         unit:"day"
                    //     }
                    // }],
                    yAxes:[{
                        ticks:{
                            callback: (value) => `RM${value}`
                        }
                    }]
                },
                title:{
                    text: "Price Tracking"
                }
            }
        });
    }

    componentDidUpdate(prevProps){
        // if (prevProps.data !== this.props.data){}
    }
    render() {
        return(
            <div style={{width: "800px", height:"400px"}}>
                <canvas ref={this.chartRef} className="myChart"></canvas>
            </div>
        )
    }
}

export default ProductPriceChart;