import React, { useState } from "react";
import Sidebar from "../layouts/commonComponent/Sidebar";
import Header from "../layouts/commonComponent/Header";
import {
  useCreateAttributeMutation,
  useDeleteAttributeMutation,
  useGetAttributesQuery,
  useUpdateAttributeMutation,
} from "../redux/slice/attributeSlice";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";
import Footer from "../layouts/commonComponent/Footer";

const Attribute: React.FC = () => {
  const { data, refetch } = useGetAttributesQuery();
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [attributeId, setAttributeId] = useState<number | null>(null);
  const [deleteAttribute] = useDeleteAttributeMutation();
  const [createAttribute] = useCreateAttributeMutation();
  const [updateAttribute] = useUpdateAttributeMutation();
  const attributes = data?.info?.rows;

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    await deleteAttribute(id);
    refetch();
  };

  const handleEdit = (attribute: { Id: number; name: string }) => {
    setName(attribute.name);
    setAttributeId(attribute.Id);
    setPopupVisible(true);
  };

  const handleButtonClick = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleSubmit = async () => {
    if (attributeId) {
      await updateAttribute({ Id: attributeId, name });
    } else {
      await createAttribute({ name });
    }
    setPopupVisible(false);
  };

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <section className="content-main">
          <div className="content-header">
            <div>
              <h2 className="content-title card-title">Attribute List</h2>
              <p>Attribute List.</p>
            </div>
            <div>
              <Button
                onClick={handleButtonClick}
                className="btn btn-primary btn-sm rounded mx-1"
              >
                Create new
              </Button>
            </div>
          </div>
          <div className="card mb-4">
            <header className="card-header">
              <Row className=" align-items-center py-2">
                <Col className="col-md-3 col-12 me-auto mb-md-0 mb-3">
                  Attribute
                </Col>
                <Col className="col-md-2 col-6">Created</Col>
                <Col className="col-md-2 col-6">Updated</Col>
                <Col className="col-md-2 col-6">Actions</Col>
              </Row>
            </header>
            <div className="card-body">
              {attributes?.map((attribute, index) => (
                <article className="itemlist">
                  <Row key={index} className="align-items-center">
                    <Col lg={2} sm={4} xs={8} className="flex-grow-1 col-name">
                      <div className="info">
                        <h6 className="mb-0">{attribute.name}</h6>
                      </div>
                    </Col>
                    <Col lg={2} sm={2} xs={4} className="col-date">
                      <span>
                        {new Date(attribute.createdAt).toLocaleDateString()}
                      </span>
                    </Col>
                    <Col lg={2} sm={2} xs={4} className="col-date">
                      <span>
                        {new Date(attribute.updatedAt).toLocaleDateString()}
                      </span>
                    </Col>
                    <Col lg={2} sm={2} xs={4} className="col-action text-end">
                      <Button
                        variant="brand"
                        size="sm"
                        className="font-sm rounded mx-1"
                        onClick={() => handleEdit(attribute)}
                      >
                        <i className="material-icons md-edit"></i> Edit
                      </Button>
                      <Button
                        variant="light"
                        size="sm"
                        className="font-sm rounded mx-1"
                        onClick={(event) => handleDelete(event, attribute.Id)}
                      >
                        <i className="material-icons md-delete_forever"></i>{" "}
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </article>
              ))}
            </div>
          </div>
          <div className="pagination-area mt-30 mb-50">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-start">
                <li className="page-item active">
                  <a className="page-link" href="#">
                    01
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    02
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    03
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link dot" href="#">
                    ...
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    16
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    <i className="material-icons md-chevron_right"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </section>
        <Footer />
        <Modal show={isPopupVisible} onHide={handleButtonClick}>
          <Modal.Header>
            <Modal.Title>
              {attributeId ? "Edit Attribute" : "Add Attribute"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Attribute Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                ></Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleButtonClick}>
              Close
            </Button>
            <Button variant="secondary" onClick={handleSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </>
  );
};

export default Attribute;
