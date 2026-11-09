export interface EixoAtividade {
  id: string;
  tituloLinha1: string;
  tituloLinha2: string;
  subtitulo: string;
  descricaoLinha1: string;
  descricaoLinha2: string;
  cargaHoraria: string;
}

export interface CertificadoRecord {
  numero: string;
  livro: string;
  folha: string;
  codigo: string;
  chave: string;
  hashSha256: string;
  titular: string;
  cpf: string;
  qualificacao: string;
  instituicaoOrigem: string;
  tituloAcao: string;
  modalidadeCurricular: string;
  enquadramentoItem08: string;
  periodo: string;
  periodoCurto: string;
  dataEmissao: string;
  cargaHorariaTotal: string;
  cargaHorariaExtenso: string;
  paragrafo1Linhas: [string, string, string];
  paragrafo2Linhas: [string, string, string];
  eixos: [EixoAtividade, EixoAtividade, EixoAtividade, EixoAtividade];
}

export const CERTIFICADO_06: CertificadoRecord = {
  numero: '06',
  livro: '01/2024',
  folha: '39',
  codigo: 'EMS-CDP-2024-0614',
  chave: '0614-8923-4410-7D4B',
  hashSha256: '6d4b9f21a8e03c74b5192f8a4c6e1d309b72a5f4c8e1d9b3a7f0e2c4b8d10614',
  titular: 'LUCAS GONÇALVES SILVEIRA',
  cpf: '702.794.941-57',
  qualificacao: 'Médico',
  instituicaoOrigem: 'Centro Universitário Alfredo Nasser (UNIFAN)',
  tituloAcao:
    'Campanha Educativa Digital contra Arboviroses: Quiz Populacional sobre Prevenção da Dengue e Conscientização sobre a Vacina no SUS',
  modalidadeCurricular:
    'Campanha Educativa, de Vacinação, Coleta de Dados Populacionais e Atividade Comunitária',
  enquadramentoItem08:
    'Item 08 - Atividades de Extensão: Campanhas educativas, de vacinação, coleta de dados populacionais e atividades comunitárias',
  periodo: '11 a 14 de novembro de 2024',
  periodoCurto: '11 a 14 de novembro de 2024',
  dataEmissao: '22 de novembro de 2024',
  cargaHorariaTotal: '08h',
  cargaHorariaExtenso: '08 (oito) horas',
  paragrafo1Linhas: [
    'participou de forma efetiva da Atividade de Extensão intitulada "Campanha Educativa Digital contra Arboviroses: Quiz Populacional sobre Prevenção da',
    'Dengue e Conscientização sobre a Vacina no SUS", desenvolvida na modalidade de Campanha Educativa, de Vacinação, Coleta de Dados Populacionais e',
    'Atividade Comunitária, realizada no período de 11 a 14 de novembro de 2024, contabilizando carga horária total de 08 (oito) horas.',
  ],
  paragrafo2Linhas: [
    'No âmbito desta ação extensionista, o profissional atuou na aplicação de quiz educativo digital para coleta de dados populacionais sobre controle vetorial do',
    'Aedes aegypti, distribuição gratuita de folheto digital sobre sinais de alarme e risco de automedicação, comunicação científica para combate a fake news e',
    'orientação comunitária sobre os grupos prioritários e esquema de duas doses da vacina contra a dengue nos canais oficiais do SUS.',
  ],
  eixos: [
    {
      id: 'Eixo I',
      tituloLinha1: 'Eixo I — Curadoria Científica e Elaboração de Folheto',
      tituloLinha2: 'Digital de Sinais de Alarme',
      subtitulo: 'Editoração Preventiva em Saúde Coletiva e Arboviroses',
      descricaoLinha1:
        'Revisão de diretrizes do Ministério da Saúde e OMS e produção didática do Guia Comunitário Digital "Dengue: Prevenção,',
      descricaoLinha2:
        'Hidratação Precoce, Sinais de Alarme e Proibição de AAS e Anti-inflamatórios".',
      cargaHoraria: '02h 00min',
    },
    {
      id: 'Eixo II',
      tituloLinha1: 'Eixo II — Coleta de Dados Populacionais via Quiz',
      tituloLinha2: 'Educativo Digital',
      subtitulo: 'Pesquisa-Ação e Levantamento sobre Controle Vetorial',
      descricaoLinha1:
        'Estruturação e aplicação de Quiz Digital Interativo aberto à população (n = 412 participantes) para coleta de dados populacionais',
      descricaoLinha2:
        'sobre medidas de eliminação de criadouros domésticos, reconhecimento de sintomas críticos e adesão vacinal.',
      cargaHoraria: '02h 30min',
    },
    {
      id: 'Eixo III',
      tituloLinha1: 'Eixo III — Conscientização Vacinal no SUS e Combate',
      tituloLinha2: 'à Desinformação (Fake News)',
      subtitulo: 'Infodemiologia e Educação em Imunização no PNI',
      descricaoLinha1:
        'Comunicação científica em página virtual de saúde para desmistificação de boatos sobre a vacina tetravalente da dengue no SUS,',
      descricaoLinha2:
        'esclarecendo o esquema de 2 doses (intervalo de 90 dias), eficácia clínica e contraindicações.',
      cargaHoraria: '02h 00min',
    },
    {
      id: 'Eixo IV',
      tituloLinha1: 'Eixo IV — Ação Comunitária e Divulgação dos Canais',
      tituloLinha2: 'Oficiais de Imunização e Urgência do SUS',
      subtitulo: 'Cidadania em Saúde Pública e Rede de Atenção Primária',
      descricaoLinha1:
        'Entrega automatizada da cartilha preventiva aos participantes e orientação sobre os grupos prioritários de vacinação definidos pelo',
      descricaoLinha2:
        'PNI/Ministério da Saúde, consulta à caderneta no app Meu SUS Digital, Disque Saúde 136, UBS e UPAs 24h.',
      cargaHoraria: '01h 30min',
    },
  ],
};

