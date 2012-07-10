var jsonLocais = {
    "cristoredentor":
    {
        "lat": "-22.951877",
        "lon": "-43.210499"
    },
    "paodeacucar":
    {
        "lat": "-22.947222",
        "lon": "-43.156111"
    },
    "arcosdalapa":
    {
        "lat": "-22.913778",
        "lon": "-43.181007"
    },
    "mam":
    {
        "lat": "-22.913622",
        "lon": "-43.171141"
    },
    "maracana":
    {
        "lat": "-22.912211",
        "lon": "-43.230000"
    },
}
  function refreshListView(idLista)
  {
      if ($.data( $(idLista)[0], 'listview' ))
    	{
			$(idLista).listview("refresh"); 
    	}
  }

  function resizeVideo() {
      var actualWidth = $(window).width(), w = 560, h = 345, vh;
      vh = parseInt((actualWidth * h) / w);
      $("#content img").css({ width: (actualWidth) + "px", height: vh + "px" })

  }

  function resizePage() {
      ResizePageContentHeight($('#home'), alturaDevice);
      $.mobile.fixedToolbars.setTouchToggleEnabled(false);
      $.mobile.fixedToolbars.show();
      try {
          $("#home").find("#content").scrollview("scrollTo", 0, 0);
      }
      catch (e) {
          // console.error(e + 'scrollview não inicializado')
      }
  } 
     

  function trocarDePagina(Page) {
      pagina = $(Page);
      $.mobile.changePage(pagina, {
          transition: "none",
          reverse: false,
          changeHash: true
      });

      $.mobile.fixedToolbars.show();
      try {
          pagina.find("#content").scrollview("scrollTo", 0, 0);
      }
      catch (e) {
          $.mobile.hidePageLoadingMsg();
      }
  }

  function trackAnalytics(page) {
  var referer = (document.referrer != '') ? '' : document.referrer;
  var urlAnalytics = "ga.aspx?utmr="+referer+"&utmp="+page+"&guid=ON"
      $('#analytics').attr('src', urlAnalytics);
      console.log(urlAnalytics);
  }

  function recuperarCuriosidade(arrayCuriosidades) {
      var posicaoCuriosidade = Math.floor((Math.random() * arrayCuriosidades.length) + 1);
      $("#textoCuriosidade").html(arrayCuriosidades[posicaoCuriosidade]);
      return false;
  }

  // Calcula a distância em km entre dois pontos
  function distancia(latA, lonA, latB, lonB) {
      return (6371 * Math.acos(Math.cos(Math.PI * (90 - latB) / 180) * Math.cos(Math.PI * (90 - latA) / 180) + Math.sin(Math.PI * (90 - latB) / 180) * Math.sin(Math.PI * (90 - latA) / 180) * Math.cos(Math.PI * (lonA - lonB) / 180))).toFixed(2);
  }

  function recuperarDistanciaAtracao(atracao)
  {
    return distancia(localizacao.coords.latitude, localizacao.coords.longitude, atracao.lat, atracao.lon); 
  }

  function carregarDistanciaAtracoes()
  {
    var lista = $("#listaMonumentos");
    $.each(lista.find("li"), function(keyMonumento, liMonumento) { 
        $(liMonumento).find("#distancia").text(recuperarDistanciaAtracao(jsonLocais[liMonumento.id]) + " km");
    });
    refreshListView("#listaMonumentos");
  }

  function ordenarMonumentosPorGeolocalizacao()
{
    var lista = $("#listaMonumentos").find('li');
	$(lista).sortElements(function(a, b){		
		distanciaA = recuperarDistanciaAtracao(jsonLocais[a.id]);
		distanciaB = recuperarDistanciaAtracao(jsonLocais[b.id]);
		
	    return distanciaA > distanciaB ? 1 : -1;
	});
}

  // Função chamada quando navigator.geolocation.getCurrentPosition NÃO consegue fazer a leitura
            function erro(dados) {
                switch (dados.code) {
                    case 1: 
                        //alert('Você negou o acesso à sua localização!');
                        break;
                    case 2: 
                        //alert('Não foi possível acessar sua posição!');
                        break;
                    case 3: 
                       // alert('Timeout ao tentar pegar sua localização!');
                        break;
                }
            }

  // Função chamada quando navigator.geolocation.getCurrentPosition CONSEGUE fazer a leitura
  function posicao(dados) {
      localizacao = dados;
     carregarDistanciaAtracoes();
    ordenarMonumentosPorGeolocalizacao();
  }

  //Cristo Redentor
  var dadosCristoRedentor = ["Em uma pesquisa realizada pela revista América Economia, no ano de 2011, o Cristo Redentor foi considerado por 23,5 por cento dos entrevistados como o maior símbolo da América Latina. A pesquisa foi feita pela internet e reuniu a opinião de 1 734 executivos de todos os países da região."
, "Mais de mil toneladas de concreto. Sendo 3,8 toneladas na cabeça e 8 em cada mão"
, "O primeiro a vislumbrar o Cristo Redentor no Corcovado foi o padre francês Pierre Boss, no século XIX. Na época o Corcovado se chamava Pináculo da Tentação"
, "O concurso para a construção do Cristo Redentor foi iniciado em 1921 como parte da celebração dos 100 anos de independência do Brasil"
, "No desenho original Jesus seguraria um globo terrestre e uma cruz nas mãos"
, "O presidente Epitácio Pessoa irritou a Igreja Batista ao ceder o terreno do Corcovado para a Igreja Católica. Pessoa argumentou dizendo que os católicos pediram primeiro"
, "O mestre de obras, Heitor Levy, era judeu. Ao fim da obra já tinha se convertido ao cristianismo."
, "O Cristo Redentor demorou 5 anos para ser construído. Metade do tempo da Estátua da Liberdade"
, "A obra também foi bem mais barata, o Cristo Redentor custou 2.500 cotos de réis (R$ 9,5 milhões), a Estátua da Liberdade custou 60.000"
, "Construída a 710 metros do chão, não houve acidentes graves"
, "A coroa de espinhos é um para-raios"
, "A estátua já perdeu por causa de raios sobrancelha, lábio e um dedo"
, "O Cristo Redentor tem dois corações um externo e um interno, onde está o nome da família de Levy"
, "Atrás dos pedaços de pedra-sabão há os nomes de amigos e familiares das mulheres que fizeram o revestimento"
, "Até hoje corre processo entre os herdeiros do arquiteto Heitor Costa e do escultor Paul Landowski para saber quem é o Pai do Cristo"
, "Nos meses de verão, especialmente durante o Carnaval e Ano-Novo, a média de visitantes do Cristo é de 3.300 pessoas por dia."
, "A estátua do Cristo Redentor, situada 709 metros acima do nível do mar, tem os braços abertos, em forma de cruz, para ser admirada à distância."
, "Ela possui 8 metros de pedestal e 28 metros de distância entre as mãos, medida a partir das extremidades dos dedos. Seus 30 metros de altura correspondem a mais de 20 pessoas empilhadas uma em cima da outra."
, "Seu peso é de 1145 toneladas. Foi usada em composição pedra-sabão."
, "As peças que compõem a estátua chegaram ao Corcovado de trem. Elas foram montadas a 740 metros acima do nível do mar."
, "Existem 118 estátuas do Cristo ao redor do mundo. 112 réplicas estão no Brasil - 53 delas apenas no Estado de São Paulo. As seis restantes encontram-se em Oruro (Bolívia), nos Andes (Chile), em Barcelona (Espanha), em Cuzco (Peru), em Lisboa (Portugal) e na Ilha da Madeira (Portugal)."
, "Uma grande restauração do monumento foi feita em 1990, numa parceria da Rede Globo com a Shell Brasil, e custou 2 milhões de dólares."
, "Um total de 220 degraus ligavam o chão à base do Cristo. Mais tarde, foram instalados um elevador e duas escadas rolantes para facilitar o acesso. O mecanismo de ambos sistemas é silencioso, evitando assim que os macaquinhos da floresta da Tijuca fossem afetados pelo som."
, "O modelo original da cabeça do Cristo foi adquirido pela Prefeitura do Rio de Janeiro em 2001 por 84 mil reais. O escultor Paul Landowski assina a peça, feita em terracota."
, "Em 2004, a Sociedade de Autores e Compositores Dramáticos da França, por solicitação da família de Ladowsky, encaminhou à Sociedade Brasileira de Autores um pedido de cobrança de direitos autorais pelo uso da imagem do Cristo. Segundo a lei brasileira, não seria necessário pagar o valor requerido porque após 15 anos a obra se tornou objeto de domínio público."
, "Para a comemoração dos 440 anos do Rio de Janeiro (RJ), em 2005, o monumento recebeu uma nova iluminação concebida pela francesa Agnès P. Winter. A cor azul foi escolhida para celebrar a paz."
];

  //Dados pão de açúcar

