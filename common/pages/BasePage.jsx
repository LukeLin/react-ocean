import React, { PropTypes } from 'react';
import Base from '../components/Base.jsx';

export default class Page extends Base {
    constructor(props, context){
        super(props, context);
    }
    
    componentWillUnmount(){
        this.__eventBus = null;
        this.__eventNames = null;
    }
}
