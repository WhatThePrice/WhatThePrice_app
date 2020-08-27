import React from "react";
import { Collapse, Button, CardBody } from 'reactstrap';

import "./trackCard.css";


class TrackCard extends React.Component{
    render() {
        return(
            <div>
                <div className="trackCardHeader">
                    <p>Query tracked</p>
                    <Button className="openCardBtn" onClick={this.props.onClick}>See trend</Button>
                </div>
                <Collapse isOpen={this.props.isOpen}>
                    <CardBody className="dashboardContentHolder">
                    <div className="dashboardSummaryHolder">
                        <div className="summaryCard">
                            <p>Today's  price</p>
                            <h1 className="summaryPrice">RM 329.01</h1>
                        </div>
                        <div className="summaryCard">
                            <p>Cheapest price</p>
                            <h1 className="summaryPrice">RM 329.00</h1>
                        </div>
                        <div className="summaryCard">
                            <p>Average price</p>
                            <h1 className="summaryPrice">RM 389.00</h1>
                        </div>
                    </div>
                    <ProductPriceChart 
                        data={this.props.data}
                        product="Samsung"
                        title="Price Trend for Specific product"
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