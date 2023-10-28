import React, { useState, useContext } from "react";
import {
  Container,
  Form,
  Stack,
  Button,
  FloatingLabel,
  FormControl,
} from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { UserContext } from "../components/UserContext";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const CreateGroup = ({
  onAddCategory,
  categories = [],
  availableCategories = [],
}) => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [groupname, setGroupName] = useState();
  const [description, setDescription] = useState();
  const [error, setError] = useState("");

  // const [availableCategories,setAvailableCategories] = useState([])
  const { userId } = useContext(UserContext);
  //const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation

    const group = {
      users: [],
      creatorId: userId,
      categories: [selectedCategories],
      groupname: groupname,
      description: description,
    };
    console.log("group::");
    console.log(group);

    try {
      const response = await axios.post(`${apiUrl}/groups`, group);
      // const token = response.data.token;

      // localStorage.setItem("token", token); //

      const userId = response.data.userId; // Assuming the API response contains the adminId
      localStorage.setItem("userId", userId);
      // setUserId(adminId);

      navigate("/userwelcome");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.msg) {
        setError(error.response.data.msg);
      }
      // console.log("error.response.data.errors: ");
      // console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
    }
  };

  return (
    <>
      <>
        <Container className="parentWrapper">
          <div className="innerWrapper">
            <div></div>
            <div className="general-form-wrapper pt-5">
              <Form className="FormContainer">
                <h4 style={{ textAlign: "center" }}>Hi, Nick</h4>
                <div className="buttonWrapper"></div>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Control
                    value={groupname}
                    onChange={(e) => setGroupName(e.target.value)}
                    type="text"
                    placeholder="Enter Group name"
                  />
                </Form.Group>
                <Form.Group controlId="categories">
                  <Form.Label>Categories</Form.Label>
                  <CreatableReactSelect
                    onCreateOption={(label) => {
                      const newCategory = { id: uuidV4(), label };
                      //     onAddCategory(newCategory);
                      setSelectedCategories((prev) => [...prev, newCategory]);
                    }}
                    value={selectedCategories.map((category) => {
                      return { label: category.label, value: category.id };
                    })}
                    options={availableCategories.map((category) => {
                      return { label: category.label, value: category.id };
                    })}
                    onChange={(categories) => {
                      setSelectedCategories(
                        categories.map((category) => {
                          return { label: category.label, id: category.value };
                        })
                      );
                    }}
                    isMulti
                  />
                </Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  className="group-desc"
                  required
                  as="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                />
                <Stack direction="horizontal" className="button-bottom">
                  <Button onClick={handleSubmit} className="btn-grp-save">
                    {" "}
                    Save
                  </Button>
                  <Link to="..">
                    <Button type="button"> Cancel</Button>
                  </Link>
                </Stack>
                <br></br>
              </Form>
            </div>
          </div>
        </Container>
      </>
    </>
  );
};

export default CreateGroup;
