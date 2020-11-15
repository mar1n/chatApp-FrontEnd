import React, { Component } from "react";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/ItemActions";
import { readUsers, readRooms } from "../actions/ChatActions";
import Chat from "../chat/Chat";

class Extra extends Component {
  componentDidMount() {
    this.props.readUsers();
    this.props.readRooms();
  }

  render() {
    const { items } = this.props.item;
    return (
      <div>
        {items.map(({ id, name }) => (
          <p key={name}>{name}</p>
        ))}
        <Chat />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { readUsers, readRooms })(Extra);
