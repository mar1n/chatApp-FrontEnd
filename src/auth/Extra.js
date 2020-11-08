import React, { Component } from "react";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/ItemActions";
import Chat from "../chat/Chat";

class Extra extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };

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

export default connect(mapStateToProps, { getItems, deleteItem })(Extra);
