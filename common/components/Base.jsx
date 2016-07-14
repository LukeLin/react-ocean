import React, { PropTypes, Component } from 'react';
import shallowEqual from '../utils/shallowEqual';
import EventEmitter from 'events';

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

        this.__eventBus = mediator;
        this.__eventNames = {};

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

    on(eventName, fn){
        if(typeof fn !== 'function') throw new Error('fn should be a function');

        if(!this.__eventNames[eventName]){
            this.__eventNames[eventName] = [fn];
        } else {
            this.__eventNames[eventName].push(fn);
        }

        return this.__eventBus.addListener(eventName, fn);
    }

    emit(eventName, ...args){
        return this.__eventBus.emit(eventName, ...args);
    }

    off(eventName, fn){
        let events = this.__eventNames[eventName];
        if(events){
            let index = events.indexOf(fn);

            if(index >= 0) {
                this.__eventBus.removeListener(eventName, fn);

                events.splice(index, 1);

                if(!events.length) {
                    delete this.__eventNames[eventName];
                }
            } else {
                console.warn('event: ' + eventName + ' did not registered in ' + this._reactInternalInstance.getName() + ' Component');
            }

            return true;
        } else {
            console.warn('event: ' + eventName + ' did not registered in ' + this._reactInternalInstance.getName() + ' Component');

            return false;
        }
    }


    /**
     * 检验组件更新
     * @param nextProps
     * @param nextState
     * @returns {*}
     */
    shouldComponentUpdate(nextProps, nextState){
        let shouldUpdate = !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);

        if(shouldUpdate && process.env.NODE_ENV !== 'production') {
            console.log('Component: ' + this._reactInternalInstance.getName() + ' will update');
        }

        return shouldUpdate;
    }

    componentWillUnmount(){
        for(let eventName in this.__eventNames){
            if(this.__eventNames.hasOwnProperty(eventName)){
                for(let fn of this.__eventNames[eventName]){
                    this.off(eventName, fn);
                }
            }
        }
    }
}
