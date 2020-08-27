import React from "react";
import "./productCard.css"

// images
import shopee from "assets/images/logos/shopee_banner.png";
import lazada from "assets/images/logos/lazada_banner.png";

class ProductCard extends React.Component{
    showPlatformLogo() {
        switch(this.props.platform){
            case "lazada": return lazada;
            case "shopee": return shopee;
            default : return shopee;
        }
    }

    render() {
        return(
            <div className="cardHolder">
                <div className="productImgHolder">
                    <img className="productImg" src={`http://${this.props.image}`} alt="products"/>
                </div>
                <div className="productNameHolder">
                    <p className="productName">{this.props.name}Samsung Galaxy A11 (3GB RAM + 32GB ROM) Smartphone ,1 Year Samsung Malaysia Warranty , Free Shipping</p>
                </div>
                <div className="productInfoHolder" >
                    <ul className="productInfoList">
                        <li className="productTrackHolder">
                            <button onClick={this.props.onTrackBtnClick} className="productTrackBtn" data-toggle="tooltip" title="Track this product">
                                <b>TRACK THIS PRODUCT</b><i className="fa fa-heart"></i>
                            </button>
                        </li>
                        <li className="productPrice">RM{this.props.price}</li>
                        <li className="productBrand">{this.props.brand}Samsung</li>
                        <li className="productPlatform">
                            <img 
                                className="platformLogo" 
                                src={this.showPlatformLogo()}
                                alt={this.props.platform}
                                height="30"
                                loading="lazy"
                            /></li>
                        <li className="productLink"><a href={`http://${this.props.url}`} target="_blank" rel="noopener noreferrer"><b>BUY NOW</b></a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default ProductCard;