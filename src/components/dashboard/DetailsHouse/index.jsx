import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/dist";

export default function DetailsHouse() {
  const { houseCode } = useParams();
  const [detailshouse, setDetailsHouse] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://traceability.yensaocaocapthanhdung.com.vn/api/house/${houseCode}`
      )
      .then((response) => setDetailsHouse(response.data))
      .catch((error) => console.error(error));
  }, []);

  console.log(detailshouse);
  return (
    <div>
      <h2>Details for Production Lot: {houseCode}</h2>
      <ul>
        <li>Mã nhà yến: {detailshouse.codeHouse}</li>
        <li>Chủ nhà: {detailshouse.nameHouse}</li>
        <li>CCCD: {detailshouse.idcard}</li>
        <li>Địa chỉ: {detailshouse.addrHouse}</li>
        <li>Diện tích: {detailshouse.acreageHouse}</li>
      </ul>
    </div>
  );
}
