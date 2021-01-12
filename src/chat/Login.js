import React from "react";
import { connect } from "react-redux";
import { switchUser, openThread } from "../actions/ChatActions";
import { isAuth, signout } from "../auth/helpers";
class Login extends React.Component {
  state = {
    user: isAuth().name,
  };
  changeUser = (e) => {
    this.props.user(e.target.value);
    this.props.default(isAuth().name);
    this.setState({ user: e.target.value });
  };
  render() {
    return (
      <div>
        <p>
          You are currently login: <span>{this.state.user}</span>
        </p>
      </div>
    );
  }
}

const mapStateToLoginProps = (state) => {
  const loginUsers = state.users.map((u) => ({
    userName: u.name,
  }));
  return {
    loginUsers,
  };
};

const mapDispatchToLoginProps = (dispatch) => ({
  user: (id) => dispatch(switchUser(id)),
  default: (id) => dispatch(openThread(id)),
});

const LoginSwitch = connect(
  mapStateToLoginProps,
  mapDispatchToLoginProps
)(Login);
export default LoginSwitch;