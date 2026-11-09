import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { CertificadoRecord } from '../data/campaignData';

async function loadImageAsDataUrl(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function getVerificationUrl(codigo: string): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}/?codigo=${encodeURIComponent(codigo)}#validador`;
  }
  return `https://extensao-arboviroses-sus.vercel.app/?codigo=${encodeURIComponent(codigo)}#validador`;
}

export function getBasePortalUrl(): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}/`;
  }
  return 'https://extensao-arboviroses-sus.vercel.app/';
}

export async function generateCertificatePdfDoc(cert: CertificadoRecord): Promise<jsPDF> {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const verifyUrl = getVerificationUrl(cert.codigo);
  const basePortalUrl = getBasePortalUrl();

  const [logoEms, logoCmda, sigBarbara, sigJames, qrDataUrl] = await Promise.all([
    loadImageAsDataUrl('/assets/cert/logo_ems.png'),
    loadImageAsDataUrl('/assets/cert/logo_cmda.png'),
    loadImageAsDataUrl('/assets/cert/sig_barbara.png'),
    loadImageAsDataUrl('/assets/cert/sig_james.png'),
    QRCode.toDataURL(verifyUrl, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 480,
      color: {
        dark: '#0A1D56',
        light: '#FFFFFF',
      },
    }),
  ]);

  const drawAcademicFrame = () => {
    // Academic Cream Canvas
    doc.setFillColor(255, 253, 250);
    doc.rect(0, 0, 297, 210, 'F');

    // Outer Forest Green Border
    doc.setDrawColor(6, 78, 59);
    doc.setLineWidth(0.8);
    doc.rect(5, 5, 287, 200, 'S');

    // Middle Gold / Amber Border
    doc.setDrawColor(217, 119, 6);
    doc.setLineWidth(0.35);
    doc.rect(6.8, 6.8, 283.4, 196.4, 'S');

    // Inner Navy Border
    doc.setDrawColor(10, 29, 86);
    doc.setLineWidth(0.5);
    doc.rect(8.2, 8.2, 280.6, 193.6, 'S');
  };

  // =========================================================================
  // LAUDA 1 — FRENTE DO CERTIFICADO
  // =========================================================================
  drawAcademicFrame();

  // Header Left: Editora Mente e Saúde
  doc.addImage(logoEms, 'PNG', 14, 12, 20, 20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(6, 78, 59);
  doc.text('EDITORA MENTE E SAÚDE', 37, 18);

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('CNPJ: 51.372.335/0001-71', 37, 22.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(13, 148, 136);
  doc.text('Conselho Editorial e Extensão Científica', 37, 26.5);

  // Header Center: Programa Interinstitucional
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(6, 78, 59);
  doc.text(
    'PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO, COMUNICAÇÃO CIENTÍFICA',
    148.5,
    17,
    { align: 'center' }
  );
  doc.text('E EDUCAÇÃO EM SAÚDE', 148.5, 21.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(10, 29, 86);
  doc.text(
    `Certificado Nº ${cert.numero} · Livro de Extensão nº ${cert.livro} · Cód. ${cert.codigo}`,
    148.5,
    26.2,
    { align: 'center' }
  );

  // Header Right: Centro Profissionalizante Maria Dalva de Araújo
  doc.addImage(logoCmda, 'PNG', 263, 12, 20, 20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(10, 29, 86);
  doc.text('CENTRO PROFISSIONALIZANTE', 260, 17.5, { align: 'right' });
  doc.text('MARIA DALVA DE ARAÚJO', 260, 21.8, { align: 'right' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('CNPJ: 51.269.112/0001-83', 260, 26.2, { align: 'right' });

  // Header Divider Line
  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.25);
  doc.line(14, 35, 283, 35);

  // Main Certificate Heading
  doc.setFont('times', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(6, 78, 59);
  doc.text('CERTIFICADO DE ATIVIDADE DE EXTENSÃO', 148.5, 47, { align: 'center' });

  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.5);
  doc.line(95, 50, 202, 50);

  // Institutional Preamble
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(
    'A Editora Mente e Saúde (CNPJ: 51.372.335/0001-71), em parceria institucional com o Centro Profissionalizante Maria Dalva de Araújo (CNPJ:',
    148.5,
    58.5,
    { align: 'center' }
  );
  doc.text(
    '51.269.112/0001-83), certifica para os devidos fins de comprovação curricular e acadêmica que',
    148.5,
    62.8,
    { align: 'center' }
  );

  // Recipient Highlight Box
  doc.setFillColor(237, 252, 245);
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.3);
  doc.rect(24, 67, 249, 21, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(23);
  doc.setTextColor(10, 29, 86);
  doc.text(cert.titular, 148.5, 77, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(
    `${cert.qualificacao}  |  CPF: ${cert.cpf}  |  ${cert.instituicaoOrigem}`,
    148.5,
    84.2,
    { align: 'center' }
  );

  // Body Paragraph 1
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(cert.paragrafo1Linhas[0], 24.5, 96.5);
  doc.text(cert.paragrafo1Linhas[1], 24.5, 100.8);
  doc.text(cert.paragrafo1Linhas[2], 24.5, 105.1);

  // Body Paragraph 2
  doc.text(cert.paragrafo2Linhas[0], 24.5, 114.5);
  doc.text(cert.paragrafo2Linhas[1], 24.5, 118.8);
  doc.text(cert.paragrafo2Linhas[2], 24.5, 123.1);

  // Location & Emission Date
  doc.setFont('times', 'italic');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text(`Goiânia - GO, ${cert.dataEmissao}.`, 148.5, 136.5, { align: 'center' });

  // Left Signature — Bárbara Lima dos Santos
  doc.addImage(sigBarbara, 'PNG', 22, 149, 64, 18);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.35);
  doc.line(15, 168.5, 93, 168.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(6, 78, 59);
  doc.text('BÁRBARA LIMA DOS SANTOS', 54, 173, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(15, 23, 42);
  doc.text('Editora-Chefe e Coordenadora de Extensão Editorial', 54, 176.8, {
    align: 'center',
  });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.setTextColor(6, 78, 59);
  doc.text('Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)', 54, 180.5, {
    align: 'center',
  });

  // Official Seal of Fé Pública
  doc.setFillColor(255, 242, 199);
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.6);
  doc.circle(109, 165, 11.5, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(120, 53, 15);
  doc.text('SELO OFICIAL', 109, 161.2, { align: 'center' });

  doc.setFontSize(8);
  doc.text('FÉ PÚBLICA', 109, 165.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(5.4);
  doc.text(cert.codigo, 109, 169.5, { align: 'center' });

  // QR Code Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.25);
  doc.rect(123.5, 151.5, 25, 25, 'FD');
  doc.addImage(qrDataUrl, 'PNG', 124.5, 152.5, 23, 23);
  doc.link(123.5, 151.5, 25, 25, { url: verifyUrl });

  // Manual Public Authentication Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.25);
  doc.rect(150.5, 151.5, 49, 25, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(6, 78, 59);
  doc.text('AUTENTICAÇÃO PÚBLICA MANUAL', 152.5, 155.5);

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.setTextColor(15, 23, 42);
  doc.text(`Cód.: ${cert.codigo}`, 152.5, 159.8);

  doc.setTextColor(146, 64, 14);
  doc.text(`Chave: ${cert.chave}`, 152.5, 163.8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(10, 29, 86);
  doc.text('Endereço p/ Verificação Online:', 152.5, 167.8);

  const displayShortUrl =
    basePortalUrl.length > 38 ? basePortalUrl.slice(0, 38) : basePortalUrl;
  doc.setFont('courier', 'normal');
  doc.setFontSize(4.9);
  doc.setTextColor(15, 23, 42);
  doc.text(displayShortUrl, 152.5, 171.5);
  doc.link(150.5, 151.5, 49, 25, { url: verifyUrl });

  // Right Signature — James Araújo de Santana
  doc.addImage(sigJames, 'PNG', 210, 149, 64, 18);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.35);
  doc.line(203, 168.5, 282, 168.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(10, 29, 86);
  doc.text('JAMES ARAÚJO DE SANTANA', 242.5, 173, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(15, 23, 42);
  doc.text('Coordenador de Extensão e Projetos Educativos', 242.5, 176.8, {
    align: 'center',
  });

  doc.setFont('courier', 'bold');
  doc.setFontSize(5.9);
  doc.setTextColor(10, 29, 86);
  doc.text(
    'Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)',
    242.5,
    180.5,
    { align: 'center' }
  );

  // Page 1 Bottom Verification Strip
  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `Verifique via QR Code ou acesse ${displayShortUrl} informando o Código ${cert.codigo} ou Chave ${cert.chave}`,
    148.5,
    191.5,
    { align: 'center' }
  );

  // =========================================================================
  // LAUDA 2 — VERSO DO CERTIFICADO (MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO)
  // =========================================================================
  doc.addPage('a4', 'landscape');
  drawAcademicFrame();

  // Page 2 Header Logos & Title
  doc.addImage(logoEms, 'PNG', 14, 12, 13, 13);
  doc.addImage(logoCmda, 'PNG', 29, 12, 13, 13);

  doc.setFont('times', 'bold');
  doc.setFontSize(13.5);
  doc.setTextColor(6, 78, 59);
  doc.text(
    'MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE DE EXTENSÃO',
    46,
    17.5
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(
    `Verso Oficial do Certificado Nº ${cert.numero} · Fé Pública Interinstitucional e Validação Curricular`,
    46,
    22.5
  );

  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.5);
  doc.line(14, 28, 283, 28);

  // Section 1: Dados de Identificação do Profissional Extensionista
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.25);
  doc.rect(14, 31, 155, 31, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(6, 78, 59);
  doc.text('1. DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL EXTENSIONISTA', 18, 36.2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.3);
  doc.setTextColor(15, 23, 42);
  doc.text(`Titular Certificado: ${cert.titular}`, 18, 42.2);
  doc.text(`CPF Registrado: ${cert.cpf}`, 18, 47.4);
  doc.text(`Qualificação Profissional: ${cert.qualificacao}`, 18, 52.6);
  doc.text(`Instituição de Origem: ${cert.instituicaoOrigem}`, 18, 57.8);

  // Section 2: Enquadramento Curricular e Pontuação
  doc.setFillColor(240, 245, 255);
  doc.setDrawColor(10, 29, 86);
  doc.setLineWidth(0.25);
  doc.rect(173, 31, 110, 31, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(10, 29, 86);
  doc.text('2. ENQUADRAMENTO CURRICULAR E PONTUAÇÃO', 177, 36.2);

  doc.setTextColor(15, 23, 42);
  doc.text('Item 08 - Atividades de Extensão: Campanhas educativas, de vacinação,', 177, 42.5);
  doc.text('coleta de dados populacionais e atividades comunitárias', 177, 46.5);

  doc.setFont('courier', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(6, 78, 59);
  doc.text(`Período: ${cert.periodoCurto} | Total: ${cert.cargaHorariaTotal}`, 177, 58);

  // Section 3: Matriz de Atividades Práticas e Metodologia Extensionista
  doc.setFillColor(237, 252, 245);
  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.25);
  doc.rect(14, 65, 269, 7.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `3. MATRIZ DE ATIVIDADES PRÁTICAS E METODOLOGIA EXTENSIONISTA (${cert.cargaHorariaTotal.toUpperCase()}ORAS)`,
    18,
    70.2
  );

  // 4 Rows of Matrix
  cert.eixos.forEach((eixo, idx) => {
    const rowTop = 72.5 + idx * 14;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(204, 214, 224);
    doc.setLineWidth(0.25);
    doc.rect(14, rowTop, 269, 14, 'FD');

    doc.setDrawColor(227, 232, 240);
    doc.line(93, rowTop, 93, rowTop + 14);
    doc.line(258, rowTop, 258, rowTop + 14);

    // Column 1: Eixo Title & Subtitle
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.4);
    doc.setTextColor(10, 29, 86);
    doc.text(eixo.tituloLinha1, 17, rowTop + 4.5);
    doc.text(eixo.tituloLinha2, 17, rowTop + 7.7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.7);
    doc.setTextColor(71, 85, 105);
    doc.text(eixo.subtitulo, 17, rowTop + 11.8);

    // Column 2: Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(eixo.descricaoLinha1, 96, rowTop + 5.2);
    doc.text(eixo.descricaoLinha2, 96, rowTop + 9.2);

    // Column 3: Workload
    doc.setFont('courier', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(6, 78, 59);
    doc.text(eixo.cargaHoraria, 263.5, rowTop + 8.2);
  });

  // Section 4: Registro Oficial de Fé Pública, Endereço Web e Chaves
  doc.setFillColor(255, 250, 235);
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.35);
  doc.rect(14, 131.5, 269, 31, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(146, 64, 14);
  doc.text(
    '4. REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE VERIFICAÇÃO DE AUTENTICIDADE',
    18,
    136.8
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(15, 23, 42);
  doc.text(
    `Certificado registrado sob o nº ${cert.numero} no Livro de Extensão nº ${cert.livro}, Folha ${cert.folha}, expedido pela Editora Mente e Saúde (CNPJ: 51.372.335/0001-71) e Centro Profissionalizante Maria Dalva de`,
    18,
    142
  );
  doc.text('Araújo (CNPJ: 51.269.112/0001-83).', 18, 145.3);

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `CÓDIGO DE AUTENTICIDADE: ${cert.codigo}   |   CHAVE DE CONTROLE / DÍGITO: ${cert.chave}`,
    18,
    150.2
  );

  doc.setFontSize(6.9);
  doc.setTextColor(10, 29, 86);
  const manualVerifyDisplay =
    verifyUrl.length > 95 ? verifyUrl.slice(0, 95) : verifyUrl;
  doc.text(`ENDEREÇO PARA VERIFICAÇÃO MANUAL (SEM QR CODE): ${manualVerifyDisplay}`, 18, 155);

  doc.setFontSize(6.9);
  doc.setTextColor(15, 23, 42);
  doc.text(`HASH SHA-256: ${cert.hashSha256}`, 18, 159.8);

  // Page 2 QR Code Box on Right of Section 4
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.25);
  doc.rect(253.5, 134, 26, 26, 'FD');
  doc.addImage(qrDataUrl, 'PNG', 254.5, 135, 24, 24);
  doc.link(253.5, 134, 26, 26, { url: verifyUrl });

  // Page 2 Bottom Signatures & Date
  doc.addImage(sigBarbara, 'PNG', 26, 164, 54, 15);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.35);
  doc.line(18, 180, 92, 180);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.6);
  doc.setTextColor(6, 78, 59);
  doc.text('BÁRBARA LIMA DOS SANTOS', 55, 184.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.text('Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)', 55, 188, {
    align: 'center',
  });

  doc.setFont('times', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`Goiânia - GO, ${cert.dataEmissao}.`, 148.5, 179.5, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'Documento Oficial de 2 Laudas (Frente e Verso) · Válido em Todo o Território Nacional',
    148.5,
    184.2,
    { align: 'center' }
  );

  doc.setFont('courier', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(6, 78, 59);
  doc.text(`Registro: ${cert.codigo} · Chave: ${cert.chave}`, 148.5, 188, {
    align: 'center',
  });

  doc.addImage(sigJames, 'PNG', 215, 164, 54, 15);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.35);
  doc.line(204, 180, 279, 180);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.6);
  doc.setTextColor(10, 29, 86);
  doc.text('JAMES ARAÚJO DE SANTANA', 241.5, 184.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.text('Centro Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)', 241.5, 188, {
    align: 'center',
  });

  return doc;
}

export async function downloadCertificatePdf(cert: CertificadoRecord): Promise<void> {
  const doc = await generateCertificatePdfDoc(cert);
  const cleanName = cert.titular.replace(/\s+/g, '_').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  doc.save(`Certificado_Extensao_${cert.numero}_${cert.codigo}_${cleanName}.pdf`);
}
