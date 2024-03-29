import React, { useState } from "react";
import { Container, Button, Card, Figure, ListGroup, OverlayTrigger } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProvideAuth } from "hooks/useAuth";
import axios from "utils/axiosConfig.js";
import { timeSince } from "utils/timeSince";
import {
  DeleteModal,
  LikeIcon,
  LikeIconFill,
  ReplyIcon,
  TrashIcon,
} from "components";
import "./Post.scss";
import { toast } from "react-toastify";
import useToggle from "hooks/useToggle";
import Tooltip from "react-bootstrap/Tooltip";

const Post = ({ post: { _id, author, text, comments, created, likes } ,userDetail }) => {
  const [showDelete, toggleShowDelete] = useToggle();
  const [isDeleted, toggleIsDeleted] = useToggle();

  let navigate = useNavigate();
  const {
    state: { user },
  } = useProvideAuth();
  const [likedState, setLiked] = useState(likes?.includes(user.uid));
  const [likesState, setLikes] = useState(likes?.length);

  const handleToggleLike = async () => {
    if (!likedState) {
      setLiked(true);
      setLikes(likesState + 1);
      try {
        await axios.post(`posts/like/${_id}`);
      } catch (error) {
        console.log(error);
        return error;
      }
    } else {
      setLiked(false);
      setLikes(likesState - 1);
      try {
        await axios.post(`posts/like/${_id}`);
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`/posts/${_id}`);

      toggleShowDelete();
      toggleIsDeleted();
    } catch (error) {
      toast.error(`An error occurred deleting post ${_id}.`);
      toggleShowDelete();
    }
  };

  if (isDeleted) return <></>;

  console.log(likes)

console.log(author)
  
  return (
    <>
      <ListGroup.Item className="bg-white text-danger rounded-edge" as={"div"}>
        <Card className="w-100 py-2 px-3 d-flex flex-row gap-3 align-items-start">
          <Figure
            className="mr-4 bg-border-color rounded-circle overflow-hidden ml-2 p-1"
            style={{
              height: "60px",
              minHeight: "60px",
              width: "60px",
              minWidth: "60px",
              marginTop: "0px",
            }}
          >
            <Figure.Image
            onClick={() => navigate(`/u/${author?.username}`)}
              src={author?.profile_image}
              className="w-100 h-100 mr-4"
            />
          </Figure>
          <div className="w-100">
            <div className="d-flex align-items-center">
              <span 
              onClick={() => navigate(`/u/${author.username}`)}
              className="text-muted mr-1 username">
                @{author?.username}
              </span>
              <pre className="m-0 text-muted">{" - "}</pre>
              <span className="text-muted">{timeSince(created)} ago</span>
            </div>
            <div className="mb-n1 mt-1 position-relative">
              <blockquote className="mb-1 mw-100">
                <div className="mw-100 overflow-hidden">{text}</div>
              </blockquote>
            </div>

            <div className="d-flex justify-content-end align-items-bottom">
              <div className="d-flex align-items-center">
                {user.username === author?.username && (
                  <Container className="close">
                    <TrashIcon onClick={toggleShowDelete} />
                  </Container>
                )}
              </div>

              <div className="d-flex align-items-center mr-2">
                <Button
                  variant="link"
                  size="md"
                  onClick={() => navigate(`/p/${_id}`)}
                >
                  <ReplyIcon />
                </Button>
                <span>{comments?.length > 0 ? comments?.length : 0}</span>
              </div>
              <div
                className={`d-flex align-items-center mr-3 ${
                  likedState ? "isLiked" : ""
                }`}
              >
                <div className="d-flex align-items-center mr-3">
                </div>
                <OverlayTrigger
                placement="top"
                  overlay={
                    <Tooltip id={`tooltip-likes-${_id}`}>
                      {likes && likes.map(function (like) {
    return ( like.username );
  }).join(', ')}
                    </Tooltip>
                  }
                  >
                <Button variant="link" size="md" onClick={handleToggleLike}>
                  {likedState ? <LikeIconFill /> : <LikeIcon />}
                </Button>
                
                </OverlayTrigger>
                <span>{likesState}</span>

              </div>
            </div>
          </div>
        </Card>
      </ListGroup.Item>

      <DeleteModal
        show={showDelete}
        handleClose={toggleShowDelete}
        handleDelete={handleDeletePost}
      />
    </>
  );
};

export default Post;
