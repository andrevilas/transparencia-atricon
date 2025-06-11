import React, { useState } from "react";
import Plot from "react-plotly.js";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsArrowsFullscreen, BsXLg } from "react-icons/bs";

export function ParetoPorConsultado({ data, threshold = 70 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(prev => !prev);

  const consultadoContagem = {};
  data.forEach((row) => {
    const consultado = (row["Consultado"] || "Outro").trim();
    const valor = Number((row["% Atendimento"] || "0").replace(",", ".").replace("%", ""));
    if (valor < threshold) {
      consultadoContagem[consultado] = (consultadoContagem[consultado] || 0) + 1;
    }
  });

  const ordenado = Object.entries(consultadoContagem).sort((a, b) => b[1] - a[1]);
  const labels = ordenado.map(([nome]) => nome);
  const valores = ordenado.map(([_, count]) => count);

  const total = valores.reduce((a, b) => a + b, 0);
  let cumulativo = 0;
  const linhaCumulativa = valores.map((val) => {
    cumulativo += val;
    return ((cumulativo / total) * 100).toFixed(1);
  });

  return (
    <Card
      className={`p-4 mb-4 shadow ${isExpanded ? "position-fixed top-0 start-0 w-100 h-100 z-1050 bg-white" : ""}`}
      style={{ overflowY: isExpanded ? "auto" : "visible" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Card.Title className="fs-4 fw-bold mb-0 text-center w-100">
          Pareto de Responsabilidade por Consultado
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

      <p className="text-muted text-center mb-4">
        Este gráfico apresenta quais responsáveis (“Consultados”) estão associados à maior quantidade de critérios com desempenho crítico em transparência (&lt; {threshold}%).
        As colunas indicam a quantidade de itens sob sua responsabilidade direta que não alcançaram o patamar mínimo, enquanto a linha azul representa o percentual cumulativo de impacto.
        <br />
        A visualização auxilia na identificação de pessoas ou áreas que concentram maior responsabilidade nas falhas detectadas, facilitando ações corretivas direcionadas.
      </p>

      <div style={{ width: "100%", height: "100%", minHeight: 400 }}>
        <Plot
          data={[
            {
              x: labels,
              y: valores,
              type: "bar",
              name: "Critérios Críticos (< " + threshold + "%)",
              marker: { color: "#ef4444" },
              hoverinfo: "x+y",
            },
            {
              x: labels,
              y: linhaCumulativa,
              type: "scatter",
              mode: "lines+markers",
              name: "Cumulativo (%)",
              yaxis: "y2",
              line: { color: "#2563eb", width: 3 },
              marker: { size: 6, color: "#2563eb" },
              hoverinfo: "x+y",
            },
          ]}
          layout={{
            autosize: true,
            height: isExpanded ? window.innerHeight - 150 : 450,
            margin: { t: 30, l: 60, r: 60, b: 120 },
            xaxis: {
              title: "Consultado",
              tickangle: -45,
              automargin: true,
              categoryorder: "array",
              categoryarray: labels,
            },
            yaxis: {
              title: "Qtd de Critérios Críticos",
              rangemode: "tozero",
              gridcolor: "#e5e7eb",
            },
            yaxis2: {
              title: "% Cumulativo",
              overlaying: "y",
              side: "right",
              range: [0, 100],
              showgrid: false,
              tickvals: [0, 20, 40, 60, 80, 100],
            },
            legend: {
              x: 0.05,
              y: 1,
              bgcolor: "rgba(255,255,255,0.9)",
              bordercolor: "#ccc",
              borderwidth: 1,
            },
            plot_bgcolor: "white",
            paper_bgcolor: "white",
            hoverlabel: {
              bgcolor: "#fff",
              bordercolor: "#ccc",
              font: { size: 12 },
            },
          }}
          config={{
            responsive: true,
            displayModeBar: false,
          }}
          useResizeHandler
          style={{ width: "100%" }}
        />
      </div>
    </Card>
  );
}
