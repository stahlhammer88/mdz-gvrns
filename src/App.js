import React, { Component } from 'react';
import Cards from './components/Cards';
import GovernorInfo from './components/GovernorInfo';
import FinishScreen from './components/FinishScreen';
import data from './data/data';
import { setCards, clearCards, clearMoves, toggleFlipped } from './actions/actions'
import './App.css';

class App extends Component {
  constructor(props) {
        super(props);

        this.state = {      
          matched: false,
          governorInfo: null,
          finished: false
        }        
        this.MakeShuffledArray();
        this.closeInfo = this.closeInfo.bind(this);
        this.playAgain = this.playAgain.bind(this);
        this.getFlippedCards = this.getFlippedCards.bind(this);
        this.showGovernorInfo = this.showGovernorInfo.bind(this);
    }  

  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate())
  }

  MakeShuffledArray() {
    let arr = [];    
    for (let i = 0, j = 1; i < data.length *2; i++, j++){      
      j > data.length && (j = 1);      
      arr.push({ value: j, matched: false });
    }
    this.ShuffleArray(arr);
  }

  ShuffleArray (arr) {    
    for (let i = arr.length - 1; i > 0; i--) {      
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    arr.forEach((item, i) => {
      this.props.store.dispatch(setCards(item.value, i));
    })
  }  

  showGovernorInfo(value) {    
    let matchedGov = data.filter(item => {
      return item.id === value;
    })    
    this.setState({
      matched: true,
      governorInfo: matchedGov[0]
    })
  }

  closeInfo() {    
    this.setState({
      matched: false,
      governorInfo: null
    });
    let state = this.props.store.getState();
    let isUnmatched = state.shuffledCards.some(item => {
      return item.matched === false;
    });

    !isUnmatched && this.setState({ finished: true });
  }

  playAgain() {
    this.setState({
      matched: false,
      governorInfo: null,
      finished: false
    });
    this.props.store.dispatch(clearCards());
    this.props.store.dispatch(clearMoves());
    this.MakeShuffledArray();    
  }

  unflipCards(cards) {    
    cards.forEach(item => {
      if (item.flipped) {
        this.props.store.dispatch(toggleFlipped(item.id));
      }
    })  
  }

  getFlippedCards() {
    let shuffledCards = this.props.store.getState().shuffledCards;
    return shuffledCards.filter(item => {
      return item.flipped === true;
    })
  }
 
  render() {    
    return (
      <div className="governors">
        <header className="governors__header">
          <h1 className="governors__title">
            Найдите двух одинаковых губернаторов            
          </h1>
        </header>
        <div className="governors__content">
          <div className={`governors__container ${this.state.finished ? 'finished' : ''}`}>
            { this.state.finished ? null : <div className="governors__moves">Ходов: {this.props.store.getState().moves}</div> }
              { this.state.finished ? 
                <FinishScreen againClickHandler={this.playAgain} store={this.props.store}/> : 
                <Cards store={this.props.store} showInfoHandler={this.showGovernorInfo} flippedCards={this.getFlippedCards()} arr={this.state.shuffledArray}/> 
              }     
              { this.state.matched ? <GovernorInfo closeClickHandler={this.closeInfo} info={this.state.governorInfo} /> : null}
          </div>
        </div>        
      </div>
    );
  }
}

export default App;
