import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export default function TableData() {
  const [activeProducts, setActiveProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const nav = useNavigate()

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://traceability.yensaocaocapthanhdung.com.vn/api/trace?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      const dataReverse = data.reverse()

      setActiveProducts(dataReverse);
      setTotalRows(data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const paginationItems = [];
  // for (let i = 1; i <= Math.ceil(10 / limit); i++) {
  //   paginationItems.push(
  //     <Pagination.Item
  //       key={i}
  //       active={i === page}
  //       onClick={() => handlePageChange(i)}
  //     >
  //       {i}
  //     </Pagination.Item>
  //   );
  // }

  console.log(totalRows);
  useEffect(() => {
    fetchData();
  }, [page, limit]);

  console.log(activeProducts);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchData()
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1); // Reset page when changing the limit
    fetchData()
  };

  const columns = [
    { name: "Name", selector: "name", sortable: true },
    {
      name: "House Code",
      selector: "houseCode",
      sortable: true,
      cell: (row) => (
        <Link to={`/details-house/${row.houseCode}`}>
          {row.productionLot}
        </Link>
      ),
    },
    { name: "Record Retrieval", selector: "recordRetrieval", sortable: true },
    { name: "Exporting Country", selector: "exportingCountry", sortable: true },
    { name: "Production Date", selector: "productionDate", sortable: true },
    { name: "Expiry Date", selector: "expiryDate", sortable: true },
    {
      name: "Production Lot",
      selector: "productionLot",
      sortable: true,
      cell: (row) => (
        <Link to={`/production-lot/${row.productionLot}`}>
          {row.productionLot}
        </Link>
      ),
    },
    { name: "Weight(gram)", selector: "weight", sortable: true },
    { name: "Storage", selector: "storage", sortable: true },
    {
      name: "QC",
      selector: "qrCodeImageUrl",
      sortable: true,
      cell: (row) => <img src={row.qrCodeImageUrl} style={{ width: "80%" }} />,
    },
  ];

  const addLot = () => {
    nav('add')
  }

  return (
    <>
      <DataTable
        title="Danh sách lô hàng"
        columns={columns}
        data={activeProducts}
        pagination
        paginationPerPage={limit}
        paginationRowsPerPageOptions={[10, 20, 30]}
        paginationTotalRows={100}
        paginationServer
        onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
          handleLimitChange(currentRowsPerPage);
          handlePageChange(currentPage);
        }}
        onChangePage={(currentPage) => handlePageChange(currentPage)}
      />
       <Button onClick={addLot}>Thêm lô hàng</Button>
    </>
  );
}
