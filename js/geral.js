
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

  function carregarListaDeNoticias(){
	  $.mobile.showPageLoadingMsg(); 
	  $('#noticias').find('li').remove();
	  var listaNoticias = $('#noticias');
	 // var url = 'NETVASCO.xml';
	  var url = 'rssReader.aspx';
	  $.get(url, function (data) {
	      $(data).find('item').each(function (key, value) {
	          $("<li>", {
	              id: 'liNoticia_' + key,
	              'class': 'liNoticia',
	              'data-icon': 'seta'
	          }).appendTo(listaNoticias);

	          var idNoticia = '#liNoticia_' + key;
	          var liNoticia = $(idNoticia);

	          $('<a>', {
	              'class': 'linkNoticia',
	              id: 'linkNoticia_' + key,
	              text: ''
	          }).appendTo(liNoticia);

	          var texto = $(value).find('title').text().replace(/\*/gi, "");
	          var destaque = $(value).find('title').text().indexOf("*");

	          $('<p>', {
	              text: texto
	          }).appendTo(liNoticia.find('a'));

	          if (destaque >= 0) {
	              liNoticia.find('p').addClass('destaque');
	          }
	          liNoticia.data('ficha', this);

	      });

	      $('#noticias').find('li').bind('tap', function () {
	          $.mobile.showPageLoadingMsg();
	          visualizarNoticia(this.id);
	      }).bind('click', function () {
	          $.mobile.showPageLoadingMsg();
	          visualizarNoticia(this.id);
	      });

	      refreshListView(listaNoticias);
	  }).success(function () {
	      $.mobile.hidePageLoadingMsg();
	      resizePage();
	  }); 
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


  function visualizarNoticia(idNoticia) {
      var ficha = $('#' + idNoticia).data('ficha');
      trackAnalytics("noticia/" + $(ficha).find('title').text());
      $('#textoNoticia').html($(ficha).find('description').text());

      var urlBase = "http://www.netvasco.com.br/";
      var imagensNoticia = $('#textoNoticia').find('img');
      $.each(imagensNoticia, function (key, obj) {
          $(obj).attr('src', urlBase + $(obj).attr('src'));
      });

      var linksNoticia = $('#textoNoticia').find('a');

      $.each(linksNoticia, function (key, obj) {
          $(obj).attr('href', urlBase + $(obj).attr('href'));
      });


      resizeVideo()
      $('a[href*="ads"]').remove();
      trocarDePagina('#detalheNoticia');
      $.mobile.hidePageLoadingMsg();
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