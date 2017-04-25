var nombreSlide=$(" .carrouselFicheProduits li").length, verticalNavAction = false, listeProduitsAction = false;
(function(a){
		a.fn.fullBg=function(b){
				b=a.extend({
						idParentDiv:"#globalProduits",
						classParentBackground:".slide",
						classBackground:".bgSize",
						classLinkNavigator:".listeProduits li a, .slideNav li a",
						classLinkUp:".clickSlideUp",
						classLinkDown:".clickSlideDown",
						effectAnimate:"linear"
				},b);
				var c=false;
				var d=function(){
						var c=0;
						var f=a(b.classBackground).length;
						a(b.classBackground).each(function(a,b){
								if(this.complete!=null&&this.complete==true&&this.width)c++;
								if(a+1==f)if(c==f)e();else setTimeout(d,100)
						})
				};

				var e=function(){
						hauteurWindow=a(window).height();
						var c=a(b.classBackground).first(),d=c.width(),e=c.height();
						var f=d/e;
						var g=e/d;
						var h=a("body").width();
						var i=a(window).height();
						e=h*g;
						d=h;
						if(e<i){
								e=i;
								d=i*f
						}
						a(b.classBackground).width(d).height(e);
						a(b.idParentDiv).css("top",-(a(".actifVertical").index()*i));
						a("#globalProduits").width(h);
						a("#globalProduits > div").width(h).height(i)
				};

				var f=function(c,d){

						if(a(".actifVertical").index()==c)return;
						a("#globalProduits > div").removeClass("actifVertical").eq(c).addClass("actifVertical");

						if(!c){
							$('.slideNavRight').stop(true,true).css({'right': -$('.slideNavRight').width()});
						}
						else{
							$('.slideNavRight').animate({'right': '30px'}).find('.slideNav li a').css('opacity', 0.5).eq(c-1).css('opacity', 1);
						}

						if($('.slideNav li').length === c){
							$('.clickSlideDown').css('visibility', 'hidden');
						}
						else if(c == 1){
							$('.clickSlideUp').css('visibility', 'hidden');
						}
						else {
							$('.clickSlideUp, .clickSlideDown').css('visibility', 'visible');
						}

						a(b.idParentDiv).animate({
								top:-(hauteurWindow*c)
						},{
								queue:false,
								duration:d!==null?d:800,
								easing:b.effectAnimate,
								complete:function(){

									if(listeProduitsAction){
										listeProduitsAction = false;
									}
									else {
										dataLayer.push({
											'event': 'uaevent','eventCategory': $('#mainProduits h1').text() ,
											'eventAction': verticalNavAction ? 'NavVertical' : 'NavScroll',
											'eventLabel': $('.actifVertical .products h2').text()
										});
									}

									verticalNavAction = false;

									a(".contextBlocMenu").animate({
											right:0
									},{
											queue:false,
											duration:300,
											easing:b.effectAnimate
									})
								}
						})
				};

				var g=function(b){
						if(b!=undefined)return a("#"+b.replace("link_","")).index();
						return a(".actifVertical").index()
				};

				var h=function(d){
						var e=(new Date).getTime(),f=0;
						var g=a(".actifVertical");
						var h=a("#nomPageInterne",g).val();
						var k=a("#nomCategorie",g).val();
						var l="scroll_"+k+"-"+h;
						if(e-1e3<c||a(b.idParentDiv).is(":animated"))return;
						c=e;
						if(!d)d=window.event;
						if(d.wheelDelta)f=d.wheelDelta/60;
						else if(d.detail)f=d.detail/2;
						if(/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))if(f>0)f=-1;else f=1;
						if(f>0){
								j();
								taggage(l,"scroll")
						}else{
								i();
								taggage(l,"scroll")
						}
				};

				var i=function(){
						var c=a(".actifVertical").index()+1;
						if(c>=a(b.classParentBackground).length)return;
						f(c)
				};

				var j=function(){
						var b=a(".actifVertical").index()-1;
						if(b<0)return;
						f(b)
				};

				var k=0;
				var l=0;
				if("ontouchstart"in document.documentElement)document.getElementById("globalProduits").addEventListener("touchstart",function(a){
						k=a.touches[0].pageY
				},false);
				if("ontouchmove"in document.documentElement)document.getElementById("globalProduits").addEventListener("touchmove",function(a){
						a.preventDefault();
						l=a.touches[0].pageY
				},false);
				if("ontouchend"in document.documentElement)document.getElementById("globalProduits").addEventListener("touchend",function(b){
						if(!l){
							if(a(".globalMenu").is(":visible"))return;
						}
						else if(k<l)j();
						else i();
						var c=k=l=0;
						if(c)return
				},false);
				if(window.addEventListener)document.addEventListener("DOMMouseScroll",h,false);
				document.onmousewheel=h;
				a(b.classLinkNavigator).live("click touchend",function(){
						f(g(a(this).attr("class")))
				});
				a(b.classLinkUp).live("click touchstart",function(){
						j()
				});
				a(b.classLinkDown).live("click touchstart",function(){
						i()
				});
				a(window).resize(function(){
						e()
				});
				a(document).keydown(function(a){
						switch(a.keyCode){
								case 38:
										j();
										break;
								case 40:
										i();
										break
						}
				});
				var m=window.location.hash;
				if(m)f(g("link_"+m.substring(1,m.length).toLowerCase()),0);
				d()
		}
})(jQuery);

