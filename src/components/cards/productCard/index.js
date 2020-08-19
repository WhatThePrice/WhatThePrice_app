import React from "react";
import "./productCard.css"

// images
import shopee from "assets/images/logos/shopee_banner.png";
import lazada from "assets/images/logos/lazada_banner.png";

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
                        <li className="productPlatform">
                            <img 
                                className="platformLogo" 
                                src={this.props.platform === "lazada" ? lazada : shopee}
                                alt={this.props.platform}
                                height="30"
                            /></li>
                        <li className="productLink"><a href={this.props.url}><b>BUY NOW</b></a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default ProductCard;