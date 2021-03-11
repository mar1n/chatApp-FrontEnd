import React from "react";
import { readUsers, readRooms, addNewThread, loadInitialDataSocket, initialItems } from "../actions/ChatActions";
import { isAuth } from "../auth/helpers";
import { connect } from "react-redux";
import socket from "../socket";
class AddThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: [],
      newThreadName: '',
      oneUser: "",
    };
    this.addUser = this.addUser.bind(this);
    this.addThread = this.addThread.bind(this);
  }

  componentDidMount() {
    console.dir(socket);
    this.props.loadInitialDataSocket(socket, isAuth()._id);
    socket.on('loadUsers',(res) => {
      console.log('ultra TCP', res)
    })
    //this.props.initialItems();
    // socket.on('ListLoad',(res)=>{
    //   console.dir(res)
    //   this.props.initialItems(res);
    // })
    this.props.readUsers();
    this.props.readRooms();
  }

  addUser(name) {
    console.log("addUser", name);
    this.state.group.some( user => user.name === name)

      ? this.setState({
          group: this.state.group.filter((user) => user.name !== name),
        })

      : this.setState({ group: [{ name: name }, ...this.state.group] });
  }

  addThread() {
    let users = [{ name: isAuth().name}, ...this.state.group];
    let newThreadName = this.state.newThreadName;
    let qs = Object.keys(users)
      .map((key) => `users[${key}][name]=${users[key].name}`)
      .join("&");
    this.props.addNewThread(qs, newThreadName);
  }

  threadName(e) {
    this.setState({newThreadName: e.target.value});
  }
  render() {
    const { items } = this.props.item;
    return (
      <div>
        {items.map(({ id, name }) => (
          <p
            key={name}
            className={
              this.state.group.some(user => user.name === name ) ? "selectUser" : "selectedUser"
            }
            onClick={() => this.addUser(name)}
          >
            {name}
          </p>
        ))}
        <input type="text" onChange={(e) => this.threadName(e)}/>
        <button onClick={() => this.addThread()}>Add New Thread</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
});

const NewThread = connect(mapStateToProps, {
  addNewThread,
  readUsers,
  readRooms,
  loadInitialDataSocket,
  initialItems,
})(AddThread);

export default NewThread;
