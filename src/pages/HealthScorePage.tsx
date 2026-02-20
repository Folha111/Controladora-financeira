import { Lightbulb } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScoreRing } from '@/components/health-score/ScoreRing';
import { DimensionCard } from '@/components/health-score/DimensionCard';
import { useHealthScore } from '@/hooks/useHealthScore';

export function HealthScorePage() {
  const { score, loading } = useHealthScore();

  if (loading || !score) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Score de Saúde Financeira"
          description="Avalie o estado das suas finanças de forma objetiva"
        />
        <p className="text-muted-foreground">Calculando seu score...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Score de Saúde Financeira"
        description="Avalie o estado das suas finanças de forma objetiva"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="flex flex-col items-center justify-center py-8 lg:col-span-1">
          <CardContent className="flex flex-col items-center p-0">
            <ScoreRing
              score={score.total}
              color={score.color}
              grade={score.grade}
              level={score.level}
            />
            <p className="mt-4 px-6 text-center text-xs text-muted-foreground">
              Score calculado com base em 5 dimensões financeiras ponderadas
            </p>
          </CardContent>
        </Card>

        {score.topRecommendations.length > 0 ? (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                Principais Recomendações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {score.topRecommendations.map((rec, i) => (
                <div key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{rec}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : (
          <Card className="flex items-center justify-center lg:col-span-2">
            <CardContent className="py-8 text-center">
              <p className="text-lg font-semibold text-emerald-600">Parabéns!</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Suas finanças estão em excelente estado. Continue assim!
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Detalhamento por Dimensão</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {score.dimensions.map((dim) => (
            <DimensionCard key={dim.id} dimension={dim} />
          ))}
        </div>
      </div>

      <div className="rounded-lg border bg-muted/30 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong>Como o score é calculado:</strong> Taxa de Poupança (30 pts) · Controle de
          Orçamento (20 pts) · Taxa de Investimento (20 pts) · Reserva de Emergência (20 pts) ·
          Progresso de Metas (10 pts). O score é atualizado automaticamente conforme você registra
          transações, investimentos, orçamentos e metas.
        </p>
      </div>
    </div>
  );
}
