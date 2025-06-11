import React, { useState } from "react";
import Plot from "react-plotly.js";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsArrowsFullscreen, BsXLg } from "react-icons/bs";

export function DispersaoPorCompetencia({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(prev => !prev);

  // Agrupamento de dados por Competência
  const competencias = [...new Set(data.map(row => row["Competência"]))];

  const series = competencias.map(competencia => {
    const pontos = data.filter(row => row["Competência"] === competencia);

    return {
      x: pontos.map(p => Number((p["% Atendimento"] || "0").replace(",", ".").replace("%", ""))),
      y: pontos.map(p => Number(p["Peso"] || "0")),
      text: pontos.map(p => p["Descrição"]),
      name: competencia,
      mode: "markers",
      type: "scatter",
      marker: {
        size: 10,
        opacity: 0.7,
      },
      hoverinfo: "text+x+y",
    };
  });

  return (
    <Card
      className={`p-4 shadow-sm ${isExpanded ? "position-fixed top-0 start-0 w-100 h-100 z-1050 bg-white" : "my-4"}`}
      style={{ overflowY: isExpanded ? "auto" : "visible" }}
    >
      <Card.Body>
        <div className="d-flex justify-content-center align-items-center position-relative mb-3">
          <Card.Title className="text-center fs-4 fw-bold w-100 mb-0">
            Dispersão de Critérios por Competência
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
          Este gráfico de dispersão mostra cada critério avaliado por competência, considerando
          o seu peso na composição do índice de transparência (eixo Y) e o percentual de atendimento
          (eixo X). Permite observar padrões, outliers e áreas críticas com alta ou baixa influência
          no resultado final.
        </p>

        <div style={{ width: "100%", height: "100%", minHeight: 400 }}>
          <Plot
            data={series}
            layout={{
              autosize: true,
              height: isExpanded ? window.innerHeight - 150 : 500,
              xaxis: {
                title: "% Atendimento",
                range: [0, 100],
                gridcolor: "#dee2e6",
              },
              yaxis: {
                title: "Peso do Critério",
                rangemode: "tozero",
                gridcolor: "#dee2e6",
              },
              margin: { t: 30, l: 60, r: 60, b: 60 },
              legend: { orientation: "h", y: -0.3 },
              plot_bgcolor: "white",
              paper_bgcolor: "white",
            }}
            config={{ responsive: true, displayModeBar: false }}
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <p className="text-muted text-center mt-4">
          Critérios com baixo atendimento e alto peso são pontos de atenção estratégica. A
          visualização facilita o direcionamento de esforços para os itens mais impactantes.
        </p>
      </Card.Body>
    </Card>
  );
}
