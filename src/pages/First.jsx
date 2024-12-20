import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const First = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const handleNavigate = () => {
    if (sessionStorage.getItem("token")) {
      navigate("/blogs");
    } else {
      alert("Please login to get access to the full blog collection.");
    }
  };

  return (
    <>
      {/* Landing Section */}
      <div
        className="parallax-section d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `url('https://wallpapers.com/images/hd/black-pattern-background-pms9jt26fnsex3j8.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          color: "#f5f5f5",
        }}
      >
        <div className="container text-center">
          <h1 className="display-4 mb-4 text-warning">
            <i className="fa-solid fa-blog me-2"></i>BLOG APPLICATION
          </h1>
          <p className="lead text-light mb-4">
            One Stop Destination for all Software Development Projects. Add, manage, and explore Blogs like never before.
          </p>
          {isLogin ? (
            <Link to={"/dashbord"} className="btn btn-warning btn-lg shadow">
              MANAGE YOUR BlOGS
            </Link>
          ) : (
            <Link to={"/login"} className="btn btn-warning btn-lg shadow">
              START TO EXPLORE
            </Link>
          )}
        </div>
      </div>

      <div className="container text-center my-5 ">
        <Button
     
          
          onClick={handleNavigate}
          className="text-black bg-warning"
          style={{ fontSize: "1.2rem" }}
        >
          CLICK HERE TO VIEW MORE PROJECTS...
        </Button>
      </div>

      <div
        className="testimonials-section py-5"
        style={{
          background: "linear-gradient(145deg, #1d1d1d, #2f2f2f)",
          color: "#f5f5f5",
        }}
      >
        <div className="container text-center">
          <h1 className="mb-5 text-warning">Our Testimonials</h1>
          <div className="d-flex justify-content-center">
            <Card
              style={{
                width: "18rem",
                background: "linear-gradient(145deg, #ffffff, #f1f3f6)",
                borderRadius: "12px",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
              }}
              className="hover-shadow"
            >
              <Card.Body>
                <div className="d-flex flex-column align-items-center">
                  <img
                    width="80"
                    height="80"
                    className="rounded-circle mb-3"
                    src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"
                    alt="user testimonial"
                  />
                  <div className="d-flex justify-content-center my-2">
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                  </div>
                  <p className="text-muted text-center">
                    "This platform has been incredibly helpful for managing and
                    exploring blogs. Highly recommend it!"
                  </p>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <style jsx>{`
        .hover-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
};

export default First;
