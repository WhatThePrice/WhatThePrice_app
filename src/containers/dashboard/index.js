import React from "react";
import { connect } from "react-redux";
import Actions from "actions";

// Components
import BarChart from "components/charts/barChart";

// Style
import "./dashboard.css";

// Data
import trackData from "assets/trackData";

class Dashboard extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const { getQueryData } = this.props;
        console.log(getQueryData.data)
    }

    render() {
        return(
            <div className="dashboardContainer">
                <div className="dashboardHeader">
                    <h3>Dashboard</h3>
                    <div className="dashboardUser">
                        <p>Username</p>
                        <p><i className="fa fa-sign-out" ></i></p>
                        <p><i className="fa fa-bell" ></i></p>
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
                <BarChart 
                    data={trackData}
                    title="Price Trend for Laptop Samsung"
                    color="#219653"
                />
            </div>
        )
    }
}

const mapStateToProps = (store) => ({})
const mapDispatchToProps = {
    onResult: Actions.getQuery,
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);