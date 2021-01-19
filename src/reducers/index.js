import { combineReducers } from "redux";
import ItemReducer from "./ItemReducer";
import { ROOMS_LOADING, ADD_MESSAGE2, DELETE_MESSAGE2, ADD_THREAD, UNREAD_MESSAGE2 } from "../actions/types";
import { v4 as uuid } from "uuid";

export default combineReducers({
  item: ItemReducer,
  threads: threadsReducer,
  activeThreadId: activeThreadIdReducer,
  loginUserId: loginUserIdReducer,
  newThread: newThreadReducer,
  closeThread: closeThreadReducer,
  users: usersReducer,
});

function closeThreadReducer(state = true, action) {
  if (action.type === "CLOSE_THREAD") {
    console.log("close Thread");
    return false;
  } else if (action.type === "OPEN_THREAD") {
    return true;
  } else {
    return state;
  }
}

function newThreadReducer(state = true, action) {
  if (action.type === "ADD_NEWUSER") {
    return false;
  } else if (action.type === "OPEN_THREAD") {
    return true;
  } else if (action.type === "ADD_NEWTHREAD") {
    return false;
  } else {
    return state;
  }
}

function usersReducer(
  state = [{ name: "Buzz Aldrin" }, { name: "Michael Collins" }],
  action
) {
  return state;
}

function loginUserIdReducer(state = "Buzz Aldrin", action) {
  if (action.type === "SWITCH_USER") {
    return action.id;
  } else {
    return state;
  }
}

function activeThreadIdReducer(state = null, action) {
  if (action.type === "OPEN_THREAD") {
    return action.id;
  } else {
    return state;
  }
}

function findThreadIndex(threads, action) {
  switch (action.type) {
    case UNREAD_MESSAGE2:
    case "RESET_MESSAGE": {
      return threads.findIndex((t) => t._id === action.id);
    }
    case ADD_MESSAGE2:
    case "ADD_MESSAGE": {
      return threads.findIndex((t) => t._id === action.threadId);
    }
    case DELETE_MESSAGE2:
    case "DELETE_MESSAGE": {
      return threads.findIndex((t) =>
        t.messages.find((m) => m._id === action.messageId)
      );
    }
    default: {
      return threads;
    }
  }
}


function threadsReducer(
  state = [],
  action
) {
  switch (action.type) {
    case ROOMS_LOADING: {
      return [...state,...action.payload];
    }
    case ADD_THREAD: {
      return [...state,action.payload];
    }
    case "ADD_MESSAGE":
    case "RESET_MESSAGE":
    case ADD_MESSAGE2:
    case DELETE_MESSAGE2:
    case UNREAD_MESSAGE2:
    case "DELETE_MESSAGE": {

      const threadIndex = findThreadIndex(state, action);
      const oldThread = state[threadIndex];
      console.log('oldThread', oldThread);
      const newThread = {
        ...oldThread,
        messages: messagesReducer(oldThread.messages, action),
      };
      return [
        ...state.slice(0, threadIndex),
        newThread,
        ...state.slice(threadIndex + 1, state.length),
      ];
    }
    default: {
      return state;
    }
  }
}

function messagesReducer(state = [], action) {
  switch (action.type) {
    case UNREAD_MESSAGE2: {
      console.log('unread')
      return action.payload.messages;
    }
    case ADD_MESSAGE2:
    case "ADD_MESSAGE": {
      return action.payload.messages;
    }
    case DELETE_MESSAGE2:
    case "DELETE_MESSAGE": {
      return action.payload.messages;
    }
    default: {
      return state;
    }
  }
}