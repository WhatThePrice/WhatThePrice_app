import React from "react";
import ProductCard from "components/cards/productCard";

class Home extends React.Component{
    render() {
        return(
            <div>
                <p>this is home</p>
                <ProductCard />
            </div>
        )
    }
}

export default Home;    