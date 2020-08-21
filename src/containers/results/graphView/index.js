import React from "react";
import { 
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryLabel,
    VictoryTooltip,
    LineSegment,
} from 'victory';

// Data
import dummyData from "assets/dummyData";

class GraphView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            sorted:true //sort to cheap first by default
        }
    }

    sortGraph() {
        this.setState({sorted:!this.state.sorted})
    }

    render() {
        return(
            <div>
                <p>this is graph view</p>
                {/* to sort */}
                <button onClick={() => this.sortGraph()}>{this.state.sorted ? "Expensive first" : "Cheapest first"}</button>
                {/* to change view */}
                <div>
                    <button><i className="fa fa-signal"></i></button>
                    <button><i class="fa fa-th-list"></i></button>
                </div>
                <div style={{width:"1000px", height:"1000px", margin:"0 auto", padding:"20px"}}>
                    <VictoryChart 
                    domainPadding={{x:[20,20]}}
                    width={500}
                    >
                        <VictoryAxis
                            dependentAxis
                            label="Price"
                            axisComponent={<LineSegment style={{fontSize:"1"}}/>}
                            axisLabelComponent={<VictoryLabel style={{fontSize:"20"}} dy={-100} dx={25} angle={360}/>}
                            tickLabelComponent={<VictoryLabel style={{fontSize:"10"}}/>}
                            tickFormat={(y) => `RM${y}`}
                        />
                        <VictoryBar
                            data={dummyData.sort((a,b) => this.state.sorted ? a.price - b.price : b.price - a.price )}
                            y={"price"}
                            style={{ data:{fill: "#219653"} }}
                            barRatio={0.8}
                            alignment="start"
                            labels={({datum}) => `RM${datum.price} from ${datum.platform}`}
                            labelComponent={<VictoryTooltip 
                                style={{fontSize:"10"}}
                                pointerLength={5}
                                />
                            }
                            animate={{
                                duration: 2000,
                                onLoad: { duration: 1000 }
                            }}
                        />
                    </VictoryChart>
                    </div>
            </div>
        )
    }
}

export default GraphView;