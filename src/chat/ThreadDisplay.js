import React, {useEffect} from "react";
import { connect } from "react-redux";
import { addMessage, resetUnreadmsg, resetUnreadmsg2, deleteMessage, readRooms, addMessage2, deleteMessage2, res } from "../actions/ChatActions";
import { isAuth, signout } from "../auth/helpers";

class TextFieldSubmit extends React.Component {
  state = {
    value: "",
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.value);
    this.setState({
      value: "",
    });
  };

  render() {
    return (
      <div className="ui input">
        <input onChange={this.onChange} value={this.state.value} type="text" />
        <button
          onClick={this.handleSubmit}
          className="ui primary button"
          type="submit"
        >
          Submit
        </button>
      </div>
    );
  }
}

const MessageList = (props) => (
  <div className="ui comments">
    {props.messages.map((m, index) => (
      <div className="comment" key={index} onClick={() => props.onClick(m._id)}>
        <div className="text">
          {m.name}:{m.text}
          <span className="metadata">@{m.timestamp}</span>
        </div>
      </div>
    ))}
    <div
      className={
        props.messages.reduce(
          (accu, current) =>
          current.read.find(name => name.name === isAuth().name).unread === true ? accu : accu + 1,
          0
        )
          ? "unread"
          : "read"
      }
      onClick={() => props.onRead()}
    >
      I READ ALL MSG
    </div>
  </div>
);

const Thread = (props) =>{
  console.log(props.onSubmit);
  return props.thread === undefined ? <></> :
   (
  props.close && (
    <div className="ui center aligned basic segment">
      <MessageList
        messages={props.thread.messages}
        user={props.userId}
        onClick={props.onMessageClick}
        onRead={() => props.onRead(props.thread._id, isAuth().name)}
      />
      <TextFieldSubmit onSubmit={props.onMessageSubmit} />
    </div>
  ))}

const mapStateToThreadProps = (state) => ({
  thread: state.threads.find(thread => thread.title === state.activeThreadId),
  userId: state.loginUserId,
  close: state.closeThread,
});

const mapDispatchToThreadProps = (dispatch) => ({
  //onMessageClick: (id) => dispatch(deleteMessage(id)),
  onRead: (id, name) => dispatch(resetUnreadmsg2(id, name)),
  dispatch: dispatch,
});

function mergeThreadProps(stateProps, dispatchProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    onMessageSubmit: (text) =>
      dispatchProps.dispatch(
        addMessage2(text, stateProps.thread._id, isAuth().name)
      ),
    onMessageClick: (id) => {
       return dispatchProps.dispatch(
          deleteMessage2(stateProps.thread._id, id)
        )
    }
  };
}

const ThreadDisplay = connect(
  mapStateToThreadProps,
  mapDispatchToThreadProps,
  mergeThreadProps
)(Thread);

export default ThreadDisplay;
