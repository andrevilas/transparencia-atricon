import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { RadarChart } from "@mui/x-charts/RadarChart";
import { BsArrowsFullscreen, BsXLg } from "react-icons/bs";

// Helper para pegar secretaria principal
function secretariaMae(nome) {
  if (!nome) return "Outro";
  return nome.split("/")[0].trim();
}

export function SecretariaRadar({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(prev => !prev);

  const secretarias = [...new Set(data.map(r => secretariaMae(r["Competência"])))];

  const secretariaMedias = secretarias.map(sec => {
    const valores = data
      .filter(r => secretariaMae(r["Competência"]) === sec)
      .map(r => Number((r["% Atendimento"] || "0").replace(",", ".").replace("%", "")));
    const media = valores.length
      ? valores.reduce((a, b) => a + b, 0) / valores.length
      : 0;
    return { secretaria: sec, media: Number(media.toFixed(1)) };
  });

  return (
    <Card
      className={`p-4 mb-4 shadow ${isExpanded ? "position-fixed top-0 start-0 w-100 h-100 z-1050 bg-white" : ""}`}
      style={{ overflowY: isExpanded ? "auto" : "visible" }}
    >
      <div className="d-flex justify-content-between align-items-center mt-4">
        <Card.Title className="fs-4 fw-bold mb-0 text-center w-100">
          Radar de Transparência das Secretarias
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
      <p className="text-muted text-center mt-4">
        O gráfico radar apresenta a média de atendimento dos critérios de transparência
        para cada secretaria da Prefeitura. Ele permite identificar de forma rápida
        quais áreas estão mais próximas ou distantes da excelência no cumprimento dos requisitos.
      </p>

      <div style={{ width: "100%", height: "100%", minHeight: 400 }}>
        <RadarChart
          height={isExpanded ? window.innerHeight - 200 : 400}
          series={[
            {
              data: secretariaMedias.map(s => s.media),
              label: "Transparência média (%)",
              color: "#0d6efd"
            }
          ]}
          radar={{
            metrics: secretariaMedias.map(s => s.secretaria)
          }}
          valueFormatter={v => `${v}%`}
          grid={{
            radialLine: { stroke: "#bbb" },
            circularLine: { stroke: "#ddd" }
          }}
          axis={{
            min: 0,
            max: 100,
            tickLabel: { fontSize: 12 }
          }}
        />
      </div>

      <p className="text-muted text-center mt-4">
        Secretarias com pontuação mais alta no radar estão mais alinhadas às exigências de transparência.
        A visualização facilita o planejamento de melhorias específicas por área.
      </p>
    </Card>
  );
}