var animateCarrouselScalpes=function(self,b){
		var englobCarrousel = $(self).parents('.englobCarrousel');
		var c=$('.listVehicule',englobCarrousel);

		var d=$("li", c).first().outerWidth(true);
		if(b=="normal"){
				var e=$(".active",c).index()+5;
				if(e+4>=$("li",c).length){
						englobCarrousel.find(".arrow.right").hide();
						$("li",c).eq(e).addClass("active")
				}
				c.animate({
						left:-(d*e)
				},{
						duration:1500,
						queue:false,
						complete:function(){
								$(".active",c).removeClass("active");
								c.children("li").eq(e).addClass("active");
								englobCarrousel.find(".arrow.left").show();
								if(e+5>=c.children("li").length){
										englobCarrousel.find(".arrow.right").hide()
								}
						}
				})
		}else if(b=="reverse"){
				e=$(".active",c).index()-5;
				if(e<=0)$(".arrow.left").hide();
				c.animate({
						left:-(d*e)
				},{
						duration:1500,
						queue:false,
						complete:function(){
								$(".active",c).removeClass("active");
								$("li", c).eq(e).addClass("active");
								englobCarrousel.find(".arrow.right").show()
						}
				})
		}
};

var hideShowScalpeDescrip=function(){
		$(".detail .listVehicule .masque .descripScalpe").hide();
		$(".listVehicule li").hover(function(){
				$(" .masque .descripScalpe",this).show()
		},function(){
				$(" .masque .descripScalpe",this).hide()
		});
		if(navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)){}
		$(".meaGamme a").live("touchstart",function(){
				window.location=$(this).attr("href")
		});
		$(".listVehicule li a").live("touchstart",function(){
				$(" .masque .descripScalpe",this).show();
				window.location=$(this).attr("href")
		}).live("touchend",function(){
				$(" .masque .descripScalpe",this).hide()
		})
};

