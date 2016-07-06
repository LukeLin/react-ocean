import React, { Component, PropTypes } from 'react';
import Base from '../../pages/Base';

export default class Tabs extends Base {
    constructor(props, context) {
        super(props, context);

        this.state = {
            selectedTab: props.defaultSelectedTab || null
        };

        this.firstTabLabel = null;
    }

    getChildContext(){
        return {
            onSelect: this.onSelect.bind(this),
            selectedTab: this.state.selectedTab || this.props.defaultSelectedTab,
            activeStyle: this.props.activeLinkStyle || defaultActiveStyle,
            firstTabLabel: this.firstTabLabel
        };
    }

    onSelect(tab, ...rest) {
        if(this.state.selectedTab === tab) return;

        this.setState({
            selectedTab: tab
        });

        if(typeof this.props.onSelect === 'function') {
            this.props.onSelect(tab, ...rest);
        }
    }

    findFirstTabLabel(children){
        if (typeof children !== 'object' || this.firstTabLabel) {
            return;
        }

        React.Children.forEach(children, (child) => {
            if(child.props && child.props.label) {
                if(this.firstTabLabel == null){
                    this.firstTabLabel = child.props.label;
                    return;
                }
            }

            this.findFirstTabLabel(child.props && child.props.children);
        });
    }

    render() {
        this.findFirstTabLabel(this.props.children);

        return (
            <div className={ this.props.className } style={ this.props.style }>
                {this.props.children}
            </div>
        );
    }
}
Tabs.defaultProps = {
    onSelect: null,
    activeLinkStyle: null,
    defaultSelectedTab: '',
    className: '',
    style: null
};
Tabs.propTypes = {
    onSelect: PropTypes.func,
    activeLinkStyle: PropTypes.object,
    defaultSelectedTab: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
};
Tabs.childContextTypes = {
    onSelect: PropTypes.func,
    selectedTab: PropTypes.string,
    activeStyle: PropTypes.object,
    firstTabLabel: PropTypes.string
};

const defaultActiveStyle = {
    fontWeight: 'bold'
};

export class TabTitle extends Component {
    constructor(props, context){
        super(props, context);

        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(){
        this.context.onSelect(this.props.label);
    }

    componentDidMount() {
        if (this.context.selectedTab === this.props.label || (!this.context.selectedTab && this.context.firstTabLabel === this.props.label)) {
            this.context.onSelect(this.props.label);
        }
    }

    render() {
        let style = null;
        let isActive = this.context.selectedTab === this.props.label;
        if (isActive) {
            style = this.context.activeStyle;
        }

        return (
            <div
                className={ this.props.className + (isActive ? ' active' : '') }
                style={style}
                onClick={ this.onSelect }
            >
                {this.props.children}
            </div>
        );
    }
}
TabTitle.defaultProps = {
    label: '',
    className: 'tab-link'
};
TabTitle.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string
};
TabTitle.contextTypes = {
    onSelect: PropTypes.func,
    firstTabLabel: PropTypes.string,
    activeStyle: PropTypes.object,
    selectedTab: PropTypes.string
};

const styles = {
    visible: {
        display: 'block'
    },
    hidden: {
        display: 'none'
    }
};

export class TabPanel extends Component {
    constructor(props, context){
        super(props, context);

        for(let style in styles){
            if(styles.hasOwnProperty(style)){
                Object.assign(styles[style], this.props.style);
            }
        }
    }

    render() {
        let displayStyle = this.context.selectedTab === this.props.for
            ? styles.visible : styles.hidden;

        return (
            <div
                className={ this.props.className }
                style={ displayStyle }>
                {this.props.children}
            </div>
        );
    }
}
TabPanel.defaultProps = {
    for: '',
    className: 'tab-content',
    style: null
};
TabPanel.propTypes = {
    for: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
};
TabPanel.contextTypes = {
    selectedTab: PropTypes.string
};
