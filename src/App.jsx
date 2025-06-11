import { useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Masonry from "react-masonry-css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { CSVUploader } from "./components/CSVUploader";
import { IndicadoresCards } from "./components/IndicadoresCards";
import { DataTable } from "./components/DataTable";
import { DashboardSummary } from "./components/DashboardSummary";
import { SecretariaRadar } from "./components/SecretariaRadar";
import { ParetoChart } from "./components/ParetoChart";
import { ParetoPorConsultado } from "./components/ParetoPorConsultado";
import { BarChartAtendimento } from "./components/BarChartAtendimento";
import { DispersaoPorCompetencia } from "./components/DispersaoPorCompetencia";
import { BoxplotAtendimentoPorSecretaria } from "./components/BoxplotAtendimentoPorSecretaria";
import { GanttChart } from "./components/GanttChart"; // componente novo

export default function App() {
  const [data, setData] = useState([]);
  const [secretaria, setSecretaria] = useState("");
  const [showGantt, setShowGantt] = useState(false);

  const tableRef = useRef(null);

  const secretarias = data.length > 0
    ? [...new Set(data.map(r => (r["Competência"] || "").split("/")[0].trim()))]
    : [];
  const secretariaSelecionada = secretaria || secretarias[0] || "";

  const breakpointColumnsObj = {
    default: 2,
    1200: 2,
    768: 1
  };

  const scrollToTable = () => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Container fluid className="bg-light min-vh-100 py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="display-4 fw-bold text-center text-primary mb-0">
            Painel de Transparência Municipal
          </h1>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <CSVUploader onDataLoaded={setData} />
        </Col>
      </Row>

      {data.length > 0 && (
        <>
          <Row className="mb-3">
            <Col>
              <IndicadoresCards data={data} onClickCard={scrollToTable}/>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <DashboardSummary data={data} onClickCard={scrollToTable}/>
            </Col>
          </Row>

          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            <Card className="shadow">
              <Card.Body className="p-3">
                <SecretariaRadar data={data} secretaria={secretariaSelecionada} />
              </Card.Body>
            </Card>

            <Card className="shadow">
              <Card.Body className="p-3">
                <ParetoChart data={data} threshold={70} />
              </Card.Body>
            </Card>

            <Card className="shadow">
              <Card.Body className="p-3">
                <ParetoPorConsultado data={data} threshold={70} />
              </Card.Body>
            </Card>

            <Card className="shadow">
              <Card.Body className="p-3">
                <BarChartAtendimento data={data} threshold={70} />
              </Card.Body>
            </Card>

            <Card className="shadow">
              <Card.Body className="p-3">
                <DispersaoPorCompetencia data={data} threshold={70} />
              </Card.Body>
            </Card>

            <Card className="shadow">
              <Card.Body className="p-3">
                <BoxplotAtendimentoPorSecretaria data={data} threshold={70} />
              </Card.Body>
            </Card>
          </Masonry>

          <Row className="mt-4 mb-2" ref={tableRef}>
            <Col>
              <DataTable data={data} />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col className="text-center">
              <Button variant="primary" onClick={() => setShowGantt(!showGantt)}>
                {showGantt ? "Ocultar Cronograma" : "Exibir Cronograma"}
              </Button>
            </Col>
          </Row>

          {showGantt && (
            <Row className="mb-4">
              <Col>
                <GanttChart />
              </Col>
            </Row>
          )}
        </>
      )}
    </Container>
  );
}
