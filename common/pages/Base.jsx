import React, { PropTypes, Component } from 'react';
import { is } from 'immutable';
import EventEmitter from 'events';

function excludeFns(obj){
    if(obj == null) return obj;

    let newObj = {};

    let keys = Object.keys(obj);
    for(let key of keys){
        if(typeof obj[key] !== 'function'){
            newObj[key] = obj[key];
        }
    }

    return newObj;
}

const eventMatchReg = /^on[A-Z]/;
function getEventMethodsProps(instance){
    let methods = Object.getOwnPropertyNames(instance)
        .filter((prop) => {
            return eventMatchReg.test(prop)
                && typeof instance[prop] === 'function';
        });

    let instancePrototype = Object.getPrototypeOf(instance);
    if(instancePrototype !== Object.prototype) {
        methods = methods.concat(getEventMethodsProps(instancePrototype));
    }

    return methods
}

let mediator = new EventEmitter();

export default class Base extends Component {
    constructor(props, context){
        super(props, context);

        this.emitter = mediator;

        this.__bindFunctions();
    }

    __bindFunctions(){
        let props = getEventMethodsProps(this);
        for(let prop of props){
            if(!this[prop].funcBinded){
                this[prop] = this[prop].bind(this);
                this[prop].funcBinded = true;
            }
        }
    }

    /**
     * 检验组件更新
     * @param nextProps
     * @param nextState
     * @returns {*}
     */
    shouldComponentUpdate(nextProps, nextState){
        return !is(excludeFns(this.props), excludeFns(nextProps)) || !is(excludeFns(this.state), excludeFns(nextState));
    }
}
