import React from "react";
import Sidebar from "../../layouts/commonComponent/Sidebar";
import Header from "../../layouts/commonComponent/Header";
import Footer from "../../layouts/commonComponent/Footer";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGetOrderQuery } from "../../redux/slice/orderSlice";

const Attribute: React.FC = () => {
  const navigate = useNavigate();

  // --- Fetch Orders ---
  const { data, isLoading, isError } = useGetOrderQuery();
  // const [deleteOrder] = useDeleteOrderMutation();

  const orders = data?.info?.rows ?? [];

  const handleDelete = async (id: number | string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        // await deleteOrder(id).unwrap();
        alert("Order deleted successfully");
      } catch (err) {
        console.error(err);
        alert("Failed to delete order");
      }
    }
  };

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <section className="content-main">
          <div className="content-header">
            <div>
              <h2 className="content-title card-title">Order List</h2>
              <p>Manage and review all orders below.</p>
            </div>
          </div>

          <div className="card mb-4">
            <header className="card-header">
              <Row className="align-items-center py-2 fw-bold text-muted">
                <Col md={1}>Order</Col>
                <Col md={2} className="text-center">Date</Col>
                <Col md={2}>Order Status</Col>
                <Col md={2}>Payment Status</Col>
                <Col md={1}>Total</Col>
                <Col md={1}>Created</Col>
                <Col md={1}>Updated</Col>
                <Col md={2} className="text-center">
                  Actions
                </Col>
              </Row>
            </header>
            <div className="card-body">
              {isLoading && (
                <div className="text-center py-3">
                  <Spinner animation="border" size="sm" /> Loading orders...
                </div>
              )}

              {isError && (
                <div className="text-center text-danger py-3">
                  Failed to load orders.
                </div>
              )}

              {!isLoading && orders.length === 0 && (
                <div className="text-center py-3 text-muted">
                  No orders found.
                </div>
              )}

              {orders.map((order: any) => (
                <article
                  key={order.id || order.orderNo}
                  className="itemlist border-bottom py-2"
                >
                  <Row className="align-items-center">
                    <Col md={1}>
                      <div className="info">
                        <h6 className="mb-0">#{order.orderNo}</h6>
                        <small className="text-muted">
                          {order.Users?.username}
                        </small>
                      </div>
                    </Col>

                    <Col md={2}>
                      <h6 className="mb-0">{order.orderDate}</h6>
                    </Col>

                    <Col md={2}>
                      <span className="badge bg-info text-dark">
                        {order.status}
                      </span>
                    </Col>

                    <Col md={2}>
                      <span
                        className={`badge ${
                          order.payment_status === "Paid"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {order.payment_status}
                      </span>
                    </Col>

                    <Col md={1}>
                      <strong>${order.totalAmount}</strong>
                    </Col>

                    <Col md={1}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </Col>
                    <Col md={1}>
                      {new Date(order.updatedAt).toLocaleDateString()}
                    </Col>

                    <Col md={2} className="text-end">
                      <Button
                        variant="brand"
                        size="sm"
                        className="font-sm rounded mx-1"
                        onClick={() => navigate(`/order/detail/${order.Id}`)}
                      >
                        <i className="material-icons md-visibility"></i> View
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        className="font-sm rounded mx-1"
                        onClick={() => handleDelete(order.id)}
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
      </main>
    </>
  );
};

export default Attribute;
