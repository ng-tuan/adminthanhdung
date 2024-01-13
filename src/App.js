import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import DetailsHouse from "./components/dashboard/DetailsHouse";
import Details from "./components/dashboard/DetailsLot";
import HouseData from "./components/dashboard/House";
import ProductData from "./components/dashboard/Product";
import FormLot from "./components/dashboard/SubmitForm";
import TableData from "./components/dashboard/TableData";
import FullLayout from "./layouts/FullLayout";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<FullLayout />}>
            <Route path="/" element={<TableData />} />
            <Route path="dashboard" element={<TableData />} />
            <Route
              path="/production-lot/:productionLot"
              element={<Details />}
            />
            <Route
              path="/details-house/:houseCode"
              element={<DetailsHouse />}
            />
            <Route path="product" element={<ProductData />} />
            <Route path="house" element={<HouseData />} />
            <Route path="add" element={<FormLot />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
