import React from "react";
import Chart from 'chart.js';

class ProductPriceChart extends React.Component{
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }
    
    componentDidMount() {
        
    }

    componentDidUpdate(prevProps){
        console.log("data on update", this.props.data)

        if (prevProps.data !== this.props.data){
            console.log("after compare", this.props.data)
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
    }
    render() {
        return(
            <div style={{width: "800px", height:"400px", backgroundColor:"red"}}>
                <canvas ref={this.chartRef} className="myChart"></canvas>
            </div>
        )
    }
}

export default ProductPriceChart;