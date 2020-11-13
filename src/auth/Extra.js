import React, { Component } from "react";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/ItemActions";
import { readUsers } from "../actions/ChatActions"
import Chat from "../chat/Chat";

class Extra extends Component {
  componentDidMount() {
    this.props.readUsers();
  }


  render() {
    const { items } = this.props.item;
    return (
      <div>
        {items.map(({ id, name }) => (
          <p key={id}>{name}</p>
        ))}
        <Chat />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { readUsers })(Extra);
