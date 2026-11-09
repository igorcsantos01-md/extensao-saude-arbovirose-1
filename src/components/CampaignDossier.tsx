import React, { useState } from 'react';
import {
  AlertOctagon,
  CheckSquare,
  Square,
  Syringe,
  CalendarClock,
  BookOpen,
  PhoneCall,
  HeartPulse,
  Droplets,
  Ban,
} from 'lucide-react';
import { CHECKLIST_10_MINUTOS, ChecklistItem } from '../data/campaignData';

export const CampaignDossier: React.FC = () => {
  const [activePillar, setActivePillar] = useState<'vetor' | 'clinica' | 'vacina'>('vetor');
  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    CHECKLIST_10_MINUTOS.forEach((item) => {
      initial[item.id] = item.concluidoPadrao;
    });
    return initial;
  });

  // Interactive Dose 2 Calculator State for SUS Vaccine
  const [firstDoseDate, setFirstDoseDate] = useState<string>('2024-11-14');
  const [hadRecentDengue, setHadRecentDengue] = useState<'nao' | 'sim'>('nao');

  const toggleChecklist = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;

  const calculateSecondDoseDate = (dateStr: string): string => {
    if (!dateStr) return '—';
    const d = new Date(`${dateStr}T12:00:00`);
    if (isNaN(d.getTime())) return '—';
    d.setDate(d.getDate() + 90);
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <section
      id="campanha"
      className="py-16 border-b border-[#E5E0D5] bg-[#FBF9F5] scroll-mt-20"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Editorial Chapter Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 pb-8 border-b border-[#E5E0D5]">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9A3412] font-semibold mb-2">
              <span>Acervo Científico e Comunitário da Ação de Extensão</span>
              <span aria-hidden="true">·</span>
              <span>Novembro de 2024</span>
              <span aria-hidden="true">·</span>
              <span>Goiânia - GO</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif-editorial font-semibold text-[#1C1917] tracking-tight text-balance">
              Fundamentação Epidemiológica, Prevenção Vetorial e Imunização no SUS
            </h2>
          </div>

          <div className="lg:col-span-4 text-sm text-[#57534E] leading-relaxed">
            Conteúdo estruturado pelo médico extensionista{' '}
            <strong className="text-[#1C1917]">Lucas Gonçalves Silveira</strong>{' '}
            para educação comunitária, combate a fake news e orientação de acesso ao Programa Nacional de Imunizações (PNI).
          </div>
        </div>

        {/* Interactive Pillar Segmented Navigation */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#F3EFE6] border border-[#D6CEBE] rounded-xl mb-10">
          <button
            type="button"
            onClick={() => setActivePillar('vetor')}
            className={`flex-1 min-w-[220px] px-4 py-3 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
              activePillar === 'vetor'
                ? 'bg-[#0F4C3A] text-white shadow-sm'
                : 'text-[#1C1917] hover:bg-[#E7E1D3]'
            }`}
          >
            <span>01. Controle Vetorial (10 Minutos/Semana)</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePillar('clinica')}
            className={`flex-1 min-w-[220px] px-4 py-3 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
              activePillar === 'clinica'
                ? 'bg-[#9A3412] text-white shadow-sm'
                : 'text-[#1C1917] hover:bg-[#E7E1D3]'
            }`}
          >
            <span>02. Sinais de Alarme e Automedicação</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePillar('vacina')}
            className={`flex-1 min-w-[220px] px-4 py-3 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
              activePillar === 'vacina'
                ? 'bg-[#1B365D] text-white shadow-sm'
                : 'text-[#1C1917] hover:bg-[#E7E1D3]'
            }`}
          >
            <span>03. Vacina da Dengue no SUS (PNI / 2 Doses)</span>
          </button>
        </div>

        {/* =================================================================
            PILAR 01 — CONTROLE VETORIAL E CICLO DO AEDES AEGYPTI
           ================================================================= */}
        {activePillar === 'vetor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Biological Cycle & Resistance Explanation */}
            <div className="lg:col-span-5 bg-white border border-[#D6CEBE] rounded-xl p-6 lg:p-7">
              <div className="text-xs uppercase tracking-widest text-[#0F4C3A] font-semibold mb-2">
                Entomologia Aplicada à Saúde Coletiva
              </div>
              <h3 className="text-xl font-serif-editorial font-semibold text-[#1C1917] mb-3">
                Por que 10 minutos uma vez por semana interrompem o ciclo?
              </h3>
              <p className="text-sm text-[#57534E] leading-relaxed mb-6">
                O desenvolvimento biológico do mosquito{' '}
                <em className="font-serif-editorial text-[#1C1917]">Aedes aegypti</em>{' '}
                compreende quatro fases: ovo, larva, pupa (fases aquáticas) e mosquito alado adulto. Em condições tropicais de temperatura elevada, a transição do ovo eclodido até o mosquito adulto dura de{' '}
                <strong className="text-[#1C1917]">7 a 10 dias</strong>.
              </p>

              {/* Scientific Diagram of the 4 Stages */}
              <div className="space-y-3 mb-6">
                <div className="p-3.5 rounded-lg bg-[#FBF9F5] border border-[#E5E0D5] flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-[#9A3412]">
                      Fase 1 · Ovos Aderidos às Bordas (Até 450 dias no seco)
                    </div>
                    <p className="text-xs text-[#57534E] mt-1">
                      A fêmea deposita os ovos milímetros acima da lâmina d’água. Mesmo que o recipiente seque, o embrião resiste por mais de um ano aguardando nova chuva.
                    </p>
                  </div>
                  <span className="font-mono-tabular text-xs font-bold text-[#9A3412] shrink-0">
                    Dia 1–2
                  </span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#FBF9F5] border border-[#E5E0D5] flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-[#0F4C3A]">
                      Fase 2 e 3 · Larvas (L1–L4) e Pupa Aquática
                    </div>
                    <p className="text-xs text-[#57534E] mt-1">
                      Após o contato com a água, a larva eclode rapidamente, alimenta-se de matéria orgânica e transforma-se em pupa móvel antes de emergir.
                    </p>
                  </div>
                  <span className="font-mono-tabular text-xs font-bold text-[#0F4C3A] shrink-0">
                    Dia 3–7
                  </span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#F3EFE6] border border-[#D6CEBE] flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-[#1C1917]">
                      Ponto de Corte Semanal · Emergência do Adulto Alado
                    </div>
                    <p className="text-xs text-[#57534E] mt-1">
                      Ao descartar a água e escovar as paredes internas a cada 7 dias, o ciclo aquático é obrigatoriamente interrompido antes da fase alada.
                    </p>
                  </div>
                  <span className="font-mono-tabular text-xs font-bold text-[#1C1917] shrink-0">
                    Dia 7–10
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#0F4C3A]/5 border border-[#0F4C3A]/20 text-xs text-[#1C1917] leading-relaxed">
                <strong>Orientação Técnica do Folheto:</strong> Apenas virar a água não basta. É indispensável utilizar bucha ou escova nas bordas internas de pratinhos, bebedouros e bandejas para remover mecanicamente os ovos impermeáveis.
              </div>
            </div>

            {/* Right Column: Interactive 10-Minute Weekly Domestic Checklist */}
            <div className="lg:col-span-7 bg-white border border-[#D6CEBE] rounded-xl p-6 lg:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-[#E5E0D5]">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold">
                    Instrumento Comunitário Interativo
                  </div>
                  <h3 className="text-xl font-serif-editorial font-semibold text-[#1C1917] mt-1">
                    Roteiro Prático: 10 Minutos Semanais contra o Vetor
                  </h3>
                </div>
                <div className="text-right font-mono-tabular">
                  <div className="text-xs text-[#57534E]">Pontos Vistoriados</div>
                  <div className="text-lg font-bold text-[#0F4C3A]">
                    {completedCount} / {CHECKLIST_10_MINUTOS.length} concluídos
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {CHECKLIST_10_MINUTOS.map((item: ChecklistItem) => {
                  const checked = !!checklist[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklist(item.id)}
                      className={`p-4 rounded-xl border transition-colors cursor-pointer flex items-start gap-3.5 ${
                        checked
                          ? 'bg-[#0F4C3A]/5 border-[#0F4C3A]/30'
                          : 'bg-[#FBF9F5] border-[#E5E0D5] hover:border-[#D6CEBE]'
                      }`}
                    >
                      <button
                        type="button"
                        aria-label={`Marcar ${item.local}`}
                        className="mt-0.5 text-[#0F4C3A] shrink-0 cursor-pointer"
                      >
                        {checked ? (
                          <CheckSquare className="w-5 h-5" />
                        ) : (
                          <Square className="w-5 h-5 text-[#57534E]" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span
                            className={`text-sm font-bold ${
                              checked ? 'text-[#0F4C3A]' : 'text-[#1C1917]'
                            }`}
                          >
                            {item.local}
                          </span>
                          <span className="text-xs font-mono-tabular text-[#9A3412] font-semibold">
                            Tempo médio: {item.tempoEstimado}
                          </span>
                        </div>
                        <p className="text-xs text-[#1C1917] mt-1 leading-relaxed">
                          {item.acaoPreventiva}
                        </p>
                        <p className="text-[11px] text-[#57534E] mt-1">
                          Dado epidemiológico: {item.riscoCritico}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            PILAR 02 — SINAIS DE ALARME NA DEFERVESCÊNCIA E AUTOMEDICAÇÃO
           ================================================================= */}
        {activePillar === 'clinica' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Dengue Clássica vs Sinais de Alarme */}
              <div className="lg:col-span-7 bg-white border border-[#D6CEBE] rounded-xl p-6 lg:p-7">
                <div className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold mb-2">
                  Eixo I · Folheto Digital de Estratificação de Risco Comunitário
                </div>
                <h3 className="text-2xl font-serif-editorial font-semibold text-[#1C1917] mb-3">
                  Atenção ao Período de Queda da Febre (3º ao 7º Dia)
                </h3>
                <p className="text-sm text-[#57534E] leading-relaxed mb-6">
                  Um dos principais erros identificados na enquete populacional é a falsa sensação de cura quando a febre diminui após o terceiro dia. É justamente na{' '}
                  <strong className="text-[#1C1917]">defervescência</strong> que pode instalar-se o extravasamento plasmático grave.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Fase Febril */}
                  <div className="p-5 rounded-xl bg-[#FBF9F5] border border-[#E5E0D5]">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B365D] mb-3">
                      <HeartPulse className="w-4 h-4" />
                      <span>Fase Febril Aguda (1º ao 3º Dia)</span>
                    </div>
                    <ul className="space-y-2 text-xs text-[#1C1917] leading-relaxed">
                      <li>• Febre alta de início abrupto (39°C a 40°C)</li>
                      <li>• Dor retro-orbitária (atrás dos olhos) que piora com o movimento ocular</li>
                      <li>• Mialgia intensa e artralgia ("febre quebra-ossos")</li>
                      <li>• Cefaleia holocraniana, prostração e adinamia</li>
                      <li>• Exantema maculopapular (manchas avermelhadas com ou sem prurido)</li>
                    </ul>
                    <div className="mt-4 pt-3 border-t border-[#E5E0D5] text-xs font-semibold text-[#0F4C3A]">
                      Conduta: Hidratação oral imediata em domicílio + Avaliação na UBS mais próxima.
                    </div>
                  </div>

                  {/* Sinais de Alarme */}
                  <div className="p-5 rounded-xl bg-[#9A3412]/5 border border-[#9A3412]/30">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9A3412] mb-3">
                      <AlertOctagon className="w-4 h-4" />
                      <span>Sinais de Alarme (3º ao 7º Dia)</span>
                    </div>
                    <ul className="space-y-2 text-xs text-[#1C1917] font-medium leading-relaxed">
                      <li>• Dor abdominal intensa, contínua ou à palpação</li>
                      <li>• Vômitos persistentes que impedem a hidratação oral</li>
                      <li>• Tontura, sensação de desmaio ao levantar (hipotensão postural)</li>
                      <li>• Sangramento de mucosas (gengivas, nariz, urina ou fezes escuras)</li>
                      <li>• Sonolência excessiva, letargia ou irritabilidade intensa</li>
                    </ul>
                    <div className="mt-4 pt-3 border-t border-[#9A3412]/20 text-xs font-bold text-[#9A3412]">
                      Conduta Crítica: Procurar IMEDIATAMENTE uma UPA 24h, Emergência Hospitalar ou acionar SAMU 192.
                    </div>
                  </div>
                </div>
              </div>

              {/* Contraindicated Medications & Hydration Protocol */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white border border-[#D6CEBE] rounded-xl p-6">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9A3412] mb-2">
                    <Ban className="w-4 h-4" />
                    <span>Alerta contra Automedicação Perigosa</span>
                  </div>
                  <h4 className="text-lg font-serif-editorial font-semibold text-[#1C1917] mb-2">
                    Medicamentos Estritamente Proibidos na Suspeita de Dengue
                  </h4>
                  <p className="text-xs text-[#57534E] leading-relaxed mb-4">
                    Nunca utilize medicamentos contendo salicilatos ou anti-inflamatórios sem prescrição médica, pois interferem na agregação das plaquetas e podem desencadear hemorragias graves:
                  </p>
                  <div className="space-y-2 text-xs font-mono-tabular">
                    <div className="p-2.5 rounded bg-red-50 border border-red-200 text-red-950">
                      <strong>PROIBIDO 1 (Salicilatos):</strong> Ácido Acetilsalicílico (AAS, Aspirina, Melhoral, Engov, Sonrisal).
                    </div>
                    <div className="p-2.5 rounded bg-red-50 border border-red-200 text-red-950">
                      <strong>PROIBIDO 2 (AINEs):</strong> Ibuprofeno, Diclofenaco, Nimesulida, Cetoprofeno, Naproxeno, Piroxicam.
                    </div>
                    <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-950">
                      <strong>PROIBIDO 3 (Corticoides):</strong> Prednisona, Dexametasona e Betametasona na fase aguda sem indicação hospitalar.
                    </div>
                  </div>
                </div>

                <div className="bg-[#0F4C3A] text-white rounded-xl p-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-300 font-semibold mb-2">
                    <Droplets className="w-4 h-4" />
                    <span>Regra de Ouro da Hidratação Precoce</span>
                  </div>
                  <h4 className="text-lg font-serif-editorial font-semibold mb-2">
                    Cálculo Prático de Hidratação Oral Domiciliar (Adultos)
                  </h4>
                  <p className="text-xs text-emerald-100 leading-relaxed mb-3">
                    O Ministério da Saúde recomenda aproximadamente{' '}
                    <strong className="text-white font-mono-tabular">60 mL por kg de peso ao dia</strong>{' '}
                    (ex.: um adulto de 70 kg deve ingerir cerca de 4,2 litros/dia), sendo 1/3 com Soro de Reidratação Oral (SRO) e 2/3 com água, água de coco, chás claros e sucos naturais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            PILAR 03 — VACINA CONTRA A DENGUE NO SUS (PNI / MEU SUS DIGITAL)
           ================================================================= */}
        {activePillar === 'vacina' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: PNI Guidelines & Fake News Clarification */}
            <div className="lg:col-span-7 bg-white border border-[#D6CEBE] rounded-xl p-6 lg:p-7">
              <div className="text-xs uppercase tracking-widest text-[#1B365D] font-semibold mb-2">
                Eixo III & IV · Educação Vacinal e Diretrizes do PNI / SUS
              </div>
              <h3 className="text-2xl font-serif-editorial font-semibold text-[#1C1917] mb-3">
                Conscientização sobre a Vacina Tetravalente da Dengue no SUS
              </h3>
              <p className="text-sm text-[#57534E] leading-relaxed mb-6">
                O Brasil tornou-se o primeiro país do mundo a oferecer a vacina tetravalente contra a dengue (QDenga / TAK-003) no sistema público universal. A campanha extensionista atuou diretamente no esclarecimento da população sobre grupos prioritários, necessidade da segunda dose e combate à desinformação.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#E5E0D5]">
                  <div className="text-xs font-bold text-[#1B365D] uppercase tracking-wider mb-1">
                    Público Prioritário no PNI/SUS
                  </div>
                  <p className="text-xs text-[#1C1917] leading-relaxed">
                    Crianças e adolescentes de <strong>10 a 14 anos, 11 meses e 29 dias</strong> residentes em regiões de saúde prioritárias com alta transmissão e maior índice de hospitalização pela doença, conforme notas técnicas vigentes do Ministério da Saúde.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#E5E0D5]">
                  <div className="text-xs font-bold text-[#0F4C3A] uppercase tracking-wider mb-1">
                    Proteção para Soropositivos e Soronegativos
                  </div>
                  <p className="text-xs text-[#1C1917] leading-relaxed">
                    Diferente de imunizantes de primeira geração, a vacina ofertada no SUS é indicada tanto para quem <strong>já teve dengue</strong> quanto para quem <strong>nunca teve contato prévio</strong> com os 4 sorotipos (DENV-1, 2, 3 e 4).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#E5E0D5]">
                  <div className="text-xs font-bold text-[#9A3412] uppercase tracking-wider mb-1">
                    Contraindicações Clínicas Importantes
                  </div>
                  <p className="text-xs text-[#1C1917] leading-relaxed">
                    Por conter vírus vivo atenuado, a vacina é contraindicada para <strong>gestantes, mulheres amamentando (lactantes)</strong>, pessoas com imunodeficiência congênita ou adquirida e pacientes em terapia imunossupressora.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#E5E0D5]">
                  <div className="text-xs font-bold text-[#B45309] uppercase tracking-wider mb-1">
                    Canais Oficiais de Consulta Gratuita
                  </div>
                  <p className="text-xs text-[#1C1917] leading-relaxed">
                    A população deve consultar a disponibilidade nas Salas de Vacina das <strong>Unidades Básicas de Saúde (UBS)</strong>, pelo aplicativo oficial <strong>Meu SUS Digital</strong> (antigo ConecteSUS) ou pela ouvidoria <strong>Disque Saúde 136</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive 2-Dose Schedule Simulator */}
            <div className="lg:col-span-5 bg-white border border-[#D6CEBE] rounded-xl p-6 lg:p-7">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#0F4C3A] font-semibold mb-2">
                <CalendarClock className="w-4 h-4" />
                <span>Simulador Comunitário de Esquema Vacinal</span>
              </div>
              <h3 className="text-xl font-serif-editorial font-semibold text-[#1C1917] mb-2">
                Calculadora do Intervalo de 2 Doses (90 Dias)
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed mb-5">
                A proteção completa depende obrigatoriamente das duas doses. Utilize o simulador educativo abaixo para verificar o aprazamento da 2ª dose e a regra pós-infecção:
              </p>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="dose1-date"
                    className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                  >
                    Data de Aplicação da 1ª Dose na Sala de Vacina do SUS:
                  </label>
                  <input
                    id="dose1-date"
                    type="date"
                    value={firstDoseDate}
                    onChange={(e) => setFirstDoseDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-mono-tabular bg-[#FBF9F5] border border-[#D6CEBE] rounded-lg text-[#1C1917]"
                  />
                </div>

                <div>
                  <span className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                    Teve diagnóstico confirmado de dengue recentemente?
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setHadRecentDengue('nao')}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        hadRecentDengue === 'nao'
                          ? 'bg-[#0F4C3A] text-white border-[#0F4C3A]'
                          : 'bg-[#FBF9F5] text-[#1C1917] border-[#D6CEBE]'
                      }`}
                    >
                      Não teve dengue recente
                    </button>
                    <button
                      type="button"
                      onClick={() => setHadRecentDengue('sim')}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        hadRecentDengue === 'sim'
                          ? 'bg-[#9A3412] text-white border-[#9A3412]'
                          : 'bg-[#FBF9F5] text-[#1C1917] border-[#D6CEBE]'
                      }`}
                    >
                      Sim, teve dengue há menos de 6 meses
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F3EFE6] border border-[#D6CEBE] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#57534E] font-medium">
                      Previsão Oficial da 2ª Dose (+90 dias):
                    </span>
                    <span className="font-mono-tabular font-bold text-[#0F4C3A]">
                      {calculateSecondDoseDate(firstDoseDate)}
                    </span>
                  </div>

                  {hadRecentDengue === 'sim' ? (
                    <p className="text-xs text-[#9A3412] font-medium leading-relaxed pt-2 border-t border-[#D6CEBE]">
                      <strong>Nota Técnica PNI/MS:</strong> Após infecção aguda por dengue, deve-se aguardar <strong>6 meses (180 dias)</strong> a partir do início dos sintomas para iniciar o esquema vacinal. Caso a infecção ocorra entre a 1ª e a 2ª dose, mantém-se o intervalo original desde que respeitado o mínimo de 30 dias após o quadro agudo.
                    </p>
                  ) : (
                    <p className="text-xs text-[#1C1917] leading-relaxed pt-2 border-t border-[#D6CEBE]">
                      <strong>Orientação ao Paciente:</strong> Registre o lembrete no aplicativo <strong>Meu SUS Digital</strong> e compareça à UBS com documento de identificação e Cartão Nacional de Saúde (CNS / CPF).
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Public Health Utility Ribbon (SUS Channels & Digital Pamphlet) */}
        <div className="mt-12 bg-white border border-[#D6CEBE] rounded-xl p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#0F4C3A]/10 text-[#0F4C3A] flex items-center justify-center shrink-0 mt-0.5">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-[#0F4C3A] font-semibold">
                Material Educativo Distribuído Gratuitamente na Ação Comunitária
              </div>
              <h4 className="text-base font-serif-editorial font-semibold text-[#1C1917]">
                Guia Comunitário Digital: “Dengue — Prevenção, Hidratação Precoce, Sinais de Alarme e Vacinação no SUS”
              </h4>
              <p className="text-xs text-[#57534E] mt-0.5">
                Elaborado pela Editora Mente e Saúde (CNPJ 51.372.335/0001-71) e Centro Profissionalizante Maria Dalva de Araújo (CNPJ 51.269.112/0001-83).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tabular shrink-0">
            <div className="flex items-center gap-1.5 text-[#1C1917]">
              <PhoneCall className="w-4 h-4 text-[#9A3412]" />
              <span>Disque Saúde: <strong>136</strong></span>
            </div>
            <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
            <div className="flex items-center gap-1.5 text-[#1C1917]">
              <Syringe className="w-4 h-4 text-[#1B365D]" />
              <span>App: <strong>Meu SUS Digital</strong></span>
            </div>
            <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
            <div className="text-[#9A3412] font-semibold">
              Urgência: <strong>UPA 24h / SAMU 192</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
