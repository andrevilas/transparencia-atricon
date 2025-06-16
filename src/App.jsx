import React, { useState, lazy, Suspense } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Masonry from "react-masonry-css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Certifique-se de que o CSS do masonry está aqui

import { CSVUploader } from "./components/CSVUploader";
const IndicadoresCards = lazy(() => import("./components/IndicadoresCards"));
const DataTable = lazy(() => import("./components/DataTable"));
const DashboardSummary = lazy(() => import("./components/DashboardSummary"));
const SecretariaRadar = lazy(() => import("./components/SecretariaRadar"));
const ParetoChart = lazy(() => import("./components/ParetoChart"));
const ParetoPorConsultado = lazy(() => import("./components/ParetoPorConsultado"));
const BarChartAtendimento = lazy(() => import("./components/BarChartAtendimento"));
const DispersaoPorCompetencia = lazy(() => import("./components/DispersaoPorCompetencia"));
const BoxplotAtendimentoPorSecretaria = lazy(() => import("./components/BoxplotAtendimentoPorSecretaria"));

export default function App() {
  const [data, setData] = useState([]);
  const [secretaria, setSecretaria] = useState("");

  const secretarias = data.length > 0
    ? [...new Set(data.map(r => (r["Competência"] || "").split("/")[0].trim()))]
    : [];
  const secretariaSelecionada = secretaria || secretarias[0] || "";

  const breakpointColumnsObj = {
    default: 2,
    1200: 2,
    768: 1
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
        <Suspense fallback={<div className="text-center my-4">Carregando...</div>}>
          <>
          <Row className="mb-3">
            <Col>
              <IndicadoresCards data={data} />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <DashboardSummary data={data} />
            </Col>
          </Row>

          {/* Cards em layout fluido tipo Pinterest */}
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

          <Row>
            <Col>
              <DataTable data={data} />
            </Col>
          </Row>
        </>
        </Suspense>
      )}
    </Container>
  );
}
