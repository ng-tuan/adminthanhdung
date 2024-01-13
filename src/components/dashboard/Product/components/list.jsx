import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [activeProducts, setActiveProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalRows, setTotalRows] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://traceability.yensaocaocapthanhdung.com.vn/api/product?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      setActiveProducts(data);
      setTotalRows(data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const paginationItems = [];
  for (let i = 1; i <= Math.ceil(12 / limit); i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === page}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  console.log(totalRows);
  useEffect(() => {
    fetchData();
  }, [page, limit]);

  console.log(activeProducts);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    //fetchData()
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    //setPage(1); // Reset page when changing the limit
    //fetchData()
  };

  const columns = [
    { name: "Sản phẩm", selector: "productName", sortable: true },
    { name: "Hạn sử dụng", selector: "expiryDate", sortable: true },
    { name: "Bảo quản", selector: "storage", sortable: true },

   
  ];

  return (
    <>
      <DataTable
        title="Danh sách sản phẩm"
        columns={columns}
        data={activeProducts}
        pagination
        paginationPerPage={limit}
        paginationRowsPerPageOptions={[5, 10, 15]}
        paginationTotalRows={totalRows}
        paginationServer
        onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
          handleLimitChange(currentRowsPerPage);
          handlePageChange(currentPage);
        }}
        onChangePage={(currentPage) => handlePageChange(currentPage)}
      />
    </>
  );
}
