import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import Base from '../Base.jsx';
import UsersList from '../../components/chat/UsersList';
import { MessageForm, MessageList } from '../../components/chat/Messages';
import ChangeNameForm from '../../components/chat/ChangeNameForm';

if(process.browser){
    var socket = io.connect();
}

class Page extends Base {
    constructor(props, context) {
        super(props, context);

        this.state = {
            users: [],
            messages: [],
            text: ''
        };
    }

    componentDidMount() {
        socket.on('init', this._initialize.bind(this));
        socket.on('send:message', this._messageRecieve.bind(this));
        socket.on('user:join', this._userJoined.bind(this));
        socket.on('user:left', this._userLeft.bind(this));
        socket.on('change:name', this._userChangedName.bind(this));
    }

    _initialize(data) {
        let {users, name} = data;
        this.setState({users, user: name});
    }

    _messageRecieve(message) {
        let {messages} = this.state;

        this.setState({
            messages: [
                ...messages,
                message
            ]
        });
    }

    _userJoined(data) {
        let {users, messages} = this.state;
        let {name} = data;

        this.setState({
            users: [
                users,
                name
            ],
            messages: [
                ...messages,
                {
                    user: 'APPLICATION BOT',
                    text : name +' Joined'
                }
            ]
        });
    }

    _userLeft(data) {
        let {users, messages} = this.state;
        let {name} = data;
        let index = users.indexOf(name);
        users.splice(index, 1);

        this.setState({
            users: [
                ...users
            ],
            messages: [
                ...messages,
                {
                    user: 'APPLICATION BOT',
                    text : name +' Left'
                }
            ]
        });
    }

    _userChangedName(data) {
        let {oldName, newName} = data;
        let {users, messages} = this.state;
        let index = users.indexOf(oldName);
        users.splice(index, 1, newName);

        this.setState({
            users: [
                ...users
            ],
            messages: [
                ...messages,
                {
                    user: 'APPLICATION BOT',
                    text : 'Change Name : ' + oldName + ' ==> '+ newName
                }
            ]
        });
    }

    onMessageSubmit(message) {
        let {messages} = this.state;

        this.setState({
            messages: [
                ...messages,
                message
            ]
        });
        socket.emit('send:message', message);
    }

    onChangeName(newName) {
        let oldName = this.state.user;
        socket.emit('change:name', { name : newName}, (result) => {
            if(!result) {
                return alert('There was an error changing your name');
            }
            let {users} = this.state;
            let index = users.indexOf(oldName);
            users.splice(index, 1, newName);
            this.setState({
                users: [
                    ...users
                ],
                user: newName
            });
        });
    }

    render() {
        return (
            <div>
                <UsersList
                    users={this.state.users}
                />
                <MessageList
                    messages={this.state.messages}
                />
                <MessageForm
                    onMessageSubmit={this.onMessageSubmit}
                    user={this.state.user}
                />
                <ChangeNameForm
                    onChangeName={this.onChangeName}
                />
            </div>
        );
    }
}
export default Page;
