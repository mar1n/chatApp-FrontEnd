import React, { Fragment, useEffect } from "react";
import Layout from "./core/Layout";
import { connect } from "react-redux";
import { readRooms } from "./actions/ChatActions";

const MainApp = () => {
  useEffect(() => {
    console.log('app');
  }
    
  , []);
  return (
    <Fragment>
      <Layout>
        <div className="col-md-6 offset-md-3 text-center">
          <h1 className="p-5">React Node MongoDB Authentication Boilerplate</h1>
          <h2>MERN STACK</h2>
          <hr />
          <p>
            Random discription, Random discription, Random discription, Random
            discription{" "}
          </p>
        </div>
      </Layout>
    </Fragment>
  );
};

const App = connect(null, { readRooms })(MainApp);
export default App;
