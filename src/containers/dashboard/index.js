import React from "react";
import { connect } from "react-redux";
import Actions from "actions";

// Components
// import QueryPriceChart from "components/charts/queryPriceChart";
import ProductPriceChart from "components/charts/productPriceChart";
import TrackCard from "components/cards/trackCard";
import { Collapse, Button, CardBody } from 'reactstrap';

// Style
import "./dashboard.css";

// Data
// import trackData from "assets/trackData";

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            //auth checking
            token:"",
            name:"",

            //profile
            userProfile:[],
            userType:"",

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
        this.props.onGetUser();

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
        const { getUserData, getQueryData, getProductData } = this.props;

        if(prevProps.getUserData.isLoading && !getUserData.isLoading){
            if(getUserData && getUserData.data.status === "success"){
                this.setState({
                    userProfile:getUserData.data.userProfile,
                    userType:getUserData.data.userProfile[0].user_type,
                })
            }
        }
    
        if(prevProps.getQueryData.isLoading && !getQueryData.isLoading){
            // console.log( "get Query data", getQueryData);
            if (getQueryData && getQueryData.data.status === "success"){
                this.setState({queryDataList:getQueryData.data.query_price})
            }
        }

        if(prevProps.getProductData.isLoading && !getProductData.isLoading){
            if (getProductData && getProductData.data.status === "success"){
                let productY = Array.from(getProductData.data.product_price.map((item) => item.price))
                let productX = Array.from(getProductData.data.product_price.map((item) => item.created_at.substr(11,9)))
                // console.log("price", productY, productX);
                let productTrackData = productX.map(function(item, i){
                    return {x:item, y:productY[i]}
                });
                // console.log("track data", productTrackData)
                this.setState({
                    //productDataList:getProductData.data.product_price,
                    productDataList:productTrackData}
                    ,() => console.log("final data", this.state.productDataList))
            }   
        }
    }

    changeUserType() {
        if (this.state.userType === "free") {
            this.props.onUpgrade()
        }

        if (this.state.userType === "premium") {
            this.props.onDowngrade()
        }
    }

    render() {
        return(
            <div className="dashboardContainer">
                <div className="dashboardHeader">
                    <h3>Dashboard</h3>
                    <button onClick={() => this.changeUserType()} className="upgradeBtn">{this.state.userType === "free" ? "UPGRADE" : "UNSUBSCRIBE"}</button>
                </div>
                {this.state.userProfile.map((item) => (
                    <div key={item.id} className="profileContainer">
                        <ul>
                            <li><b className="profileLabel">NAME</b>: {item.name}</li>
                            <li><b className="profileLabel">EMAIL</b>: {item.email}</li>
                            <li><b className="profileLabel">BIRTH DATE</b>: {item.birth_date}</li>
                        </ul>
                        <ul>
                            <li><b className="profileLabel">GENDER</b>: {item.gender}</li>
                            <li><b className="profileLabel">POSTCODE</b>: {item.postcode}</li>
                            <li><b className="profileLabel">USER TYPE</b>: {item.user_type}</li>
                        </ul>
                    </div>
                ))}

                <TrackCard 
                    data={this.state.productDataList}
                    isOpen={this.state.showTrend}
                    onClick={() => this.setState({showTrend:!this.state.showTrend})}
                />

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
    getUserData: Actions.getUserData(store),
    getUpgradeData: Actions.getUpgradeData(store),
    getDowngradeData: Actions.getDowngradeData(store),
})
const mapDispatchToProps = {
    onGetQuery: Actions.getQuery,
    onGetProduct: Actions.getProduct,
    onGetUser: Actions.getUser,
    onUpgrade: Actions.upgrade,
    onDowngrade: Actions.downgrade,
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);