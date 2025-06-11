import React from "react";
import Papa from "papaparse";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function CSVUploader({ onDataLoaded }) {
  function handleFile(e) {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        onDataLoaded(results.data);
      },
    });
  }

  return (
    <Form className="mb-4">
      <Form.Group controlId="csvFileInput">
        <Form.Label className="fw-semibold mb-2">Selecione o arquivo CSV:</Form.Label>
        <Form.Control
          type="file"
          accept=".csv"
          onChange={handleFile}
          className="mb-2"
        />
      </Form.Group>
    </Form>
  );
}
