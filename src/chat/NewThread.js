import React from "react";
import { readUsers, readRooms, addNewThread } from "../actions/ChatActions";
import { connect } from "react-redux";

class AddThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: [],
      oneUser: "",
    };
    this.addUser = this.addUser.bind(this);
    this.addThread = this.addThread.bind(this);
  }

  componentDidMount() {
    this.props.readUsers();
    this.props.readRooms();
  }

  addUser(name) {
    console.log("addUser", name);
    this.state.group.some( user => user.title === name)

      ? this.setState({
          group: this.state.group.filter((user) => user.title !== name),
        })

      : this.setState({ group: [{ title: name}, ...this.state.group] });
  }

  addThread() {
    let users = this.state.group;
    let qs = Object.keys(users)
      .map((key) => `users[${key}][title]=${users[key].title}`)
      .join("&");
    this.props.addNewThread(qs);
  }

  render() {
    const { items } = this.props.item;
    return (
      <div>
        {items.map(({ id, name }) => (
          <p
            key={name}
            className={
              this.state.group.some(user => user.title === name ) ? "selectUser" : "selectedUser"
            }
            onClick={() => this.addUser(name)}
          >
            {name}
          </p>
        ))}
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
})(AddThread);

export default NewThread;