export interface LivroRegistroResumo {
  codigo: string;
  chave: string;
  numeroCert: string;
  livroFolha: string;
  titulo: string;
  titular: string;
  cpf: string;
  periodo: string;
  dataEmissao: string;
  cargaHoraria: string;
  hashSha256: string;
  enquadramento: string;
  isCurrentPortal: boolean;
}

export const LIVRO_REGISTROS_OFICIAIS: LivroRegistroResumo[] = [
  {
    codigo: 'EMS-CDP-2024-0614',
    chave: '0614-8923-4410-7D4B',
    numeroCert: 'Certificado Nº 06',
    livroFolha: 'Livro nº 01/2024 · Folha 39',
    titulo:
      'Campanha Educativa Digital contra Arboviroses: Quiz Populacional sobre Prevenção da Dengue e Conscientização sobre a Vacina no SUS',
    titular: 'LUCAS GONÇALVES SILVEIRA',
    cpf: '702.794.941-57',
    periodo: '11 a 14 de novembro de 2024',
    dataEmissao: '22 de novembro de 2024',
    cargaHoraria: '08 (oito) horas',
    hashSha256: '6d4b9f21a8e03c74b5192f8a4c6e1d309b72a5f4c8e1d9b3a7f0e2c4b8d10614',
    enquadramento:
      'Item 08 — Campanha Educativa, de Vacinação, Coleta de Dados Populacionais e Atividade Comunitária',
    isCurrentPortal: true,
  },
  {
    codigo: 'EMS-EXT-2024-0519',
    chave: '0519-7741-9204-8B3E',
    numeroCert: 'Certificado Nº 05',
    livroFolha: 'Livro nº 01/2024 · Folha 31',
    titulo:
      'Projeto de Extensão "Mitos e Verdades na Saúde Ocular": Combate à Desinformação nas Redes Sociais e Alerta contra Colírios Caseiros',
    titular: 'LUCAS GONÇALVES SILVEIRA',
    cpf: '702.794.941-57',
    periodo: '12 a 14 de junho de 2024',
    dataEmissao: '21 de junho de 2024',
    cargaHoraria: '10 (dez) horas',
    hashSha256: '7f51b93c8e420d1a6f3590c82e74d1b6a904f8c3e1275d8b40a96c15e38b0519',
    enquadramento: 'Item 08 — Campanha Educativa e Atividade Comunitária',
    isCurrentPortal: false,
  },
  {
    codigo: 'EMS-CDP-2024-0318',
    chave: '0318-6520-1194-4F8C',
    numeroCert: 'Certificado Nº 04',
    livroFolha: 'Livro nº 01/2024 · Folha 24',
    titulo:
      'Inquérito Epidemiológico Virtual: Coleta de Dados Populacionais sobre Tempo de Tela e Distribuição de Guia Prático contra a Fadiga Visual Digital',
    titular: 'LUCAS GONÇALVES SILVEIRA',
    cpf: '702.794.941-57',
    periodo: '18 a 20 de março de 2024',
    dataEmissao: '27 de março de 2024',
    cargaHoraria: '12 (doze) horas',
    hashSha256: '3a8c91e4f2b07d65c1928e4a7b3d50f19c82e4b6d0a1f73e9c5b2d84a60f0318',
    enquadramento: 'Item 08 — Coleta de Dados Populacionais e Campanha Educativa',
    isCurrentPortal: false,
  },
  {
    codigo: 'EMS-CDP-2023-0892',
    chave: '0892-4157-8320-9C2A',
    numeroCert: 'Certificado Nº 02',
    livroFolha: 'Livro nº 01/2023 · Folha 78',
    titulo:
      'Campanha Educativa Digital em Mídias Sociais: Quiz Interativo de Letramento Ocular, Coleta de Dados Populacionais e Prevenção ao Glaucoma',
    titular: 'LUCAS GONÇALVES SILVEIRA',
    cpf: '702.794.941-57',
    periodo: '10 a 13 de agosto de 2023',
    dataEmissao: '18 de agosto de 2023',
    cargaHoraria: '14 (quatorze) horas',
    hashSha256: '4c9a8e27f1d03b65c2847a9e1b52d84f7e3c91a6b4d280f3e51a9c7b2d40892',
    enquadramento: 'Item 08 — Campanha Educativa, Coleta de Dados Populacionais e Atividade Comunitária',
    isCurrentPortal: false,
  },
];

