import React, { Component } from 'react';

class Card extends Component { 
    constructor(props) {
        super(props)
                
        this.img = require(`../img/small/${props.value}.jpg`);
        this.styles = {       
            backgroundImage: `url(${this.img})`
        };        
        this.flipCard = this.flipCard.bind(this);
    }

    flipCard() {      
        if (!this.props.flipped){
            const store = this.props.store; 
            let flippedCards = this.props.store.getState().shuffledCards.filter(item => {
                return item.flipped === true
            })        
            if (flippedCards.length < 2) {
                store.dispatch({
                type: 'TOGGLE_FLIPPED',
                id: this.props.id                
            });                                
            }        
        }        
    }

    flipCardOver(state) {                
        let cards = state.cards;                         
        if (cards.length && cards.length > 1) {            
            setTimeout(() => {                
                this.setState({clicked: false})                                
            }, 2000)            
        }                    
    }

    getClassName() {             
        let cssClass = [
            'governors__card-wrapper',
            this.props.matched ? 'matched' : '',
            this.props.flipped || this.props.matched ? 'flipped' : ''
        ]
        return cssClass.join(' ').trim();
    }

    render() {
        return (
            <div onClick={() => this.flipCard(this.props.value)} className={this.getClassName()}>
                <div className="governors__card-wrap">                        
                    <div className="governors__card" />
                    <div className="governors__card governors__card--back">
                        <p style={this.styles}></p>
                    </div>            
                </div>
            </div>
        );
    }    
}

export default Card;