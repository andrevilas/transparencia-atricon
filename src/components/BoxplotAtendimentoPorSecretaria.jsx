import React, { useState } from "react";
import Plot from "react-plotly.js";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsArrowsFullscreen, BsXLg } from "react-icons/bs";

export function BoxplotAtendimentoPorSecretaria({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(prev => !prev);

  // Agrupa os valores de % Atendimento por Competência completa
  const grupos = {};
  data.forEach(row => {
    const competencia = (row["Competência"] || "Outro").trim();
    const valor = Number((row["% Atendimento"] || "0").replace(",", ".").replace("%", ""));
    if (!grupos[competencia]) grupos[competencia] = [];
    grupos[competencia].push(valor);
  });

  // Cria os traces do boxplot
  const boxplots = Object.entries(grupos).map(([departamento, valores]) => ({
    y: valores,
    name: departamento,
    type: "box",
    boxpoints: "outliers",
    marker: { color: "#0d6efd" },
    line: { width: 2 },
    nameformat: departamento,
  }));

  return (
    <Card
      className={`p-4 shadow-sm ${isExpanded ? "position-fixed top-0 start-0 w-100 h-100 z-1050 bg-white" : "my-4"}`}
      style={{ overflowY: isExpanded ? "auto" : "visible" }}
    >
      <Card.Body>
        <div className="d-flex justify-content-center align-items-center position-relative mb-3">
          <Card.Title className="text-center fs-4 fw-bold w-100 mb-0">
            Distribuição de Atendimento por Departamento
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
          O gráfico boxplot permite visualizar como os percentuais de atendimento aos critérios de transparência estão distribuídos entre os departamentos. Ele destaca a mediana, a dispersão e os possíveis outliers. Departamentos com caixas altas e estreitas indicam desempenho consistente, enquanto caixas mais baixas ou longas indicam maior variabilidade. Pontos isolados representam desvios.
        </p>

        <div style={{ width: "100%", height: "100%", minHeight: 400 }}>
          <Plot
            data={boxplots}
            layout={{
              autosize: true,
              height: isExpanded ? window.innerHeight - 150 : 600,
              boxmode: "group",
              yaxis: {
                title: "% Atendimento",
                range: [0, 100],
                tickvals: [0, 20, 40, 60, 80, 100],
                gridcolor: "#e9ecef",
              },
              xaxis: {
                tickangle: -45,
                automargin: true,
              },
              margin: { t: 30, l: 60, r: 60, b: 150 },
              plot_bgcolor: "white",
              paper_bgcolor: "white",
              showlegend: false,
            }}
            config={{ responsive: true, displaylogo: false }}
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <p className="text-muted text-center mt-4">
          Departamentos com maior variabilidade ou desempenho mediano mais baixo são bons candidatos para diagnósticos aprofundados e ações de melhoria.
        </p>
      </Card.Body>
    </Card>
  );
}
