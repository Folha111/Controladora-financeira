import { useState } from 'react';
import { CalendarIcon, Download, FileText, FileSpreadsheet, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils';
import { useExportReport } from '@/hooks/useExportReport';
import type { ExportPeriod } from '@/services/reportExport';

const periodOptions: { value: ExportPeriod; label: string }[] = [
  { value: 'this_month', label: 'Este mês' },
  { value: 'last_month', label: 'Mês anterior' },
  { value: 'custom', label: 'Personalizado' },
];

export function ExportReportDialog() {
  const [open, setOpen] = useState(false);
  const {
    period,
    setPeriod,
    customRange,
    setCustomRange,
    summary,
    periodLabel,
    canExport,
    exporting,
    transactionCount,
    handleExport,
  } = useExportReport();

  const hasData = transactionCount > 0 || summary.investmentCount > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Relatório
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Exportar Relatório</DialogTitle>
          <DialogDescription>
            Selecione o período e formato de exportação
          </DialogDescription>
        </DialogHeader>

        {/* Period Filter */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Período</label>
          <div className="flex gap-2">
            {periodOptions.map((opt) => (
              <Button
                key={opt.value}
                variant={period === opt.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPeriod(opt.value)}
              >
                {opt.label}
              </Button>
            ))}
          </div>

          {/* Custom Date Range */}
          {period === 'custom' && (
            <div className="flex flex-wrap items-center gap-2">
              <DatePickerButton
                label="De"
                date={customRange.from}
                onSelect={(date) =>
                  setCustomRange((prev) => ({ ...prev, from: date }))
                }
              />
              <span className="text-muted-foreground text-sm">até</span>
              <DatePickerButton
                label="Até"
                date={customRange.to}
                onSelect={(date) =>
                  setCustomRange((prev) => ({ ...prev, to: date }))
                }
                disabled={customRange.from}
              />
            </div>
          )}
        </div>

        <Separator />

        {/* Summary Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Resumo do Período</label>
            <span className="text-muted-foreground text-xs">
              {periodLabel}
            </span>
          </div>

          {!hasData ? (
            <p className="text-muted-foreground text-sm py-2">
              Nenhum dado encontrado neste período.
            </p>
          ) : (
            <div className="space-y-3">
              {/* Transaction Summary */}
              <div className="grid grid-cols-3 gap-3">
                <SummaryCard
                  label="Receitas"
                  value={formatCurrency(summary.totalIncome)}
                  className="text-emerald-600"
                />
                <SummaryCard
                  label="Despesas"
                  value={formatCurrency(summary.totalExpenses)}
                  className="text-red-600"
                />
                <SummaryCard
                  label="Saldo"
                  value={formatCurrency(summary.balance)}
                  className={summary.balance >= 0 ? 'text-emerald-600' : 'text-red-600'}
                />
              </div>

              {/* Investment Summary */}
              {summary.investmentCount > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  <SummaryCard
                    label="Investido"
                    value={formatCurrency(summary.totalInvested)}
                    className="text-blue-600"
                  />
                  <SummaryCard
                    label="Valor Atual"
                    value={formatCurrency(summary.totalCurrentValue)}
                    className="text-blue-600"
                  />
                  <SummaryCard
                    label="Rendimento"
                    value={formatCurrency(summary.investmentReturn)}
                    className={summary.investmentReturn >= 0 ? 'text-emerald-600' : 'text-red-600'}
                  />
                </div>
              )}

              <p className="text-muted-foreground text-xs text-center">
                {transactionCount} transaç{transactionCount === 1 ? 'ão' : 'ões'} · {summary.investmentCount} investimento{summary.investmentCount === 1 ? '' : 's'}
              </p>
            </div>
          )}
        </div>

        <Separator />

        {/* Export Buttons */}
        <div className="flex gap-3">
          <Button
            className="flex-1 gap-2"
            disabled={!canExport || exporting !== null}
            onClick={() => handleExport('pdf')}
          >
            {exporting === 'pdf' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
            {exporting === 'pdf' ? 'Gerando...' : 'Exportar PDF'}
          </Button>
          <Button
            variant="outline"
            className="flex-1 gap-2"
            disabled={!canExport || exporting !== null}
            onClick={() => handleExport('csv')}
          >
            {exporting === 'csv' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileSpreadsheet className="h-4 w-4" />
            )}
            {exporting === 'csv' ? 'Gerando...' : 'Exportar CSV'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SummaryCard({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <Card>
      <CardContent className="p-3">
        <p className="text-muted-foreground text-xs">{label}</p>
        <p className={cn('text-sm font-bold', className)}>{value}</p>
      </CardContent>
    </Card>
  );
}

function DatePickerButton({
  label,
  date,
  onSelect,
  disabled,
}: {
  label: string;
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  disabled?: Date;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            'gap-2 font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="h-3.5 w-3.5" />
          {date ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          locale={ptBR}
          disabled={disabled ? { before: disabled } : undefined}
        />
      </PopoverContent>
    </Popover>
  );
}
