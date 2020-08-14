import React from "react";
import "./productCard.css"

class ProductCard extends React.Component{
    render() {
        return(
            <div className="cardHolder">
                <div className="productImgHolder">
                    <img className="productImg"/>
                    <p className="productName">product name asdhsdh shdsadsd sadsadsad dssadngdsa hsdsahdsak hdsdb shdsah</p>
                </div>
                <div className="productInfoHolder" >
                    
                    <ul className="productInfoList">
                        <li className="productPrice">RM3793.20</li>
                        <li className="productBrand">ASUS</li>
                        <li className="productPlatform">LAZADA</li>
                        <li className="productLink"><a>buy now</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default ProductCard;