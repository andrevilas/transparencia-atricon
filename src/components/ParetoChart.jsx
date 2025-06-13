import React, { useState, lazy, Suspense } from "react";
const Plot = lazy(() => import("react-plotly.js"));
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsArrowsFullscreen, BsXLg } from "react-icons/bs"; // Bootstrap Icons

export function ParetoChart({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(prev => !prev);

  const threshold = 70;
  const deptCounts = {};

  data.forEach(row => {
    const dept = (row["Competência"] || "").trim();
    const pct = Number(row["% Atendimento"].replace(",", ".").replace("%", ""));
    if (pct < threshold) {
      deptCounts[dept] = (deptCounts[dept] || 0) + 1;
    }
  });

  const labels = Object.keys(deptCounts);
  const counts = labels.map(l => deptCounts[l]);

  const sorted = labels.map((label, idx) => ({ label, count: counts[idx] }))
    .sort((a, b) => b.count - a.count);

  const totalCount = sorted.reduce((sum, item) => sum + item.count, 0);
  let cumulativeSum = 0;
  const cumulativePercentages = sorted.map(item => {
    cumulativeSum += item.count;
    return (cumulativeSum / totalCount) * 100;
  });

  return (
    <Card
      className={`p-4 mb-4 shadow ${isExpanded ? "position-fixed top-0 start-0 w-100 h-100 z-1050 bg-white" : ""}`}
      style={{ overflowY: isExpanded ? "auto" : "visible" }}
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <Card.Title className="text-center fs-4 fw-bold w-100 mb-0">
            {`Diagrama de Pareto: Critérios Críticos por Departamento (< ${threshold}%)`}
          </Card.Title>
          <Button
            variant="outline-secondary"
            size="sm"
            className="position-absolute top-0 end-0 m-2"
            onClick={toggleExpand}
          >
            {isExpanded ? <BsXLg size={16} /> : <BsArrowsFullscreen size={16} />}
          </Button>
        </div>

        <p className="text-secondary mb-4" style={{ fontSize: "0.95rem" }}>
          O Diagrama de Pareto é utilizado aqui para evidenciar quais departamentos concentram a maior quantidade de critérios com desempenho insatisfatório em transparência. Aplicando o princípio 80/20, podemos observar que poucos departamentos podem ser responsáveis pela maior parte dos problemas, facilitando a definição de prioridades estratégicas. O gráfico combina barras (quantidade de critérios críticos) com uma linha cumulativa (% de impacto total), permitindo identificar os “poucos vitais” que merecem atenção imediata.
        </p>

        <div style={{ width: "100%", height: "100%", minHeight: 400 }}>
          <Suspense fallback={<div className="text-center">Carregando gráfico...</div>}>
          <Plot
            data={[
              {
                x: sorted.map(s => s.label),
                y: sorted.map(s => s.count),
                type: "bar",
                name: "Qtde. Critérios Críticos",
                marker: { color: "#0d6efd" },
                hoverinfo: "x+y",
              },
              {
                x: sorted.map(s => s.label),
                y: cumulativePercentages,
                type: "scatter",
                mode: "lines+markers",
                name: "Cumulativo (%)",
                yaxis: "y2",
                line: { color: "#dc3545", width: 3 },
                marker: { size: 8, color: "#dc3545" },
                hoverinfo: "x+y",
              }
            ]}
            layout={{
              autosize: true,
              height: isExpanded ? window.innerHeight - 150 : 450,
              xaxis: {
                title: "Departamento",
                tickangle: -45,
                automargin: true,
                categoryorder: "array",
                categoryarray: sorted.map(s => s.label),
              },
              yaxis: {
                title: "Quantidade de Critérios Críticos",
                side: "left",
                rangemode: "tozero",
                gridcolor: "#e9ecef",
              },
              yaxis2: {
                title: "Porcentagem Cumulativa (%)",
                overlaying: "y",
                side: "right",
                range: [0, 100],
                showgrid: false,
                tickvals: [0, 20, 40, 60, 80, 100],
              },
              margin: { t: 30, l: 60, r: 60, b: 120 },
              legend: { x: 0.05, y: 0.95 },
              plot_bgcolor: "white",
              paper_bgcolor: "white",
            }}
            config={{ responsive: true, displaylogo: false }}
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
          />
          </Suspense>
        </div>

        <p className="text-muted text-center mt-4">
          Foco nos departamentos à esquerda do gráfico pode gerar melhorias rápidas e eficazes na transparência.
        </p>
      </Card.Body>
    </Card>
  );
}
