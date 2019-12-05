import React, {Component} from 'react';
import './card.css'


export default class Card extends Component {

    render() {
        const {visible, number, disabled, onCardClick} = this.props;
        let classNames = "card";

        if (visible) {
            classNames +=' visible';
        }else {
            classNames +=' hidden';
        }

        if(disabled) {
            return (
                <div className={classNames}>
                    <div className="number">{number}</div>
                </div>)
        } else {
            return (
                <div className={classNames} onClick={onCardClick}>
                    <div className="number">{number}</div>
                </div>)
        }
    }
}
