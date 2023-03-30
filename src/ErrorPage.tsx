import React from "react";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

const ErrorPage = () => {
  return (
    <section className="error-page">
      <Header />
      <div className="container">
        <div className="left">
          <h1>Error 404</h1>
          <strong>Dude! Where's my page ?</strong>
          <p>The internet is a mysterious and powerful place, and it's mystery is only exceeded by it's power.</p>
          <Link to="/">Bring me back to safety</Link>
        </div>
        <div className="right">
          <img src="/heart-regerna.svg" alt="Regerna heart" />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default ErrorPage;
