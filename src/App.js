import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import FullLayout from "./layouts/FullLayout";
import Starter from "./views/Starter";
import Order from "./views/ui/Order";
import Process from "./views/ui/Process";
import Submit from "./views/ui/Submit";
import Done from "./views/ui/Done";
import Apply from "./views/ui/Apply";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<FullLayout />}>
            <Route path="/" element={<Starter />}/>
            <Route path="dashboard" element={<Starter />} />
            <Route path="order" element={<Order />} />
            <Route path="process" element={<Process />} />
            <Route path="submit" element={<Submit />} />
            <Route path="done" element={<Done />} />
            <Route path="apply/:orderId" element={<Apply />} />
          </Route>
        </Routes>
      </BrowserRouter> */}

      <Router>
        <Routes>
          <Route path="/" element={<FullLayout />}>
            <Route path="/" element={<Starter />} />
            <Route path="dashboard" element={<Starter />} />
            <Route path="order" element={<Order />} />
            <Route path="process" element={<Process />} />
            <Route path="submit" element={<Submit />} />
            <Route path="done" element={<Done />} />
            <Route path="apply/:orderId" element={<Apply />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
