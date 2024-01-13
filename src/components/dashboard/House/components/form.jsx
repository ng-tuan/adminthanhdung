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
export default function HouseForm() {
  const [formData, setFormData] = useState({
    codeHouse: "",
    nameHouse: "",
    idcard: "",
    addrHouse: "",
    acreageHouse: "",
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
        "https://traceability.yensaocaocapthanhdung.com.vn/api/house/",
        formData
      );
      console.error("Sucess:");
      // Optionally, you can reset the form after submission
      setFormData({
        codeHouse: "",
        nameHouse: "",
        idcard: "",
        addrHouse: "",
        acreageHouse: "",
      });
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    // <div>
    //   <h2>Submit New Product</h2>
    //   <form onSubmit={handleSubmit}>
    //     <label>Codde house:</label>
    //     <input
    //       type="text"
    //       name="codeHouse"
    //       value={formData.codeHouse}
    //       onChange={handleChange}
    //       required
    //     />

    //     <label>Name house:</label>
    //     <input
    //       type="text"
    //       name="nameHouse"
    //       value={formData.nameHouse}
    //       onChange={handleChange}
    //       required
    //     />

    //     <label>ID card:</label>
    //     <input
    //       type="text"
    //       name="idcard"
    //       value={formData.idcard}
    //       onChange={handleChange}
    //       required
    //     />

    //     <label>Address house:</label>
    //     <input
    //       type="text"
    //       name="addrHouse"
    //       value={formData.addrHouse}
    //       onChange={handleChange}
    //       required
    //     />

    //     <label>Acreage house:</label>
    //     <input
    //       type="text"
    //       name="acreageHouse"
    //       value={formData.acreageHouse}
    //       onChange={handleChange}
    //       required
    //     />

    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"></i> Thêm nhà yến
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit} className="row g-3">
              <Col md={4}>
                <FormGroup>
                  <Label for="productName">Mã nhà yến:</Label>
                  <Input
                    id="codeHouse"
                    name="codeHouse"
                    placeholder="Nhập mã nhà yến"
                    type="text"
                    value={formData.codeHouse}
                    onChange={handleChange}
                    required="true"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="expiryDate">Tên chủ nhà yến:</Label>
                  <Input
                    id="nameHouse"
                    name="nameHouse"
                    placeholder="Nhập tên chủ nhà yến"
                    type="text"
                    value={formData.nameHouse}
                    onChange={handleChange}
                    required="true"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="storage">Địa chỉ:</Label>
                  <Input
                    id="addrHouse"
                    name="addrHouse"
                    placeholder="Nhập địa chỉ nhà yến"
                    type="text"
                    value={formData.addrHouse}
                    onChange={handleChange}
                    required="true"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="storage">CCCD:</Label>
                  <Input
                    id="idcard"
                    name="idcard"
                    placeholder="Nhập số CMND/CCCD của chủ nhà"
                    type="text"
                    value={formData.idcard}
                    onChange={handleChange}
                    required="true"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="storage">Diện tích (m2):</Label>
                  <Input
                    id="acreageHouse"
                    name="acreageHouse"
                    placeholder="Nhập diện tích nhà yến"
                    type="text"
                    value={formData.acreageHouse}
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
