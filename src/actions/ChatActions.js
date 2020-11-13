import axios from "axios";
import { ITEMS_LOADING, READ_USER } from "./types";
import { isAuth, getCookie } from "../auth/helpers";
export function deleteMessage(id) {
  return {
    type: "DELETE_MESSAGE",
    id: id,
  };
}

export function resetUnreadmsg(id, name) {
  return {
    type: "RESET_MESSAGE",
    id: id,
    name: name,
  };
}

export function addMessage(text, threadId, userName) {
  return {
    type: "ADD_MESSAGE",
    text: text,
    user: userName,
    threadId: threadId,
  };
}

export function openThread(id) {
  return {
    type: "OPEN_THREAD",
    id: id,
  };
}

export function switchUser(id) {
  return {
    type: "SWITCH_USER",
    id: id,
  };
}

export const readUsers = () => (dispatch) => {
  dispatch(setItemsLoading);
  const token = getCookie("token");
  axios
    .get(`${process.env.REACT_APP_API}/user/readAll/${isAuth()._id}`, {
      headers: {
        Authorization: "Bearer " + token, //the token is a variable which holds the token
      },
    })
    .then((res) =>
      dispatch({
        type: READ_USER,
        payload: res.data,
      })
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
