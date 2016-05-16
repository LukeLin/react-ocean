import React, { PropTypes, Component } from 'react';
import { is } from 'immutable';

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

export default class Base extends Component {
    constructor(props, context){
        super(props, context);
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
