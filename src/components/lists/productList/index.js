import React from "react";
import "./style.css";

// images
import shopee from "assets/images/logos/shopee_square.png";
import lazada from "assets/images/logos/lazada_square.png";

class ProductList extends React.Component{
    render() {
        return(
            <div className="listContainer"
                onClick={this.props.onClick}
            >
                <div className="platformColumn infoColumn">
                    <img 
                        className="platformLogo" 
                        src={this.props.platform === "lazada" ? lazada : shopee}
                        alt={this.props.platform}
                        width="40"
                        height="40"
                    /></div>
                <div className="nameColumn infoColumn"><p>.{
                    this.props.name.length === 80 ? this.props.name : this.props.name.substr(0,80)+"..."
                }</p></div>
                <div className="priceColumn infoColumn"><p>RM{this.props.price}</p></div>
                <div className="linkColumn infoColumn"><a href={`http://${this.props.url}`} target="_blank" rel="noopener noreferrer"><b>BUY NOW</b></a></div>
            </div>
        )
    }
}

export default ProductList;