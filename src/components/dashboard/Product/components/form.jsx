import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

export default function ProductForm() {
  const [formData, setFormData] = useState({
    productName: "",
    expiryDate: "",
    storage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Submit form data to the server using axios POST request
      await axios.post(
        "https://traceability.yensaocaocapthanhdung.com.vn/api/product/",
        formData
      );
      console.error("Sucess:");
      // Optionally, you can reset the form after submission
      setFormData({
        productName: "",
        expiryDate: "",
        storage: "",
      });
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"></i> Thêm sản phẩm
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit} className="row g-3">
              <Col md={4}>
                <FormGroup>
                  <Label for="productName">Tên sản phẩm:</Label>
                  <Input
                    id="productName"
                    name="productName"
                    placeholder="Nhập tên sản phẩm"
                    type="text"
                    value={formData.productName}
                    onChange={handleChange}
                    required="true"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="expiryDate">Hạn sử dụng (Năm):</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="Nhập hạn sử dụng"
                    type="text"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    required="true"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="storage">Bảo quản:</Label>
                  <Input
                    id="storage"
                    name="storage"
                    placeholder="Môi trường bảo quản"
                    type="text"
                    value={formData.storage}
                    onChange={handleChange}
                    required="true"
                  />
                </FormGroup>
              </Col>

              <Col xs="12" className="mt-2">
                <Button>Submit</Button>
              </Col>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
