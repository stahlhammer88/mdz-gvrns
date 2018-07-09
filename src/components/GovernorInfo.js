import React, { Component } from 'react';

class GovernorInfo extends Component {
    constructor(props) {
        super(props);        
        this.info = this.props.info;
        this.img = require(`../img/large/${this.info.id}.jpg`);        
        this.closeHandler = this.closeHandler.bind(this);
    }

    closeHandler() {
        this.props.closeClickHandler();
    }

    getAge(dateString) {
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let month = today.getMonth() - birthDate.getMonth();        
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        let lastChar = age.toString().slice(-1);

        switch(+lastChar) {                            
            case 1:
                return age + ' год'
            case 2:
            case 3:
            case 4:
                return age + ' года'
            default:
                return age + ' лет'            
        }
    }

    render() {
        return (            
            <div className="governors__info-block">
                <div className="governors__info-container">
                    <div className="governors__info-img" style={{backgroundImage: `url(${this.img})`}}></div>   
                    <div className="governors__info-title">
                        <span className="governors__info-name">{this.info.name}, {this.getAge(this.info.birthday)}</span>
                        <span className="governors__info-subtitle">{this.info.subtitle}</span>                    
                    </div>             
                    <div className="governors__info-bio">
                        {this.info.description}
                    </div>
                    <div className="governors__info-close-btn-container">
                        <span onClick={this.closeHandler} className="governors__info-close-btn">Дальше</span>
                    </div>                
                </div>
            </div>
        );
    }
    
}

export default GovernorInfo;