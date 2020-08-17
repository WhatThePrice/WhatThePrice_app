import React from "react";
import "./style.css"

//Components
import ProductCard from "../../../components/cards/productCard";
import ProductList from "../../../components/lists/productList"

class ListView extends React.Component{
    render() {
        return(
            <div className="container">
                <h1 className="queryText">Query <span className="querySum">(no of results)</span> </h1>
                <div className="resultContainer">
                    <div className="cardHolder">
                        <div>
                            <h1> <ProductCard /></h1>
                        </div>
                    </div>
                    <div className="listHolderContainer">
                        <h1>Results</h1>
                        <div className="listHolder">
                            <ProductList />
                            <ProductList />
                            <ProductList />
                            <ProductList />
                            <ProductList />
                            <ProductList />
                            <ProductList />
                            <ProductList />
                            <ProductList />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListView