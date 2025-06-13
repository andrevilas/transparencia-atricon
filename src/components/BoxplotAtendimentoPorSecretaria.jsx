import React, { useState, lazy, Suspense } from "react";
const Plot = lazy(() => import("react-plotly.js"));
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsArrowsFullscreen, BsXLg } from "react-icons/bs";

// Extrai a secretaria principal
function secretariaMae(nome) {
  if (!nome) return "Outro";
  return nome.split("/")[0].trim();
}

export function BoxplotAtendimentoPorSecretaria({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(prev => !prev);

  // Agrupamento por secretaria
  const secretariaMap = {};

  data.forEach(row => {
    const sec = secretariaMae(row["Competência"]);
    const pct = Number((row["% Atendimento"] || "0").replace(",", ".").replace("%", ""));
    if (!secretariaMap[sec]) secretariaMap[sec] = [];
    secretariaMap[sec].push(pct);
  });

  const boxData = Object.entries(secretariaMap).map(([sec, valores]) => ({
    y: valores,
    name: sec,
    type: "box",
    boxpoints: "outliers",
    marker: { color: "#0d6efd" },
    line: { color: "#0d6efd" },
    hoverinfo: "y+name",
  }));

  return (
    <Card
      className={`p-4 shadow-sm ${isExpanded ? "position-fixed top-0 start-0 w-100 h-100 z-1050 bg-white" : "my-4"}`}
      style={{ overflowY: isExpanded ? "auto" : "visible" }}
    >
      <Card.Body>
        <div className="d-flex justify-content-center align-items-center position-relative mb-3">
          <Card.Title className="text-center fs-4 fw-bold w-100 mb-0">
            Distribuição de Atendimento por Secretaria
          </Card.Title>
          <Button
            variant="outline-secondary"
            size="sm"
            className="position-absolute top-0 end-0 m-2"
            onClick={toggleExpand}
            title={isExpanded ? "Fechar" : "Expandir"}
          >
            {isExpanded ? <BsXLg size={16} /> : <BsArrowsFullscreen size={16} />}
          </Button>
        </div>

        <p className="text-muted text-center mb-4">
          O boxplot exibe a distribuição dos percentuais de atendimento aos critérios de transparência
          por secretaria. Ele permite identificar a variabilidade, mediana e possíveis outliers em cada área.
        </p>

        <div style={{ width: "100%", height: "100%", minHeight: 400 }}>
          <Suspense fallback={<div className="text-center">Carregando gráfico...</div>}>
          <Plot
            data={boxData}
            layout={{
              autosize: true,
              height: isExpanded ? window.innerHeight - 150 : 500,
              yaxis: {
                title: "% Atendimento",
                range: [0, 100],
                gridcolor: "#e9ecef",
              },
              xaxis: {
                title: "Secretaria",
                automargin: true,
              },
              margin: { t: 30, l: 60, r: 40, b: 100 },
              plot_bgcolor: "white",
              paper_bgcolor: "white",
              boxmode: "group",
            }}
            config={{ responsive: true, displayModeBar: false }}
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
          />
          </Suspense>
        </div>

        <p className="text-muted text-center mt-4">
          Secretarias com menor mediana ou maior dispersão indicam desafios na padronização da transparência.
          Este gráfico ajuda a priorizar melhorias internas por departamento.
        </p>
      </Card.Body>
    </Card>
  );
}
