import React, { Component, PropTypes } from 'react';
import Base from '../../pages/Base.jsx';

export default class Tabs extends Base {
    constructor(props, context) {
        super(props, context);

        this.state = {
            selectedTab: null
        };

        this.firstLink = null;
    }

    getChildContext(){
        return {
            onSelect: this.onSelect.bind(this),
            selectedTab: this.state.selectedTab || this.props.defaultSelectedTab,
            activeStyle: this.props.activeLinkStyle || defaultActiveStyle,
            firstLink: this.firstLink
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

    findFirstLink(children){
        if (typeof children !== 'object' || this.firstLink) {
            return;
        }

        React.Children.forEach(children, (child) => {
            if(child.props && child.props.to) {
                if(this.firstLink == null){
                    this.firstLink = child.props.to;
                    return;
                }
            }

            this.findFirstLink(child.props && child.props.children);
        });
    }

    render() {
        this.findFirstLink(this.props.children);

        return (
            <div {...this.props}>
                {this.props.children}
            </div>
        );
    }
}
Tabs.defaultProps = {
    onSelect: null,
    activeLinkStyle: null,
    defaultSelectedTab: ''
};
Tabs.propTypes = {
    onSelect: PropTypes.func,
    activeLinkStyle: PropTypes.object,
    defaultSelectedTab: PropTypes.string
};
Tabs.childContextTypes = {
    onSelect: PropTypes.func,
    selectedTab: PropTypes.string,
    activeStyle: PropTypes.object,
    firstLink: PropTypes.string
};

const defaultActiveStyle = {
    fontWeight: 'bold'
};

export class TabLink extends Base {
    constructor(props, context){
        super(props, context);

        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(){
        this.context.onSelect(this.props.to);
    }

    componentDidMount() {
        if (this.context.selectedTab === this.props.to || this.context.firstLink === this.props.to) {
            this.context.onSelect(this.props.to);
        }
    }

    render() {
        let style = null;
        let isActive = this.context.selectedTab === this.props.to;
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
TabLink.defaultProps = {
    to: '',
    className: 'tab-link',
    // default: false
};
TabLink.propTypes = {
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    default: PropTypes.bool
};
TabLink.contextTypes = {
    onSelect: PropTypes.func,
    firstLink: PropTypes.string,
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

export class TabContent extends Base {
    constructor(props, context){
        super(props, context);
    }

    render() {
        const displayStyle = this.context.selectedTab === this.props.for ? styles.visible : styles.hidden;

        return (
            <div
                className={ this.props.className }
                style={ displayStyle }
            >
                {this.props.children}
            </div>
        );
    }
}
TabContent.defaultProps = {
    for: '',
    className: 'tab-content'
};
TabContent.propTypes = {
    for: PropTypes.string.isRequired,
    className: PropTypes.string
};
TabContent.contextTypes = {
    selectedTab: PropTypes.string
};
