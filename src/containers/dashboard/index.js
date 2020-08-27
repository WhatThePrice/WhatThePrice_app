import React from "react";
import { connect } from "react-redux";
import Actions from "actions";

// Components
// import QueryPriceChart from "components/charts/queryPriceChart";
import TrackCard from "components/cards/trackCard";

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
            rawData:[],
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
                this.setState({rawData:getProductData.data.product_price})

                //to prepare category array
                let categoryArr = [...new Set(getProductData.data.product_price.map((item) => item.id))] 
                
                let  finalData = [];
                // separate data according category
                for (var n=0; n < categoryArr.length; n++){
                    let productTrackData=[];
                    for(var i=0; i < getProductData.data.product_price.length; i++){
                        // to prepare yValue
                        let productY = Array.from(getProductData.data.product_price
                            .filter((item) => item.id === categoryArr[n])
                            .map((item) => item.price)
                        )
                        // to prepare xValue
                        let productX = Array.from(getProductData.data.product_price
                            .filter((item) => item.id === categoryArr[n])
                            .map((item) => item.created_at.substr(0,10))
                        )
                        //to combine x and y values
                        productTrackData = productX.map(function(item,k){
                            return {x:item, y:productY[k]}
                        });
                    }
                    finalData.push(productTrackData)
                }
                console.log('final data:',finalData)
                this.setState({productDataList: finalData}, () =>  console.log("after setState", this.state.productDataList))  
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
                
                {this.state.productDataList.map((product, index) => (
                        <TrackCard
                        key={index}
                        data={product}
                        isOpen={this.state.showTrend}
                        onShow={() => this.setState({showTrend:!this.state.showTrend})}
                    />
                    )
                )}
                
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