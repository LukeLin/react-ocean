import React, { PropTypes, Component } from 'react';
import { is } from 'immutable';


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
        return !is(nextProps, this.props) || !is(nextState, this.state);
    }
}
