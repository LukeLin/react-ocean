import React from 'react';
import Base from '../../pages/Base';

export default class UsersList extends Base {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className='users'>
                <h3> Online Users </h3>
                <ul>
                    {
                        this.props.users.map((user, i) => {
                            return (
                                <li key={i}>
                                    {user}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}
