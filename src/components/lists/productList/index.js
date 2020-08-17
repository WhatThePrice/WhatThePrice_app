import React from "react";
import "./style.css";

class ProductList extends React.Component{
    render() {
        return(
            <div className="listContainer">
                <div className="platformColumn infoColumn"><p>LAZADA</p></div>
                <div className="nameColumn infoColumn"><p>Laptop ASUS</p></div>
                <div className="priceColumn infoColumn"><p>RM3423434</p></div>
                <div className="linkColumn infoColumn"><b>BUY NOW</b></div>
            </div>
        )
    }
}

export default ProductList;