import React, {Component} from 'react';


class Sounds extends Component {
    state ={
        play: false
    }
    audio = new Audio(this.props.url);

    componentDidMount(){
        this.audio.addEventListener('ended', this.setState({play: false}));
    }
    componentWillUnmount(){
        this.audio.removeEventListener('ended', () => this.setState({play: false}));
    }
    togglePlay = () =>{
        this.setState({play: !this.state.play} , () =>{
            this.state.play ? this.audio.play() : this.audio.pause();
        })
    }
    render(){
        return(
            <div className= {`column-${this.props.cols}`}>
                <button onClick={this.togglePlay}>{this.state.play ? 'Pause' : 'Play'} </button>

            </div>
        )
    }




}

export default Sounds;