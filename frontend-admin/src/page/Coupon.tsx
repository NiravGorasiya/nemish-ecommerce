import React, { useState } from "react";
import Sidebar from "../layouts/commonComponent/Sidebar";
import Header from "../layouts/commonComponent/Header";
import {
  useGetCouponQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} from "../redux/slice/couponSlice";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";
import Footer from "../layouts/commonComponent/Footer";

const Coupon: React.FC = () => {
  const { data, refetch } = useGetCouponQuery();
  const [createCoupon] = useCreateCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  const coupons = data?.info?.rows;

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [couponId, setCouponId] = useState<number | null>(null);

  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">(
    "percentage"
  );
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [usageLimit, setUsageLimit] = useState<number | null>(null);

  const handleEdit = (coupon: any) => {
    setCouponId(coupon.Id);
    setCode(coupon.code);
    setDiscountType(coupon.discountType);
    setDiscountValue(coupon.discountValue);
    setExpiryDate(coupon.expiryDate || "");
    setUsageLimit(coupon.usageLimit || null);
    setPopupVisible(true);
  };

  const handleNew = () => {
    setCouponId(null);
    setCode("");
    setDiscountType("percentage");
    setDiscountValue(0);
    setExpiryDate("");
    setUsageLimit(null);
    setPopupVisible(true);
  };

  const handleDelete = async (id: number) => {
    await deleteCoupon(id);
    refetch();
  };

  const handleSubmit = async () => {
    const payload = {
      code,
      discountType,
      discountValue,
      expiryDate,
      usageLimit,
    };

    if (couponId) {
      await updateCoupon({ Id: couponId, ...payload });
    } else {
      await createCoupon(payload);
    }
    setPopupVisible(false);
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
              <h2 className="content-title card-title">Coupon List</h2>
              <p>Manage discount coupons</p>
            </div>
            <div>
              <Button
                onClick={handleNew}
                className="btn btn-primary btn-sm rounded mx-1"
              >
                Create new
              </Button>
            </div>
          </div>

          <div className="card mb-4">
            <header className="card-header">
              <Row className="align-items-center py-2">
                <Col className="col-md-2 col-12 me-auto mb-md-0 mb-3">Code</Col>
                <Col className="col-md-2 col-6">Type</Col>
                <Col className="col-md-2 col-6">Value</Col>
                <Col className="col-md-2 col-6">Expiry</Col>
                <Col className="col-md-2 col-6">Actions</Col>
              </Row>
            </header>
            <div className="card-body">
              {coupons?.map((coupon: any) => (
                <article className="itemlist" key={coupon.Id}>
                  <Row className="align-items-center">
                    <Col lg={2} sm={4} xs={8} className="flex-grow-1 col-name">
                      <div className="info">
                        <h6 className="mb-0">{coupon.code}</h6>
                      </div>
                    </Col>
                    <Col lg={2} sm={2} xs={4}>
                      <span>{coupon.discountType}</span>
                    </Col>
                    <Col lg={2} sm={2} xs={4}>
                      <span>{coupon.discountValue}</span>
                    </Col>
                    <Col lg={2} sm={2} xs={4}>
                      <span>
                        {coupon.expiryDate
                          ? new Date(coupon.expiryDate).toLocaleDateString()
                          : "—"}
                      </span>
                    </Col>
                    <Col lg={2} sm={2} xs={4} className="text-end">
                      <Button
                        variant="brand"
                        size="sm"
                        className="font-sm rounded mx-1"
                        onClick={() => handleEdit(coupon)}
                      >
                        <i className="material-icons md-edit"></i> Edit
                      </Button>
                      <Button
                        variant="light"
                        size="sm"
                        className="font-sm rounded mx-1"
                        onClick={() => handleDelete(coupon.Id)}
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
        </section>

        <Footer />

        <Modal show={isPopupVisible} onHide={() => setPopupVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{couponId ? "Edit Coupon" : "Add Coupon"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Code</Form.Label>
                <Form.Control
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Discount Type</Form.Label>
                <Form.Select
                  value={discountType}
                  onChange={(e) =>
                    setDiscountType(e.target.value as "percentage" | "fixed")
                  }
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Discount Value</Form.Label>
                <Form.Control
                  type="number"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(Number(e.target.value))}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Usage Limit</Form.Label>
                <Form.Control
                  type="number"
                  value={usageLimit ?? ""}
                  onChange={(e) =>
                    setUsageLimit(
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setPopupVisible(false)}>
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

export default Coupon;
