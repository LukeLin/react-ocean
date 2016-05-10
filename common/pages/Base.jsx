import React, { PropTypes, Component } from 'react';
import shallowCompare from 'react/lib/shallowCompare';


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
     * Notice: 不检验传入进来的函数props，因为函数props没有检验的必要
     * @param nextProps
     * @param nextState
     * @returns {*}
     */
    shouldComponentUpdate(nextProps, nextState){
        let instance = {
            props: excludeFns(this.props),
            state: excludeFns(this.state)
        };

        return shallowCompare(instance, excludeFns(nextProps), excludeFns(nextState));
    }
}
