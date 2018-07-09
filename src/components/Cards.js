import React, { Component } from 'react';
import { setMatched, toggleFlipped, addMove } from '../actions/actions';
import Card from './Card';

class Cards extends Component {
  constructor(props) {
        super(props)            
        this.checkMatch = this.checkMatch.bind(this);
        this.addMove = this.addMove.bind(this);
        this.showGovInfo = this.showGovInfo.bind(this);
    }  

  componentWillReceiveProps(nextProps) {    
    let currFlipped = this.props.flippedCards;
    let nextFlipped = nextProps.flippedCards;
    if (currFlipped.length !== nextFlipped.length && nextFlipped.length === 2)  {
      this.checkMatch(nextFlipped)
    }    
  }

  checkMatch(flippedCards) {                
    if (flippedCards[0].value === flippedCards[1].value){                   
      setTimeout(() => {
        this.props.store.dispatch(setMatched(flippedCards[0].value))        
      }, 500);      
      this.flipOver(flippedCards, () => this.showGovInfo(flippedCards[0].value));
    }      
    else {      
      this.flipOver(flippedCards);           
    }
    this.addMove();        
  }  

  flipOver(flippedCards, callback) {
    setTimeout(() => {
      flippedCards.forEach(item => {
        this.props.store.dispatch(toggleFlipped(item.id)); 
        callback && callback();
      })
    }, 1000);   
  }

  addMove() {
    this.props.store.dispatch(addMove());
  }

  showGovInfo(value) {
    this.props.showInfoHandler(value);
  }

  render() {
      return (
        <div className="governors__cards-container">
           {this.props.store.getState().shuffledCards.map((item, i) => (
            <Card store={this.props.store} value={item.value} flipped={item.flipped} matched={item.matched} key={i} id={item.id} />
          ))} 
        </div>
    );
  }
}

export default Cards;