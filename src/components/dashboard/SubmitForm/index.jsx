import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { DatePicker } from "reactstrap-date-picker";

export default function FormLot() {
  const [product, setProduct] = useState([]);
  const [house, setHouse] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    houseCode: "",
    recordRetrieval: "Dán nhãn",
    exportingCountry: "Việt Nam",
    productionDate: "",
    expiryDate: "",
    productionLot: "",
    weight: 0,
    storage: "",
  });
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://traceability.yensaocaocapthanhdung.com.vn/api/product`
        );
        const data = await response.json();

        const activeProducts = data.filter((item) => item.status === "active");

        setProduct(activeProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const response = await fetch(
          `https://traceability.yensaocaocapthanhdung.com.vn/api/house`
        );
        const data = await response.json();

        const houseActive = data.filter((item) => item.status === "active");

        setHouse(houseActive);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHouse();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeProduct = (selectedProduct) => {
    const selectedProductData = product.find(
      (product) => product.productName === selectedProduct
    );
    setFormData({
      ...formData,
      name: selectedProduct,
      productName: selectedProduct,
      expiryDate: selectedProductData ? selectedProductData.expiryDate : "",
      storage: selectedProductData ? selectedProductData.storage : "",
    });
  };

  const handleChangeHouse = (selectedHouse) => {
    setFormData({
      ...formData,
      houseCode: selectedHouse,
    });
  };

  const handleDateChange = (value, formattedValue) => {
    setSelectedDate(value)
    setFormData({
      ...formData,
      productionDate: selectedDate,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Submit form data to the server using axios POST request
      await axios.post(
        "https://traceability.yensaocaocapthanhdung.com.vn/api/trace/",
        formData
      );
      console.error("Sucess:");
      // Optionally, you can reset the form after submission
      setFormData({
        name: "",
        houseCode: "",
        recordRetrieval: "",
        exportingCountry: "",
        productionDate: "",
        expiryDate: "",
        productionLot: "",
        weight: 0,
        storage: "",
      });
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenHouse, setDropdownOpenHouse] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleDropdownHouse = () => {
    setDropdownOpenHouse(!dropdownOpenHouse);
  };



  return (
    // <div>
    //   <h2>Submit New Product</h2>
    //   <form onSubmit={handleSubmit}>
    //     <label>Name:</label>
    //     <input type="text" name="name" value={formData.name} onChange={handleChange} required />

    //     <label>House Code:</label>
    //     <input type="text" name="houseCode" value={formData.houseCode} onChange={handleChange} required />

    //     <label>Record Retrieval:</label>
    //     <input type="text" name="recordRetrieval" value={formData.recordRetrieval} onChange={handleChange} required />

    //     <label>Exporting Country:</label>
    //     <input type="text" name="exportingCountry" value={formData.exportingCountry} onChange={handleChange} required />

    //     <label>Production Date:</label>
    //     <input type="date" name="productionDate" value={formData.productionDate} onChange={handleChange} required />

    //     <label>Expiry Date:</label>
    //     <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />

    //     <label>Weight:</label>
    //     <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />

    //     <label>Storage:</label>
    //     <input type="text" name="storage" value={formData.storage} onChange={handleChange} required />

    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
    <>
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
                    {/* <Input
                      id="productName"
                      name="productName"
                      placeholder="Nhập tên sản phẩm"
                      type="text"
                      value={formData.productName}
                      onChange={handleChange}
                      required
                    >
                    <option value="">Select a product</option>
                    {product.map((productItem) => (
                      <option key={productItem.productId} value={productItem.productName}>
                        {productItem.productName}
                      </option>
                    ))}
                    </Input> */}
                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                      <DropdownToggle caret>
                        {formData.productName
                          ? formData.productName
                          : "Select a product"}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Options</DropdownItem>
                        {product.map((productItem) => (
                          <DropdownItem
                            key={productItem._id}
                            onClick={() =>
                              handleChangeProduct(productItem.productName)
                            }
                          >
                            {productItem.productName}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
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

                <Col md={4}>
                  <FormGroup>
                    <Label for="houseCode">Mã nhà yến:</Label>
                    <Dropdown
                      isOpen={dropdownOpenHouse}
                      toggle={toggleDropdownHouse}
                    >
                      <DropdownToggle caret>
                        {formData.houseCode
                          ? formData.houseCode
                          : "Chọn mã nhà yến"}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Options</DropdownItem>
                        {house.map((houseItem) => (
                          <DropdownItem
                            key={houseItem._id}
                            onClick={() =>
                              handleChangeHouse(houseItem.codeHouse)
                            }
                          >
                            {houseItem.codeHouse}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </FormGroup>
                </Col>

                <Col md={4}>
                  <FormGroup>
                    <Label for="houseCode">Ngày sản xuất:</Label>
                    <DatePicker
                      value={selectedDate}
                      onChange={handleDateChange}
                      dateFormat="YYYY-MM-DD"
                      maxDate={new Date()} // Optionally set a maximum date
                      placeholder="Chọn ngày sản xuất"
                    />
                  </FormGroup>
                </Col>

                <Col md={4}>
                  <FormGroup>
                    <Label for="weight">Khổi lượng:</Label>
                    <Input
                      id="weight"
                      name="weight"
                      placeholder="Trong lượng lô sản xuất (gram)"
                      type="text"
                      value={formData.weight}
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
    </>
  );
}
