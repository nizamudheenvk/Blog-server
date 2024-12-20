import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import Add from "./Add";
import Edit from "./Edit";
import { deleteBlogApi, userBlogApi } from "../services/allApi";
import SERVER_BASE_URL from "../services/serverUrl";
import { addProjectContext, editProjectContext } from "../context/Contextshare";

const View = () => {
  const { editProjectResponse, seteditProjectResponse } = useContext(editProjectContext);
  const { addProjectResponse, setAddProjectResponse } = useContext(addProjectContext);

  const [show, setShow] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (blog) => {
    setSelectedBlog(blog); 
    setShow(true);
  };

  const [userBlogs, setUserBlogs] = useState([]);
  useEffect(() => {
    getUserBlogs();
  }, [addProjectResponse, editProjectResponse]);

  const getUserBlogs = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await userBlogApi(reqHeader);
        if (result.status === 200) {
          setUserBlogs(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const removeBlog = async (id) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
      };

      try {
        const result = await deleteBlogApi(id, reqHeader);
        if (result.status === 200) {
          getUserBlogs();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between mt-3">
        <h2 className="text-warning">All Blogs</h2>
        <div>
          <Add />
        </div>
      </div>

      <Row className="mt-4">
        {userBlogs?.length > 0 ? (
          userBlogs.map((blog) => (
            <Col key={blog?._id} sm={12} md={6} lg={4} className="mb-4">
              <Card
                style={{
                  width: '100%',
                  minHeight: '460px',
                  background: 'linear-gradient(145deg, #1d1d1d, #2f2f2f)',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                  borderRadius: '15px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease',
                }}
                className="hover-shadow"
              >
                <Card.Img
                  className="card-img-top"
                  variant="top"
                  src={`${SERVER_BASE_URL}/uploads/${blog?.blogImage}`}
                  style={{
                    height: '250px',
                    objectFit: 'cover',
                    borderRadius: '15px 15px 0 0',
                    filter: 'brightness(0.8)',
                    transition: 'filter 0.3s ease',
                  }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold text-white" style={{ fontSize: '1.25rem' }}>
                    {blog?.title}
                  </Card.Title>
                  <p className="text-light" style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
                    {blog?.date}
                  </p>
                  <Button onClick={() => handleShow(blog)} variant="outline-light" style={{ width: '100%', padding: '10px 12px', fontSize: '1rem' }}>
                    View Details
                  </Button>
                </Card.Body>
                <div className="d-flex justify-content-center align-items-center mb-3" style={{ gap: "10px" }}>
                  <i onClick={() => removeBlog(blog?._id)} className="fa-solid fa-trash text-danger"></i>
                  <div><Edit blog={blog} /></div>
                </div>
              </Card>
            </Col>
          ))
        ) : (
          <div className="fw-bold text-danger">You haven’t uploaded any blogs yet.</div>
        )}
      </Row>

      <style jsx>{`
        .hover-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        }

        .card-img-top:hover {
          filter: brightness(1); /* Remove the darkened filter when hovering */
        }
      `}</style>

      {/* Modal for Blog Details */}
      <Modal
        size="lg"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            Blog Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "20px" }}>
  {selectedBlog && (
    <Row className="align-items-center">
      {/* Left Side: Image */}
      <Col md={6} className="text-center">
        <img
          className="rounded"
          src={`${SERVER_BASE_URL}/uploads/${selectedBlog?.blogImage}`}
          alt="Blog Image"
          style={{
            width: "100%",
            maxHeight: "300px",
            objectFit: "cover",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          }}
        />
      </Col>

      {/* Right Side: Date and Description */}
      <Col md={6}>
        <div>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#555",
              marginBottom: "8px",
            }}
          >
            <i className="fa fa-calendar" style={{ marginRight: "10px" }}></i>
            <strong>Date:</strong> {selectedBlog?.date}
          </p>

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#f9f9f9",
              borderRadius: "10px",
              boxShadow: "inset 0 4px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid #eee",
              maxHeight: "250px",
              overflowY: "auto", 
              wordBreak: "break-word", 
            }}
          >
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.8", 
                color: "#444",
                whiteSpace: "pre-wrap", 
                margin: 0, 
              }}
            >
              {selectedBlog?.description}
            </p>
          </div>
        </div>
      </Col>
    </Row>
  )}
</Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              borderRadius: "5px",
              backgroundColor: "#6c757d",
              border: "none",
            }}
          >
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default View;
