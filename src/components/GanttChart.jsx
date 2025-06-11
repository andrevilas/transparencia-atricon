import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Chart } from "react-google-charts";
import { BsArrowsFullscreen, BsXLg } from "react-icons/bs";

export const data = [
  [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ],
  ["T1", "Garantir acesso visível ao portal da transparência (Critério 1.3)", null, new Date(2025, 5, 1), new Date(2025, 5, 3), null, 0, null],
  ["T2", "Implementar ferramenta de busca no portal (Critério 1.4)", null, new Date(2025, 5, 3), new Date(2025, 5, 6), null, 0, null],
  ["T3", "Publicar estrutura organizacional (Critério 2.1)", null, new Date(2025, 5, 6), new Date(2025, 5, 7), null, 0, null],
  ["T4", "Publicar competências e atribuições (Critério 2.2)", null, new Date(2025, 5, 7), new Date(2025, 5, 8), null, 0, null],
  ["T5", "Publicar responsáveis pela gestão (Critério 2.3)", null, new Date(2025, 5, 8), new Date(2025, 5, 9), null, 0, null],
  ["T6", "Publicar endereços, contatos e e-mails institucionais (Critério 2.4)", null, new Date(2025, 5, 9), new Date(2025, 5, 10), null, 0, null],
  ["T7", "Publicar horário de atendimento (Critério 2.5)", null, new Date(2025, 5, 10), new Date(2025, 5, 11), null, 0, null],
  ["T8", "Criar e publicar seção de perguntas frequentes (Critério 2.7)", null, new Date(2025, 5, 11), new Date(2025, 5, 13), null, 0, null],
  ["T9", "Publicar PPA com anexos (Critério 11.8)", null, new Date(2025, 5, 13), new Date(2025, 5, 15), null, 0, null],
  ["T10", "Publicar LDO com anexos (Critério 11.9)", null, new Date(2025, 5, 15), new Date(2025, 5, 17), null, 0, null],
  ["T11", "Publicar LOA com anexos (Critério 11.10)", null, new Date(2025, 5, 17), new Date(2025, 5, 19), null, 0, null],
  ["T12", "Publicar transferências recebidas (Critério 5.1)", null, new Date(2025, 5, 19), new Date(2025, 5, 21), null, 0, null],
  ["T13", "Publicar prestação de contas (Critérios 11.1 e 12.9)", null, new Date(2025, 5, 21), new Date(2025, 5, 23), null, 0, null],
  ["T14", "Publicar relatórios de gestão (Critérios 11.2 e 13.1)", null, new Date(2025, 5, 23), new Date(2025, 5, 25), null, 0, null],
  ["T15", "Publicar julgamento do TCE (11.3 e 13.2)", null, new Date(2025, 5, 25), new Date(2025, 5, 27), null, 0, null],
  ["T16", "Publicar julgamento do Legislativo (11.4 e 13.3)", null, new Date(2025, 5, 27), new Date(2025, 5, 28), null, 0, null],
  ["T17", "Publicar ordem cronológica de pagamentos (9.4 e 12.4)", null, new Date(2025, 5, 28), new Date(2025, 5, 30), null, 0, null],
  ["T18", "Implementar setor SIC (Critério 14.3)", null, new Date(2025, 6, 1), new Date(2025, 6, 2), null, 0, null],
  ["T19", "Publicar contatos do SIC (Critério 15.1)", null, new Date(2025, 6, 2), new Date(2025, 6, 3), null, 0, null],
  ["T20", "Publicar normativa da LAI (Critério 15.2)", null, new Date(2025, 6, 3), new Date(2025, 6, 4), null, 0, null],
  ["T21", "Publicar documentos sigilosos (Critério 15.4)", null, new Date(2025, 6, 4), new Date(2025, 6, 6), null, 0, null],
  ["T22", "Publicar docs desclassificados (Critério 15.5)", null, new Date(2025, 6, 6), new Date(2025, 6, 8), null, 0, null],
  ["T23", "Publicar atendimento da Ouvidoria (Critério 15.6)", null, new Date(2025, 6, 8), new Date(2025, 6, 10), null, 0, null],
  ["T24", "Publicar Carta de Serviços (Critério 16.2)", null, new Date(2025, 6, 10), new Date(2025, 6, 11), null, 0, null],
  ["T25", "Publicar encarregado LGPD (Critério 16.3)", null, new Date(2025, 6, 11), new Date(2025, 6, 13), null, 0, null],
  ["T26", "Publicar Política de Privacidade (Critério 17.1)", null, new Date(2025, 6, 13), new Date(2025, 6, 15), null, 0, null],
  ["T27", "Habilitar acesso automatizado (Critério 17.2)", null, new Date(2025, 6, 15), new Date(2025, 6, 17), null, 0, null],
  ["T28", "Publicar plano de saúde (Critério 20.4)", null, new Date(2025, 6, 17), new Date(2025, 6, 19), null, 0, null],
  ["T29", "Publicar serviços de saúde (Critério 20.5)", null, new Date(2025, 6, 19), new Date(2025, 6, 21), null, 0, null],
  ["T30", "Publicar medicamentos SUS (Critério 20.6)", null, new Date(2025, 6, 21), new Date(2025, 6, 23), null, 0, null],
  ["T31", "Publicar plano de educação (Critério 20.7)", null, new Date(2025, 6, 23), new Date(2025, 6, 26), null, 0, null],
  ["T32", "Publicar lista de espera em creches (Critério 20.8)", null, new Date(2025, 6, 26), new Date(2025, 6, 30), null, 0, null]
];

export const options = {
  height: 600,
  gantt: {
    trackHeight: 30,
    labelStyle: {
      fontSize: 11
    },
    labelMaxWidth: 500
  },
};

export function GanttChart() {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(prev => !prev);

  return (
    <Card className={`shadow-sm ${isExpanded ? "position-fixed top-0 start-0 w-100 h-100 z-1050 bg-white" : ""}`} style={{ overflowY: isExpanded ? "auto" : "visible" }}>
      <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
        <span>Cronograma de Execução do Projeto</span>
        <Button variant="outline-light" size="sm" onClick={toggleExpand}>
          {isExpanded ? <BsXLg size={16} /> : <BsArrowsFullscreen size={16} />}
        </Button>
      </Card.Header>
      <Card.Body>
        <Chart
          chartType="Gantt"
          width="100%"
          height={isExpanded ? "90vh" : "700px"}
          data={data}
          options={options}
        />
      </Card.Body>
    </Card>
  );
}