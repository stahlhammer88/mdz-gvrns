import React, { Component } from 'react';

class FinishScreen extends Component {
    constructor(props) {
        super(props);
        this.store = props.store.getState();
        this.tries = this.getTriesText();

        this.getTriesText = this.getTriesText.bind(this);
        this.againHandler = this.againHandler.bind(this);
    }

    getTriesText() {
        let moves = this.store.moves;
        let lastChar = moves.toString().slice(-1);
        let triesText;
        
        if (lastChar === '1') {
            triesText = moves + ' раза';
        }
        else {
            triesText = moves + ' раз';
        }
        return triesText;        
    }

    againHandler() {
        this.props.againClickHandler();
    }

    render() {
        return (
            <div className="governors__finish-container">
                 <p>Найди двух одинаковых губернаторов: игра «Медузы»</p> 
                 <div className="governors__finish-text">
                     Я могу различить губернаторов с {this.tries}
                     <div className="governors__play-again">
                         <span onClick={this.againHandler}>Играть еще раз</span>
                     </div>
                 </div>
            </div>
        );
    }
    
}

export default FinishScreen;