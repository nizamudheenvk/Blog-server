import React, { useEffect, useState } from "react";
import View from "../components/View";
import Profile from "../components/Profile";
import Header from "../components/Header";




const Dashbord = () => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setUsername(
        JSON.parse(sessionStorage.getItem("user")).username.split(" ")[0]
      );
    }
  }, []);

  return (
    <>
    <Header/>
      <div
        className="container-fluid py-5  "
        style={{
          background: "linear-gradient(135deg, #1f1f1f, #2c2c2c)",
          minHeight: "100vh",
        }}
      >
        <div className="row justify-content-center mt-5">
          <div
            className="col-lg-8"
            style={{
              backgroundColor: "#333",
              borderRadius: "15px",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              color: "#fff",
            }}
          >
            <h1 style={{ color: "#f9c74f" }}>
              Welcome <span className="text-warning">{username}</span>,
            </h1>
            <View />
          </div>
          <div
            className="col-lg-4 mt-4 mt-lg-0"
            style={{
              backgroundColor: "#444",
              borderRadius: "15px",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              color: "#fff",
            }}
          >
            <Profile />
          </div>
        </div>
      </div>

      <style jsx>{`
        .container-fluid {
          padding-left: 30px;
          padding-right: 30px;
        }

        h1 {
          font-size: 2.5rem;
          font-weight: bold;
          letter-spacing: 1px;
        }

        .text-warning {
          color: #f9c74f;
        }

        /* Shadow and Hover effects */
        .col-lg-8:hover,
        .col-lg-4:hover {
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
          transform: translateY(-5px);
        }
      `}</style>
    </>
  );
};

export default Dashbord;
