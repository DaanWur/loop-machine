import React, { Component} from 'react';
import '../css/PlayStop.css'

class PlayStop extends Component{
    
    render(){
        let icon = "fa fa-" + this.props.symbol.toLowerCase();

        return(
            <div className= {`column-${this.props.cols}`}>
                <button className="play-stop" onClick= {() => this.props.action(this.props.symbol)}>
                <i className={icon}></i></button>
            </div>
        )
    }
}
export default PlayStop;




