import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

export default function HouseList() {
  const [activeProducts, setActiveProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalRows, setTotalRows] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://traceability.yensaocaocapthanhdung.com.vn/api/house?page=${page}&limit=${limit}`
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
    { name: "Mã nhà yến:", selector: "codeHouse", sortable: true },
    { name: "Tên chủ nhà:", selector: "nameHouse", sortable: true },
    { name: "CCCD:", selector: "idcard", sortable: true },
    { name: "Địa chỉ:", selector: "addrHouse", sortable: true },
    { name: "Diện tích:", selector: "acreageHouse", sortable: true },
  ];

  return (
    <>
      <DataTable
        title="Danh sách nhà yến"
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
