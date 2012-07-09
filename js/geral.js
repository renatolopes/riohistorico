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
,"John Kennedy é outra personalidade que andou de bondinho"];