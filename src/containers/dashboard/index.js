import React from "react";
import { connect } from "react-redux";
import Actions from "actions";

// Components
import TrackChart from "components/charts/trackChart";

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
            trackingList:[]
        }
    }

    componentDidMount(){
        this.props.onGetQuery();

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
        const { getQueryData } = this.props;
        if(prevProps.getQueryData.isLoading && !getQueryData.isLoading){
            console.log( "get Query data", getQueryData);
            if (getQueryData && getQueryData.data.status === "success"){
                this.setState({trackingList:getQueryData.data})
            }
        }
    }

    render() {
        return(
            <div className="dashboardContainer">
                <div className="dashboardHeader">
                    <h3>Dashboard</h3>
                    <div className="dashboardUser">
                        <p>{this.state.name}</p>
                    </div>
                </div>
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
                <TrackChart 
                    data={trackData}
                    title="Price Trend for Laptop Samsung"
                    color="#219653"
                    category="min_price"
                />
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    getUserSession: Actions.getUserSession(store),
    getQueryData: Actions.getQueryData(store)
})
const mapDispatchToProps = {
    onGetQuery: Actions.getQuery,
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);