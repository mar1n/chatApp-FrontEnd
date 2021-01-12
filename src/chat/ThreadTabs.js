import React, { useEffect } from "react";
import { connect } from "react-redux";
import { openThread } from "../actions/ChatActions";
import { readRooms } from "../actions/ChatActions";

const Tabs = (props) => {
  // useEffect(() => {
  //   props.readRooms();
  // }, []);
  return (
    <div className="ui top attached tabular menu">
      {props.tabs.map((tab, index) => {
        return (
          <div
            key={index}
            className={tab.active ? "active item" : "item"}
            onClick={() => props.onClick(tab.id)}
          >
            {tab.id === "3-xz25"
              ? "All"
              : tab.title.find((t) => {
                  if (t.title !== props.login) {
                    return t.title;
                  }
                  return null;
                }).title}
            <span>{tab.unreadmsg}</span>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToTabsProps = (state) => {
  const login = state.loginUserId;
  const tabId = state.activeThreadId;
  const tabs = state.threads
    .map((t) => ({
      title: t.users,
      active: t.id === state.activeThreadId,
      id: t.id,
      unreadmsg: t.messages.reduce(
        (accu, current) =>
          current.unread === false && current.name !== login ? accu + 1 : accu,
        0
      ),
    }));
  return {
    login,
    tabs,
    tabId,
  };
};

const mapDispatchToTabsProps = (dispatch) => ({
  onClick: (id) => dispatch(openThread(id)),
});

const ThreadTabs = connect(mapStateToTabsProps, mapDispatchToTabsProps)(Tabs);

export default ThreadTabs;
