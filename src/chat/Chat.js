import React from "react";
import ThreadDisplay from "./ThreadDisplay";
import ThreadTabs from "./ThreadTabs";
import LoginSwitch from "./Login";
import NewThread from "./NewThread";

const Chat = () => {
  return (
    <div>
      <NewThread />
      <LoginSwitch />
      <div className="ui segment">
        <ThreadTabs />
        <ThreadDisplay />
      </div>
    </div>
  );
};

export default Chat;