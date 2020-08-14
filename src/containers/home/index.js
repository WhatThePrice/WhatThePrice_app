import React from "react";
import ProductCard from "../../components/cards/productCard"

class Home extends React.Component{
    render() {
        return(
            <div>
                <h1>This is home screen</h1>
                <ProductCard />
            </div>
        )
    }
}

export default Home;