import React from "react";

// Style
import "./searchBar.css";

class SearchBar extends React.Component{
    render() {
        return(
            <div className="searchBarContainer"
                style={{
                    height:this.props.noQuery && "200px",
                    marginTop:this.props.noQuery && "100px",
                    backgroundColor: this.props.noQuery && "transparent",
                    alignItems:this.props.noQuery && "center",
                    animation:!this.props.noQuery && "headerIn 1s linear"
                }}
            >
                {this.props.noQuery && 
                    <h1 className="webTitle">WhatThePrice</h1>
                }
                <div className="inputHolder" style={{animation:!this.props.noQuery && "inputToLeft 1s linear"}}>
                    <input 
                        name="query"
                        className="searchInput"
                        onChange={this.props.onChange}
                        style={{
                            margin: this.props.noQuery && "0 auto",
                        }}
                    />
                    <button 
                        className="searchButton"
                        onClick={this.props.onClick}
                    ><i className="fa fa-search"></i></button>
                </div>
            </div>
        )
    }
}

export default SearchBar;