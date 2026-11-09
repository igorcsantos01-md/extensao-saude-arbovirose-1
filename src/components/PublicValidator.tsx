import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Search,
  Copy,
  Check,
  Download,
  AlertTriangle,
  FileSpreadsheet,
  ArrowUpRight,
} from 'lucide-react';
import {
  CERTIFICADO_06,
  LIVRO_REGISTROS_OFICIAIS,
  LivroRegistroResumo,
} from '../data/campaignData';
import { downloadCertificatePdf, getVerificationUrl } from '../utils/pdfGenerator';

interface PublicValidatorProps {
  externalQueryCode: string;
  onScrollToCertificate: () => void;
}

export const PublicValidator: React.FC<PublicValidatorProps> = ({
  externalQueryCode,
  onScrollToCertificate,
}) => {
  const [inputCode, setInputCode] = useState<string>(
    externalQueryCode || CERTIFICADO_06.codigo
  );
  const [validatedRecord, setValidatedRecord] =
    useState<LivroRegistroResumo | null>(LIVRO_REGISTROS_OFICIAIS[0]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const performLookup = (rawQuery: string) => {
    const clean = rawQuery.trim().toUpperCase();
    if (!clean) {
      setValidatedRecord(null);
      setNotFound(false);
      return;
    }

    const found = LIVRO_REGISTROS_OFICIAIS.find(
      (r) =>
        r.codigo.toUpperCase() === clean ||
        r.chave.toUpperCase() === clean ||
        r.hashSha256.toUpperCase() === clean
    );

    if (found) {
      setValidatedRecord(found);
      setNotFound(false);
      if (typeof window !== 'undefined') {
        const nextUrl = `${window.location.pathname}?codigo=${encodeURIComponent(
          found.codigo
        )}#validador`;
        window.history.replaceState({}, '', nextUrl);
      }
    } else {
      setValidatedRecord(null);
      setNotFound(true);
    }
  };

  useEffect(() => {
    if (externalQueryCode) {
      setInputCode(externalQueryCode);
      performLookup(externalQueryCode);
    }
  }, [externalQueryCode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(inputCode);
  };

  const handleCopyVerificationLink = () => {
    const codeToCopy = validatedRecord?.codigo || CERTIFICADO_06.codigo;
    const url = getVerificationUrl(codeToCopy);
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleDownloadValidatedPdf = async () => {
    try {
      setIsDownloading(true);
      await downloadCertificatePdf(CERTIFICADO_06);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section
      id="validador"
      className="py-16 border-b border-[#E5E0D5] bg-[#FBF9F5] scroll-mt-20"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#0F4C3A] font-semibold mb-2">
            <span>Sistema Integrado de Fé Pública Interinstitucional</span>
            <span aria-hidden="true">·</span>
            <span>Livro de Extensão nº 01/2024</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif-editorial font-semibold text-[#1C1917] tracking-tight">
            Validador Público de Autenticidade e Registro Curricular
          </h2>
          <p className="mt-2 text-base text-[#57534E] leading-relaxed">
            Consulte a integridade documental, o enquadramento no Item 08 (Campanhas Educativas, de Vacinação, Coleta de Dados Populacionais e Atividades Comunitárias) e a assinatura criptográfica SHA-256 informando o Código de Autenticidade ou a Chave de Controle.
          </p>
        </div>

        {/* Search & Verification Bar */}
        <div className="bg-white border border-[#D6CEBE] rounded-xl p-6 shadow-sm mb-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-stretch md:items-center gap-4"
          >
            <div className="flex-1">
              <label
                htmlFor="codigo-input"
                className="block text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-2"
              >
                Código do Certificado, Chave de Controle ou Hash SHA-256
              </label>
              <div className="relative">
                <input
                  id="codigo-input"
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Ex: EMS-CDP-2024-0614 ou 0614-8923-4410-7D4B"
                  className="w-full px-4 py-3 text-sm font-mono-tabular bg-[#FBF9F5] border border-[#D6CEBE] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#0F4C3A] focus:ring-1 focus:ring-[#0F4C3A]"
                />
              </div>
            </div>

            <div className="flex items-end gap-3 md:pt-6">
              <button
                type="submit"
                className="px-6 py-3 text-xs font-semibold text-white bg-[#0F4C3A] rounded-lg hover:bg-[#0B3B2D] transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Verificar Autenticidade</span>
              </button>

              <button
                type="button"
                onClick={handleCopyVerificationLink}
                className="px-4 py-3 text-xs font-semibold text-[#1C1917] bg-[#F3EFE6] border border-[#D6CEBE] rounded-lg hover:bg-[#E7E1D3] transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                title="Copiar URL direta com parâmetro ?codigo=EMS-CDP-2024-0614#validador"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-[#0F4C3A]" />
                    <span>Link Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar URL do Validador</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick-Test Selector Buttons */}
          <div className="mt-4 pt-4 border-t border-[#E5E0D5] flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#57534E] font-medium mr-1">
              Consulta rápida no Livro de Registros:
            </span>
            <button
              type="button"
              onClick={() => {
                setInputCode(CERTIFICADO_06.codigo);
                performLookup(CERTIFICADO_06.codigo);
              }}
              className={`px-3 py-1 rounded-md font-mono-tabular transition-colors cursor-pointer whitespace-nowrap ${
                validatedRecord?.codigo === CERTIFICADO_06.codigo
                  ? 'bg-[#0F4C3A] text-white font-semibold'
                  : 'bg-[#F3EFE6] text-[#1C1917] hover:bg-[#E5E0D5]'
              }`}
            >
              {CERTIFICADO_06.codigo} (Cert. Nº 06 — Atual)
            </button>
            <button
              type="button"
              onClick={() => {
                setInputCode(CERTIFICADO_06.chave);
                performLookup(CERTIFICADO_06.chave);
              }}
              className="px-3 py-1 rounded-md font-mono-tabular bg-[#F3EFE6] text-[#9A3412] hover:bg-[#E5E0D5] transition-colors cursor-pointer whitespace-nowrap"
            >
              Chave: {CERTIFICADO_06.chave}
            </button>
          </div>
        </div>

        {/* Validation Result Panel */}
        {notFound && (
          <div className="bg-red-50/80 border border-red-200 rounded-xl p-6 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-semibold text-red-950">
                Código ou Chave não localizado na base consultada
              </h3>
              <p className="text-sm text-red-800 mt-1">
                Verifique se o código foi digitado corretamente (ex.:{' '}
                <code className="font-mono-tabular font-semibold">
                  EMS-CDP-2024-0614
                </code>{' '}
                ou chave{' '}
                <code className="font-mono-tabular font-semibold">
                  0614-8923-4410-7D4B
                </code>
                ).
              </p>
            </div>
          </div>
        )}

        {validatedRecord && (
          <div className="bg-white border border-[#0F4C3A]/30 rounded-xl overflow-hidden shadow-sm">
            {/* Authenticated Banner Header */}
            <div className="bg-[#0F4C3A] text-white px-6 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-emerald-200 font-mono-tabular">
                    FÉ PÚBLICA INTERINSTITUCIONAL VERIFICADA · STATUS: ATIVO E REGULAR
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif-editorial font-semibold text-white">
                    Documento Autêntico — {validatedRecord.numeroCert} ({validatedRecord.codigo})
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={onScrollToCertificate}
                  className="px-4 py-2 text-xs font-semibold text-white bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                >
                  <span>Inspecionar Certificado no Leitor</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                {validatedRecord.isCurrentPortal && (
                  <button
                    type="button"
                    onClick={handleDownloadValidatedPdf}
                    disabled={isDownloading}
                    className="px-4 py-2 text-xs font-semibold text-[#1C1917] bg-amber-300 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>
                      {isDownloading ? 'Gerando PDF...' : 'Baixar PDF Autenticado'}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Structured Accession / Verification Definition Grid */}
            <div className="p-6 lg:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 border-b border-[#E5E0D5]">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#57534E] mb-1">
                    Profissional Titular Certificado
                  </div>
                  <div className="text-base font-bold text-[#1C1917]">
                    {validatedRecord.titular}
                  </div>
                  <div className="text-xs text-[#57534E] font-mono-tabular mt-0.5">
                    Médico · CPF: {validatedRecord.cpf} · Centro Universitário Alfredo Nasser (UNIFAN)
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-[#57534E] mb-1">
                    Registro no Livro de Extensão
                  </div>
                  <div className="text-base font-bold text-[#0F4C3A] font-mono-tabular">
                    {validatedRecord.numeroCert} · {validatedRecord.livroFolha}
                  </div>
                  <div className="text-xs text-[#57534E] font-mono-tabular mt-0.5">
                    Cód: {validatedRecord.codigo} · Chave: {validatedRecord.chave}
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-[#57534E] mb-1">
                    Período de Execução & Carga Horária
                  </div>
                  <div className="text-base font-bold text-[#1C1917]">
                    {validatedRecord.periodo} ({validatedRecord.cargaHoraria})
                  </div>
                  <div className="text-xs text-[#57534E] mt-0.5">
                    Expedido em Goiânia - GO, {validatedRecord.dataEmissao}
                  </div>
                </div>
              </div>

              {/* Action Title & Edital Framing */}
              <div className="py-6 border-b border-[#E5E0D5] grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                  <div className="text-xs uppercase tracking-wider text-[#57534E] mb-1">
                    Título Oficial da Atividade de Extensão Certificada
                  </div>
                  <p className="text-base font-serif-editorial font-semibold text-[#1C1917] leading-snug">
                    “{validatedRecord.titulo}”
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <div className="text-xs uppercase tracking-wider text-[#57534E] mb-1">
                    Enquadramento Curricular e Acadêmico
                  </div>
                  <p className="text-sm font-semibold text-[#1B365D] leading-snug">
                    {validatedRecord.enquadramento}
                  </p>
                </div>
              </div>

              {/* Matrix Breakdown when viewing Certificate 06 */}
              {validatedRecord.codigo === CERTIFICADO_06.codigo && (
                <div className="py-6 border-b border-[#E5E0D5]">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#0F4C3A] font-semibold mb-4">
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>
                      Detalhamento Metodológico Auditado — Matriz de 08 (Oito) Horas
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {CERTIFICADO_06.eixos.map((eixo) => (
                      <div
                        key={eixo.id}
                        className="p-4 rounded-lg bg-[#FBF9F5] border border-[#E5E0D5] flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-bold text-[#1B365D]">
                              {eixo.tituloLinha1} {eixo.tituloLinha2}
                            </span>
                            <span className="text-xs font-mono-tabular font-bold text-[#0F4C3A] shrink-0">
                              {eixo.cargaHoraria}
                            </span>
                          </div>
                          <p className="text-xs text-[#57534E] leading-relaxed mt-1">
                            {eixo.descricaoLinha1} {eixo.descricaoLinha2}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Institutional Signatories & Cryptographic Hash */}
              <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-1.5">
                  <div className="text-xs uppercase tracking-wider text-[#57534E]">
                    Instituições Promotoras e Signatários Responsáveis
                  </div>
                  <div className="text-xs text-[#1C1917]">
                    <strong>1. Editora Mente e Saúde</strong> (CNPJ: 51.372.335/0001-71) —{' '}
                    <em>Bárbara Lima dos Santos</em> (Editora-Chefe e Coordenadora de Extensão Editorial)
                  </div>
                  <div className="text-xs text-[#1C1917]">
                    <strong>2. Centro Profissionalizante Maria Dalva de Araújo</strong> (CNPJ: 51.269.112/0001-83) —{' '}
                    <em>James Araújo de Santana</em> (Coordenador de Extensão e Projetos Educativos)
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#F3EFE6] p-3.5 rounded-lg border border-[#D6CEBE]">
                  <div className="text-[11px] uppercase tracking-wider text-[#9A3412] font-semibold">
                    Resumo Criptográfico de Integridade (SHA-256)
                  </div>
                  <div className="font-mono-tabular text-xs text-[#1C1917] break-all mt-1 select-all">
                    {validatedRecord.hashSha256}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
