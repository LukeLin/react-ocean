import React, { PropTypes } from 'react';

let App = ({children}) => {
    return (
        React.Children.only(children)
    );
};

App.propTypes = {
    children: PropTypes.object
};

export default App;
