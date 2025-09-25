import React from "react";
import Sidebar from "../../layouts/commonComponent/Sidebar";
import Header from "../../layouts/commonComponent/Header";
import Footer from "../../layouts/commonComponent/Footer";
import { Row, Col, Card, Button } from "react-bootstrap";

const OrderDetail: React.FC = () => {
  const order = {
    orderNo: "78414",
    createdAt: "16/03/2021 04:23 PM",
    customer: {
      name: "Gabrielle",
      email: "gabrielle.db@gmail.com",
      phone: "202-906-12354",
    },
    deliveryAddress: {
      block: "A-510",
      address: "81 Fulton London",
      pincode: "385467",
      phone: "202-458-4568",
    },
    billingAddress: {
      block: "A-510",
      address: "81 Fulton London",
      pincode: "385467",
      phone: "202-458-4568",
    },
    invoice: {
      number: "#78414",
      sellerGST: "AFQWEPX17390VJ",
      purchaseGST: "NVFQWEPX1730VJ",
    },
  };


  const orderItems = [
    {
        id: 'Pr-1204',
        name: 'Oculus VR',
        quantity: 1,
        price: 149.00,
    },
    {
        id: 'Pr-1004',
        name: 'Wall Clock',
        quantity: 1,
        price: 399.00,
    },
    {
        id: 'Pr-1224',
        name: 'Note Diaries',
        quantity: 1,
        price: 149.00,
    },
    {
        id: 'Pr-1414',
        name: 'Flower Port',
        quantity: 1,
        price: 399.00,
    },
];

// Helper data for the summary totals
const summary = {
    subtotal: 1096.00,
    shipping: 12.00,
    discount: 10.00,
    taxRate: 0.18, // 18%
    taxAmount: 198.00,
    totalPayable: 1296.00
};

// Function to format currency
const formatCurrency = (amount:any) => `$${amount.toFixed(2)}`;

// Function to simulate the product image styling
const getProductImageStyle = (productName :any) => {
    let style = {
        width: '40px',
        height: '40px',
        borderRadius: '4px',
        display: 'inline-block',
        marginRight: '10px'
    };

    // Placeholder styles to mimic the original image's icons
    if (productName.includes('Oculus')) {
        return { ...style, backgroundColor: '#f0f0f0', border: '1px solid #ccc' };
    } else if (productName.includes('Clock')) {
        return { ...style, backgroundColor: '#777', borderRadius: '50%' };
    } else if (productName.includes('Diaries')) {
        return { ...style, backgroundColor: '#a0522d' };
    } else if (productName.includes('Flower')) {
        return { ...style, backgroundColor: '#555' };
    }
    return style;
};


  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <section className="content-main">
          {/* ==== Page Header ==== */}
          <div className="content-header">
            <div>
              <h2 className="content-title card-title">
                Order Details: #{order.orderNo}
              </h2>
              <p>Manage and review orders below.</p>
            </div>
          </div>
          {/* ==== Summary Cards ==== */}
          <Row className="mb-4 g-3">
            <Col md={3}>
              <Card className="text-white bg-success">
                <Card.Body>
                  <Card.Title>
                    <i className="material-icons md-shopping_cart"></i> Order
                    Created
                  </Card.Title>
                  <Card.Text>{order.createdAt}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-white bg-danger">
                <Card.Body>
                  <Card.Title>
                    <i className="material-icons md-person"></i> Name
                  </Card.Title>
                  <Card.Text>{order.customer.name}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-dark bg-warning">
                <Card.Body>
                  <Card.Title>
                    <i className="material-icons md-email"></i> Email
                  </Card.Title>
                  <Card.Text>{order.customer.email}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-dark bg-info">
                <Card.Body>
                  <Card.Title>
                    <i className="material-icons md-phone"></i> Contact No
                  </Card.Title>
                  <Card.Text>{order.customer.phone}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* ==== Address & Invoice Sections ==== */}
          <Row className="g-4">
            {/* Delivery Address */}
            <Col md={4}>
              <Card>
                <Card.Header>
                  Delivery Address
                  <Button variant="link" className="float-end p-0">
                    Edit
                  </Button>
                </Card.Header>
                <Card.Body>
                  <p>
                    <strong>Block Number:</strong> {order.deliveryAddress.block}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.deliveryAddress.address}
                  </p>
                  <p>
                    <strong>Pincode:</strong> {order.deliveryAddress.pincode}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.deliveryAddress.phone}
                  </p>
                </Card.Body>
              </Card>
            </Col>

            {/* Billing Address */}
            <Col md={4}>
              <Card>
                <Card.Header>
                  Billing Address
                  <Button variant="link" className="float-end p-0">
                    Edit
                  </Button>
                </Card.Header>
                <Card.Body>
                  <p>
                    <strong>Block Number:</strong> {order.billingAddress.block}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.billingAddress.address}
                  </p>
                  <p>
                    <strong>Pincode:</strong> {order.billingAddress.pincode}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.billingAddress.phone}
                  </p>
                </Card.Body>
              </Card>
            </Col>

            {/* Invoice Details */}
            <Col md={4}>
              <Card>
                <Card.Header>
                  Invoice Detail
                  <Button variant="link" className="float-end p-0">
                    Download
                  </Button>
                </Card.Header>
                <Card.Body>
                  <p>
                    <strong>Number:</strong> {order.invoice.number}
                  </p>
                  <p>
                    <strong>Seller GST:</strong> {order.invoice.sellerGST}
                  </p>
                  <p>
                    <strong>Purchase GST:</strong> {order.invoice.purchaseGST}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="container my-5">
            <h3 className="mb-4">Order Summary</h3>
            <div className="card shadow-sm border-0">
              <div className="card-body p-0">
                {/* Product Table */}
                <div className="table-responsive">
                  <table className="table table-borderless mb-0">
                    <thead>
                      <tr className="text-muted border-bottom">
                        <th style={{ width: "10%" }}>PRODUCT IMAGE</th>
                        <th style={{ width: "50%" }}>PRODUCT NAME</th>
                        <th style={{ width: "20%" }} className="text-end">
                          QUANTITY
                        </th>
                        <th style={{ width: "20%" }} className="text-end">
                          PRICE
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItems.map((item) => (
                        <tr key={item.id} className="border-bottom">
                          <td>
                            <div style={getProductImageStyle(item.name)}>
                              {/* Image Placeholder */}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex flex-column">
                              <span>{item.name}</span>
                              <small className="text-primary">{item.id}</small>
                            </div>
                          </td>
                          <td className="text-end">{item.quantity}</td>
                          <td className="text-end">
                            {formatCurrency(item.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary Totals */}
                <div className="p-4 d-flex justify-content-end">
                  <div style={{ width: "300px" }}>
                    <div className="d-flex justify-content-between my-1">
                      <span>Subtotal Price</span>
                      <span className="fw-semibold">
                        {formatCurrency(summary.subtotal)}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between my-1">
                      <span>Shipping Cost (+):</span>
                      <span className="fw-semibold">
                        {formatCurrency(summary.shipping)}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between my-1">
                      <span>Discount (-):</span>
                      <span className="fw-semibold text-danger">
                        -{formatCurrency(summary.discount)}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between my-1 border-bottom pb-2">
                      <span>Tax ({Math.round(summary.taxRate * 100)}%):</span>
                      <span className="fw-semibold">
                        {formatCurrency(summary.taxAmount)}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between pt-2">
                      <span className="fs-5 fw-bold">Total Payable:</span>
                      <span className="fs-5 fw-bold">
                        {formatCurrency(summary.totalPayable)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default OrderDetail;
