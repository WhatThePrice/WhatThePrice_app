import React from "react";
import { connect } from "react-redux";
import Actions from "actions";

// Victory
import { 
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryLabel,
    VictoryTooltip,
    LineSegment,
} from 'victory';

//Style
import "./listView.css"

//Components
import SearchBar from "components/searchBar";
import ProductCard from "components/cards/productCard";
import ProductList from "components/lists/productList";
import Modal from "components/modal";

// Data
// import dummyData from "assets/dummyData";

class ListView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            // query
            queryText: "",
            queryCalled:false,
            
            // user
            userID: "",
            
            // results
            results:[],
            countResults:0, 
            selectedItem:0,
            viewType:"list", //listView by default
            sorted:true, //sort to cheap first by default

            // query status
            showModal: false,
            isLoading: true,    
        }
    }

    componentDidUpdate(prevProps){
        const { getResultData } = this.props;
        if (prevProps.getResultData.isLoading && !getResultData.isLoading){
            console.log(getResultData.data)
            if (getResultData.data.status_code === "200") { 
                this.setState({
                    results:getResultData.data.data,
                    countResults:getResultData.data.analytics[0].result_count,
                    showModal:!this.state.showModal
                }, () => console.log(this.state.countResults, getResultData.data.analytics[0].result_count))
            }
        }
    }

    // when 'search' button is pressed, 
        // save query to state
        // set querycalled to true
    queryPressed() {
        const data = {
            query:this.state.queryText,
            userID:this.state.userID
        }
        this.props.onResult(data)
        this.setState({
            queryCalled:!this.state.queryCalled,
            showModal:true,
        })
    }

    // when item selected, set selectedItem to product unique id
    onItemSelected(id) {
        this.setState({selectedItem:id})
    }

    // to change results view
    changeView(type) {
        this.setState({viewType:type})
    }

    // to sort results
    sortGraph() {
        this.setState({sorted:!this.state.sorted})
    }

    render() {
        return(
            <div>
                {this.state.queryCalled === false && (
                    // if no query called, show only search bar
                    <SearchBar 
                        onChange={(queryText) => this.setState({queryText:queryText.target.value})}
                        noQuery={!this.state.queryCalled}
                        onClick={() => this.queryPressed()}
                    />
                )}

                {this.state.queryCalled && this.state.showModal && (
                    <Modal 
                        isLoading={this.state.isLoading}
                        modalTitle="Scraping live data .."
                        showModalButton={false}
                    />
                )}
                
                {this.state.queryCalled && !this.state.showModal && (
                    // if query called, show search bar on top and display results in list by default
                    <div>
                        <SearchBar 
                            onChange={(queryText) => this.setState({queryText:queryText.target.value})}
                            noQuery={!this.state.queryCalled}
                            onClick={() => this.queryPressed()}
                        />
                        <div className="container">
                            <div className="resultContainer">
                            
                            {/* show queryText and no of result */}
                            <h3 className="queryText">{this.state.queryText}<span className="querySum"> ({this.state.countResults} results)</span><button>Track this query</button></h3>
                            
                                {/* card to show selectedItem */}
                                <div className="cardHolder">
                                    <div>
                                        {this.state.results.length === 0 ? (<ProductCard />) : (
                                            this.state.results
                                            .filter((item) => item.id === this.state.selectedItem)
                                            .map((item) => (
                                                <ProductCard 
                                                    key={item.id}
                                                    platform={item.platform}
                                                    name={item.name}
                                                    brand={item.brand}
                                                    image={item.image_url}
                                                    price={item.price}
                                                    product_id={item.product_id}
                                                    url={item.url}
                                                />
                                            ))
                                        )}
                                    </div>
                                </div>

                                {/* show all results, listView by default */}
                                <div className="allResultsContainer">

                                    <div className="allResultsHeader">
                                        <h3>Results</h3>
                                        <div className="filterHolder">
                                            {/* to sort */}
                                            <p>Sort by</p>
                                            <button 
                                            className="sortBtn"
                                            onClick={() => this.sortGraph()}>{this.state.sorted ? "Expensive first" : "Cheapest first"}
                                        </button>

                                            {/* view type selector */}
                                            <div className="selectorBtnHolder">
                                            <button 
                                                className="selectorBtn" 
                                                onClick={() => this.changeView("graph")}
                                                style={{backgroundColor:this.state.viewType === "graph" && "darkgray"}}
                                            ><i className="fa fa-signal"></i></button>
                                            <button 
                                                className="selectorBtn" 
                                                onClick={() => this.changeView("list")}
                                                style={{backgroundColor:this.state.viewType === "list" && "darkgray"}}
                                            ><i className="fa fa-th-list"></i></button>
                                        </div>
                                        </div>
                                    </div>
                                    {this.state.viewType === "list" && (
                                        <div className="listHolder">
                                    {this.state.results.length === 0 ? (<p>no result found</p>) : (
                                        this.state.results
                                            .sort((a,b) => this.state.sorted ? a.price - b.price : b.price - a.price )
                                            .map((item, index) => (
                                                <ProductList
                                                    key={item.id}
                                                    platform={item.platform}
                                                    name={item.name}
                                                    brand={item.brand}
                                                    image={item.image_url}
                                                    price={item.price}
                                                    product_id={item.product_id}
                                                    url={item.url}
                                                    onHover={() => this.onItemSelected(item.id)}
                                                />
                                            ))) 
                                    }
                                </div>
                                    )}
                                    {this.state.viewType === "graph" && (
                                        <div className="graphHolder" >
                                            <VictoryChart domainPadding={{x:[20,20]}} width={500} >
                                                <VictoryAxis
                                                    dependentAxis
                                                    label="Price"
                                                    axisComponent={<LineSegment style={{fontSize:"1"}}/>}
                                                    axisLabelComponent={<VictoryLabel style={{fontSize:"20"}} dy={-100} dx={25} angle={360}/>}
                                                    tickLabelComponent={<VictoryLabel style={{fontSize:"10"}}/>}
                                                    tickFormat={(y) => `RM${y}`}
                                                />
                                                <VictoryBar
                                                    data={this.state.results.sort((a,b) => this.state.sorted ? a.price - b.price : b.price - a.price )}
                                                    y={"price"}
                                                    style={{ data:{fill: "#219653"} }}
                                                    barRatio={0.8}
                                                    alignment="start"
                                                    animate={{duration: 2000, onLoad: { duration: 1000 }}}
                                                    labels={({datum}) => `RM${datum.price} from ${datum.platform}`}
                                                    labelComponent={
                                                    <VictoryTooltip 
                                                        style={{fontSize:"10"}}
                                                        pointerLength={5} />
                                                    }
                                                    events={[{
                                                        target:"data",
                                                        eventHandlers:{
                                                            onMouseEnter:() => {
                                                                return[{
                                                                    target:"data",
                                                                    mutation:(props) => {
                                                                        const fill = props.style && props.style.fill;
                                                                        return fill === "#219653" ? null : {style: {fill:"#219653"}}
                                                                    }
                                                                }]
                                                            }
                                                        }
                                                    }]}
                                                />
                                            </VictoryChart>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    getResultData: Actions.getResultData(store)
})
const mapDispatchToProps = {
    onResult:Actions.result
}

export default connect( mapStateToProps , mapDispatchToProps )(ListView)