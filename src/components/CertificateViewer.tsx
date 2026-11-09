import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import {
  Download,
  FileCheck2,
  Printer,
  ZoomIn,
  ZoomOut,
  FileText,
  Layers,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { CERTIFICADO_06, CertificadoRecord } from '../data/campaignData';
import {
  downloadCertificatePdf,
  generateCertificatePdfDoc,
  getBasePortalUrl,
  getVerificationUrl,
} from '../utils/pdfGenerator';

interface CertificateViewerProps {
  onValidateClick: (codigo: string) => void;
}

export const CertificateViewer: React.FC<CertificateViewerProps> = ({
  onValidateClick,
}) => {
  const cert: CertificadoRecord = CERTIFICADO_06;
  const [activeSheet, setActiveSheet] = useState<'both' | 'front' | 'back' | 'pdf-embed'>('both');
  const [zoom, setZoom] = useState<number>(100);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

  const verifyUrl = getVerificationUrl(cert.codigo);
  const basePortalUrl = getBasePortalUrl();
  const displayShortUrl =
    basePortalUrl.length > 38 ? basePortalUrl.slice(0, 38) : basePortalUrl;

  useEffect(() => {
    let mounted = true;
    QRCode.toDataURL(verifyUrl, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 360,
      color: {
        dark: '#0A1D56',
        light: '#FFFFFF',
      },
    })
      .then((url) => {
        if (mounted) setQrCodeUrl(url);
      })
      .catch(console.error);

    return () => {
      mounted = false;
    };
  }, [verifyUrl]);

  useEffect(() => {
    let currentBlobUrl: string | null = null;
    if (activeSheet === 'pdf-embed' && !pdfBlobUrl) {
      generateCertificatePdfDoc(cert)
        .then((doc) => {
          const blob = doc.output('blob');
          currentBlobUrl = URL.createObjectURL(blob);
          setPdfBlobUrl(currentBlobUrl);
        })
        .catch(console.error);
    }
    return () => {
      if (currentBlobUrl) {
        URL.revokeObjectURL(currentBlobUrl);
      }
    };
  }, [activeSheet, cert, pdfBlobUrl]);

  const handleDownloadPdf = async () => {
    try {
      setIsDownloading(true);
      await downloadCertificatePdf(cert);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section
      id="certificado"
      className="py-16 border-b border-[#E5E0D5] bg-[#F3EFE6]/60 scroll-mt-20"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9A3412] font-medium mb-2">
              <span>Documento Oficial de Extensão Universitária e Comunitária</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">Cód. {cert.codigo}</span>
              <span aria-hidden="true">·</span>
              <span>Formato A4 Paisagem (2 Laudas)</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif-editorial font-semibold text-[#1C1917] tracking-tight">
              Certificado de Atividade de Extensão Nº 06
            </h2>
            <p className="mt-2 text-base text-[#57534E] max-w-2xl leading-relaxed">
              Visualização integral da Frente e do Verso (Memorial Descritivo de 08 horas — Item 08) com logotipos institucionais higienizados, assinaturas oficiais, selo de fé pública e QR Code vinculado ao validador deste portal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onValidateClick(cert.codigo)}
              className="px-4 py-2.5 text-xs font-semibold text-[#0F4C3A] bg-white border border-[#0F4C3A]/30 rounded-lg hover:bg-[#0F4C3A]/5 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Verificar Fé Pública ({cert.codigo})</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2.5 text-xs font-semibold text-[#1C1917] bg-white border border-[#D6CEBE] rounded-lg hover:bg-[#FBF9F5] transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir A4</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0F4C3A] rounded-lg hover:bg-[#0B3B2D] transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>PDF Oficial Baixado com Sucesso</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>
                    {isDownloading
                      ? 'Gerando PDF Vetorial...'
                      : 'Baixar Certificado em PDF (2 Laudas)'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Interactive PDF Reader Chrome Bar */}
        <div className="bg-[#1C1917] text-[#FBF9F5] rounded-t-xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 border border-[#1C1917]">
          <div className="flex items-center gap-3 text-xs">
            <FileText className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-mono-tabular font-medium truncate max-w-[260px] sm:max-w-md">
              Certificado_Extensao_06_{cert.codigo}_Lucas_Goncalves_Silveira.pdf
            </span>
            <span className="text-stone-400 hidden sm:inline" aria-hidden="true">
              ·
            </span>
            <span className="text-stone-300 hidden sm:inline font-mono-tabular">
              2 Laudas (297mm × 210mm)
            </span>
          </div>

          {/* Segmented View Controls */}
          <div className="flex items-center gap-1 bg-stone-800 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveSheet('both')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeSheet === 'both'
                  ? 'bg-[#0F4C3A] text-white'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Frente + Verso</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSheet('front')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeSheet === 'front'
                  ? 'bg-[#0F4C3A] text-white'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <span>Lauda 1 (Frente)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSheet('back')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeSheet === 'back'
                  ? 'bg-[#0F4C3A] text-white'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <span>Lauda 2 (Memorial)</span>
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="hidden md:flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(75, z - 10))}
              className="p-1.5 rounded bg-stone-800 text-stone-200 hover:bg-stone-700 transition-colors cursor-pointer"
              title="Reduzir Zoom"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono-tabular w-12 text-center text-stone-200">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(115, z + 10))}
              className="p-1.5 rounded bg-stone-800 text-stone-200 hover:bg-stone-700 transition-colors cursor-pointer"
              title="Ampliar Zoom"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoom(100)}
              className="px-2 py-1 text-[11px] bg-stone-800 text-stone-300 rounded hover:text-white cursor-pointer whitespace-nowrap"
            >
              Ajustar 100%
            </button>
          </div>
        </div>

        {/* Document Viewport Container */}
        <div className="bg-[#292524] p-4 sm:p-8 rounded-b-xl border-x border-b border-[#1C1917] overflow-x-auto">
          <div
            className="mx-auto transition-all duration-150 space-y-8"
            style={{
              maxWidth: `${Math.round(1120 * (zoom / 100))}px`,
            }}
          >
            {/* ==============================================================
                LAUDA 1 — FRENTE DO CERTIFICADO (SVG A4 297x210mm)
               ============================================================== */}
            {(activeSheet === 'both' || activeSheet === 'front') && (
              <div className="relative bg-[#FFFDFA] shadow-2xl rounded-sm overflow-hidden">
                <svg
                  viewBox="0 0 297 210"
                  className="w-full h-auto block select-text"
                  role="img"
                  aria-label="Frente do Certificado de Atividade de Extensão Nº 06 — Lucas Gonçalves Silveira"
                >
                  {/* Academic Cream Canvas */}
                  <rect x="0" y="0" width="297" height="210" fill="#FFFDFA" />

                  {/* Triple Institutional Frame */}
                  <rect
                    x="5"
                    y="5"
                    width="287"
                    height="200"
                    fill="none"
                    stroke="#064E3B"
                    strokeWidth="0.8"
                  />
                  <rect
                    x="6.8"
                    y="6.8"
                    width="283.4"
                    height="196.4"
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="0.35"
                  />
                  <rect
                    x="8.2"
                    y="8.2"
                    width="280.6"
                    height="193.6"
                    fill="none"
                    stroke="#0A1D56"
                    strokeWidth="0.5"
                  />

                  {/* Top Left Institution: Editora Mente e Saúde */}
                  <image
                    href="/assets/cert/logo_ems.png"
                    x="14"
                    y="12"
                    width="20"
                    height="20"
                  />
                  <text
                    x="37"
                    y="18"
                    fill="#064E3B"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="3.1"
                  >
                    EDITORA MENTE E SAÚDE
                  </text>
                  <text
                    x="37"
                    y="22.5"
                    fill="#0F172A"
                    fontFamily="IBM Plex Mono, Courier New, monospace"
                    fontWeight="700"
                    fontSize="2.65"
                  >
                    CNPJ: 51.372.335/0001-71
                  </text>
                  <text
                    x="37"
                    y="26.5"
                    fill="#0D9488"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontWeight="500"
                    fontSize="2.5"
                  >
                    Conselho Editorial e Extensão Científica
                  </text>

                  {/* Top Center: Programa Interinstitucional */}
                  <text
                    x="148.5"
                    y="17"
                    textAnchor="middle"
                    fill="#064E3B"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="3.0"
                  >
                    PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO, COMUNICAÇÃO CIENTÍFICA
                  </text>
                  <text
                    x="148.5"
                    y="21.2"
                    textAnchor="middle"
                    fill="#064E3B"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="3.0"
                  >
                    E EDUCAÇÃO EM SAÚDE
                  </text>
                  <text
                    x="148.5"
                    y="26.2"
                    textAnchor="middle"
                    fill="#0A1D56"
                    fontFamily="IBM Plex Mono, Courier New, monospace"
                    fontWeight="700"
                    fontSize="2.65"
                  >
                    {`Certificado Nº ${cert.numero} · Livro de Extensão nº ${cert.livro} · Cód. ${cert.codigo}`}
                  </text>

                  {/* Top Right Institution: Centro Profissionalizante Maria Dalva de Araújo */}
                  <image
                    href="/assets/cert/logo_cmda.png"
                    x="263"
                    y="12"
                    width="20"
                    height="20"
                  />
                  <text
                    x="260"
                    y="17.5"
                    textAnchor="end"
                    fill="#0A1D56"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="3.0"
                  >
                    CENTRO PROFISSIONALIZANTE
                  </text>
                  <text
                    x="260"
                    y="21.8"
                    textAnchor="end"
                    fill="#0A1D56"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="3.0"
                  >
                    MARIA DALVA DE ARAÚJO
                  </text>
                  <text
                    x="260"
                    y="26.2"
                    textAnchor="end"
                    fill="#0F172A"
                    fontFamily="IBM Plex Mono, Courier New, monospace"
                    fontWeight="700"
                    fontSize="2.65"
                  >
                    CNPJ: 51.269.112/0001-83
                  </text>

                  {/* Header Horizontal Rule */}
                  <line
                    x1="14"
                    y1="35"
                    x2="283"
                    y2="35"
                    stroke="#064E3B"
                    strokeWidth="0.25"
                  />

                  {/* Main Title */}
                  <text
                    x="148.5"
                    y="47"
                    textAnchor="middle"
                    fill="#064E3B"
                    fontFamily="Fraunces, Georgia, Times New Roman, serif"
                    fontWeight="700"
                    fontSize="8.5"
                    letterSpacing="0.15"
                  >
                    CERTIFICADO DE ATIVIDADE DE EXTENSÃO
                  </text>
                  <line
                    x1="95"
                    y1="50"
                    x2="202"
                    y2="50"
                    stroke="#D97706"
                    strokeWidth="0.5"
                  />

                  {/* Institutional Certification Clause */}
                  <text
                    x="148.5"
                    y="58.2"
                    textAnchor="middle"
                    fill="#0F172A"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontSize="3.65"
                  >
                    A <tspan fontWeight="700">Editora Mente e Saúde</tspan> (CNPJ: 51.372.335/0001-71), em parceria institucional com o <tspan fontWeight="700">Centro Profissionalizante Maria Dalva de Araújo</tspan> (CNPJ:
                  </text>
                  <text
                    x="148.5"
                    y="62.6"
                    textAnchor="middle"
                    fill="#0F172A"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontSize="3.65"
                  >
                    51.269.112/0001-83), certifica para os devidos fins de comprovação curricular e acadêmica que
                  </text>

                  {/* Recipient Highlight Box */}
                  <rect
                    x="24"
                    y="67"
                    width="249"
                    height="21"
                    fill="#ECFDF5"
                    stroke="#D97706"
                    strokeWidth="0.3"
                  />
                  <text
                    x="148.5"
                    y="77"
                    textAnchor="middle"
                    fill="#0A1D56"
                    fontFamily="Fraunces, Georgia, Times New Roman, serif"
                    fontWeight="700"
                    fontSize="8.1"
                    letterSpacing="0.2"
                  >
                    {cert.titular}
                  </text>
                  <text
                    x="148.5"
                    y="84.2"
                    textAnchor="middle"
                    fill="#0F172A"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="3.5"
                  >
                    {`${cert.qualificacao}  |  CPF: ${cert.cpf}  |  ${cert.instituicaoOrigem}`}
                  </text>

                  {/* Body Paragraph 1 with Dynamic Bold Keywords for FUBOG Evaluation */}
                  <text
                    x="24.5"
                    y="96.5"
                    fill="#0F172A"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontSize="3.48"
                  >
                    participou de forma efetiva da <tspan fontWeight="700">Atividade de Extensão</tspan> intitulada <tspan fontWeight="700">"Campanha Educativa Digital contra Arboviroses: Quiz Populacional sobre Prevenção da</tspan>
                  </text>
                  <text
                    x="24.5"
                    y="101.0"
                    fill="#0F172A"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontSize="3.48"
                  >
                    <tspan fontWeight="700">Dengue e Conscientização sobre a Vacina no SUS"</tspan>, desenvolvida na modalidade de <tspan fontWeight="700">Campanha Educativa, de Vacinação, Coleta de Dados Populacionais e</tspan>
                  </text>
                  <text
                    x="24.5"
                    y="105.5"
                    fill="#0F172A"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontSize="3.48"
                  >
                    <tspan fontWeight="700">Atividade Comunitária</tspan>, realizada no período de <tspan fontWeight="700">11 a 14 de novembro de 2024</tspan>, contabilizando carga horária total de <tspan fontWeight="700">08 (oito) horas</tspan>.
                  </text>

                  {/* Body Paragraph 2 */}
                  <text
                    x="24.5"
                    y="114.5"
                    fill="#0F172A"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontSize="3.48"
                  >
                    No âmbito desta ação extensionista, o profissional atuou na aplicação de <tspan fontWeight="700">quiz educativo digital para coleta de dados populacionais</tspan> sobre controle vetorial do
                  </text>
                  <text
                    x="24.5"
                    y="119.0"
                    fill="#0F172A"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontSize="3.48"
                  >
                    Aedes aegypti, <tspan fontWeight="700">distribuição gratuita de folheto digital</tspan> sobre sinais de alarme e risco de automedicação, <tspan fontWeight="700">comunicação científica para combate a fake news</tspan> e
                  </text>
                  <text
                    x="24.5"
                    y="123.5"
                    fill="#0F172A"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontSize="3.48"
                  >
                    orientação comunitária sobre os <tspan fontWeight="700">grupos prioritários e esquema de duas doses da vacina contra a dengue nos canais oficiais do SUS</tspan>.
                  </text>

                  {/* Location and Emission Date */}
                  <text
                    x="148.5"
                    y="136.5"
                    textAnchor="middle"
                    fill="#0F172A"
                    fontFamily="Fraunces, Georgia, Times New Roman, serif"
                    fontStyle="italic"
                    fontWeight="600"
                    fontSize="4.6"
                  >
                    {`Goiânia - GO, ${cert.dataEmissao}.`}
                  </text>

                  {/* Left Signature: Bárbara Lima dos Santos */}
                  <image
                    href="/assets/cert/sig_barbara.png"
                    x="22"
                    y="149"
                    width="64"
                    height="18"
                  />
                  <line
                    x1="15"
                    y1="168.5"
                    x2="93"
                    y2="168.5"
                    stroke="#0F172A"
                    strokeWidth="0.35"
                  />
                  <text
                    x="54"
                    y="173"
                    textAnchor="middle"
                    fill="#064E3B"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="2.75"
                  >
                    BÁRBARA LIMA DOS SANTOS
                  </text>
                  <text
                    x="54"
                    y="176.8"
                    textAnchor="middle"
                    fill="#0F172A"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontSize="2.4"
                  >
                    Editora-Chefe e Coordenadora de Extensão Editorial
                  </text>
                  <text
                    x="54"
                    y="180.5"
                    textAnchor="middle"
                    fill="#064E3B"
                    fontFamily="IBM Plex Mono, Courier New, monospace"
                    fontWeight="700"
                    fontSize="2.2"
                  >
                    Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)
                  </text>

                  {/* Center Golden Seal of Fé Pública */}
                  <circle
                    cx="109"
                    cy="165"
                    r="11.5"
                    fill="#FFF2C7"
                    stroke="#D97706"
                    strokeWidth="0.6"
                  />
                  <circle
                    cx="109"
                    cy="165"
                    r="10.2"
                    fill="none"
                    stroke="#B45309"
                    strokeWidth="0.2"
                    strokeDasharray="0.8 0.6"
                  />
                  <text
                    x="109"
                    y="161.2"
                    textAnchor="middle"
                    fill="#78350F"
                    fontFamily="Fraunces, Georgia, serif"
                    fontWeight="700"
                    fontSize="2.3"
                  >
                    SELO OFICIAL
                  </text>
                  <text
                    x="109"
                    y="165.2"
                    textAnchor="middle"
                    fill="#78350F"
                    fontFamily="Fraunces, Georgia, serif"
                    fontWeight="700"
                    fontSize="2.8"
                  >
                    FÉ PÚBLICA
                  </text>
                  <text
                    x="109"
                    y="169.5"
                    textAnchor="middle"
                    fill="#78350F"
                    fontFamily="IBM Plex Mono, Courier New, monospace"
                    fontWeight="700"
                    fontSize="1.95"
                  >
                    {cert.codigo}
                  </text>

                  {/* Center QR Code Box */}
                  <g
                    onClick={() => onValidateClick(cert.codigo)}
                    className="cursor-pointer"
                  >
                    <rect
                      x="123.5"
                      y="151.5"
                      width="25"
                      height="25"
                      fill="#FFFFFF"
                      stroke="#064E3B"
                      strokeWidth="0.25"
                    />
                    {qrCodeUrl && (
                      <image
                        href={qrCodeUrl}
                        x="124.5"
                        y="152.5"
                        width="23"
                        height="23"
                      />
                    )}
                  </g>

                  {/* Manual Authentication Box */}
                  <rect
                    x="150.5"
                    y="151.5"
                    width="49"
                    height="25"
                    fill="#FFFFFF"
                    stroke="#064E3B"
                    strokeWidth="0.25"
                  />
                  <text
                    x="152.5"
                    y="155.5"
                    fill="#064E3B"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="2.1"
                  >
                    AUTENTICAÇÃO PÚBLICA MANUAL
                  </text>
                  <text
                    x="152.5"
                    y="159.8"
                    fill="#0F172A"
                    fontFamily="IBM Plex Mono, Courier New, monospace"
                    fontWeight="700"
                    fontSize="2.2"
                  >
                    {`Cód.: ${cert.codigo}`}
                  </text>
                  <text
                    x="152.5"
                    y="163.8"
                    fill="#92400E"
                    fontFamily="IBM Plex Mono, Courier New, monospace"
                    fontWeight="700"
                    fontSize="2.2"
                  >
                    {`Chave: ${cert.chave}`}
                  </text>
                  <text
                    x="152.5"
                    y="167.8"
                    fill="#0A1D56"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="1.95"
                  >
                    Endereço p/ Verificação Online:
                  </text>
                  <text
                    x="152.5"
                    y="171.5"
                    fill="#0F172A"
                    fontFamily="IBM Plex Mono, Courier New, monospace"
                    fontSize="1.75"
                  >
                    {displayShortUrl}
                  </text>

                  {/* Right Signature: James Araújo de Santana */}
                  <image
                    href="/assets/cert/sig_james.png"
                    x="210"
                    y="149"
                    width="64"
                    height="18"
                  />
                  <line
                    x1="203"
                    y1="168.5"
                    x2="282"
                    y2="168.5"
                    stroke="#0F172A"
                    strokeWidth="0.35"
                  />
                  <text
                    x="242.5"
                    y="173"
                    textAnchor="middle"
                    fill="#0A1D56"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="2.75"
                  >
                    JAMES ARAÚJO DE SANTANA
                  </text>
                  <text
                    x="242.5"
                    y="176.8"
                    textAnchor="middle"
                    fill="#0F172A"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontSize="2.4"
                  >
                    Coordenador de Extensão e Projetos Educativos
                  </text>
                  <text
                    x="242.5"
                    y="180.5"
                    textAnchor="middle"
                    fill="#0A1D56"
                    fontFamily="IBM Plex Mono, Courier New, monospace"
                    fontWeight="700"
                    fontSize="2.08"
                  >
                    Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)
                  </text>

                  {/* Bottom Verification Line */}
                  <text
                    x="148.5"
                    y="191.5"
                    textAnchor="middle"
                    fill="#064E3B"
                    fontFamily="IBM Plex Mono, Courier New, monospace"
                    fontWeight="700"
                    fontSize="2.2"
                  >
                    {`Verifique via QR Code ou acesse ${displayShortUrl} informando o Código ${cert.codigo} ou Chave ${cert.chave}`}
                  </text>
                </svg>
              </div>
            )}

            {/* ==============================================================
                LAUDA 2 — VERSO / MEMORIAL DESCRITIVO (SVG A4 297x210mm)
               ============================================================== */}
            {(activeSheet === 'both' || activeSheet === 'back') && (
              <div className="relative bg-[#FFFDFA] shadow-2xl rounded-sm overflow-hidden">
                <svg
                  viewBox="0 0 297 210"
                  className="w-full h-auto block select-text"
                  role="img"
                  aria-label="Verso do Certificado Nº 06 — Memorial Descritivo e Registro Acadêmico"
                >
                  {/* Academic Cream Canvas */}
                  <rect x="0" y="0" width="297" height="210" fill="#FFFDFA" />

                  {/* Triple Institutional Frame */}
                  <rect
                    x="5"
                    y="5"
                    width="287"
                    height="200"
                    fill="none"
                    stroke="#064E3B"
                    strokeWidth="0.8"
                  />
                  <rect
                    x="6.8"
                    y="6.8"
                    width="283.4"
                    height="196.4"
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="0.35"
                  />
                  <rect
                    x="8.2"
                    y="8.2"
                    width="280.6"
                    height="193.6"
                    fill="none"
                    stroke="#0A1D56"
                    strokeWidth="0.5"
                  />

                  {/* Page 2 Header Logos & Title */}
                  <image
                    href="/assets/cert/logo_ems.png"
                    x="14"
                    y="12"
                    width="13"
                    height="13"
                  />
                  <image
                    href="/assets/cert/logo_cmda.png"
                    x="29"
                    y="12"
                    width="13"
                    height="13"
                  />
                  <text
                    x="46"
                    y="17.5"
                    fill="#064E3B"
                    fontFamily="Fraunces, Georgia, Times New Roman, serif"
                    fontWeight="700"
                    fontSize="4.75"
                  >
                    MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE DE EXTENSÃO
                  </text>
                  <text
                    x="46"
                    y="22.5"
                    fill="#0F172A"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontSize="3.0"
                  >
                    {`Verso Oficial do Certificado Nº ${cert.numero} · Fé Pública Interinstitucional e Validação Curricular`}
                  </text>

                  <line
                    x1="14"
                    y1="28"
                    x2="283"
                    y2="28"
                    stroke="#064E3B"
                    strokeWidth="0.5"
                  />

                  {/* Box 1: Dados de Identificação do Profissional Extensionista */}
                  <rect
                    x="14"
                    y="31"
                    width="155"
                    height="31"
                    fill="#FFFFFF"
                    stroke="#064E3B"
                    strokeWidth="0.25"
                  />
                  <text
                    x="18"
                    y="36.2"
                    fill="#064E3B"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="2.9"
                  >
                    1. DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL EXTENSIONISTA
                  </text>
                  <text
                    x="18"
                    y="42.2"
                    fill="#0F172A"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontSize="2.95"
                  >
                    Titular Certificado: <tspan fontWeight="700">{cert.titular}</tspan>
                  </text>
                  <text
                    x="18"
                    y="47.4"
                    fill="#0F172A"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontSize="2.95"
                  >
                    CPF Registrado: <tspan fontWeight="700">{cert.cpf}</tspan>
                  </text>
                  <text
                    x="18"
                    y="52.6"
                    fill="#0F172A"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontSize="2.95"
                  >
                    Qualificação Profissional: <tspan fontWeight="700">{cert.qualificacao}</tspan>
                  </text>
                  <text
                    x="18"
                    y="57.8"
                    fill="#0F172A"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontSize="2.95"
                  >
                    Instituição de Origem: <tspan fontWeight="700">{cert.instituicaoOrigem}</tspan>
                  </text>

                  {/* Box 2: Enquadramento Curricular e Pontuação */}
                  <rect
                    x="173"
                    y="31"
                    width="110"
                    height="31"
                    fill="#F0F5FF"
                    stroke="#0A1D56"
                    strokeWidth="0.25"
                  />
                  <text
                    x="177"
                    y="36.2"
                    fill="#0A1D56"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="2.9"
                  >
                    2. ENQUADRAMENTO CURRICULAR E PONTUAÇÃO
                  </text>
                  <text
                    x="177"
                    y="42.5"
                    fill="#0F172A"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="2.9"
                  >
                    Item 08 - Atividades de Extensão: Campanhas educativas, de vacinação,
                  </text>
                  <text
                    x="177"
                    y="46.5"
                    fill="#0F172A"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="2.9"
                  >
                    coleta de dados populacionais e atividades comunitárias
                  </text>
                  <text
                    x="177"
                    y="58"
                    fill="#064E3B"
                    fontFamily="IBM Plex Mono, Courier New, monospace"
                    fontWeight="700"
                    fontSize="2.9"
                  >
                    {`Período: ${cert.periodoCurto} | Total: ${cert.cargaHorariaTotal}`}
                  </text>

                  {/* Box 3: Matriz de Atividades Práticas e Metodologia Extensionista */}
                  <rect
                    x="14"
                    y="65"
                    width="269"
                    height="7.5"
                    fill="#ECFDF5"
                    stroke="#064E3B"
                    strokeWidth="0.25"
                  />
                  <text
                    x="18"
                    y="70.2"
                    fill="#064E3B"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="2.9"
                  >
                    3. MATRIZ DE ATIVIDADES PRÁTICAS E METODOLOGIA EXTENSIONISTA (08 HORAS)
                  </text>

                  {cert.eixos.map((eixo, idx) => {
                    const rowTop = 72.5 + idx * 14;
                    return (
                      <g key={eixo.id}>
                        <rect
                          x="14"
                          y={rowTop}
                          width="269"
                          height="14"
                          fill="#FFFFFF"
                          stroke="#CCD6E0"
                          strokeWidth="0.25"
                        />
                        <line
                          x1="93"
                          y1={rowTop}
                          x2="93"
                          y2={rowTop + 14}
                          stroke="#E3E8F0"
                          strokeWidth="0.25"
                        />
                        <line
                          x1="258"
                          y1={rowTop}
                          x2="258"
                          y2={rowTop + 14}
                          stroke="#E3E8F0"
                          strokeWidth="0.25"
                        />
                        <text
                          x="17"
                          y={rowTop + 4.5}
                          fill="#0A1D56"
                          fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                          fontWeight="700"
                          fontSize="2.62"
                        >
                          {eixo.tituloLinha1}
                        </text>
                        <text
                          x="17"
                          y={rowTop + 7.7}
                          fill="#0A1D56"
                          fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                          fontWeight="700"
                          fontSize="2.62"
                        >
                          {eixo.tituloLinha2}
                        </text>
                        <text
                          x="17"
                          y={rowTop + 11.8}
                          fill="#475569"
                          fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                          fontSize="2.35"
                        >
                          {eixo.subtitulo}
                        </text>
                        <text
                          x="96"
                          y={rowTop + 5.2}
                          fill="#0F172A"
                          fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                          fontSize="2.65"
                        >
                          {eixo.descricaoLinha1}
                        </text>
                        <text
                          x="96"
                          y={rowTop + 9.2}
                          fill="#0F172A"
                          fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                          fontSize="2.65"
                        >
                          {eixo.descricaoLinha2}
                        </text>
                        <text
                          x="263.5"
                          y={rowTop + 8.2}
                          fill="#064E3B"
                          fontFamily="IBM Plex Mono, Courier New, monospace"
                          fontWeight="700"
                          fontSize="2.9"
                        >
                          {eixo.cargaHoraria}
                        </text>
                      </g>
                    );
                  })}

                  {/* Box 4: Registro Oficial de Fé Pública */}
                  <rect
                    x="14"
                    y="131.5"
                    width="269"
                    height="31"
                    fill="#FFFAEB"
                    stroke="#D97706"
                    strokeWidth="0.35"
                  />
                  <text
                    x="18"
                    y="136.8"
                    fill="#92400E"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="2.9"
                  >
                    4. REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE VERIFICAÇÃO DE AUTENTICIDADE
                  </text>
                  <text
                    x="18"
                    y="142.0"
                    fill="#0F172A"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontSize="2.75"
                  >
                    Certificado registrado sob o <tspan fontWeight="700">nº {cert.numero}</tspan> no <tspan fontWeight="700">Livro de Extensão nº {cert.livro}, Folha {cert.folha}</tspan>, expedido pela <tspan fontWeight="700">Editora Mente e Saúde</tspan> (CNPJ: 51.372.335/0001-71) e <tspan fontWeight="700">Centro Profissionalizante Maria Dalva de</tspan>
                  </text>
                  <text
                    x="18"
                    y="145.3"
                    fill="#0F172A"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontSize="2.75"
                  >
                    <tspan fontWeight="700">Araújo</tspan> (CNPJ: 51.269.112/0001-83).
                  </text>
                  <text
                    x="18"
                    y="150.2"
                    fill="#064E3B"
                    fontFamily="IBM Plex Mono, Courier New, monospace"
                    fontWeight="700"
                    fontSize="2.65"
                  >
                    {`CÓDIGO DE AUTENTICIDADE: ${cert.codigo}   |   CHAVE DE CONTROLE / DÍGITO: ${cert.chave}`}
                  </text>
                  <text
                    x="18"
                    y="155.0"
                    fill="#0A1D56"
                    fontFamily="IBM Plex Mono, Courier New, monospace"
                    fontWeight="700"
                    fontSize="2.45"
                  >
                    {`ENDEREÇO PARA VERIFICAÇÃO MANUAL (SEM QR CODE): ${verifyUrl.slice(0, 92)}`}
                  </text>
                  <text
                    x="18"
                    y="159.8"
                    fill="#0F172A"
                    fontFamily="IBM Plex Mono, Courier New, monospace"
                    fontWeight="700"
                    fontSize="2.45"
                  >
                    {`HASH SHA-256: ${cert.hashSha256}`}
                  </text>

                  {/* Page 2 QR Code */}
                  <g
                    onClick={() => onValidateClick(cert.codigo)}
                    className="cursor-pointer"
                  >
                    <rect
                      x="253.5"
                      y="134"
                      width="26"
                      height="26"
                      fill="#FFFFFF"
                      stroke="#064E3B"
                      strokeWidth="0.25"
                    />
                    {qrCodeUrl && (
                      <image
                        href={qrCodeUrl}
                        x="254.5"
                        y="135"
                        width="24"
                        height="24"
                      />
                    )}
                  </g>

                  {/* Page 2 Bottom Left Signature */}
                  <image
                    href="/assets/cert/sig_barbara.png"
                    x="26"
                    y="164"
                    width="54"
                    height="15"
                  />
                  <line
                    x1="18"
                    y1="180"
                    x2="92"
                    y2="180"
                    stroke="#0F172A"
                    strokeWidth="0.35"
                  />
                  <text
                    x="55"
                    y="184.2"
                    textAnchor="middle"
                    fill="#064E3B"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="2.7"
                  >
                    BÁRBARA LIMA DOS SANTOS
                  </text>
                  <text
                    x="55"
                    y="188"
                    textAnchor="middle"
                    fill="#064E3B"
                    fontFamily="IBM Plex Mono, Courier New, monospace"
                    fontWeight="700"
                    fontSize="2.2"
                  >
                    Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)
                  </text>

                  {/* Page 2 Bottom Center Info */}
                  <text
                    x="148.5"
                    y="179.5"
                    textAnchor="middle"
                    fill="#0F172A"
                    fontFamily="Fraunces, Georgia, Times New Roman, serif"
                    fontStyle="italic"
                    fontWeight="600"
                    fontSize="3.7"
                  >
                    {`Goiânia - GO, ${cert.dataEmissao}.`}
                  </text>
                  <text
                    x="148.5"
                    y="184.2"
                    textAnchor="middle"
                    fill="#475569"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="2.4"
                  >
                    Documento Oficial de 2 Laudas (Frente e Verso) · Válido em Todo o Território Nacional
                  </text>
                  <text
                    x="148.5"
                    y="188"
                    textAnchor="middle"
                    fill="#064E3B"
                    fontFamily="IBM Plex Mono, Courier New, monospace"
                    fontSize="2.2"
                  >
                    {`Registro: ${cert.codigo} · Chave: ${cert.chave}`}
                  </text>

                  {/* Page 2 Bottom Right Signature */}
                  <image
                    href="/assets/cert/sig_james.png"
                    x="215"
                    y="164"
                    width="54"
                    height="15"
                  />
                  <line
                    x1="204"
                    y1="180"
                    x2="279"
                    y2="180"
                    stroke="#0F172A"
                    strokeWidth="0.35"
                  />
                  <text
                    x="241.5"
                    y="184.2"
                    textAnchor="middle"
                    fill="#0A1D56"
                    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="2.7"
                  >
                    JAMES ARAÚJO DE SANTANA
                  </text>
                  <text
                    x="241.5"
                    y="188"
                    textAnchor="middle"
                    fill="#0A1D56"
                    fontFamily="IBM Plex Mono, Courier New, monospace"
                    fontWeight="700"
                    fontSize="2.2"
                  >
                    Centro Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)
                  </text>
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Metadata & Verification Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-[#57534E] px-1">
          <div className="flex flex-wrap items-center gap-2">
            <span>Titular: <strong className="text-[#1C1917]">{cert.titular}</strong></span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">CPF: {cert.cpf}</span>
            <span aria-hidden="true">·</span>
            <span>Registro: Livro {cert.livro}, Folha {cert.folha}</span>
          </div>
          <button
            type="button"
            onClick={() => onValidateClick(cert.codigo)}
            className="text-[#0F4C3A] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>Abrir Laudo no Validador de Fé Pública ({cert.codigo})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
