import React, { Fragment } from "react";
import Layout from "./core/Layout";

const App = () => {
  return (
    <Fragment>
        <Layout>
          <div className="col-md-6 offset-md-3 text-center">
            <h1 className="p-5">
              React Node MongoDB Authentication Boilerplate
            </h1>
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

export default App;