$(function(){
		hideShowScalpeDescrip();

		if($("#globalProduits").length){
				$("body").addClass("prod");
				$("#globalProduits").fullBg()
		}

		$(".arrow.left, .arrow.right").hide();

		$(".listVehicule li:first-child").addClass("active");

		var b=$(".listVehicule li").outerWidth(true);

		$(".listVehicule").each(function(){
				var c=$("li", this).length;
				var englobCarrousel = $(this).parents('.englobCarrousel');

				if(c==0)
						$(this).parent().width(0);

				else if(c>=6) {
						$(this).parent().width(885);
						$(this).width(c*b);
						englobCarrousel.find(".arrow.right").show()
				}
				else
						$(this).parent().width(c*b);


				englobCarrousel.find(".arrow.right").on("click touchstart",function(){
						animateCarrouselScalpes(this,"normal")
				});
				englobCarrousel.find(".arrow.left").on("click touchstart",function(){
						animateCarrouselScalpes(this,"reverse")
				});
		});

	$('.newListVehicule').each(function(){

		var $this = $(this),
			itemsVisible = window.innerWidth <= 1280 ? 3 : 4, // Nombre de blocs max affichables dans une rangé
			_$items = $this.children('div').detach();

		function dispatchItems(){

			var $items = _$items.clone();

			$this.children().remove().end().append($items);

			while($items.length){

				var lastIndex = $items.length;

				// On wrap les blocs parents
				$items.filter(':lt('+itemsVisible+')').wrap('<div />').each(function(i){

					// On cherche des blocs enfants
					if(!$items.eq(i + itemsVisible).length) return false;

					// On garde l'index du dernier enfant
					lastIndex = i + itemsVisible;

					// On ajoute l'enfant à un parent
					$(this).parent().append($items.eq(lastIndex).detach());
				});

				// On réduit la liste de blocs à partir du dernier enfant trouvé
				$items = $items.filter(':gt('+lastIndex+')');
			}

			$this.find('.meaGamme a').each(function(){
				$(this).css('padding-top', ($(this).parent().outerHeight() - $(this).children('span').height()) / 2);
			});

			setTimeout(function(){

				$this.find('.title > span').each(function(){
					$(this).width($(this).children('span').width() + 3);
				});

			}, 500);
		}

		function customSlidePageConstructor(){

			dispatchItems();

			if($this.children().length > itemsVisible){

				while($this.children().length % itemsVisible){

					$('<div class="fake"><div/></div>').appendTo($this).css('visibility', 'hidden');
				}

				$this.closest('.carrouselProduit').children('.prev, .next').show();
			}

			$this.trigger('updateSizes');

			if($this.children().length === itemsVisible){

				$this.closest('.carrouselProduit').children('.prev, .next').hide();
			}
		}

		customSlidePageConstructor();

		$this.carouFredSel({
			auto: false,
			infinite: false,
			circular: false,
			items: {
				visible: $this.children().length < itemsVisible ? $this.children().length : itemsVisible,
				minimum: itemsVisible + 1,
				height: 220
			},
			prev: {
				button: '#prev-' + $this.data('id'),
				onAfter: function(){
					dataLayer.push({
						'event': 'uaevent','eventCategory': $('#mainProduits h1').text() ,
						'eventAction': 'Left',
						'eventLabel': $('.actifVertical .products h2').text()
					});
				}
			},
			next: {
				button: '#next-' + $this.data('id'),
				onAfter: function(){
					dataLayer.push({
						'event': 'uaevent','eventCategory': $('#mainProduits h1').text() ,
						'eventAction': 'Right',
						'eventLabel': $('.actifVertical .products h2').text()
					});
				}
			}
		});

		$this.parent().css('margin', 'auto');

		if($this.children().length < itemsVisible) return;

		var disabledNav = function(){
			window.innerWidth <= 1024 ? $('.slideNavRight').css('opacity', 0) : $('.slideNavRight').css('opacity', 1);
		};

		$(window).resize(function(){

			var newItemsVisible = window.innerWidth <= 1280 ? 3 : 4;

			disabledNav();

			if(itemsVisible === newItemsVisible) return;

			itemsVisible = newItemsVisible;
			$this.trigger('slideToPage', [0]).stop(true, true);
			$this.trigger('configuration', [{items: { visible: itemsVisible }}, null, true]);

			customSlidePageConstructor();

		});

		disabledNav();
	});

	var mouseScrollAnim = function(){
		$('.scroll .arrow').css('top', 0).animate({top: '10px'}, 1000, function(){
			mouseScrollAnim();
		});
	};

	mouseScrollAnim();

	var productDetailP = $('.vehicules .products.detail p');

	function productDetailPResize(){

		if(window.innerHeight <= 660){
			productDetailP.css('paddingBottom', '20px');
		}
		else {
			productDetailP.css('paddingBottom', '40px');
		}

		$(".vehicules").each(function(){

			$(this).css({"top": window.innerHeight / 2 - $(this).height() / 1.73});
		});

		$('.slideNavRight').css('top', (window.innerHeight / 2) - $('.slideNavRight').height() / 1.5);

	}

	$(window).resize(function(){
		productDetailPResize();
	});

	productDetailPResize();

	$('.carrouselProduit')
	.on('mouseenter', '.newListVehicule > div > div', function(){

		$(this).find('.title').stop().animate({marginLeft: -(($(this).find('.title').width() - $(this).find('.title > span').width() - 20) / 2)});
		$(this).find('.ico').stop().animate({opacity: 1});
	})
	.on('mouseleave', '.newListVehicule > div > div', function(){

		$(this).find('.title').stop().animate({marginLeft: 0});
		$(this).find('.ico').stop().animate({opacity: 0});
	});

	$('.slideNavRight').css({'right': -$('.slideNavRight').width()}).show();
	$('<div id="opacityBox" />').hide().appendTo("body #main > div:eq(2)");

	/*  Analytics */
	$('.clickSlideUp, .clickSlideDown').click(function(){

		dataLayer.push({
			'event': 'uaevent','eventCategory': $('#mainProduits h1').text() ,
			'eventAction': 'NavVertical',
			'eventLabel': $(this).hasClass('clickSlideUp') ? 'Up' : 'Down'
		});
	});

	$('.slideNav a').click(function(){
		verticalNavAction = true;
	});

	$('.listeProduits a').click(function(){
		listeProduitsAction = true;
	});
	/* End Analytics */
});