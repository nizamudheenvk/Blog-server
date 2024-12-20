import React, { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { allBlogApi } from "../services/allApi";
import SERVER_BASE_URL from "../services/serverUrl";

const Blogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    getAllBlogs();
  }, []);

  const getAllBlogs = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await allBlogApi(reqHeader);
        if (result.status === 200) {
          setAllBlogs(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = (blog) => {
    setSelectedBlog(blog);
    setShow(true);
  };

  return (
    <>
      <Row className="justify-content-center py-5">
        {allBlogs?.length > 0 ? (
          allBlogs?.map((blog) => (
            <Col key={blog?._id} sm={12} md={6} lg={3} className="mb-4">
              <div className="d-flex justify-content-center align-items-center">
                <Card
                  style={{
                    width: "18rem",
                    minHeight: "460px",
                    background: "linear-gradient(145deg, #f3f4f7, #e2e4e8)",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  className="hover-shadow"
                >
                  <Card.Img
                  style={{height:"300px"}}
                    className="card-img"
                    variant="top"
                    src={`${SERVER_BASE_URL}/uploads/${blog?.blogImage}`}
                  />
                  <Card.Body>
                    <Card.Title className="fw-bold text-dark">
                      {blog?.title}
                    </Card.Title>
                    <p>{blog?.date}</p>
                    <Button
                      variant="outline-dark"
                      style={{ width: "100%", padding: "8px 12px" }}
                      onClick={() => handleShow(blog)}
                    >
                      See More
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))
        ) : (
          <div className="fw-bold text-danger">PROJECT NOT FOUND</div>
        )}
      </Row>

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
                    <i
                      className="fa fa-calendar"
                      style={{ marginRight: "10px" }}
                    ></i>
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

export default Blogs;
