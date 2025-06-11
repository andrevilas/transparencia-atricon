import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { XCircle, AlertTriangle, CheckCircle, ListChecks } from "lucide-react";
// Se quiser pode usar ícones do react-icons/bs para um visual ainda mais Bootstrap

export function IndicadoresCards({ data, onClickCard }) {
  const valores = data.map(row =>
    Number((row["% Atendimento"] || "0").replace(",", ".").replace("%", ""))
  );
  const total = valores.length;

  const naoAtendidos = valores.filter(v => v === 0).length;
  const parcialmente = valores.filter(v => v > 0 && v < 100).length;
  const atendidos = valores.filter(v => v === 100).length;

  return (
    <Row className="mb-4 g-4">
      <Col xs={12} md={6} xl={3}>
        <Card
          bg="danger"
          text="white"
          className="text-center shadow h-100"
          onClick={onClickCard}
          style={{ cursor: "pointer" }}
        >
          <Card.Body>
            <XCircle size={42} className="mb-2" />
            <Card.Title className="display-4 fw-bold">{naoAtendidos}</Card.Title>
            <Card.Text className="fs-5">Não atendidos</Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Col xs={12} md={6} xl={3}>
        <Card
          bg="warning"
          text="dark"
          className="text-center shadow h-100"
          onClick={onClickCard}
          style={{ cursor: "pointer" }}
        >
          <Card.Body>
            <AlertTriangle size={42} className="mb-2" />
            <Card.Title className="display-4 fw-bold">{parcialmente}</Card.Title>
            <Card.Text className="fs-5">Parcialmente atendidos</Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Col xs={12} md={6} xl={3}>
        <Card
          bg="success"
          text="white"
          className="text-center shadow h-100"
          onClick={onClickCard}
          style={{ cursor: "pointer" }}
        >
          <Card.Body>
            <CheckCircle size={42} className="mb-2" />
            <Card.Title className="display-4 fw-bold">{atendidos}</Card.Title>
            <Card.Text className="fs-5">Atendidos</Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Col xs={12} md={6} xl={3}>
        <Card
          bg="secondary"
          text="white"
          className="text-center shadow h-100"
          onClick={onClickCard}
          style={{ cursor: "pointer" }}
        >
          <Card.Body>
            <ListChecks size={42} className="mb-2" />
            <Card.Title className="display-4 fw-bold">{total}</Card.Title>
            <Card.Text className="fs-5">Total de itens</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
