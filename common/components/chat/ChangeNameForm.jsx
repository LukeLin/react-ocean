import React from 'react';
import Base from '../../pages/Base';


export default class ChangeNameForm extends Base {
    constructor(props, context) {
        super(props, context);

        this.state = {newName: ''};
    }

    onKey(e) {
        this.setState({ newName : e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        var newName = this.state.newName;
        this.props.onChangeName(newName);
        this.setState({ newName: '' });
    }

    render() {
        return(
            <div className='change_name_form'>
                <h3> Change Name </h3>
                <form onSubmit={this.onSubmit}>
                    <input
                        onChange={this.onKey}
                        value={this.state.newName}
                    />
                </form>
            </div>
        );
    }
}
