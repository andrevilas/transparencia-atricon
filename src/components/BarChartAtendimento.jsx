import React, { useState } from "react";
import Plot from "react-plotly.js";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsArrowsFullscreen, BsXLg } from "react-icons/bs";

// Função auxiliar para extrair o nome do departamento
function getDepartmentOrSecretaria(nome, full = true) {
    if (!nome) return "Não Definido";
    return full ? nome.trim() : nome.split("/")[0].trim();
}

export function BarChartAtendimento({ data }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded(prev => !prev);

    // Cálculo da média de atendimento por departamento
    const departmentData = {};
    data.forEach(row => {
        const dept = getDepartmentOrSecretaria(row["Competência"], true);
        const pct = Number((row["% Atendimento"] || "0").replace(",", ".").replace("%", ""));
        if (!departmentData[dept]) departmentData[dept] = { sum: 0, count: 0 };
        departmentData[dept].sum += pct;
        departmentData[dept].count += 1;
    });

    const departmentAverages = Object.entries(departmentData).map(([dept, { sum, count }]) => ({
        department: dept,
        average: Number((sum / count).toFixed(1)),
    }));

    const sorted = departmentAverages.sort((a, b) => a.average - b.average);

    return (
        <Card
            className={`p-4 mb-4 shadow ${isExpanded ? "position-fixed top-0 start-0 w-100 h-100 z-1050 bg-white" : ""}`}
            style={{ overflowY: isExpanded ? "auto" : "visible" }}
        >
            {/* Cabeçalho com título centralizado e botão no canto superior direito */}
            <div className="d-flex justify-content-center align-items-center position-relative mb-3">
                <Card.Title className="text-center fs-4 fw-bold w-100 mb-0">
                    Média de Transparência por Departamento
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
                Este gráfico de barras horizontais exibe a média do percentual de atendimento
                dos critérios de transparência para cada Departamento. Ele permite uma
                comparação clara e direta do desempenho médio entre os departamentos.
            </p>

            <div style={{ width: "100%", height: "100%", minHeight: 400 }}>
                <Plot
                    data={[
                        {
                            x: sorted.map(d => d.average),
                            y: sorted.map(d => d.department),
                            type: "bar",
                            orientation: "h",
                            name: "Média de Atendimento (%)",
                            marker: { color: "#198754" },
                            hoverinfo: "x+y",
                            text: sorted.map(d => `${d.average}%`),
                            textposition: "outside",
                            textfont: { size: 10 },
                        },
                    ]}
                    layout={{
                        autosize: true,
                        height: isExpanded ? window.innerHeight - 150 : 600,
                        xaxis: {
                            title: "Média de Atendimento (%)",
                            range: [0, 100],
                            tickvals: [0, 20, 40, 60, 80, 100],
                            gridcolor: "#dee2e6",
                            zeroline: false,
                        },
                        yaxis: {
                            title: "Departamento",
                            automargin: true,
                            categoryorder: "array",
                            categoryarray: sorted.map(d => d.department),
                        },
                        margin: { t: 30, l: 200, r: 60, b: 60 },
                        plot_bgcolor: "white",
                        paper_bgcolor: "white",
                    }}
                    config={{ responsive: true, displaylogo: false }}
                    useResizeHandler
                    style={{ width: "100%", height: "100%" }}
                />
            </div>

            <p className="text-muted text-center mt-4">
                Departamentos com barras mais longas (à direita) demonstram melhor desempenho.
                Esta visualização facilita a priorização de ações corretivas com base em evidências.
            </p>
        </Card>
    );
}
