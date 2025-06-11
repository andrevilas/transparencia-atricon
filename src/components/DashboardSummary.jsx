import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function DashboardSummary({ data }) {
  // Média geral
  const medias = data.map(row =>
    Number((row["% Atendimento"] || "0").replace(",", ".").replace("%", ""))
  );
  const mediaGeral = (medias.reduce((a, b) => a + b, 0) / medias.length).toFixed(1);

  // Total de críticos (<70%)
  const criticos = medias.filter(m => m < 70).length;

  return (
    <Row className="mb-4 g-4">
      <Col xs={12} md={6}>
        <Card bg="success" text="white" className="text-center shadow">
          <Card.Body>
            <Card.Title className="display-5 fw-bold">{mediaGeral}%</Card.Title>
            <Card.Text className="fs-5">Média geral de atendimento</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={6}>
        <Card bg="danger" text="white" className="text-center shadow">
          <Card.Body>
            <Card.Title className="display-5 fw-bold">{criticos}</Card.Title>
            <Card.Text className="fs-5">Critérios abaixo de 70%</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
