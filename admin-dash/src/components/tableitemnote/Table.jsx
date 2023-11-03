import React, { useState, useEffect } from "react";
import "./table.scss";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const DatatableItemnote = () => {
  const [qrCodeData, setQrCodeData] = useState("100.100.6SN6.R");
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    // Initially, load data for an empty QR Code Data.
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    if (!qrCodeData) {
      return;
    }

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];

      // Construct the API URL with the provided QR Code Data and date range.
      const apiUrl = `https://backscan.tfdatamaster.com/api/dashboard/qritemdata?qrCodeData=${qrCodeData}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      console.log("Data", response);

      if (!response.ok) {
        console.error("Error fetching table data:", response.statusText);
        return;
      }

      const data = await response.json();
      setAllData(data);
      setFilteredRows(data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const handleFilter = () => {
    filterDataByDate();
  };

  const filterDataByDate = () => {
    if (!selectedDate) {
      setFilteredRows(allData);
    } else {
      const filteredData = allData.filter((row) => {
        const rowDate = new Date(row.date);
        return rowDate.toDateString() === selectedDate.toDateString();
      });
      setFilteredRows(filteredData);
    }
  };

  const handleFind = () => {
    // Make a GET request to the endpoint using qrCodeData
    fetchTableData();
  };

  const exportAsPDF = () => {
    const doc = new jsPDF();
    const tableData = filteredRows.map((row) => [
      row.qrCodeData,
      row.quantity,
      row.description,
      new Date(row.date).toLocaleDateString(),
      row.note,
    ]);

    doc.autoTable({
      head: [["QR CodeData", "Quantity", "Description", "Date", "Note"]],
      body: tableData,
    });
    doc.save("checkout_data.pdf");
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        View Product Note
        <input
          type="text"
          placeholder="QR Code Data"
          value={qrCodeData}
          onChange={(e) => setQrCodeData(e.target.value)}
        />
        <button onClick={handleFind}>Find</button>
        <DateRangePicker
          onChange={(item) => setSelectedDate(item.selection.startDate)}
          ranges={[
            {
              startDate: selectedDate,
              endDate: selectedDate,
              key: "selection",
            },
          ]}
        />
        <button onClick={handleFilter}>Filter</button>
        <button onClick={exportAsPDF}>PDF</button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>QR Code Data</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.qrCodeData}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.note}</TableCell>
                <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DatatableItemnote;
