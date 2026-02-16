import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatDate } from '@/utils/format';
import { ALL_CATEGORIES } from '@/types';
import type { CategoryId } from '@/types';
import type { ReportData } from './types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const COLORS = {
  primary: [16, 185, 129] as [number, number, number],    // emerald-500
  blue: [59, 130, 246] as [number, number, number],        // blue-500
  dark: [30, 30, 30] as [number, number, number],
  muted: [107, 114, 128] as [number, number, number],
  income: [16, 185, 129] as [number, number, number],
  expense: [239, 68, 68] as [number, number, number],
  headerBg: [243, 244, 246] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
};

function fmt(cents: number): string {
  const value = cents / 100;
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function ensureSpace(doc: jsPDF, y: number, needed: number, margin: number): number {
  if (y + needed > doc.internal.pageSize.getHeight() - 20) {
    doc.addPage();
    return margin;
  }
  return y;
}

export function exportPdf(data: ReportData): void {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // --- Header ---
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, pageWidth, 36, 'F');

  doc.setTextColor(...COLORS.white);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(data.appName, margin, 16);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Relatório Financeiro', margin, 24);

  doc.setFontSize(9);
  doc.text(`Período: ${data.periodLabel}`, margin, 31);

  y = 46;

  // --- Summary Cards (Transactions) ---
  doc.setTextColor(...COLORS.dark);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Resumo Financeiro', margin, y);
  y += 8;

  const cardWidth = (contentWidth - 8) / 3;
  const cards = [
    { label: 'Receitas', value: fmt(data.totalIncomeCents), color: COLORS.income },
    { label: 'Despesas', value: fmt(data.totalExpensesCents), color: COLORS.expense },
    { label: 'Saldo', value: fmt(data.balanceCents), color: data.balanceCents >= 0 ? COLORS.income : COLORS.expense },
  ];

  cards.forEach((card, i) => {
    const x = margin + i * (cardWidth + 4);
    doc.setFillColor(...COLORS.headerBg);
    doc.roundedRect(x, y, cardWidth, 22, 2, 2, 'F');

    doc.setTextColor(...COLORS.muted);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(card.label, x + 4, y + 7);

    doc.setTextColor(...card.color);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(card.value, x + 4, y + 16);
  });

  y += 30;

  // --- Investment Summary Cards ---
  if (data.investments.length > 0) {
    const invCards = [
      { label: 'Total Investido', value: fmt(data.totalInvestedCents), color: COLORS.blue },
      { label: 'Valor Atual', value: fmt(data.totalCurrentValueCents), color: COLORS.blue },
      { label: 'Rendimento', value: fmt(data.investmentReturnCents), color: data.investmentReturnCents >= 0 ? COLORS.income : COLORS.expense },
    ];

    invCards.forEach((card, i) => {
      const x = margin + i * (cardWidth + 4);
      doc.setFillColor(...COLORS.headerBg);
      doc.roundedRect(x, y, cardWidth, 22, 2, 2, 'F');

      doc.setTextColor(...COLORS.muted);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(card.label, x + 4, y + 7);

      doc.setTextColor(...card.color);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(card.value, x + 4, y + 16);
    });

    y += 30;
  }

  // --- Transaction count ---
  doc.setTextColor(...COLORS.muted);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.transactionCount} transações | ${data.investments.length} investimentos`, margin, y);
  y += 10;

  // --- Expense Categories ---
  if (data.expenseCategories.length > 0) {
    y = ensureSpace(doc, y, 30, margin);
    doc.setTextColor(...COLORS.dark);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Despesas por Categoria', margin, y);
    y += 4;

    autoTable(doc, {
      startY: y,
      margin: { left: margin, right: margin },
      head: [['Categoria', 'Valor', '%']],
      body: data.expenseCategories.map((cat) => [
        cat.label,
        fmt(cat.totalCents),
        `${cat.percentage.toFixed(1)}%`,
      ]),
      headStyles: {
        fillColor: COLORS.primary,
        textColor: COLORS.white,
        fontStyle: 'bold',
        fontSize: 9,
      },
      bodyStyles: { fontSize: 9 },
      alternateRowStyles: { fillColor: [249, 250, 251] },
      columnStyles: {
        0: { cellWidth: contentWidth * 0.5 },
        1: { cellWidth: contentWidth * 0.3, halign: 'right' },
        2: { cellWidth: contentWidth * 0.2, halign: 'right' },
      },
    });

    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
  }

  // --- Income Categories ---
  if (data.incomeCategories.length > 0) {
    y = ensureSpace(doc, y, 30, margin);
    doc.setTextColor(...COLORS.dark);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Receitas por Categoria', margin, y);
    y += 4;

    autoTable(doc, {
      startY: y,
      margin: { left: margin, right: margin },
      head: [['Categoria', 'Valor', '%']],
      body: data.incomeCategories.map((cat) => [
        cat.label,
        fmt(cat.totalCents),
        `${cat.percentage.toFixed(1)}%`,
      ]),
      headStyles: {
        fillColor: COLORS.primary,
        textColor: COLORS.white,
        fontStyle: 'bold',
        fontSize: 9,
      },
      bodyStyles: { fontSize: 9 },
      alternateRowStyles: { fillColor: [249, 250, 251] },
      columnStyles: {
        0: { cellWidth: contentWidth * 0.5 },
        1: { cellWidth: contentWidth * 0.3, halign: 'right' },
        2: { cellWidth: contentWidth * 0.2, halign: 'right' },
      },
    });

    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
  }

  // --- Investments by Type ---
  if (data.investmentsByType.length > 0) {
    y = ensureSpace(doc, y, 30, margin);
    doc.setTextColor(...COLORS.dark);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Investimentos por Tipo', margin, y);
    y += 4;

    autoTable(doc, {
      startY: y,
      margin: { left: margin, right: margin },
      head: [['Tipo', 'Valor Atual', '%']],
      body: data.investmentsByType.map((cat) => [
        cat.label,
        fmt(cat.totalCents),
        `${cat.percentage.toFixed(1)}%`,
      ]),
      headStyles: {
        fillColor: COLORS.blue,
        textColor: COLORS.white,
        fontStyle: 'bold',
        fontSize: 9,
      },
      bodyStyles: { fontSize: 9 },
      alternateRowStyles: { fillColor: [249, 250, 251] },
      columnStyles: {
        0: { cellWidth: contentWidth * 0.5 },
        1: { cellWidth: contentWidth * 0.3, halign: 'right' },
        2: { cellWidth: contentWidth * 0.2, halign: 'right' },
      },
    });

    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
  }

  // --- Investment Details ---
  if (data.investments.length > 0) {
    y = ensureSpace(doc, y, 30, margin);
    doc.setTextColor(...COLORS.dark);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Detalhamento de Investimentos', margin, y);
    y += 4;

    autoTable(doc, {
      startY: y,
      margin: { left: margin, right: margin },
      head: [['Nome', 'Tipo', 'Aplicado', 'Atual', 'Rend.']],
      body: data.investments.map((inv) => [
        inv.name,
        inv.typeLabel,
        fmt(inv.amountCents),
        fmt(inv.currentValueCents),
        `${inv.returnPercent >= 0 ? '+' : ''}${inv.returnPercent.toFixed(1)}%`,
      ]),
      headStyles: {
        fillColor: COLORS.blue,
        textColor: COLORS.white,
        fontStyle: 'bold',
        fontSize: 9,
      },
      bodyStyles: { fontSize: 8 },
      alternateRowStyles: { fillColor: [249, 250, 251] },
      didParseCell(hookData) {
        if (hookData.section === 'body' && hookData.column.index === 4) {
          const inv = data.investments[hookData.row.index];
          if (inv) {
            hookData.cell.styles.textColor =
              inv.returnCents >= 0 ? COLORS.income : COLORS.expense;
            hookData.cell.styles.fontStyle = 'bold';
          }
        }
      },
    });

    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
  }

  // --- Transactions Table ---
  if (data.transactions.length > 0) {
    y = ensureSpace(doc, y, 30, margin);
    doc.setTextColor(...COLORS.dark);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Transações Detalhadas', margin, y);
    y += 4;

    autoTable(doc, {
      startY: y,
      margin: { left: margin, right: margin },
      head: [['Data', 'Descrição', 'Categoria', 'Tipo', 'Valor']],
      body: data.transactions.map((t) => {
        const catMeta = ALL_CATEGORIES[t.category as CategoryId];
        return [
          formatDate(t.date),
          t.description,
          catMeta?.label ?? t.category,
          t.type === 'income' ? 'Receita' : 'Despesa',
          fmt(t.amountCents),
        ];
      }),
      headStyles: {
        fillColor: COLORS.primary,
        textColor: COLORS.white,
        fontStyle: 'bold',
        fontSize: 9,
      },
      bodyStyles: { fontSize: 8 },
      alternateRowStyles: { fillColor: [249, 250, 251] },
      columnStyles: {
        0: { cellWidth: 24 },
        1: { cellWidth: contentWidth * 0.35 },
        2: { cellWidth: contentWidth * 0.2 },
        3: { cellWidth: 20 },
        4: { halign: 'right' },
      },
      didParseCell(hookData) {
        if (hookData.section === 'body' && hookData.column.index === 4) {
          const rowIdx = hookData.row.index;
          const t = data.transactions[rowIdx];
          if (t) {
            hookData.cell.styles.textColor =
              t.type === 'income' ? COLORS.income : COLORS.expense;
            hookData.cell.styles.fontStyle = 'bold';
          }
        }
      },
    });
  }

  // --- Footer on all pages ---
  const pageCount = doc.getNumberOfPages();
  const genDate = format(data.generatedAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setDrawColor(...COLORS.headerBg);
    doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);

    doc.setTextColor(...COLORS.muted);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Gerado por ${data.appName} em ${genDate}`,
      margin,
      pageHeight - 8,
    );
    doc.text(
      `Página ${i} de ${pageCount}`,
      pageWidth - margin,
      pageHeight - 8,
      { align: 'right' },
    );
  }

  const fileName = `monetix-relatorio-${format(data.generatedAt, 'yyyy-MM-dd-HHmm')}.pdf`;
  doc.save(fileName);
}
