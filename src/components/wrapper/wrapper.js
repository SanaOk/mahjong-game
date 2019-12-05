import React, {Component} from 'react';
import './wrapper.css';

import Card from "../card";

export default class Wrapper extends Component{
    state = {
        numbers : this.renderCards(),
        temp: {
            val: 0,
            id:0
        }
    };

    getNumber (min, max)  {
        if(min === 1){min++};

        let numArray = [];

        primeNum:
            for (let i = min; i <= max; i++) {
                for (let j = min; j < i; j++) {
                    if (i % j === 0){
                        continue primeNum ;
                    }
                }
                numArray.push(i);
            }

        let arr =[];

        for(let i=0; i<15; i++){
            let num = numArray[Math.floor(Math.random()*(numArray.length))];
            while(arr.includes(num)){
                num = numArray[Math.floor(Math.random()*(numArray.length))]
            }
            arr.push(num);
        }

        return arr;
    };



    renderCards () {
        let firstPart = [];

        let numbers = this.getNumber(1,50);

        for(let i = 0; i < 15; i++){
            firstPart[i] = {
                label: numbers[i],
                visible : true,
                disabled: false
            };
        }

        let secondPart = firstPart;

        const numArray = [...firstPart,...secondPart].sort(function(){ return 0.5-Math.random() });

        const arrWithId = numArray.map((item, index) => {
            return {...item, id: index}
        });

        setTimeout(()=> {this.setState(
            ({numbers})=>{
                let visibility = numbers.map((item)=>{
                    return {...item, visible : false }
                });
                return {numbers:visibility};
                }
            )},
            4000 );
         return arrWithId
    };



    onCardClick = (value, id, disabled) => {
        const {numbers, temp} = this.state;

        let newItem = {...numbers[id], visible: true};

        const newArray = [...numbers.slice(0, id), newItem, ...numbers.slice(id+1)];

        this.setState({
            numbers: newArray
        });

        if(temp.val === 0 && !disabled){
            this.setState({
                    temp: {val:value, id:id}
            })

        } else if (value === temp.val && !disabled && temp.id!==id){
            this.setState({
                temp: {val:0, id:0}
            });
            let disableItem = {...newItem, disabled: true, visible: true};
            let changePrev = {...numbers[temp.id], disabled: true};
            let newArrayChangePrev = [...numbers.slice(0, temp.id), changePrev, ...numbers.slice(temp.id+1)];
            const newArray = [...newArrayChangePrev.slice(0, id), disableItem, ...newArrayChangePrev.slice(id+1)];
            this.setState({
                numbers: newArray
            });

        } else if (!disabled && temp.id!==id){
            setTimeout(()=>{
                newItem = {...numbers[id], visible: false};
                let changePrev = {...numbers[temp.id], visible: false};
                this.setState({
                    temp: { val:0, id:0 }
                });
                let newArrayChangePrev = [...numbers.slice(0, temp.id), changePrev, ...numbers.slice(temp.id+1)];
                const newArray = [...newArrayChangePrev.slice(0, id), newItem, ...newArrayChangePrev.slice(id+1)];
                this.setState({
                    numbers: newArray
                });
            }, 100);
        }
    };


    render() {
          const elements = this.state.numbers.map((item) => {
              const {visible, label, id, disabled} = item;
              return (
                      <Card
                          visible={visible}
                          number={label}
                          key={id}
                          onCardClick = {()=>this.onCardClick(label, id)}
                          disabled={disabled}
                      />
              );
          });

          return (
              <div className="wrapper">
                  { elements }
              </div>
          );
  }
}
