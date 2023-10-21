import React, { useState } from "react";
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

const CreateGroup = ({
  onAddCategory,
  categories = [],
  availableCategories = [],
}) => {
  const [selectedCategories, setSelectedCategories] = useState(categories);
  // const [availableCategories,setAvailableCategories] = useState([])

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
                  <Form.Control type="text" placeholder="Enter Group name" />
                </Form.Group>
                <Form.Group controlId="categories">
                  <Form.Label>Categories</Form.Label>
                  <CreatableReactSelect
                    onCreateOption={(label) => {
                      const newCategory = { id: uuidV4(), label };
                      onAddCategory(newCategory);
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
                  rows={5}
                />
                <Stack direction="horizontal" className="button-bottom">
                  <Button type="submit" className="btn-grp-save">
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
