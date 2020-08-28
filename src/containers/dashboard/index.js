import React from "react";
import { connect } from "react-redux";
import Actions from "actions";

// Components
import TrackCard from "components/cards/trackCard";
import Modal from "components/modal";

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
            rawData:[],
            queryName:[],
            queryDataList:[],
            productName:[],
            productDataList:[],

            showTrend:false,

            // modal
            showModal:false,
            isLoading:true,
            modalTitle:"",
            modalDescription:"",
            showModalButton:false
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
        const { getUserData, getQueryData, getProductData, getUpgradeData, getDowngradeData } = this.props;

        if(prevProps.getUserData.isLoading && !getUserData.isLoading){
            if(getUserData && getUserData.data.status === "success"){
                this.setState({
                    userProfile:getUserData.data.userProfile,
                    userType:getUserData.data.userProfile[0].user_type,
                })
            }
        }
    
        // Query trend data
        if(prevProps.getQueryData.isLoading && !getQueryData.isLoading){
            if (getQueryData && getQueryData.data.status === "success"){
                console.log("get query data", getQueryData)

                //to prepare category array
                let queryCategoryArr = [...new Set(getQueryData.data.query_price.map((item) => item.id))]

                let queryNameArr = [...new Set(getQueryData.data.query_price.map((item) => item.query))]
                this.setState({queryName:queryNameArr}) 

                let  finalQueryData = [];
                // separate data according category
                for (let nQ = 0; nQ < queryCategoryArr.length; nQ++){
                    let queryTrackData=[];
                    for(let iQ=0; iQ < getQueryData.data.query_price.length; iQ++){
                        // to prepare yValue
                        let productY = Array.from(getQueryData.data.query_price
                            .filter((item) => item.id === queryCategoryArr[nQ])
                            .map((item) => item.min_price)
                        )
                        // to prepare xValue
                        let productX = Array.from(getQueryData.data.query_price
                            .filter((item) => item.id === queryCategoryArr[nQ])
                            .map((item) => item.created_at.substr(0,10))
                        )
                        //to combine x and y values
                        queryTrackData = productX.map(function(item,k){
                            return {x:item, y:productY[k]}
                        });
                    }
                    finalQueryData.push(queryTrackData)
                    console.log("final query data", finalQueryData)
                }
                this.setState({queryDataList: finalQueryData})  
            }
        }

        // Product trend
        if(prevProps.getProductData.isLoading && !getProductData.isLoading){
            if (getProductData && getProductData.data.status === "success"){
                //to prepare category array
                let productCategoryArr = [...new Set(getProductData.data.product_price.map((item) => item.id))] 

                let productNameArr = [...new Set(getProductData.data.product_price.map((item) => item.product_name))]
                this.setState({productName:productNameArr}) 

                let  finalData = [];
                // separate data according category
                for (let n=0; n < productCategoryArr.length; n++){
                    let productTrackData=[];
                    for(let i=0; i < getProductData.data.product_price.length; i++){
                        // to prepare yValue
                        let productY = Array.from(getProductData.data.product_price
                            .filter((item) => item.id === productCategoryArr[n])
                            .map((item) => item.price)
                        )
                        // to prepare xValue
                        let productX = Array.from(getProductData.data.product_price
                            .filter((item) => item.id === productCategoryArr[n])
                            .map((item) => item.created_at.substr(0,10))
                        )
                        //to combine x and y values
                        productTrackData = productX.map(function(item,k){
                            return {x:item, y:productY[k]}
                        });
                    }
                    finalData.push(productTrackData)
                }
                this.setState({productDataList:finalData}, () => console.log("after size" , this.state.productDataList))  
            }            
        }

        // Upgrade profile data
        if(prevProps.getUpgradeData.isLoading && !getUpgradeData.isLoading){
            if(getUpgradeData && getUpgradeData.data.status === "success"){
                this.setState({
                    isLoading:false,
                    modalDescription:"Upgrade successful",
                    showModalButton:true
                })
            }
        }

         // Downgrade profile data
        if(prevProps.getDowngradeData.isLoading && !getDowngradeData.isLoading){
            if(getDowngradeData && getDowngradeData.data.status === "success"){
                this.setState({
                    isLoading:false,
                    modalDescription:"Unsubsribe successful",
                    showModalButton:true
                })
            }
        }
    }

    changeUserType() {
        if (this.state.userType === "free") {
            this.props.onUpgrade();
            this.setState({showModal:true , modalTitle:"Upgrade"})
        }

        if (this.state.userType === "premium") {
            this.props.onDowngrade();
            this.setState({showModal:true , modalTitle:"Downgrade"})
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

                {(this.state.userType === "free" && this.state.productDataList.length !== 0) &&  (
                    <div>
                        <div className="dashboardHeader">
                            <h3>Product Track</h3>
                        </div>
                        <TrackCard
                            productName={this.state.productName[0]}
                            data={this.state.productDataList[0]}
                            isOpen={this.state.showTrend}
                            onShow={() => this.setState({showTrend:!this.state.showTrend})}
                        />
                        <h3>Upgrade your subscription to see more tracked</h3>
                    </div>
                )}
                
                {(this.state.userType === "premium" && this.state.productDataList.length !== 0) && (
                    <div>
                        <div className="dashboardHeader">
                            <h3>Product Track</h3>
                        </div>
                        {this.state.productDataList.map((product, index) => (
                                <TrackCard
                                    key={index}
                                    productName={this.state.productName[index]}
                                    data={product}
                                    isOpen={this.state.showTrend}
                                    onShow={() => this.setState({showTrend:!this.state.showTrend})}
                                />
                            )
                        )}
                        <br/>
                        <br/>
                        <div className="dashboardHeader">
                            <h3>Query Track</h3>
                        </div>
                        {this.state.queryDataList.map((query, index) => (
                                <TrackCard
                                    key={index}
                                    productName={this.state.queryName[index]}
                                    data={query}
                                    isOpen={this.state.showTrend}
                                    onShow={() => this.setState({showTrend:!this.state.showTrend})}
                                />
                            )
                        )}
                    </div>
                )}
                
                {this.state.showModal && (
                    <Modal 
                        isLoading={this.state.isLoading}
                        modalTitle={this.state.modalTitle}
                        showModalButton={this.state.showModalButton}
                        description={this.state.modalDescription}
                        onClick={() => this.setState({showModal:false}, () => window.location = "/dashboard")}
                    />
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