export interface QuizQuestion {
  id: number;
  eixoTematico: string;
  pergunta: string;
  opcoes: {
    id: string;
    texto: string;
    correta: boolean;
  }[];
  explicacaoCientifica: string;
  fonteReferencia: string;
  estatisticaPopulacional: string;
}

export const QUIZ_ARBOVIROSES: QuizQuestion[] = [
  {
    id: 1,
    eixoTematico: 'Controle Vetorial e Biologia do Aedes aegypti',
    pergunta:
      'Por que a inspeção e limpeza de reservatórios domésticos deve ser realizada obrigatoriamente pelo menos uma vez por semana ("10 Minutos contra a Dengue")?',
    opcoes: [
      {
        id: 'a',
        texto:
          'Porque o ciclo completo do mosquito (do ovo até a fase adulta alada) dura de 7 a 10 dias em condições de calor e umidade; interromper semanalmente impede o nascimento de novos mosquitos.',
        correta: true,
      },
      {
        id: 'b',
        texto:
          'Porque a água parada só começa a atrair fêmeas do mosquito após 15 dias de estagnação com matéria orgânica.',
        correta: false,
      },
      {
        id: 'c',
        texto:
          'Porque os ovos depositados na parede dos recipientes morrem espontaneamente em 48 horas se ficarem no seco.',
        correta: false,
      },
      {
        id: 'd',
        texto:
          'Porque o uso de água sanitária semanal substitui a necessidade de escovar as bordas internas de pratinhos e tonéis.',
        correta: false,
      },
    ],
    explicacaoCientifica:
      'O ciclo de desenvolvimento do Aedes aegypti (ovo → larva → pupa → adulto) leva em média de 7 a 10 dias. Além disso, os ovos aderidos às paredes dos recipientes resistem até 450 dias no seco, exigindo escovação mecânica das bordas e vistoria semanal.',
    fonteReferencia: 'Diretrizes Nacionais para a Prevenção e Controle de Epidemias de Dengue — Ministério da Saúde / Fiocruz',
    estatisticaPopulacional: '68,4% dos participantes responderam corretamente na coleta populacional (n = 412).',
  },
  {
    id: 2,
    eixoTematico: 'Sinais de Alarme e Fase Crítica da Dengue',
    pergunta:
      'Em qual momento da evolução clínica da dengue os "Sinais de Alarme" (dor abdominal intensa e contínua, vômitos persistentes e sangramentos de mucosa) costumam surgir com maior frequência?',
    opcoes: [
      {
        id: 'a',
        texto: 'Apenas nas primeiras 12 horas do primeiro pico febril.',
        correta: false,
      },
      {
        id: 'b',
        texto:
          'No período de defervescência (quando a febre começa a cair, geralmente entre o 3º e o 7º dia da doença), marcando o início da fase crítica de extravasamento plasmático.',
        correta: true,
      },
      {
        id: 'c',
        texto: 'Somente após 30 dias da cura clínica completa.',
        correta: false,
      },
      {
        id: 'd',
        texto: 'Apenas quando há manchas vermelhas na pele sem febre associada.',
        correta: false,
      },
    ],
    explicacaoCientifica:
      'Muitos pacientes acreditam estar curados quando a febre cede entre o 3º e o 7º dia. Contudo, a queda da febre (defervescência) pode coincidir com o aumento da permeabilidade vascular e extravasamento de plasma. Dor abdominal intensa, vômitos persistentes e tontura ao levantar exigem atendimento médico de urgência imediato (UPA 24h / Hospital).',
    fonteReferencia: 'Dengue: Diagnóstico e Manejo Clínico — Adulto e Criança (6ª Edição, Ministério da Saúde, 2024)',
    estatisticaPopulacional: 'Apenas 41,7% da população conhecia o risco na queda da febre antes da ação educativa.',
  },
  {
    id: 3,
    eixoTematico: 'Segurança Farmacológica e Combate à Automedicação',
    pergunta:
      'Diante de suspeita de dengue (febre aguda com dores no corpo e atrás dos olhos), quais medicamentos são ESTRITAMENTE CONTRAINDICADOS pelo risco de hemorragia grave?',
    opcoes: [
      {
        id: 'a',
        texto: 'Sais de Reidratação Oral (SRO) e líquidos caseiros.',
        correta: false,
      },
      {
        id: 'b',
        texto: 'Dipirona ou Paracetamol prescritos para controle sintomático de dor e febre.',
        correta: false,
      },
      {
        id: 'c',
        texto:
          'Ácido Acetilsalicílico (AAS / Aspirina) e Anti-inflamatórios Não Esteroides (Ibuprofeno, Diclofenaco, Nimesulida, Cetoprofeno).',
        correta: true,
      },
      {
        id: 'd',
        texto: 'Soro fisiológico intravenoso administrado na Unidade Básica de Saúde.',
        correta: false,
      },
    ],
    explicacaoCientifica:
      'Salicilatos (AAS) e anti-inflamatórios não esteroides (AINEs) inibem a agregação plaquetária e irritam a mucosa gastrointestinal. Em um paciente com dengue (que já cursa com plaquetopenia e fragilidade capilar), esses fármacos elevam drasticamente o risco de sangramentos digestivos e síndrome de Reye.',
    fonteReferencia: 'Protocolo de Manejo Clínico da Dengue — Ministério da Saúde & Organização Mundial da Saúde (OMS)',
    estatisticaPopulacional: '79,1% identificaram o risco do AAS, mas 54,6% desconheciam que Ibuprofeno e Nimesulida também são proibidos.',
  },
  {
    id: 4,
    eixoTematico: 'Conscientização sobre a Vacina da Dengue no SUS (PNI)',
    pergunta:
      'Como funciona o esquema vacinal completo da vacina contra a dengue (QDenga / TAK-003) disponibilizada gratuitamente no Sistema Único de Saúde (SUS)?',
    opcoes: [
      {
        id: 'a',
        texto:
          'Esquema de 2 (duas) doses com intervalo de 3 meses (90 dias) entre a primeira e a segunda dose, voltado às faixas etárias e regiões prioritárias definidas pelo PNI.',
        correta: true,
      },
      {
        id: 'b',
        texto: 'Dose única vitalícia aplicada apenas durante episódios de febre alta ativa.',
        correta: false,
      },
      {
        id: 'c',
        texto: 'Esquema de 4 doses mensais restrito exclusivamente a pessoas que nunca tiveram dengue.',
        correta: false,
      },
      {
        id: 'd',
        texto: 'Aplicação anual idêntica à campanha da gripe em qualquer faixa etária a partir do nascimento.',
        correta: false,
      },
    ],
    explicacaoCientifica:
      'A vacina tetravalente atenuada incorporada ao PNI/SUS protege contra os 4 sorotipos do vírus (DENV-1, DENV-2, DENV-3 e DENV-4) tanto em indivíduos soropositivos quanto soronegativos, exigindo obrigatoriamente 2 doses com intervalo de 90 dias para atingir a eficácia clínica sustentada.',
    fonteReferencia: 'Informe Técnico Operacional da Estratégia de Vacinação contra a Dengue — PNI / Ministério da Saúde (2024)',
    estatisticaPopulacional: '62,8% dos respondentes desconheciam a obrigatoriedade da 2ª dose após 90 dias.',
  },
  {
    id: 5,
    eixoTematico: 'Imunização Pós-Infecção e Contraindicações',
    pergunta:
      'Se uma pessoa pertencente ao grupo prioritário do SUS teve diagnóstico recente de dengue, qual é a orientação oficial do Ministério da Saúde sobre a vacinação?',
    opcoes: [
      {
        id: 'a',
        texto: 'Não precisa mais tomar a vacina, pois quem teve dengue uma vez nunca mais contrai a doença.',
        correta: false,
      },
      {
        id: 'b',
        texto:
          'Deve aguardar 6 (seis) meses após o início dos sintomas da infecção aguda para receber a dose da vacina, pois ainda pode contrair outros sorotipos do vírus.',
        correta: true,
      },
      {
        id: 'c',
        texto: 'Deve tomar a vacina no mesmo dia em que a febre começar para cortar o efeito do vírus.',
        correta: false,
      },
      {
        id: 'd',
        texto: 'Gestantes e lactantes têm prioridade imediata para receber a vacina de vírus vivo atenuado.',
        correta: false,
      },
    ],
    explicacaoCientifica:
      'Existem 4 sorotipos distintos do vírus da dengue; a infecção por um sorotipo gera imunidade duradoura apenas contra aquele sorotipo específico (e uma segunda infecção por sorotipo diferente tem maior risco de gravidade). Após episódio agudo, recomenda-se aguardar 6 meses para vacinar. Por ser vacina atenuada, é contraindicada para gestantes, lactantes e imunossuprimidos.',
    fonteReferencia: 'Nota Técnica PNI/SVSA/MS — Intervalo Pós-Infecção por Dengue e Contraindicações Vacinais',
    estatisticaPopulacional: '73,5% compreendiam a existência de múltiplos sorotipos, mas apenas 38,2% sabiam do intervalo de 6 meses.',
  },
  {
    id: 6,
    eixoTematico: 'Acesso à Rede Pública e Canais Oficiais do SUS',
    pergunta:
      'Qual é a conduta recomendada imediatamente ao notar os primeiros sintomas de dengue (febre alta, dor retro-orbitária e mialgia) e onde consultar o cartão vacinal oficial?',
    opcoes: [
      {
        id: 'a',
        texto:
          'Iniciar hidratação oral abundante imediatamente em casa, procurar a Unidade Básica de Saúde (UBS) mais próxima (ou UPA 24h se houver sinais de alarme) e acompanhar a caderneta pelo aplicativo Meu SUS Digital.',
        correta: true,
      },
      {
        id: 'b',
        texto:
          'Suspender a ingestão de água para não sobrecarregar os rins e aguardar 5 dias em casa antes de procurar atendimento.',
        correta: false,
      },
      {
        id: 'c',
        texto:
          'Tomar antibiótico por conta própria e aplicar compressas de álcool nos olhos.',
        correta: false,
      },
      {
        id: 'd',
        texto:
          'Aguardar o resultado do exame sorológico IgM (que só fica positivo após o 6º dia) para só então começar a beber líquidos.',
        correta: false,
      },
    ],
    explicacaoCientifica:
      'A hidratação oral precoce e vigorosa (água, soro de reidratação oral, sucos naturais e água de coco) desde o primeiro dia de febre é a medida mais eficaz para prevenir a hipovolemia e o choque na dengue. O acompanhamento vacinal e informações oficiais estão disponíveis gratuitamente no Meu SUS Digital e Disque Saúde 136.',
    fonteReferencia: 'Fluxograma de Classificação de Risco e Manejo do Paciente com Suspeita de Dengue — Ministério da Saúde',
    estatisticaPopulacional: '88,6% dos participantes passaram a identificar corretamente o fluxo UBS / UPA 24h e Meu SUS Digital.',
  },
];

