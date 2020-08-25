import React from "react";
import { Spinner }  from "reactstrap";

import "./modal.css";

class Modal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isLoading:true
        }
    }

    render(){
        return(
            <div className="modalContainer">
                <div className="modalHeader">
                    <h3><b>{this.props.modalTitle}</b></h3>
                </div>
                <div className="modalContentHolder">
                    {this.props.isLoading ? (
                        <Spinner color="success" className="loadingEffect" type={this.props.type}/>
                    ) : (
                        <div>
                            <h2>{this.props.status}</h2>
                            <p>{this.props.description}</p>
                        </div>
                    )}    
                </div>
                <div className="modalFooter">
                    {this.props.showModalButton && 
                        (<button onClick={this.props.onClick} className="modalButton">OK</button>)
                    }
                </div>
            </div>
        )
    }
}

export default Modal;