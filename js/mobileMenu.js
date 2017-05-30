$(document).ready(function(){

	$('body').addClass('js');

	$('#icone_menu').click(function(e){
		$(this).toggleClass('open');
		$('#menu').toggleClass('active');
		e.preventDefault();
	});


	$('.link_360').click(function(){
		//window.history.pushState("object or string", "MÚTUA FILMES", "/");
		$('#icone_menu').toggleClass('open');
		$('#menu').toggleClass('active');
	});

	$('.link_quem').click(function(){
		$('#icone_menu').toggleClass('open');
		$('#menu').toggleClass('active');
	});

	$('.link_oque').click(function(){
		$('#icone_menu').toggleClass('open');
		$('#menu').toggleClass('active');
	});

});