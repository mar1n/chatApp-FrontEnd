import React from "react";
import ThreadDisplay from "./ThreadDisplay";
import ThreadTabs from "./ThreadTabs";
import LoginSwitch from "./Login";

const Chat = () => {
  return (
    <div>
      <LoginSwitch />
      <div className="ui segment">
        <ThreadTabs />
        <ThreadDisplay />
      </div>
    </div>
  );
};

export default Chat;