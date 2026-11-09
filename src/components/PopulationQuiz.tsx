import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  BarChart3,
  ClipboardCheck,
  ArrowRight,
} from 'lucide-react';
import { QUIZ_ARBOVIROSES, QuizQuestion } from '../data/campaignData';

export const PopulationQuiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'quiz' | 'relatorio'>('quiz');

  const currentQuestion: QuizQuestion = QUIZ_ARBOVIROSES[activeQuestionIdx];
  const currentSelectedOption = selectedAnswers[currentQuestion.id];

  const handleSelectOption = (questionId: number, optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setActiveQuestionIdx(0);
  };

  const totalAnswered = Object.keys(selectedAnswers).length;
  const totalCorrect = QUIZ_ARBOVIROSES.reduce((acc, q) => {
    const picked = selectedAnswers[q.id];
    const correctOpt = q.opcoes.find((o) => o.correta);
    return acc + (picked && correctOpt && picked === correctOpt.id ? 1 : 0);
  }, 0);

  return (
    <section
      id="quiz-populacional"
      className="py-16 border-b border-[#E5E0D5] bg-[#F3EFE6]/50 scroll-mt-20"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#0F4C3A] font-semibold mb-2">
              <span>Eixo II · Instrumento Digital de Pesquisa-Ação e Coleta Populacional</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">Amostra: n = 412 participantes</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif-editorial font-semibold text-[#1C1917] tracking-tight">
              Quiz Populacional sobre Prevenção da Dengue e Vacina no SUS
            </h2>
            <p className="mt-2 text-base text-[#57534E] max-w-2xl leading-relaxed">
              Instrumento interativo aplicado à comunidade entre 11 e 14 de novembro de 2024 para diagnóstico do letramento em saúde sobre controle vetorial, sinais de alarme e adesão ao esquema de duas doses da vacina no SUS.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-white p-1.5 rounded-xl border border-[#D6CEBE] shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('quiz')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                viewMode === 'quiz'
                  ? 'bg-[#0F4C3A] text-white'
                  : 'text-[#1C1917] hover:bg-[#F3EFE6]'
              }`}
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Simulador do Quiz (6 Questões)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('relatorio')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                viewMode === 'relatorio'
                  ? 'bg-[#1B365D] text-white'
                  : 'text-[#1C1917] hover:bg-[#F3EFE6]'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Resultados Populacionais (n = 412)</span>
            </button>
          </div>
        </div>

        {viewMode === 'quiz' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Sidebar: Question Stepper & Score Summary */}
            <div className="lg:col-span-4 bg-white border border-[#D6CEBE] rounded-xl p-6">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5E0D5]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#57534E]">
                  Roteiro de Perguntas
                </span>
                <span className="font-mono-tabular text-xs font-bold text-[#0F4C3A]">
                  {totalAnswered}/6 respondidas
                </span>
              </div>

              <div className="space-y-2 mb-6">
                {QUIZ_ARBOVIROSES.map((q, index) => {
                  const answered = !!selectedAnswers[q.id];
                  const isCorrect =
                    answered &&
                    q.opcoes.find((o) => o.correta)?.id === selectedAnswers[q.id];
                  const isActive = index === activeQuestionIdx;

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setActiveQuestionIdx(index)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                        isActive
                          ? 'bg-[#0F4C3A] text-white border-[#0F4C3A] font-semibold'
                          : answered
                          ? 'bg-[#FBF9F5] text-[#1C1917] border-[#D6CEBE]'
                          : 'bg-white text-[#57534E] border-[#E5E0D5] hover:border-[#D6CEBE]'
                      }`}
                    >
                      <span className="truncate">
                        0{q.id}. {q.eixoTematico}
                      </span>
                      {answered && (
                        <span
                          className={`font-mono-tabular text-[11px] shrink-0 ${
                            isActive
                              ? 'text-amber-300'
                              : isCorrect
                              ? 'text-[#0F4C3A] font-bold'
                              : 'text-[#9A3412] font-bold'
                          }`}
                        >
                          {isCorrect ? 'Correta' : 'Revisar'}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#E5E0D5]">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#57534E]">Pontuação Atual:</span>
                  <span className="font-mono-tabular font-bold text-[#1C1917]">
                    {totalCorrect} de {QUIZ_ARBOVIROSES.length} acertos
                  </span>
                </div>
                <p className="text-[11px] text-[#57534E] leading-relaxed mt-2">
                  Ao responder, o sistema apresenta imediatamente a justificativa baseada nos protocolos do Ministério da Saúde e o percentual observado na coleta populacional.
                </p>
                {totalAnswered > 0 && (
                  <button
                    type="button"
                    onClick={handleResetQuiz}
                    className="mt-3 w-full px-3 py-2 text-xs font-semibold text-[#1C1917] bg-[#F3EFE6] hover:bg-[#E5E0D5] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reiniciar Instrumento</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Main Panel: Active Question & Immediate Scientific Feedback */}
            <div className="lg:col-span-8 bg-white border border-[#D6CEBE] rounded-xl p-6 lg:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#9A3412] font-semibold uppercase tracking-wider mb-3">
                <span>
                  Questão 0{currentQuestion.id} de 0{QUIZ_ARBOVIROSES.length} ·{' '}
                  {currentQuestion.eixoTematico}
                </span>
              </div>

              <h3 className="text-xl lg:text-2xl font-serif-editorial font-semibold text-[#1C1917] leading-snug mb-6">
                {currentQuestion.pergunta}
              </h3>

              <div className="space-y-3">
                {currentQuestion.opcoes.map((opt) => {
                  const isPicked = currentSelectedOption === opt.id;
                  const showFeedback = !!currentSelectedOption;

                  let cardStyle =
                    'bg-[#FBF9F5] border-[#D6CEBE] text-[#1C1917] hover:border-[#0F4C3A]';
                  if (showFeedback) {
                    if (opt.correta) {
                      cardStyle =
                        'bg-emerald-50/90 border-[#0F4C3A] text-[#0F4C3A] font-semibold';
                    } else if (isPicked && !opt.correta) {
                      cardStyle =
                        'bg-red-50/90 border-[#9A3412] text-[#9A3412]';
                    } else {
                      cardStyle = 'bg-[#FBF9F5]/60 border-[#E5E0D5] text-[#57534E]';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(currentQuestion.id, opt.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-colors flex items-start gap-3.5 cursor-pointer ${cardStyle}`}
                    >
                      <span className="font-mono-tabular text-xs font-bold uppercase px-2 py-0.5 rounded bg-white border border-current/20 shrink-0 mt-0.5">
                        {opt.id}
                      </span>
                      <span className="text-sm leading-relaxed flex-1">
                        {opt.texto}
                      </span>
                      {showFeedback && opt.correta && (
                        <CheckCircle2 className="w-5 h-5 text-[#0F4C3A] shrink-0 mt-0.5" />
                      )}
                      {showFeedback && isPicked && !opt.correta && (
                        <XCircle className="w-5 h-5 text-[#9A3412] shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Scientific Explanation & Population Benchmark */}
              {currentSelectedOption && (
                <div className="mt-6 p-5 rounded-xl bg-[#F3EFE6] border border-[#D6CEBE] space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0F4C3A]">
                      Devolutiva Científica Baseada em Evidências
                    </span>
                    <span className="text-xs font-mono-tabular font-semibold text-[#9A3412]">
                      {currentQuestion.estatisticaPopulacional}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1C1917] leading-relaxed">
                    {currentQuestion.explicacaoCientifica}
                  </p>
                  <div className="text-[11px] text-[#57534E] pt-2 border-t border-[#D6CEBE]">
                    <strong>Referência Normativa:</strong> {currentQuestion.fonteReferencia}
                  </div>
                </div>
              )}

              {/* Bottom Navigation */}
              <div className="mt-6 pt-5 border-t border-[#E5E0D5] flex items-center justify-between">
                <button
                  type="button"
                  disabled={activeQuestionIdx === 0}
                  onClick={() => setActiveQuestionIdx((i) => Math.max(0, i - 1))}
                  className="px-4 py-2 text-xs font-semibold text-[#1C1917] bg-[#F3EFE6] rounded-lg hover:bg-[#E5E0D5] disabled:opacity-40 transition-colors cursor-pointer"
                >
                  Questão Anterior
                </button>

                {activeQuestionIdx < QUIZ_ARBOVIROSES.length - 1 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveQuestionIdx((i) =>
                        Math.min(QUIZ_ARBOVIROSES.length - 1, i + 1)
                      )
                    }
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0F4C3A] rounded-lg hover:bg-[#0B3B2D] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>Próxima Questão</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setViewMode('relatorio')}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1B365D] rounded-lg hover:bg-[#122644] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>Ver Relatório Epidemiológico (n = 412)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Consolidated Epidemiological Survey Report (n = 412) */
          <div className="bg-white border border-[#D6CEBE] rounded-xl p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-8 mb-8 border-b border-[#E5E0D5]">
              <div>
                <div className="text-xs uppercase tracking-wider text-[#57534E]">
                  Amostra Populacional Total
                </div>
                <div className="text-3xl font-serif-editorial font-bold text-[#0F4C3A] font-mono-tabular mt-1">
                  412
                </div>
                <div className="text-xs text-[#57534E] mt-1">
                  Respondentes válidos (11 a 14/11/2024)
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-[#57534E]">
                  Desconheciam Fase Crítica na Queda da Febre
                </div>
                <div className="text-3xl font-serif-editorial font-bold text-[#9A3412] font-mono-tabular mt-1">
                  58,3%
                </div>
                <div className="text-xs text-[#57534E] mt-1">
                  Receberam folheto de Sinais de Alarme
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-[#57534E]">
                  Desconheciam 2ª Dose da Vacina (90 Dias)
                </div>
                <div className="text-3xl font-serif-editorial font-bold text-[#1B365D] font-mono-tabular mt-1">
                  62,8%
                </div>
                <div className="text-xs text-[#57534E] mt-1">
                  Orientados sobre o esquema PNI/SUS
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-[#57534E]">
                  Downloads da Cartilha Preventiva em PDF
                </div>
                <div className="text-3xl font-serif-editorial font-bold text-[#B45309] font-mono-tabular mt-1">
                  389
                </div>
                <div className="text-xs text-[#57534E] mt-1">
                  Taxa de conversão educativa de 94,4%
                </div>
              </div>
            </div>

            <h3 className="text-lg font-serif-editorial font-semibold text-[#1C1917] mb-4">
              Síntese dos Indicadores Coletados por Eixo de Investigação Comunitária
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#D6CEBE] text-[#57534E] uppercase text-xs">
                    <th className="py-3 pr-4 font-semibold">Indicador Investigado no Quiz</th>
                    <th className="py-3 px-4 font-semibold font-mono-tabular">Acerto Inicial</th>
                    <th className="py-3 pl-4 font-semibold">Intervenção Educativa Realizada</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E0D5]">
                  <tr>
                    <td className="py-3.5 pr-4 font-medium text-[#1C1917]">
                      Periodicidade semanal de 7 dias e escovação de bordas (ovos resistentes a 450 dias)
                    </td>
                    <td className="py-3.5 px-4 font-mono-tabular font-bold text-[#0F4C3A]">
                      68,4% (282/412)
                    </td>
                    <td className="py-3.5 pl-4 text-[#57534E]">
                      Checklist doméstico de 10 minutos semanais com foco em pratinhos e bandejas.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-medium text-[#1C1917]">
                      Reconhecimento dos Sinais de Alarme na defervescência (3º ao 7º dia)
                    </td>
                    <td className="py-3.5 px-4 font-mono-tabular font-bold text-[#9A3412]">
                      41,7% (172/412)
                    </td>
                    <td className="py-3.5 pl-4 text-[#57534E]">
                      Card de alerta sobre dor abdominal contínua, vômitos persistentes e procura imediata de UPA 24h.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-medium text-[#1C1917]">
                      Proibição de Ibuprofeno, Diclofenaco, Nimesulida e AAS na suspeita de dengue
                    </td>
                    <td className="py-3.5 px-4 font-mono-tabular font-bold text-[#B45309]">
                      45,4% (187/412)
                    </td>
                    <td className="py-3.5 pl-4 text-[#57534E]">
                      Lista nominal de fármacos contraindicados por risco de plaquetopenia e hemorragia.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-medium text-[#1C1917]">
                      Esquema de 2 doses (intervalo de 90 dias) da vacina tetravalente no SUS
                    </td>
                    <td className="py-3.5 px-4 font-mono-tabular font-bold text-[#1B365D]">
                      37,2% (153/412)
                    </td>
                    <td className="py-3.5 pl-4 text-[#57534E]">
                      Divulgação das diretrizes do PNI, intervalo de 6 meses pós-dengue e app Meu SUS Digital.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
