import React, { PropTypes } from 'react';
import Base from '../../pages/Base';

export class Message extends Base {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="message">
                <strong>{this.props.user} :</strong>
                <span>{this.props.text}</span>
            </div>
        );
    }
}
Message.defaultProps = {
    user: '',
    text: ''
};
Message.propTypes = {
    user: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

export class MessageList extends Base {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className='messages'>
                <h2> Conversation: </h2>
                {
                    this.props.messages.map((message, i) => {
                        return (
                            <Message
                                key={i}
                                user={message.user}
                                text={message.text}
                            />
                        );
                    })
                }
            </div>
        );
    }
}


export class MessageForm extends Base {
    constructor(props, context) {
        super(props, context);

        this.state = {text: ''};
    }

    onSubmit(e) {
        e.preventDefault();
        var message = {
            user : this.props.user,
            text : this.state.text
        }
        this.props.onMessageSubmit(message);
        this.setState({ text: '' });
    }

    onChange(e) {
        this.setState({ text : e.target.value });
    }

    render() {
        return(
            <div className='message_form'>
                <h3>Write New Message</h3>
                <form onSubmit={this.onSubmit}>
                    <input
                        onChange={this.onChange}
                        value={this.state.text}
                    />
                </form>
            </div>
        );
    }
}