export interface ChecklistItem {
  id: string;
  local: string;
  acaoPreventiva: string;
  tempoEstimado: string;
  riscoCritico: string;
  concluidoPadrao: boolean;
}

export const CHECKLIST_10_MINUTOS: ChecklistItem[] = [
  {
    id: 'chk-1',
    local: 'Pratinhos de Vasos de Plantas e Jardineiras',
    acaoPreventiva: 'Eliminar os pratinhos ou preenchê-los até a borda com areia grossa, escovando as laterais semanalmente.',
    tempoEstimado: '2 min',
    riscoCritico: 'Responsável por até 28% dos focos intradomiciliares em áreas urbanas.',
    concluidoPadrao: true,
  },
  {
    id: 'chk-2',
    local: 'Bandejas Traseiras de Geladeira e Ar-Condicionado',
    acaoPreventiva: 'Retirar a água acumulada pelo degelo e lavar a bandeja com esponja e sabão para remover ovos aderidos.',
    tempoEstimado: '2 min',
    riscoCritico: 'Foco oculto de água limpa e aquecida pelo motor do eletrodoméstico.',
    concluidoPadrao: true,
  },
  {
    id: 'chk-3',
    local: 'Calhas de Telhado, Lajes e Ralos Pouco Usados',
    acaoPreventiva: 'Desobstruir folhas secas que represam água de chuva e instalar telas milimétricas em ralos externos.',
    tempoEstimado: '3 min',
    riscoCritico: 'Focos elevados produzem centenas de larvas após chuvas de verão.',
    concluidoPadrao: false,
  },
  {
    id: 'chk-4',
    local: 'Caixas d’Água, Tonéis e Reservatórios Domésticos',
    acaoPreventiva: 'Manter tampas totalmente vedadas sem frestas superiores a 2mm e cobrir ladrões com tela fina.',
    tempoEstimado: '2 min',
    riscoCritico: 'Grandes reservatórios abertos sustentam a reprodução contínua durante períodos de seca.',
    concluidoPadrao: false,
  },
  {
    id: 'chk-5',
    local: 'Bebedouros de Animais Domésticos e Garrafas',
    acaoPreventiva: 'Esfregar as bordas internas dos potes de água de cães e gatos a cada troca e guardar garrafas emborcadas.',
    tempoEstimado: '1 min',
    riscoCritico: 'Apenas trocar a água sem escovar a parede interna não remove os ovos do Aedes aegypti.',
    concluidoPadrao: false,
  },
];
