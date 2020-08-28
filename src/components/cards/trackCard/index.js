import React from "react";

// Components
import { Collapse, Button, CardBody } from 'reactstrap';
import ProductPriceChart from "components/charts/productPriceChart";

// Style
import "./trackCard.css";


class TrackCard extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:this.props.data
        }
        console.log("data", this.props.data)
    }

    render() {
        return(
            <div>
                <div className="trackCardHeader">
                    <p>{this.props.productName}</p>
                    <div className="trackCardBtnHolder">
                        <Button className="openCardBtn trackBtn" onClick={this.props.onShow}>See trend</Button>
                        <button data-toggle="tooltip" title="Stop tracking this product" className="cancelTrackBtn trackBtn" onClick={this.props.onCancel}><i className="fa fa-minus" ></i></button>
                    </div>
                    
                </div>
                <Collapse isOpen={this.props.isOpen}>
                    <CardBody className="dashboardContentHolder">
                    <div className="dashboardSummaryHolder">
                        <div className="summaryCard">
                            <p>Latest  price</p>
                            <h1 className="summaryPrice">RM{this.props.data[0].y}</h1>
                        </div>
                        <div className="summaryCard">
                            <p>Cheapest price</p>
                            <h1 className="summaryPrice">RM{this.props.data.sort((a,b) => a.y - b.y)[0].y}</h1>
                        </div>
                        <div className="summaryCard">
                            <p>Average price</p>
                            <h1 className="summaryPrice">RM{
                                (this.props.data.map((item) => parseInt(item.y)).reduce(function(prev, curr){
                                    return prev + curr
                                }) / this.props.data.length).toFixed(2)
                            }</h1>
                        </div>
                    </div>
                    <ProductPriceChart 
                        data={this.state.data}
                        product={this.props.productName}
                        title={`Price Trend for ${this.props.productName}`}
                        color="#219674"
                        category="min_price"
                    />
                </CardBody>
                </Collapse>
            </div>
        )
    }
}

export default TrackCard;