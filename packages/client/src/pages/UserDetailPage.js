import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Figure,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner, Post } from "components";
import { useProvideAuth } from "hooks/useAuth";
import { useRequireAuth } from "hooks/useRequireAuth";
import axios from "utils/axiosConfig.js";
import { toast } from "react-toastify"
import ChooseAvatar from "components/AvatarPicker";

const UserDetailPage = () => {
  const { state } = useProvideAuth();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [validated, setValidated] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
    currentPassword: "",
    isSubmitting: false,
    errorMessage: null,
  });
const [openAvatar, setOpenAvatar] = useState(false)
const [profileImage, setProfileImage] = useState()
const [presentAvatar, setPresentAvatar] = useState();
const [avatar, setAvatar] = useState();

const handlePresentAvatar = (avatarIndex, avatar) => {
  setAvatar(avatar)
  setPresentAvatar(avatarIndex)
}

let imgs = [
  "bird.svg",
  "dog.svg",
  "fox.svg",
  "frog.svg",
  "lion.svg",
  "owl.svg",
  "tiger.svg",
  "whale.svg",
];

const profileImageSelector = (i) => {
  setProfileImage(`${i}`);
}

  let navigate = useNavigate();
  let params = useParams();
  const {
    state: { isAuthenticated },
  } = useRequireAuth();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userResponse = await axios.get(`users/${params.uid}`);
        setUser(userResponse.data);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
      }
      console.log(params)
    };
    isAuthenticated && getUser();
  }, [params.uid, isAuthenticated, axios]);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleAvatarUpdate = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });
    try {
      const userUpdate = await axios.put(`/users/${user.username}/avatar`, {
        profile_image: avatar,
      });
      console.log(userUpdate.data)
      setUser((previousUser) => ({...previousUser, profile_image: userUpdate.data.profile_image}));
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: null,
      });
      setOpenAvatar(false);
      toast.success("Your avatar has updated!");
    } catch (error) {console.log(error)}
  }

  console.log(avatar)

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match")
      return;
    }
    const form = event.currentTarget;
    // handle invalid or empty form
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });
    try {
      // write code to call edit user endpoint 'users/:id'
      const {
        user: { uid, username },
      } = state;
      console.log(data.password, uid, username);
      await axios.put(`/users/${user.username}`, {
        currentPassword: data.currentPassword,
        password: data.password,
        confirmPassword: data.confirmPassword
      });
      setValidated(false);
      toast.success("Your password has been updated!")
      setOpen(false)
      // don't forget to update loading state and alert success
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error.message,
      });
      toast.error(error.message)
      
    }
  };


  if (!isAuthenticated) {
    return <LoadingSpinner full />;
  }

  if (loading) {
    return <LoadingSpinner full />;
  }

  return (
    <>
      <Container className="clearfix">
        <Button
          variant="outline-info"
          onClick={() => {
            navigate(-1);
          }}
          style={{ border: "none", color: "#E5E1DF" }}
          className="mt-3 mb-3"
        >
          Go Back
        </Button>
        <Card bg="header" className="text-center">
          <Card.Body>
            <Figure
              className="bg-border-color rounded-circle overflow-hidden my-auto ml-2 p-1"
              style={{
                height: "50px",
                width: "50px",
                backgroundColor: "white",
              }}
            >
              <Figure.Image src={"/" + user.profile_image} className="w-100 h-100" />
            </Figure>
            <Card.Title>{user.username}</Card.Title>
            <Card.Title>{user.email}</Card.Title>
            {state.user.username === params.uid && (
              <div
                onClick={() => setOpen(!open)}
                style={{ cursor: "pointer", color: "#BFBFBF" }}
              >
                Edit Password
              </div>
            )}
            {open && (
              <Container animation="false">
                  <div className="row justify-content-center p-4">
                    <div className="col text-center">
                      <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleUpdatePassword}
                      >
                        <Form.Group>
                          <Form.Label htmlFor="CurrentPassword">Current Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="currentPassword"
                            required
                            value={data.currentPassword}
                            onChange={handleInputChange} />
                          <Form.Control.Feedback type="invalid">
                            Current Password is required
                          </Form.Control.Feedback>
                          <Form.Text id="passwordHelpBlock" muted>
                            Must be 8-20 characters long.
                          </Form.Text>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label htmlFor="password">New Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            required
                            value={data.password}
                            onChange={handleInputChange} />
                          <Form.Control.Feedback type="invalid">
                            New Password is required
                          </Form.Control.Feedback>
                          <Form.Text id="passwordHelpBlock" muted>
                            Must be 8-20 characters long.
                          </Form.Text>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label htmlFor="password">Confirm New Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            required
                            value={data.confirmPassword}
                            onChange={handleInputChange} />
                          <Form.Control.Feedback type="invalid">
                            Confirmation is required
                          </Form.Control.Feedback>
                          <Form.Text id="passwordHelpBlock" muted>
                            Passwords must match.
                          </Form.Text>
                        </Form.Group>
                        {data.errorMessage && (
                          <span className="form-error">{data.errorMessage}</span>
                        )}
                        <Button type="submit" disabled={data.isSubmitting}>
                          {data.isSubmitting ? <LoadingSpinner /> : "Update"}
                        </Button>
                      </Form>
                    </div>
                  </div>
                </Container>
            )}
            {!open &&
            <Container animation="false">
            <div className="row justify-content-center p-4">
              <div className="col text-center">
              <Form
                noValidate
                validated={validated}
                onSubmit={handleAvatarUpdate}
              >
                <Form.Group>
                  <Form.Label> Profile Avatar </Form.Label>
                  <ChooseAvatar
                    avatars={imgs}
                    presentAvatar={presentAvatar}
                    handlePresentAvatar={handlePresentAvatar} />
                </Form.Group>
                <Button type="submit" disabled={data.isSubmitting}>
                  {data.isSubmitting ? <LoadingSpinner /> : "Update"}
                </Button>
                </Form>
              </div>
            </div>
          </Container>
            }
          </Card.Body>
        </Card>
      </Container>
      <Container className="pt-3 pb-3">
        {user.posts.length !== 0 ? (
          user.posts.map((post) => (
            <Post key={post._id} post={post} userDetail={user} />
          ))
        ) : (
          <div
            style={{
              marginTop: "75px",
              textAlign: "center",
            }}
          >
            No User Posts
          </div>
        )}
      </Container>
    </>
  );
};

export default UserDetailPage;