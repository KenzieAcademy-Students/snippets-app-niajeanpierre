import React from "react";
import { Figure, Row, Col } from "react-bootstrap";
import "./Comment.css";
import { timeSince } from "utils/timeSince";

const Comment = ({ comment }) => {
  const { author, created } = comment;
  return (
    <Row className="comment-card my-3 px-3 py-2" style={{ flexWrap: "nowrap" }}>
      <Col
        as={Figure}
        xs={3}
        className="mr-4 bg-border-color rounded-circle ml-2 mt-2 p-1"
        style={{
          outline: "1px solid white",
          backgroundColor: "white",
          height: "60px",
          minHeight: "60px",
          width: "60px",
          minWidth: "60px",
          marginTop: "0px",
        }}
      >
        <Figure.Image src={author.profile_image} className="w-100 h-100 mr-4" />
      </Col>
      <Col xs={9} className="d-flex flex-column">
        <div className="mb-2 comment-author">
          <span>@{comment.author?.username}</span>
          <pre className="m-0 text-muted"> {timeSince(created)} </pre>
        </div>
        <p className="comment-text">{comment.text}</p>
      </Col>
    </Row>
  );
};

export default Comment;