var dadosPaoDeAcucar = ["Para construir o teleférico foram necessário mais de 400 homens"
,"Eram operários-escaladores. Cada um subiu com algumas peças para no topo do Morro do Pão de Açúcar fossem montadas. No final era um guincho que auxiliou na subida dos cabos de aço. Até hoje é possível ver os pinos que foram colocados por estes escaladores na rocha na subida pelo Costão do Pão de Açúcar"
,"O bondinho foi cenário do filme 007 Contra o Foguete da Morte, de 1979, no qual o agente secreto britânico James Bond (aqui interpretado pelo ator Roger Moore) derrota seu famoso inimigo Dentes de Aço (Jaws), interpretado por Richard Kiel"
,"O bondinho foi inaugurado em 1912, ou seja, já tem 100 anos! "
,"O Papa João Paulo II já passeou no bondinho"
,"John Kennedy é outra personalidade que andou de bondinho"
,"Até o cientista Albert Einstein já passeou no bondinho. E você? Já conhece?"];

var dadosMaracana = ["Durante a copa do mundo de 1950 o maracanã chegou a ter 205 mil pessoas"
,"O Maracanã é o 9º maior estádio do mundo e o 2º maior das Américas."
,"O primeiro gol no Maracanã aconteceu em um amistoso em 16 de junho de 1950 e marcado pelo jogado Didi (Waldir Pereira). O jogo foi entre as equipes de Rio e São Paulo. Os paulistas venceram por 3 a 1, mas o primeiro gol foi do time carioca."
,"O nome oficial do estádio, Mário Filho, foi dado em homenagem ao falecido jornalista carioca, irmão de Nelson Rodrigues, que se destacou no apoio à construção do Maracanã."
,"O nome popular é oriundo do rio Maracanã, que cruza a Tijuca passando por São Cristóvão, desaguando no Canal do Mangue antes do deságue na baía de Guanabara."
,"O maior artilheiro do Maracanã foi Zico, eterno ídolo Rubro-Negro. O galinho marcou 333 gols em 435 jogos."
,"Além de partidas de futebol, o estádio ja foi palco para diversos shows de artistas consagrados. Nomes como Frank Sinatra, Kiss, Tina Turner, Madonna, Rolling Stones, Paul McCartney e Sting já se apresentaram no Maracanã."
,"Em 2000, ano que o Maracanã completou 50 anos, foi inaugurada a calçada da fama, onde grandes craques que fizeram a história no esporte deixaram sua marca"
,"Para construir o maracanã foram gastos 7 milhões 730 mil horas de trabalho ininterruptos; se empilhados, os sacos de cimento formariam 78 colunas da altura do Corcovado ou duas vezes a altura do Pão de Açúcar; o concreto daria para levantar edifícios de dez andares em ambos os lados e em toda a extensão da Av. Rio Branco, no Centro do Rio; com a madeira se construiria três tablados das dimensões da Av. Presidente Vargas; com a areia, a mesma avenida seria coberta com uma camada de 25 cm"
,"Na noite de véspera de inauguração do Maracanã, 16 junho de 1950, o gramado sofreu seu primeiro teste:  uma pelada entre os engenheiros e os operários que trabalharam na construção. Por mais amistosa que tenha sido, foi a primeira partida do estádio, embora não se saiba o placar."
,"O terreno onde hoje se encontra o Maracanã era explorado por jesuítas, que ali mantinham um engenho de açúcar. No terreno, viviam muitos maracanãs, pássaro que mais tarde, originou o nome do estádio."
,"Antes de abrigar o maracanã o local abrigava o Derby Club, onde eram realizadas corridas de cavalo."
,"A Seleção Brasileira disputou no Maracanã cinco partidas, de seis durante toda a Copa. Na partida final, foi registrado oficialmente o público recorde de 199.854 torcedores presentes (173.850 pagantes).[12] Nesta decisão, o Brasil foi derrotado de virada por 2 a 1 para o Uruguai. A derrota em solo nacional ficou marcada na história do povo brasileiro, sendo conhecida popularmente como o Maracanazo."
,"A Copa do Mundo de 1950 foi realizada com as obras ainda inconcluídas. A rigor, estas só terminaram em 1965."
,"O formato do estádio é oval, medindo 317 metros no eixo maior e 279 metros no menor. Sua altura máxima é de 32 metros. A distância entre o centro do campo e o espectador mais afastado é de 126 metros."
,"O gramado tem 110 metros de comprimento por 75 de largura. É circundado por um fosso de 3 metros de largura e profundidade, com bordas em desnível. O acesso ao gramado é feito por intermédio de 4 túneis subterrâneos."
,"Não existiam plantas detalhadas, só um projeto que definia a forma do estádio. Os engenheiros tiveram que projetar uma construção virtual, do subsolo à marquise."
,"A maior goleada da história do Maracanã foi Flamengo 12 a 2 São Cristóvão, pelo Campeonato Carioca de 1956."
,"O Maracanã foi palco do milésimo gol da carreira de Pelé (Vasco 1 a 2 Santos, em 19 de novembro de 1969) e também da despedida do Rei do Futebol da Seleção Brasileira (Brasil 2 a 2 Iugoslávia, em 18 de julho de 1971)."
,"O maior público-visitante de uma equipe de fora da cidade do Rio de Janeiro foi registrado na semifinal do Campeonato Brasileiro de 1976 entre Fluminense e Corinthians. Aproximadamente 70.000 dos 146.043 pagantes torciam para o Corinthians, que venceu o confronto nos penaltis."
,"Maracanã vem do tupi maracá (chocalho) com nã (semelhante). É um papagaio grande conhecido no norte do país como Maracanã-guaçu. O chilrear dessa ave é semelhante ao som de um chocalho, daí o nome dado pelos indígenas. Habitavam em grandes bandos, a região do Derby, antes da construção do estádio"
,"Foram utilizados 500.000 sacos de cimento na construção do Maracanã"
,"Foram utilizados 10.000.000Kg de ferro na armação da estrutura do Maracanã"
,"Foram utilizados 40.000 caminhões, para transportes diversos durante a construção do Maracanã"
,"O volume total de concreto utilizado na construção do Maracanã foi de 80.000m³"
,"A área total de madeiras utilizadas na construção do Maracanã foi de 650.000m²"
,"O volume total de areia utilizado na construção do Maracanã foi de 45.000m³"
,"O volume total de escavações, para a execução das fundações do Maracanã foi de 39.572.000,00m³"
,"O volume total de aterro utilizado na construção do Maracanã foi de 134.700.000,00m³"
,"A área total das formas utilizadas na estrutura do Maracanã foi de 475.562,00m²"
,"O total dos escoramentos utilizados na construção do Maracanã foi de 1.004.490,00m"
,"O tempo médio de escoamento total ( saída ) do público da arquibancada é de 20 minutos"
,"A distância aproximada do Maracanã ao Aeroporto Internacional do Rio de Janeiro é de 15,2Km"
,"A média de jogos anuais no Maracanã é de 76 eventos, considerando-se as partidas preliminares"
,"O volume de concreto utilizado na construção do Estádio seria suficiente para construir a estrutura de edifícios de 10 andares em ambos os lados, e em toda a extensão da Avenida Rio Branco ( 2Km ), no Rio de Janeiro, ou na Park Avenue, em Nova Iorque ( E.U.A. ), entre as ruas 35 e 65"
,"Se todos os degraus da arquibancada do Maracanã fossem emendados, daria para ligar a Igreja da Candelária, no Centro do Rio de Janeiro à estação ferroviária de Cascadura, subúrbio da Central do Brasil, também no Rio de Janeiro"
,"Um homem sozinho construindo o Maracanã, e trabalhando 6 horas por dia, levaria nada menos que 1.860 anos para terminá-lo, trabalhando inclusive sábados, domingos e feriados"
,"Colocando-se em fila os 40.000 caminhões que entraram no Maracanã durante sua construção, estes cobririam toda extensão da estrada Rio-São Paulo ( 500Km ), ou de Nova Iorque a Washington ( E.U.A.)"
,"Os ferros utilizados na construção do Maracanã, transformados em barras de 3/16 polegadas, ou seja, 45mm, seriam suficientes para contornar o globo terrestre uma vez e meia passando pela linha do Equador"
,"Os sacos de cimento consumidos na construção do Maracanã empilhados individualmente forneceriam 78 colunas da altura do Corcovado"
,"Com a madeira utilizada na construção do Maracanã, forraria-se completamente a Avenida Presidente Vargas 3 vezes, em toda a sua extensão, que tem 2,5Km"
,"Com a areia utilizada na construção do Maracanã cobriria-se a Avenida Presidente Vargas, que tem a extensão de 2,5Km, completamente, com uma camada de 25cm de altura"
,"A extensão dos degraus da arquibancada do Maracanã somados eqüivale à distância entre Dover e Calais ( 32Km ), ou de Teresópolis a Petrópolis ( RJ )"
,"Trabalharam em média na construção do Maracanã 3.500 operários por dia, chegando aos 11.000 às vésperas da inauguração"
,"Foram fabricados exclusivamente para uso nas estruturas do Maracanã, vergalhões de 1 1/4 polegadas de diâmetro, com 34,00m de comprimento"
,"Durante os jogos da Copa do Mundo de 1950, somente a Western Telegraf Co. transmitiu mais de 15.000 palavras no jogo Brasil x Suécia"
,"Durante o mesmo jogo acima a Estrada de Ferro Central do Brasil transportou em uma hora 60.000 pessoas"
,"Foram gastas 7.730.000 de horas de serviço ininterrupto na construção do Maracanã"
,"A quantidade de pedras utilizada na construção do Maracanã seria suficiente para encher uma trincheira de 2,50m de largura, com 2,00m de altura, numa extensão de 12Km, ou então para construir um prisma de 20.000m² de base e 3.000m de altura"
,"O volume de escavações executadas na construção do Maracanã corresponde a abertura de 1.640 poços de 2,00 x 2,50m, com 5,00m de profundidade"
,"O perímetro do Maracanã eqüivale a 1/40.000 do meridiano terrestre"
];

var dadosArcos = ["A estrutura dos arcos, em pedra argamassada, apresentava originalmente 270 metros de comprimento por 17,6 metros de altura. Em estilo românico, caiada, possui 42 arcos duplos e óculos na parte superior."
,"Em sua construção foi empregada a mão de obra de escravos indígenas e africanos."
,"Os arcos da lapa são considerados como a obra arquitetônica de maior porte empreendida no Brasil durante o período colonial"
,"Conhecido como Arcos da Lapa a obra na verdade se chama Aqueduto da Carioca"
,"Foi construído pelo governador Ayres Saldanha, em 1723, para trazer água do rio Carioca até o Largo da Carioca, como solução para a falta d'água na cidade."
,"Em 1896, os arcos passaram a servir como viaduto para o acesso de bondes a Santa Teresa. É o único sistema de bondes ainda existente no Rio de Janeiro, e dá ao bairro aspecto peculiar e histórico."
]
 