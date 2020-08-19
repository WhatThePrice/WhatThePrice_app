import React from "react";
import "./productCard.css"

class ProductCard extends React.Component{
    render() {
        return(
            <div className="cardHolder">
                <div className="productImgHolder">
                    <img className="productImg" src={`http://${this.props.image}`} alt="products"/>
                </div>
                <div className="productNameHolder">
                    <p className="productName">{this.props.name}</p>
                </div>
                <div className="productInfoHolder" >
                    <ul className="productInfoList">
                        <li className="productPrice">RM{this.props.price}</li>
                        <li className="productBrand">{this.props.brand}</li>
                        <li className="productPlatform">LAZADA</li>
                        <li className="productLink"><a href={this.props.url}>BUY NOW</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default ProductCard;