import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/dist";

export default function Details() {
  const { productionLot } = useParams();
  const [detailsLot, setDetailsLot] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://traceability.yensaocaocapthanhdung.com.vn/api/trace/${productionLot}`
      )
      .then((response) => setDetailsLot(response.data))
      .catch((error) => console.error(error));
  }, []);

  console.log(detailsLot);
  return (
    <div>
      <h2>Details for Production Lot: {productionLot}</h2>
      <ul>
        <li>Name: {detailsLot.name}</li>
        <li>
          House Code:{" "}
          <Link to={`/details-house/${detailsLot.houseCode}`}>
            {detailsLot.houseCode}
          </Link>
        </li>
        <li>Record Retrieval: {detailsLot.recordRetrieval}</li>
        <li>Exporting Country: {detailsLot.exportingCountry}</li>
        <li>Production Date: {detailsLot.productionDate}</li>
        <li>Expiry Date: {detailsLot.expiryDate}</li>
        <li>Weight(gram): {detailsLot.weight}</li>
        <li>Storage: {detailsLot.storage}</li>
        <li>
          QR Code:
          <img src={detailsLot.qrCodeImageUrl} alt="qrcode" />
        </li>
        {/* Add additional details as needed */}
      </ul>
    </div>
  );
}
