import React, { useState } from "react";
import Sidebar from "../layouts/commonComponent/Sidebar";
import Header from "../layouts/commonComponent/Header";
import Footer from "../layouts/commonComponent/Footer";
import {
  useGetBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} from "../redux/slice/bannerSlice";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";

const Banner: React.FC = () => {
  const { data, refetch } = useGetBannersQuery();
  const [createBanner] = useCreateBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();

  const banners = data?.info?.rows || [];

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [bannerId, setBannerId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [position, setPosition] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("active");

  const handleButtonClick = () => {
    setPopupVisible(!isPopupVisible);
    if (!isPopupVisible) resetForm();
  };

  const resetForm = () => {
    setBannerId(null);
    setTitle("");
    setImage(null);
    setPreview(null);
    setLinkUrl("");
    setPosition("");
    setStartDate("");
    setEndDate("");
    setStatus("active");
  };

  const handleFile = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("link_url", linkUrl);
    formData.append("position", position);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("status", status);
    if (image) formData.append("image", image);

    if (bannerId) {
      await updateBanner({ Id: bannerId, formData });
    } else {
      await createBanner(formData);
    }

    resetForm();
    setPopupVisible(false);
    refetch();
  };

  const handleEdit = (banner: any) => {
    setBannerId(banner.Id);
    setTitle(banner.title);
    setPreview(`http://localhost:5000${banner.image_url}`);
    setLinkUrl(banner.link_url);
    setPosition(banner.position || "");
    setStartDate(banner.start_date || "");
    setEndDate(banner.end_date || "");
    setStatus(banner.status || "active");
    setPopupVisible(true);
  };

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    await deleteBanner(id);
    refetch();
  };

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <section className="content-main">
          <div className="content-header">
            <div>
              <h2 className="content-title card-title">Banner List</h2>
              <p>Manage banners (CRUD).</p>
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
                <Col className="col-md-2">Title</Col>
                <Col className="col-md-2">Image</Col>
                <Col className="col-md-2">Link</Col>
                <Col className="col-md-1">Position</Col>
                <Col className="col-md-2">Date Range</Col>
                <Col className="col-md-1">Status</Col>
                <Col className="col-md-2">Actions</Col>
              </Row>
            </header>
            <div className="card-body">
              {banners.map((banner: any, index: number) => (
                <article key={index} className="itemlist">
                  <Row className="align-items-center">
                    <Col md={2}>{banner.title}</Col>
                    <Col md={2}>
                      {banner.image_url && (
                        <img
                          src={`http://localhost:5000${banner.image_url}`}
                          alt={banner.title}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "5px",
                          }}
                        />
                      )}
                    </Col>
                    <Col md={2}>
                      <a
                        href={banner.link_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {banner.link_url}
                      </a>
                    </Col>
                    <Col md={1}>{banner.position || "-"}</Col>
                    <Col md={2}>
                      {banner.start_date} → {banner.end_date}
                    </Col>
                    <Col md={1}>
                      <span
                        className={`badge ${
                          banner.status === "active"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {banner.status}
                      </span>
                    </Col>
                    <Col lg={2} sm={2} xs={4} className="col-action text-end">
                      <Button
                        variant="brand"
                        size="sm"
                        className="font-sm rounded mx-1"
                        onClick={() => handleEdit(banner)}
                      >
                        <i className="material-icons md-edit"></i> Edit
                      </Button>
                      <Button
                        variant="light"
                        size="sm"
                        className="font-sm rounded mx-1"
                        onClick={(event) => handleDelete(event, banner.Id)}
                      >
                        <i className="material-icons md-delete_forever"></i> Delete
                      </Button>
                    </Col>
                  </Row>
                </article>
              ))}
            </div>
          </div>
        </section>
        <Footer />

        {/* Modal */}
        <Modal show={isPopupVisible} onHide={handleButtonClick}>
          <Modal.Header closeButton>
            <Modal.Title>{bannerId ? "Edit Banner" : "Add Banner"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Link URL</Form.Label>
                <Form.Control
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      maxHeight: "150px",
                      marginTop: "10px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleButtonClick}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </>
  );
};

export default Banner;
