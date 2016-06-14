import React, { Component, PropTypes } from 'react';
import Base from '../../pages/Base.jsx';

export class Tabs extends Base {
    constructor(props, context) {
        super(props, context);

        this.state = {
            selectedTab: null
        };

        this.onSelect = this.onSelect.bind(this);
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

    transformChildren(children, { onSelect, selectedTab, firstLinkFound }) {
        if (typeof children !== 'object') {
            return children;
        }

        return React.Children.map(children, (child) => {
            if (child.props && child.props.to) {
                const { activeLinkStyle } = this.props;
                const firstLink = !firstLinkFound;

                firstLinkFound = true;

                return React.cloneElement(child, {
                    onSelect,
                    isActive: child.props.to === selectedTab,
                    activeStyle: activeLinkStyle,
                    firstLink
                });
            }

            if (child.props && child.props.for) {
                return React.cloneElement(child, {
                    isVisible: child.props.for === selectedTab
                });
            }

            return React.cloneElement(
                child,
                null,   // perf optimization
                this.transformChildren(child.props && child.props.children, {
                    onSelect,
                    selectedTab,
                    firstLinkFound
                })
            );
        });
    }

    render() {
        const onSelect = this.onSelect;
        const selectedTab = this.state.selectedTab || this.props.defaultSelectedTab;

        const children = this.transformChildren(this.props.children, {
            onSelect,
            selectedTab
        });

        return (
            <div {...this.props}>
                {children}
            </div>
        );
    }
}
Tabs.defaultProps = {
    onSelect: null,
    defaultSelectedTab: '',
    activeLinkStyle: {}
};
Tabs.propTypes = {
    onSelect: PropTypes.func,
    defaultSelectedTab: PropTypes.string,
    activeLinkStyle: PropTypes.object
};

const defaultActiveStyle = {
    fontWeight: 'bold'
};

export class TabLink extends Base {
    constructor(props, context){
        super(props, context);

        this.onSelect = this.onSelect.bind(this);
    }
    componentDidMount() {
        if (this.props.firstLink || this.props.default) {
            this.onSelect();
        }
    }

    onSelect(e){
        e && e.preventDefault();

        if(typeof this.props.onSelect === 'function') {
            this.props.onSelect(this.props.to);
        }
    }

    render() {
        let style = null;
        if (this.props.isActive) {
            style = this.props.activeStyle;
        }

        return (
            <div
                className={ this.props.className + (this.props.isActive ? ' active' : '') }
                style={style}
                onClick={this.onSelect}
            >
                {this.props.children}
            </div>
        );
    }
}
TabLink.defaultProps = {
    to: '',
    onSelect: null,
    isActive: false,
    activeStyle: defaultActiveStyle,
    firstLink: false,
    className: 'tab-link'
};
TabLink.propTypes = {
    to: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
    isActive: PropTypes.bool,
    activeStyle: PropTypes.object,
    firstLink: PropTypes.bool,
    className: PropTypes.string
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
        const displayStyle = this.props.isVisible ? styles.visible : styles.hidden;

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
    isVisible: false,
    className: 'tab-content'
};
TabContent.propTypes = {
    for: PropTypes.string.isRequired,
    isVisible: PropTypes.bool,
    className: PropTypes.string
};
