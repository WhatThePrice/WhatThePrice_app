import React from "react";
import Modal from "components/modal";

class Home extends React.Component{
    render() {
        return(
            <div>
                <p>this is home</p>
                <Modal 
                    isLoading="true"
                    modalTitle="Login"
                    status="success"
                    description="You will redirect to homepage"
                    onClick={() => console.log("modal button")}
                />
            </div>
        )
    }
}

export default Home;    