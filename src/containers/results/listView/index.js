import React from "react";
import { connect } from "react-redux";
import Actions from "actions";

//Style
import "./style.css"

//Components
import SearchBar from "components/searchBar";
import ProductCard from "components/cards/productCard";
import ProductList from "components/lists/productList"

// Data
import data from "assets/dummyData"

class ListView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            queryText: "",
            queryCalled:false,
            userID: "1",
            results:[],
            selectedItem:0
        }
    }

    componentDidUpdate(prevProps){
        const { getResultData } = this.props;
        if (prevProps.getResultData.isLoading && !getResultData.isLoading){
            console.log(getResultData.data)
            if (getResultData.data.status_code === "200") { 
                this.setState({results:getResultData.data.data})
            }
        }
    }

    queryPressed() {
        const data = {
            queryText:this.state.queryText,
            userID:this.state.userID
        }
        this.props.onResult(data)
        this.setState({queryCalled:!this.state.queryCalled})
    }

    onItemSelected(id) {
        this.setState({selectedItem:id})
    }

    render() {
        return(
            <div>
                {this.state.queryCalled === false ? (
                    <SearchBar 
                        onChange={(queryText) => this.setState({queryText:queryText.target.value})}
                        noQuery={!this.state.queryCalled}
                        onClick={() => this.queryPressed()}
                    />
                ) : (
                    <div>
                        <SearchBar />
                        <div className="container">
                            <div className="resultContainer">
                                <h1 className="queryText">{this.state.query}<span className="querySum">(no of results)</span> </h1>
                                <div className="cardHolder">
                                    <div>
                                        {data.length === 0 ? (
                                            <ProductCard />
                                        ) : (
                                            data
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
                                <div className="listHolderContainer">
                                <h1>Results</h1>
                                <div className="listHolder">
                                    {data.length === 0 ? (
                                        <p>no result found</p>
                                    ) : (
                                        data.sort((a,b) => a.price - b.price).map((item, index) => (
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