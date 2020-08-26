import React from "react";
import { connect } from "react-redux";
import Actions from "actions";

// Components
import QueryPriceChart from "components/charts/queryPriceChart";
import ProductPriceChart from "components/charts/productPriceChart";
import { Collapse, Button, CardBody, Card } from 'reactstrap';

// Style
import "./dashboard.css";

// Data
import trackData from "assets/trackData";

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            //user
            token:"",
            name:"",

            //product
            queryText:"",
            queryDataList:[],
            productDataList:[],

            showTrend: false,
        }
    }

    componentDidMount(){
        this.props.onGetQuery();
        this.props.onGetProduct();

        const { getUserSession } = this.props
        console.log(getUserSession.data)
        if (Object.keys(getUserSession.data).length !== 0){
            this.setState({
                token:getUserSession.data.token,
                name:getUserSession.data.user.name
            })
        }
    }

    componentDidUpdate(prevProps){
        const { getQueryData, getProductData } = this.props;
        if(prevProps.getQueryData.isLoading && !getQueryData.isLoading){
            // console.log( "get Query data", getQueryData);
            if (getQueryData && getQueryData.data.status === "success"){
                this.setState({queryDataList:getQueryData.data.query_price}, () => console.log(this.state.queryDataList))
            }
        }

        if(prevProps.getProductData.isLoading && !getProductData.isLoading){
            console.log( "get Product data", getProductData.data.product_price);
            if (getProductData && getProductData.data.status === "success"){
                let productY = Array.from(getProductData.data.product_price.map((item) => item.price))
                let productX = Array.from(getProductData.data.product_price.map((item) => item.created_at.substr(11,9)))
                // console.log("price", productY, productX);

                let productTrackData = productX.map(function(item, i){
                    return {x:item, y:productY[i]}
                });

                console.log("track data", productTrackData)

                this.setState({
                    //productDataList:getProductData.data.product_price,
                    productDataList:productTrackData}
                    ,() => console.log("final data", this.state.productDataList))
            }   
        }
    }


    render() {
        return(
            <div className="dashboardContainer">
                <div className="dashboardHeader">
                    <h3>Dashboard</h3>
                    <button>UPGRADE</button>
                </div>
                <div className="profileContainer">
                    <ul>
                        <li>NAME: </li>
                        <li>EMAIL: </li>
                        <li>BIRTH DATE: </li>
                    </ul>
                    <ul>
                        <li>GENDER: </li>
                        <li>POSTCODE: </li>
                        <li>USERTYPE: </li>
                    </ul>
                </div>
                <div style={{display:"flex", justifyContent:"space-between", border:"1px solid black"}}>
                    <p>Query tracked</p>
                    <Button onClick={() => this.setState({showTrend:!this.state.showTrend})}>See trend</Button>
                </div>
                <Collapse isOpen={this.state.showTrend}>
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
                        data={this.state.productDataList}
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

const mapStateToProps = (store) => ({
    getUserSession: Actions.getUserSession(store),
    getQueryData: Actions.getQueryData(store),
    getProductData: Actions.getProductData(store),
})
const mapDispatchToProps = {
    onGetQuery: Actions.getQuery,
    onGetProduct: Actions.getProduct,
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);