import React from "react";
import { connect } from "react-redux";
import Actions from "actions";

//Style
import "./style.css"

//Components
import ProductCard from "components/cards/productCard";
import ProductList from "components/lists/productList"

// Data
import data from "assets/dummyData"

class ListView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            query: "",
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
            query:this.state.query,
            userID:this.state.userID
        }
        this.props.onResult(data)
    }

    onItemSelected(id) {
        console.log("im clicked", id)
        this.setState({selectedItem:id})
    }

    render() {
        return(
            <div className="container">
                <input name="query" onChange={(query) => this.setState({query:query.target.value})}/>
                <button onClick={() => this.queryPressed()}>Query</button>
                <h1 className="queryText">{this.state.query}<span className="querySum">(no of results)</span> </h1>
                <div className="resultContainer">
                    <div className="cardHolder">
                        <div>
                            {data.length === 0 ? (
                                <ProductCard />
                            ) : (
                            data
                                .filter((item) => item.id === this.state.selectedItem)
                                .map((item) => (
                                    <ProductCard 
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
                                data.map((item, index) => (
                                    <ProductList
                                        key={item.id}
                                        platform={item.platform}
                                        name={item.name}
                                        brand={item.brand}
                                        image={item.image_url}
                                        price={item.price}
                                        product_id={item.product_id}
                                        url={item.url}
                                        onClick={() => this.onItemSelected(item.id)}
                                    />
                                ))) 
                            }
                        </div>
                    </div>
                </div>
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