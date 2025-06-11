import React, { useMemo, useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    flexRender,
} from "@tanstack/react-table";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsArrowsFullscreen, BsXLg } from "react-icons/bs";

export function DataTable({ data }) {
    const [columnFilters, setColumnFilters] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded(prev => !prev);

    const columns = useMemo(
        () =>
            data[0]
                ? Object.keys(data[0]).map(col => ({
                    header: col,
                    accessorKey: col,
                    cell: info => info.getValue(),
                    filterFn: "includesString",
                }))
                : [],
        [data]
    );

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    if (!data.length) return null;

    return (
        <Card
            className={`p-4 shadow-sm border-0 bg-white ${isExpanded ? "position-fixed top-0 start-0 w-100 h-100 z-1050" : "my-4"}`}
            style={{ overflowY: isExpanded ? "auto" : "visible" }}
        >
            {/* Botão flutuante de expansão/retração */}
            <Button
                variant="outline-secondary"
                size="sm"
                className="position-absolute top-0 end-0 m-2"
                onClick={toggleExpand}
                title={isExpanded ? "Fechar" : "Expandir"}
            >
                {isExpanded ? <BsXLg size={16} /> : <BsArrowsFullscreen size={16} />}
            </Button>

            {/* Título do card */}
            <h5 className="fs-4 fw-bold text-center mb-3">Tabela Detalhada dos Critérios</h5>

            {/* Explicação opcional */}
            <p className="text-muted text-center mb-4">
                A tabela apresenta todos os critérios avaliados, suas competências associadas,
                responsáveis e o percentual de atendimento individual. É possível filtrar por qualquer coluna.
            </p>

            {/* Tabela em container responsivo */}
            <div className="table-responsive shadow-sm rounded">
                <Table bordered hover size="sm" className="align-middle bg-white">
                    <thead className="table-light">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="fw-bold">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getCanFilter() && (
                                            <Form.Control
                                                type="text"
                                                value={header.column.getFilterValue() ?? ""}
                                                onChange={e => header.column.setFilterValue(e.target.value)}
                                                placeholder="Filtrar..."
                                                size="sm"
                                                className="mt-1"
                                            />
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => {
                            const atendimentoRaw = row.original["% Atendimento"] || "0";
                            const atendimento = Number(atendimentoRaw.replace(",", ".").replace("%", ""));
                            let cellClass = "";

                            if (atendimento >= 80) cellClass = "bg-success-subtle";
                            else if (atendimento <= 10) cellClass = "bg-danger-subtle";
                            else if (atendimento <= 40) cellClass = "bg-warning-subtle";
                            else cellClass = "bg-orange-subtle";

                            return (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className={cellClass}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>


                </Table>
            </div>

            <div className="text-muted small mt-3 text-center">
                Exibindo {table.getRowModel().rows.length} resultados.
            </div>
        </Card>
    );
}
