import React, { Component } from 'react';
import Button from "./Components/Button.js";
import PlayStop from "./Components/PlayStop.js";
import ErrorBoundary from "./Components/ErrorBoundary.js"
import "./css/style.css"
import "./css/Button.css"
import "./css/PlayStop.css"
import "./html/PageLayout.html"

const webSounds =
{
  "Bass Warwick": "https://www.docs.google.com/uc?export=download&id=1sO4g0VLC2F6Vo47vnBoAOOXWsj5oLOnX",
  "Electric Guitar": "https://www.docs.google.com/uc?export=download&id=15aNdG4gY6hG_yDItTBFZxMDkFvx-VX1n",
  "Stutter Breakbeats": "https://www.docs.google.com/uc?export=download&id=1Yj1DK1gyPoW7BmfXrKmX-S4jIduwiArh",
  "Future Funk Beats": "https://www.docs.google.com/uc?export=download&id=1uZhRv8noq9N0ENT044Nec9g2ghJGz_fI",
  "Groove B": "https://www.docs.google.com/uc?export=download&id=1oLUmyub7cV-3sq1TxpTeTjRr03v3kZxD",
  "Stompy Slosh": "https://www.docs.google.com/uc?export=download&id=16O0Zk4FWq4qX5MrwScSrXLOri0mIv0Se",
  "Silent Star": "https://www.docs.google.com/uc?export=download&id=1R4KN3czYEwwSREsdkUz4hXdv-f3ANIGE",
  "Pas Groove": "https://www.docs.google.com/uc?export=download&id=18fZxvp64ep7ph1TZWL1WanzB714K1UaD",
  "Maze Politics": "https://www.docs.google.com/uc?export=download&id=1noQWMzjEQtBmlwbR8dNUOhTFyCjto0FR"
}
var counter = 0;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevState: [],
      currState: 'Nothing to play yet...',
      samplesArr: [],
      noTimeout: true

    }

  }
  // reset function
  reset = async () => {
    this.setState({ prevState: [], currState: 'Nothing to play yet...', samplesArr: [], firstTimeUse: true });
  }

  // change the text presented in the text box
  changeTextPresented = (symbol) => {
    if (symbol !== "Nothing to play yet...") {
      let { prevState } = this.state;
      prevState.push(symbol);
      this.setState({ currState: symbol, prevState });

    } else {
      if ((this.state.prevState === "Nothing to play yet...")) {
        this.setState({ currState: symbol });
      } else {
        this.setState({ currState: this.state.currState + symbol });
      }
    }
  }


  addSample = async (num) => {
    for (let i = num; i < this.state.prevState.length; i++) {
      this.state.samplesArr[i] = new Audio(webSounds[this.state.prevState[i]]);
      this.state.samplesArr[i].play();
      this.state.samplesArr[i].loop = true;
      counter += 1;
    }

  }
  stopPlaying = async () => {
    for (let i = 0; i < this.state.prevState.length; i++) {
      await this.state.samplesArr[i].pause();
    }
  }
  playSamples = async () => {
    for (let i = 0; i < this.state.samplesArr.length; i++) {
      this.state.samplesArr[i].play();

    }
  }
  playStop = async (symbol) => {

    if (symbol === "Play") {
      console.log(this.state);
      if (counter === this.state.prevState) {
        let playPromise = await this.playSamples().catch(error => {
          console.log("An error has occurred in playing" + error)
        })
        // TO finish - playSamples should play if there are no new tracks
        if ((this.state.noTimeout)) {
          let returnedPromise = await this.addSample(0).catch(error => {
            console.log("An error has occurred while adding new samples(noTimeout = true) " + error)
          });
          this.state.noTimeout = false;
        }
      }
      else {
        setTimeout(() => {
          this.addSample(counter);
        }, 8000);
      }
    } else if (symbol === "Stop") {
      // stop playing all of the current sounds
      if (this.state.samplesArr.length > 0) {
        let returnedPromise = await this.stopPlaying().catch(error => {
          console.log(error);
        });
        this.state.noTimeout = true;
      }
    }

  }
  render() {
    // the effects key pad
    const keyPad = [
      { symbol: 'Bass Warwick', cols: 2, action: this.changeTextPresented },
      { symbol: 'Electric Guitar', cols: 2, action: this.changeTextPresented },
      { symbol: 'Stutter Breakbeats', cols: 2, action: this.changeTextPresented },
      { symbol: 'Future Funk Beats', cols: 2, action: this.changeTextPresented },
      { symbol: 'Groove B', cols: 2, action: this.changeTextPresented },
      { symbol: 'Stompy Slosh', cols: 2, action: this.changeTextPresented },
      { symbol: 'Silent Star', cols: 2, action: this.changeTextPresented },
      { symbol: 'Pas Groove', cols: 2, action: this.changeTextPresented },
      { symbol: 'Maze Politics', cols: 2, action: this.changeTextPresented }

    ]
    // play and stop buttons 

    const playStopBtn = [
      { symbol: "Play", cols: 1, action: this.playStop },
      { symbol: "Stop", cols: 1, action: this.playStop }
    ]




    return (
      <div className="App">
        <ErrorBoundary>
          <div><h1 className="header">Loop Machine</h1></div>
        </ErrorBoundary>
        <ErrorBoundary>

          {this.state.prevState.length > 0 ?
            <div className="now-playing">{this.state.currState}</div>
            : null}
        </ErrorBoundary>
        <ErrorBoundary>

          <div><input className='text-bar' type='text' value={this.state.currState} /></div>
          <div className="buttons-wrapper">
            <div className="buttons-container">
              {keyPad.map((btn, i) => {
                return < Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol) => btn.action(symbol)} />
              })}
            </div>
          </div>
        </ErrorBoundary>
        <div className="control-wrapper">
          <div className="control-buttons">
            <ErrorBoundary>

              {playStopBtn.map((btn, i) => {
                return <PlayStop key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol) => btn.action(symbol)} />
              })}
            </ErrorBoundary>
            <ErrorBoundary>

              <button className="reset" onClick={this.reset}>Reset</button>
            </ErrorBoundary>
          </div>
        </div>

      </div>

    );
  }

}
export default App;