import React, { useState, useEffect } from "react";
import "./table.scss";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file;
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Datatable = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    // Extract the start and end dates from dateRange
    const startDate = dateRange[0].startDate;
    const endDate = dateRange[0].endDate;
    console.log("Start:", startDate);
    console.log("Enddate", endDate);
    if (!startDate || !endDate) {
      // Handle error or show a message to select dates
      return;
    }

    // Format the dates in 'YYYY-MM-DD' format
    const formattedStartDate = startDate;
    const formattedEndDate = endDate;

    try {
      // Make a GET request to your API
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];

      const response = await fetch(
        `https://backscan.tfdatamaster.com/api/dashboard/products?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      if (!response.ok) {
        // Handle any errors or invalid token
        console.error("Error fetching table data:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log("Respond:", data);
      setFilteredRows(data);
    } catch (error) {
      // Handle network errors
      console.error("Error fetching table data:", error);
    }
  };

  const handleFilter = () => {
    // Call fetchTableData to fetch data based on the selected date range
    fetchTableData();
  };

  const exportAsPDF = () => {
    const doc = new jsPDF();

    // Create the data for the table (excluding the subtotal)
    const tableData = filteredRows.map((row) => [
      row.qrCodeData,
      row.quantity,
      row.description,
    ]);

    // Add the table
    doc.autoTable({
      head: [["QR CodeData", "Quantity", "Description"]],
      body: tableData,
    });
    // Save the PDF
    doc.save("checkout_data.pdf");
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        View Products
        <DateRangePicker
          onChange={(item) => setDateRange([item.selection])}
          ranges={dateRange}
        />
        <button onClick={handleFilter}>Apply Filter</button>
        <button onClick={exportAsPDF}>PDF</button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>QR Code Data</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.qrCodeData}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Datatable;
