/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  Download,
  ShieldCheck,
  FileText,
  CheckCircle2,
  ClipboardList,
} from 'lucide-react';
import { CERTIFICADO_06 } from './data/campaignData';
import { CertificateViewer } from './components/CertificateViewer';
import { CampaignDossier } from './components/CampaignDossier';
import { PopulationQuiz } from './components/PopulationQuiz';
import { PublicValidator } from './components/PublicValidator';
import { downloadCertificatePdf } from './utils/pdfGenerator';

export default function App() {
  const [queryCode, setQueryCode] = useState<string>(CERTIFICADO_06.codigo);
  const [isDownloadingHero, setIsDownloadingHero] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const codeParam = params.get('codigo') || params.get('chave');
      if (codeParam) {
        setQueryCode(codeParam.trim().toUpperCase());
      }

      if (window.location.hash === '#validador' || codeParam) {
        setTimeout(() => {
          const el = document.getElementById('validador');
          if (el && window.location.hash === '#validador') {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    }
  }, []);

  const handleValidateClick = (codigo: string) => {
    setQueryCode(codigo);
    const el = document.getElementById('validador');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToCertificate = () => {
    const el = document.getElementById('certificado');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadTopCta = async () => {
    try {
      setIsDownloadingHero(true);
      await downloadCertificatePdf(CERTIFICADO_06);
    } finally {
      setIsDownloadingHero(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      {/* =====================================================================
          STRICT 3-ZONE TOP BAR CONTRACT
         ===================================================================== */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-[#E5E0D5] no-print">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#topo"
            className="text-base sm:text-lg font-serif-editorial font-bold tracking-tight text-[#0F4C3A] whitespace-nowrap shrink-0"
          >
            Programa Interinstitucional de Extensão em Saúde
          </a>

          {/* Zone 2: 4 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]">
            <a
              href="#certificado"
              className="hover:text-[#0F4C3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Certificado Nº 06
            </a>
            <a
              href="#campanha"
              className="hover:text-[#0F4C3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Campanha Educativa
            </a>
            <a
              href="#quiz-populacional"
              className="hover:text-[#0F4C3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Quiz Populacional
            </a>
            <a
              href="#validador"
              className="hover:text-[#0F4C3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Validador Oficial
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleDownloadTopCta}
              disabled={isDownloadingHero}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0F4C3A] rounded-lg hover:bg-[#0B3B2D] transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>
                {isDownloadingHero ? 'Gerando PDF...' : 'Baixar Certificado PDF'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          HERO & INSTITUTIONAL DOSSIER HEADER
         ===================================================================== */}
      <main id="topo" className="flex-1">
        <section className="py-12 lg:py-16 border-b border-[#E5E0D5] bg-[#FBF9F5]">
          <div className="max-w-[1280px] mx-auto px-6">
            {/* Unboxed Metadata Line */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#9A3412] font-semibold uppercase tracking-widest mb-4">
              <span>Registro Acadêmico de Extensão Nº 06</span>
              <span aria-hidden="true">·</span>
              <span>Livro nº 01/2024, Folha 39</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">Cód. {CERTIFICADO_06.codigo}</span>
              <span aria-hidden="true">·</span>
              <span>Item 08 Curricular</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Left Column: Campaign Title, Context & Primary CTA */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif-editorial font-semibold text-[#1C1917] leading-[1.15] tracking-tight text-balance">
                    Campanha Educativa Digital contra Arboviroses: Quiz Populacional sobre Prevenção da Dengue e Conscientização sobre a Vacina no SUS
                  </h1>

                  <p className="mt-5 text-base sm:text-lg text-[#57534E] leading-relaxed max-w-2xl">
                    Acervo público documental e educativo da ação extensionista conduzida pelo médico{' '}
                    <strong className="text-[#1C1917]">Lucas Gonçalves Silveira</strong>{' '}
                    (CPF: <span className="font-mono-tabular">702.794.941-57</span> · Centro Universitário Alfredo Nasser — UNIFAN) em parceria interinstitucional entre a{' '}
                    <strong className="text-[#0F4C3A]">Editora Mente e Saúde</strong> e o{' '}
                    <strong className="text-[#1B365D]">
                      Centro Profissionalizante Maria Dalva de Araújo
                    </strong>
                    , integrando coleta epidemiológica digital, combate a fake news e orientação vacinal no SUS.
                  </p>
                </div>

                {/* Primary Hero CTA Group */}
                <div className="mt-8 pt-6 border-t border-[#E5E0D5] flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={handleScrollToCertificate}
                    className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#0F4C3A] rounded-lg hover:bg-[#0B3B2D] transition-colors flex items-center gap-2 shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Visualizar Certificado Nº 06 (Frente e Verso)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleValidateClick(CERTIFICADO_06.codigo)}
                    className="px-5 py-3 text-xs sm:text-sm font-semibold text-[#1C1917] bg-[#F3EFE6] border border-[#D6CEBE] rounded-lg hover:bg-[#E7E1D3] transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#0F4C3A]" />
                    <span>Autenticar Código {CERTIFICADO_06.codigo}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Institutional & Extensionist Credential Card */}
              <div className="lg:col-span-5 bg-white border border-[#D6CEBE] rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between gap-4 pb-5 mb-5 border-b border-[#E5E0D5]">
                    <div className="flex items-center gap-3">
                      <img
                        src="/assets/cert/logo_ems.png"
                        alt="Brasão Editora Mente e Saúde"
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-contain shrink-0"
                      />
                      <img
                        src="/assets/cert/logo_cmda.png"
                        alt="Brasão Centro Profissionalizante Maria Dalva de Araújo"
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-contain shrink-0"
                      />
                    </div>
                    <div className="text-right font-mono-tabular">
                      <div className="text-[11px] uppercase tracking-wider text-[#0F4C3A] font-bold">
                        Fé Pública Ativa
                      </div>
                      <div className="text-xs font-bold text-[#1C1917]">
                        {CERTIFICADO_06.codigo}
                      </div>
                      <div className="text-[11px] text-[#9A3412]">
                        Chave: {CERTIFICADO_06.chave}
                      </div>
                    </div>
                  </div>

                  <dl className="space-y-3 text-xs">
                    <div className="flex justify-between gap-4 py-1.5 border-b border-[#E5E0D5]">
                      <dt className="text-[#57534E]">Profissional Extensionista</dt>
                      <dd className="font-bold text-[#1C1917] text-right">
                        {CERTIFICADO_06.titular}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4 py-1.5 border-b border-[#E5E0D5]">
                      <dt className="text-[#57534E]">Qualificação e Registro</dt>
                      <dd className="font-mono-tabular text-[#1C1917] text-right">
                        Médico · CPF {CERTIFICADO_06.cpf}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4 py-1.5 border-b border-[#E5E0D5]">
                      <dt className="text-[#57534E]">Instituição de Origem</dt>
                      <dd className="font-medium text-[#1C1917] text-right">
                        {CERTIFICADO_06.instituicaoOrigem}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4 py-1.5 border-b border-[#E5E0D5]">
                      <dt className="text-[#57534E]">Enquadramento Curricular</dt>
                      <dd className="font-semibold text-[#0F4C3A] text-right">
                        Item 08 (Campanha, Vacinação e Coleta)
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4 py-1.5">
                      <dt className="text-[#57534E]">Período e Carga Horária</dt>
                      <dd className="font-mono-tabular font-bold text-[#1B365D] text-right">
                        11 a 14/11/2024 · 08 (oito) horas
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5E0D5] flex items-center justify-between text-xs text-[#0F4C3A]">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Assinaturas e CNPJs Auditados</span>
                  </span>
                  <a
                    href="#quiz-populacional"
                    className="font-semibold hover:underline flex items-center gap-1 text-[#9A3412]"
                  >
                    <ClipboardList className="w-3.5 h-3.5" />
                    <span>Acessar Quiz (n = 412)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* 4-Column Quantitative Proof & Execution Strip */}
            <div className="mt-10 pt-8 border-t border-[#E5E0D5] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="text-xs uppercase tracking-wider text-[#57534E]">
                  01. Carga Horária Certificada
                </div>
                <div className="text-2xl font-serif-editorial font-bold text-[#0F4C3A] font-mono-tabular mt-1">
                  08h 00min
                </div>
                <div className="text-xs text-[#57534E] mt-0.5">
                  Distribuídas em 4 eixos práticos no Verso
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-[#57534E]">
                  02. Coleta Populacional Digital
                </div>
                <div className="text-2xl font-serif-editorial font-bold text-[#1B365D] font-mono-tabular mt-1">
                  412 Participantes
                </div>
                <div className="text-xs text-[#57534E] mt-0.5">
                  Inquérito sobre controle vetorial e vacina
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-[#57534E]">
                  03. Folhetos e Guias Entregues
                </div>
                <div className="text-2xl font-serif-editorial font-bold text-[#9A3412] font-mono-tabular mt-1">
                  389 Downloads
                </div>
                <div className="text-xs text-[#57534E] mt-0.5">
                  Guia de Sinais de Alarme e Proibição de AINEs
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-[#57534E]">
                  04. Registro de Fé Pública
                </div>
                <div className="text-2xl font-serif-editorial font-bold text-[#B45309] font-mono-tabular mt-1">
                  Livro 01/2024 · Fl. 39
                </div>
                <div className="text-xs text-[#57534E] mt-0.5">
                  Verificável via QR Code e Hash SHA-256
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 1: EMBEDDED PDF-STYLE CERTIFICATE VIEWER (FRENTE & VERSO)
           =================================================================== */}
        <CertificateViewer onValidateClick={handleValidateClick} />

        {/* ===================================================================
            SECTION 2: INTERACTIVE EDUCATIONAL CAMPAIGN DOSSIER
           =================================================================== */}
        <CampaignDossier />

        {/* ===================================================================
            SECTION 3: INTERACTIVE POPULATION DATA COLLECTION QUIZ
           =================================================================== */}
        <PopulationQuiz />

        {/* ===================================================================
            SECTION 4: PUBLIC AUTHENTICATOR & REGISTRY VALIDATOR (#validador)
           =================================================================== */}
        <PublicValidator
          externalQueryCode={queryCode}
          onScrollToCertificate={handleScrollToCertificate}
        />
      </main>

      {/* =====================================================================
          INSTITUTIONAL FOOTER
         ===================================================================== */}
      <footer className="bg-[#1C1917] text-[#D6CEBE] py-12 border-t border-[#292524] no-print">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-stone-800">
          <div className="md:col-span-6 space-y-2">
            <div className="text-base font-serif-editorial font-semibold text-white">
              Programa Interinstitucional de Extensão, Comunicação Científica e Educação em Saúde
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-xl">
              Certificação emitida em conformidade legal e estatutária pela{' '}
              <strong className="text-stone-200">
                Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)
              </strong>{' '}
              em parceria institucional com o{' '}
              <strong className="text-stone-200">
                Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)
              </strong>
              .
            </p>
          </div>

          <div className="md:col-span-3 space-y-1.5 text-xs">
            <div className="uppercase tracking-wider text-stone-400 font-semibold mb-2">
              Dados do Registro Nº 06
            </div>
            <div className="font-mono-tabular text-stone-300">
              Cód.: {CERTIFICADO_06.codigo}
            </div>
            <div className="font-mono-tabular text-amber-400">
              Chave: {CERTIFICADO_06.chave}
            </div>
            <div className="text-stone-400">
              Livro nº {CERTIFICADO_06.livro} · Folha {CERTIFICADO_06.folha}
            </div>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs">
            <div className="uppercase tracking-wider text-stone-400 font-semibold mb-2">
              Acesso Rápido
            </div>
            <div className="flex flex-col gap-1.5">
              <a href="#certificado" className="hover:text-white transition-colors">
                Leitor do Certificado Nº 06 (A4)
              </a>
              <a href="#campanha" className="hover:text-white transition-colors">
                Dossiê contra Arboviroses e Vacina SUS
              </a>
              <a href="#quiz-populacional" className="hover:text-white transition-colors">
                Quiz Populacional (n = 412)
              </a>
              <a href="#validador" className="hover:text-white transition-colors">
                Validador de Fé Pública (#validador)
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            Goiânia - GO · Documento Oficial de 2 Laudas (Frente e Verso) · Válido em Todo o Território Nacional
          </div>
          <div className="font-mono-tabular">
            SHA-256: {CERTIFICADO_06.hashSha256.slice(0, 24)}...
          </div>
        </div>
      </footer>
    </div>
  );
}
