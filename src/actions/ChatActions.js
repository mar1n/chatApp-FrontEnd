import axios from "axios";
import { ITEMS_LOADING, READ_USER, ROOMS_LOADING, ADD_MESSAGE2, DELETE_MESSAGE2, UNREAD_MESSAGE2, ADD_THREAD } from "./types";
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

/* Used only by actions for sockets */
export const initialItems = (res) => ({
	type: "INITIAL_ITEMS",
	items: res
})

/***************************************************************************************** */
/* Async Action items using - Sockets													   */
/***************************************************************************************** */
export const loadInitialDataSocket = (socket, id) => {
	return (dispatch) => {
		// dispatch(clearAllItems())
    // console.log('socket id test', id);
    // socket.emit('initialList', id);
    socket.emit('listUsers', id);
		socket.on('initialList',(res)=>{
      console.log('initialList', res);
		   console.dir(res)
		   //dispatch(initialItems(res))
	   })
	}	
}

export const readUsers = () => (dispatch) => {
  console.log('name', isAuth().name);
  dispatch(setItemsLoading);
  const token = getCookie("token");
  axios
    .get(`${process.env.REACT_APP_API}/user/readAll/${isAuth()._id}`, {
      headers: {
        Authorization: "Bearer " + token, //the token is a variable which holds the token
      },
    })
    .then((res) =>
    //console.log(res);
      dispatch({
        type: READ_USER,
        payload: res.data,
      })
    );
};

export const readRooms = () => (dispatch) => {
  dispatch(setItemsLoading);
  const token = getCookie("token");
  axios
    .get(`${process.env.REACT_APP_API}/user/chat/room/${isAuth().name}`, {
      headers: {
        Authorization: "Bearer " + token, //the token is a variable which holds the token
      },
    })
    .then((res) =>{
      console.log(res.data);
      return dispatch({
        type: ROOMS_LOADING,
        payload: res.data,
      })}
    );
};


export const addMessage33 = (data) => ({
  type: ADD_MESSAGE2,
  payload: data.data,
  text: data.text,
  user: data.name,
  threadId: data.id
})

export const addMessage3 = (socket, text, id, name) => {
  return (dispatch) => {
    let message = {
      text,
      id,
      name
    }
    socket.emit('addMessage', message);
  }
}

export const addMessage2 = (text, id, name) => (dispatch) => {
  dispatch(setItemsLoading);
  const token = getCookie("token");
  axios
    .put(`${process.env.REACT_APP_API}/user/chat/room/message/${id}/${name}/${text}`, {
      headers: {
        Authorization: "Bearer " + token, //the token is a variable which holds the token
      },
    })
    .then((res) =>{
      console.log(res.data);
      return dispatch({
        type: ADD_MESSAGE2,
        payload: res.data,
        text: text,
        user: name,
        threadId: id,
      })}
    );
};

export const deleteMessage2 = (roomId, messageId) => (dispatch) => {
  dispatch(setItemsLoading);
  const token = getCookie("token");
  axios
    .put(`${process.env.REACT_APP_API}/user/chat/room/message/${roomId}/${messageId}`, {
      headers: {
        Authorization: "Bearer " + token, //the token is a variable which holds the token
      },
    })
    .then((res) =>{
      console.log(res.data);
      return dispatch({
        type: DELETE_MESSAGE2,
        payload: res.data,
        threadId: roomId,
        messageId: messageId,
      })}
    );
};

export const resetUnreadmsg2 = (roomId, name) => (dispatch) => {
  console.log('roomId', roomId);
  console.log('name', name)
  dispatch(setItemsLoading);
  const token = getCookie("token");
  axios
    .put(`${process.env.REACT_APP_API}/user/chat/room/readMessage/${roomId}/${name}`, {
      headers: {
        Authorization: "Bearer " + token, //the token is a variable which holds the token
      },
    })
    .then((res) =>{
      console.log(res.data);
      return dispatch({
        type: UNREAD_MESSAGE2,
        payload: res.data,
        id: roomId,
      })}
    );
};

export const addNewThread = (users, newThreadName) => (dispatch) => {
  dispatch(setItemsLoading);
  const token = getCookie("token");
  axios
    .put(`${process.env.REACT_APP_API}/user/chat/room/add?${users}&newThreadName=${newThreadName}`, {
      headers: {
        Authorization: "Bearer " + token, //the token is a variable which holds the token
      },
    })
    .then((res) =>{
      console.log(res.data);
      return dispatch({
        type: ADD_THREAD,
        payload: res.data
      })}
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
