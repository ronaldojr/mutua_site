function tc_log(name) {
    return;
}


function createCookie(a, b, c) {
    if (c) {
        var d = new Date;
        d.setTime(d.getTime() + c * 24 * 60 * 60 * 1e3);
        var e = "; expires=" + d.toGMTString()
    } else
        var e = "";
    document.cookie = a + "=" + b + e + "; path=/"
}
function filterBox() {
    var a = '<div id="opacityBox"></div>';
    var b = $("body #main > div:eq(2)");
    if ($("#opacityBox").length < 1) {
        $(b).prepend(a)
    }
    $("#opacityBox").css({
        width: 100 + "%",
        height: 100 + "%"
    }).show();
    b.unbind().bind("click touchstart", function(a) {
        $("#opacityBox, .globalMenu").hide();
        $(".first, .mappemonde, .search").removeClass("hovered");
        $(".headerContRight .search").trigger('close');
        $(".globalMenu").eq(0).hide().bind("click touchstart", function() {
            $(".globalMenu").eq(0).show();
            $("#opacityBox").show();
        });
        $(".section .mapNav").bind("click touchstart", function() {
            $("#opacityBox").show()
        });
        $('#actualites').trigger('close');

        $(".globalMenu").eq(1).hide();
        $(".search").removeClass("hovered")
    });
//	$("#search").val(exempleInput).css({
//			backgroundColor:"transparent"
//	})
}
function filterTelecommande() {
    var a = '<div id="opacityTelecommande"></div>';
    var b = $("body #main > div:eq(1)");
    var c = $(".guideOn").height();
    var d = $(".guideOn").outerWidth(true);
    if ($("#opacityTelecommande").length < 1) {
        $(b).prepend(a)
    }
    $("#opacityTelecommande").css({
        width: largeurWindow + "px",
        height: hauteurWindow + "px"
    }).show();
    $(".guideOn").css({
        "margin-top": $(window).height() / 2 - $(".guideOn").outerHeight() / 2,
        "margin-left": $(window).width() / 2 - $(".guideOn").outerWidth() / 2
    });
    $("#opacityTelecommande, .guideOn .close").bind("click touchstart", function(a) {
        $("#header, #globalFooter").css("z-index", 11);
        $("#opacityTelecommande, .guideOn").hide();
        $("#emotionGuide .guideOff p").css({
            background: "url(/templates/peugeot/images/arrows.png) 49px -2002px no-repeat transparent"
        });
        a.preventDefault()
    })
}
function twitter_click(a) {
    var b = a.split("-")[0] + " - ";
    window.open("https://twitter.com/intent/tweet?original_referer=" + encodeURIComponent(window.location.href) + "&related=peugeot&source=tweetbutton&text=" + b + "&url=" + encodeURIComponent(window.location.href) + "&via=peugeot", "pop_up", "toolbar=0,status=0,width=1000,height=600");
    return false
}
function gplus_click() {
    window.open("https://plus.google.com/share?url=" + encodeURIComponent(window.location.href), "pop_up", "toolbar=0,status=0,width=1000,height=600");
    return false
}
function fbs_click() {
    var a = document.title.split("-")[0] + " - ";
    window.open("http://www.facebook.com/sharer.php?u=" + encodeURIComponent(window.location.href) + "&t=" + encodeURIComponent(a), "pop_up", "toolbar=0,status=0,width=1000,height=600");
    return false
}
function pinterest() {
    var a = document.createElement("script");
    a.setAttribute("type", "text/javascript");
    a.setAttribute("charset", "UTF-8");
    a.setAttribute("src", "http://assets.pinterest.com/js/pinmarklet.js?r=" + Math.random() * 99999999);
    document.body.appendChild(a);
    return false
}
function linkedin() {
    window.open("http://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(window.location.href));
    return false
}
function taggage(a, b) {

}

function taggageInit() {

    $(document).on('touchstart click', 'a[data-ua]', function() {

        var data = $(this).data('ua').split('--');

        dataLayer.push({event: 'uaevent', eventCategory: data[0], eventAction: data[1], eventLabel: data[2]});
    });
}

var VALIDANIMATE = true;
var largeurWindow = $(window).width();
var hauteurWindow = $(window).height();
createCookie("largeurWindow", largeurWindow, 7);
createCookie("hauteurWindow", hauteurWindow, 7);
$(function() {
    $("#opacityBox a").on("click touchstart", function() {
        $(".close").trigger("click touchstart");
    });
    $(window).resize(function() {
        largeurWindow = $(window).width();
        hauteurWindow = $(window).height();
        if ($(".guideOn").is(":visible")) {
            filterTelecommande()
        }
        if ($(".globalMenu").is(":visible")) {
            filterBox()
        }
    });
    $(".backToTop").hide();
    $(window).scroll(function() {
        posScroll = $(document).scrollTop();
        if (posScroll >= 180)
            $(".backToTop").fadeIn(600);
        else
            $(".backToTop").fadeOut(600)
    });
    $(".backToTop").on('click touchstart', function() {
        $("html,body").animate({
            scrollTop: 0
        }, "slow")
    });
    $(".headerContRight, .close").live("click touchstart", function() {
        $("#opacityTelecommande, .guideOn").hide()
    });
    $("#homepageLeftNav .homepageNavLink li").eq(0).addClass("first");
    $("#homepageRightNav .homepageNavLink li").eq(0).addClass("first");

    $(".moduleActu #actualites").on('close', function() {
        $('.moduleActu .btnActualite img').removeClass('active');
        $('#carouActu').trigger('pause', [true, false]);
        $('#carouActuPagPoints a:first').click();
        $(".moduleActu #actualites").slideUp();
    });

    $(".moduleActu .btnActualite").bind("click touchstart", function(a) {
        if (!$(".moduleActu #actualites").is(":visible")) {
            $(".moduleActu #actualites").slideDown(function() {
                $('#carouActu').trigger('play', [null, 0, true]);
            });
            $(".contentFooter .deeper ul, .globalMenu").hide();
            $(".first, .mappemonde, .search").removeClass("hovered");
            $(".search a, .first a, #searchMap").removeClass("blue");
            $(this).find('img').addClass('active');
            filterBox()
        } else {
            $('#actualites').trigger('close');
            $("#opacityBox").hide()
        }
        a.preventDefault()
    });
    $("#footer .contentFooter .menu_blcF .deeper > ul").hide();
    $("#footer .contentFooter .menu_blcF .deeper > ul > li").removeClass("active");
    $(".mainContent").bind("click touchstart", function() {
        $("#footer .subContFooter").slideUp(250, function() {
        });
        $("#footer .contentFooter li").removeClass("active")
    });
    $("#footer .contentFooter .menu_blcF .deeper > a").each(function(a) {
        var b = $("#footer .contentFooter .menu_blcF .deeper ul"), c = 250;
        $(this).on('click touchstart', function() {
            var d = $("#footer .contentFooter .menu_blcF .deeper > ul:eq(" + a + ")");
            $(".globalMenu , #opacityBox").hide();
            if (d.is(":visible")) {
                $(this).closest("li").removeClass("active");
                d.slideUp(c, function() {
                })
            } else {
                $("#footer .contentFooter .menu_blcF .deeper").removeClass("active");
                $(this).closest("li").addClass("active");
                if (b.is(":visible")) {
                    b.filter(":visible").slideUp(c, function() {
                        d.slideDown(c, function() {
                        })
                    })
                } else {
                    d.slideDown(c, function() {
                    })
                }
            }
            $('#actualites').trigger('close');
            $('.btnActualite').find('img').removeClass('active');
        })
    });
    $(".mappemonde li a").removeClass("blue");


//    $(".first .globalMenu").hide();
//    $(".globalMenu").eq(1).hide();
//    if ($(".globalMenu").is(":visible")) $("#header").css({background: "none"});

    $(".headerContRight .first a").removeClass("blue");

//	$(".headerContRight .first").hover(function () {
//		$(this).addClass("hovered");
//		$(".headerContRight .first a").addClass("blue")
//	}, function () {
//		if (!$(".first .globalMenu").is(":visible")) {
//			$(".headerContRight .first").removeClass("hovered");
//			$(".headerContRight .first a").removeClass("blue")
//		}
//	});

    $(".headerContRight .first > a").bind("click touchstart", function(e) {
        e.preventDefault();
        $('.subMenu').trigger('reset');
        $(this).closest('li').addClass("hovered");
        $('#actualites').trigger('close');
        $(".headerContRight .search").trigger('close');
        if ($(".first .globalMenu").is(":visible")) {
            $(".headerContRight .first").removeClass("hovered");
            $(".globalMenu").eq(0).hide();
            $("#opacityBox").hide();
        } else {
            $(".headerContRight .first").addClass("hovered");
            $(".headerContRight .mappemonde, .headerContRight .search").removeClass("hovered");
            $(".globalMenu").eq(0).fadeIn("fast");
            $(".globalMenu").eq(1).hide();
            filterBox();
        }
    });

    $('.subMenu .btn-open')
            .mouseenter(function() {
                if ($(this).closest('.subMenu').hasClass('active'))
                    return;
                $(this).find('.border').stop().animate({width: '100%'});
            })
            .mouseleave(function() {
                if ($(this).closest('.subMenu').hasClass('active'))
                    return;
                $(this).find('.border').stop().animate({width: 0});
            });

    (function() {
        var $this = $('.subMenu').eq(0).css('overflow', 'hidden');
        var $brother = $this.next();
        var $link = $this.find('.wrap-inner .btn-open').css('display', 'inline');
        var $menu = $this.find('.menu');
        var maxWidth = null;

        if (!$menu.length)
            return;

        $menu.html($menu.html().replace(/\|/g, '<br/>'));

        $this.addClass('active');

        $link.on('click touchstart', function(a) {

            a.preventDefault();

            if ($this.hasClass('active'))
                return;

            $brother.trigger('close');
        });

        $this
                .on('close', function(a, c) {

                    if (!maxWidth) {
                        maxWidth = $this.width() + 1;
                        $('.wrap-inner').width(maxWidth);
                    }

                    $this.removeClass('active');
                    $this.find('.border').animate({width: 0});
                    $this.animate({width: $link.width()}, function() {
                        c();
                    });
                })
                .on('open', function() {
                    $this.addClass('active');
                    $this.animate({width: maxWidth});
                    $this.find('.border').animate({width: '100%'});
                })
                .on('reset', function() {
                    $this.addClass('active');
                    $this.css({width: maxWidth});
                    $this.find('.border').css({width: '100%'});
                });
    })();

    (function() {

        var $this = $('.subMenu').eq(1);
        var $brother = $this.prev();
        var $link = $this.children('a').css('display', 'inline');
        var $menu = $this.children('.menu');

        if (!$menu.length)
            return;

        $menu.html($menu.html().replace(/\|/g, '<br/>'));

        $link.on('click touchstart', function(a) {

            a.preventDefault();

            if ($this.hasClass('active'))
                return;

            $this.addClass('active')
            $brother.trigger('close', function() {
                $menu.fadeIn();
                $this.find('.border').animate({width: '100%'});
            });
        });

        $this.on('close', function() {

            $this.removeClass('active');
            $menu.fadeOut(function() {
                $brother.trigger('open');
            });
            $this.find('.border').animate({width: 0});
        })
                .on('reset', function() {
                    $this.removeClass('active');
                    $menu.hide();
                    $this.find('.border').css({width: 0});
                });

        $menu.hide();
    })();

    $(".headerContRight .map").live("click touchstart", function(a) {
        a.preventDefault();
        if (!$(".mapWorld").is(":visible")) {
            $(".mappemonde").addClass("hovered");
            $(".first, .search").removeClass("hovered");
            $(".globalMenu").eq(0).hide();
            $(".globalMenu").eq(1).fadeIn("fast");
            $('#actualites').trigger('close');
            $(".headerContRight .search").trigger('close');
            $("#opacityBox").hide();
            filterBox();
        } else {
            $(".mappemonde").removeClass("hovered");
            $(".globalMenu").eq(1).hide();
            $("#opacityBox").hide();
        }
    });

    $(".globalMenu:last .close").live("click touchstart", function(e) {
        e.preventDefault();
        $(".mappemonde").removeClass("hovered");
        $(".globalMenu").eq(1).hide();
        $("#opacityBox").hide();
    });
    $(".mappemonde").hover(function() {
        $(this).addClass('fixHover');

    }, function() {
        $(this).removeClass('fixHover');
    });
    $(".headerContRight .search").bind("open", function() {
        $('#actualites').trigger('close');
        $(this).children('a').css('visibility', 'hidden');
        $(this).animate({width: 300}, function() {
            $(this).children('a').hide();
            $('#rechercherDansSite').fadeIn();
        });
        filterBox();
    }).bind("close", function() {
        var $this = $(this);
        $('#rechercherDansSite').fadeOut(function() {
            $this.children('a').css('visibility', 'visible').show();
            $this.animate({width: 166});
        });
    });

    $(".headerContRight .search a").bind("click touchstart", function() {
        $(".search").addClass("hovered");
        $(".globalMenu").eq(0).hide();
        $(".globalMenu").eq(1).hide();
        $(".first, .mappemonde").removeClass("hovered");
        $(".first a, #searchMap").removeClass("blue");
        $(".headerContRight .search").addClass("hovered");
        if (!$("#recherche").is(":visible")) {
            $(".headerContRight .search").trigger('open');
        } else {
            $(".headerContRight .search").trigger('close');
        }
    });

    /*    $(".search").hover(function () {
     $(".search").addClass("hovered")
     }, function () {
     if (!$("#recherche").is(":visible"))$(".search").removeClass("hovered")
     });*/

    $(".contentActu .link").hover(function() {
        $(this).css({
            background: "url(/templates/peugeot/images/bgd-bouton-grey-inverse.jpg) 0 0 repeat-x transparent"
        })
    }, function() {
        $(this).css({
            background: "url(/templates/peugeot/images/bgd-bouton-grey.jpg) 0 0 repeat-x transparent"
        })
    });

    $("#search").bind("click touchstart", function() {
        $(this).attr("value", "")
    });

    $("#rechercherDansSite").submit(function() {
        var compteur = 0;
        //   var a=$("#search");
        // var b=a.val();
        if ($("#search").val() == "" || $("#search").val() == "Champ obligatoire") {
            $("#search").attr("value", "Champ obligatoire").css({
                backgroundColor: "#f8d1d2",
                opacity: "0.7"
            });
            ;

            $("#search").bind("click touchstart", function() {
                $("#search").attr("value", "").css({
                    backgroundColor: "transparent"
                });
            });


            return false;
        }


    });

    $("#submitAjax").bind("click touchstart", function() {

        var a = $("#q");
        var search = a.val();
        if (search == "") {
            a.attr("value", "Veuillez saisir une recherche").css({
                backgroundColor: "#f8d1d2",
                opacity: "0.7"
            });

            return false;
        }
        return true;
    });

    $("#q").bind("click touchstart", function() {

        $(this).attr("value", "").css({
            backgroundColor: "#ffffff"
        });
    });

    $(".retour").bind("click touchstart", function(a) {
        window.history.back();
        a.preventDefault();
    });
    var a = $(".guideOn");
    var b = $("#emotionGuide .guideOff p");
    var c = $(".guideOff");
    $(c).addClass("telecommandeLittle");
    $("#emotionGuide").removeClass("telecommandeBig");
    $(a).hide();
    $(".guideOff p a").click("touchstart", function() {
        filterTelecommande();
        $("#header, #globalFooter").css("z-index", 11);
        if (a.is(":visible")) {
            $(a).hide();
            $(c).addClass("telecommandeLittle");
            $(b).css({
                background: "url(/templates/peugeot/images/arrows.png) 49px -2002px no-repeat transparent"
            });
            $("#opacityTelecommande").hide()
        } else {
            $(a).show();
            $(b).css({
                background: "url(/templates/peugeot/images/arrows.png) 49px -2402px no-repeat transparent"
            })
        }
    });
    var d = $(".infobulleProduits li");
    var e = $(" .guideOn li a");
    $(d).hide();
    $(e).each(function(a) {
        $(this).hover(function() {
            $(".infobulleProduits li:eq(" + a + ")").show()
        }, function() {
            $(d).hide()
        })
    });
    $(".guideOn li").hover(function() {
        $(".guideOn li").removeClass("grey");
        var a = $(this).index();
        $(this).siblings().each(function() {
            if ($(this).index() != a)
                $(this).addClass("grey")
        })
    }, function() {
        $(".guideOn li").removeClass("grey")
    });
    if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
        $("#footer .blcFR  li a").live("click touchstart", function() {
            window.location = $(this).attr("href")
        });
        $(".guideOn li a").bind("touchstart", function() {
            window.location = $(this).attr("href")
        });
        $(".guideOn li").bind("touchstart", function() {
            $(".guideOn li").removeClass("grey");
            var a = $(this).index();
            $(this).siblings().each(function() {
                if ($(this).index() != a)
                    $(this).addClass("grey")
            })
        });
        $(".guideOn li").bind("touchend", function() {
            $(".guideOn li").removeClass("grey")
        })
    }
    $(".masque").each(function(a) {
        var b = $(".masque:eq(" + a + ")");
        var c = $(".sousListeLiens li:eq(" + a + ")");
        c.css({
            visibility: "hidden"
        });
        $(b).hover(function() {
            $(".sousListeLiens li:eq(" + a + ")").css({
                visibility: "visible"
            })
        }, function() {
            $(".sousListeLiens li:eq(" + a + ")").css({
                visibility: "hidden"
            })
        })
    });
    var f = $("#homepageContentGlobal");
    if (f.is(":visible")) {
        var g = $("#header");
        var h = '<h1 id="titrePrincipal"></h1>';
        var i = $("#header .logo");
        if ($("#titrePrincipal")) {
            $(g).prepend(h);
            $("#titrePrincipal").prepend(i)
        }
    }
    if ($('.preHome').length)
        $('.preHome').preHomeResize();

    taggageInit();


});


// mise e nconformit� CNIL
/*
 gaProperty = 'UA-3328381-1';
 
 // D�sactive le tracking si le cookie d�Opt-out existe d�j�.
 
 var disableStr = 'ga-disable-' + gaProperty;
 
 if (document.cookie.indexOf('hasConsent=false') > -1) {
 window[disableStr] = true;
 }
 //Cette fonction retourne la date d�expiration du cookie de consentement 
 function getCookieExpireDate() {
 var cookieTimeout = 34214400000;// Le nombre de millisecondes que font 13 mois
 var date = new Date();
 date.setTime(date.getTime() + cookieTimeout);
 var expires = "; expires=" + date.toGMTString();
 return expires;
 }
 
 // Cette fonction est appel�e pour afficher la demande de consentement
 function askConsent() {
 var div = '<div id="cookie-banner">\
 <div class="cookie">\
 <p>En poursuivant votre navigation sur ce site, vous acceptez l\'utilisation des cookies pour r&eacute;aliser des statistiques d\'audiences et vous proposer des contenus adapt&eacute;s &agrave; vos centres d\'int&eacute;r&ecirc;ts.  \
 <a target="blank" href="private">Pour en savoir plus et param&eacute;trer vos cookies.</a></p><div class="close"><a id="closeCookie"></a></div></div></div>'; 
 $('#header')
 .prepend(div)
 .on('click', '.close', function () {
 $("#cookie-banner").remove();
 });
 
 document.getElementsByTagName('body')[0].className += ' cookiebanner';
 }
 
 
 // Retourne la chaine de caract�re correspondant � nom=valeur
 function getCookie(NomDuCookie) {
 if (document.cookie.length > 0) {
 begin = document.cookie.indexOf(NomDuCookie + "=");
 if (begin != -1) {
 begin += NomDuCookie.length + 1;
 end = document.cookie.indexOf(";", begin);
 if (end == -1) end = document.cookie.length;
 return unescape(document.cookie.substring(begin, end));
 }
 }
 return null;
 }
 
 // Fonction d'effacement des cookies   
 function delCookie(name) {
 path = ";path=" + "/";
 domain = ";domain=" + "." + document.location.hostname;
 var expiration = "Thu, 01-Jan-1970 00:00:01 GMT";
 document.cookie = name + "=" + path + domain + ";expires=" + expiration;
 }
 
 // Efface tous les types de cookies utilis�s par Google Analytics    
 function deleteAnalyticsCookies() {
 var cookieNames = ["__utma", "__utmb", "__utmc", "__utmz", "_ga"]
 for (var i = 0; i < cookieNames.length; i++)
 delCookie(cookieNames[i])
 }
 
 // La fonction d'opt-out   
 function gaOptout() {
 document.cookie = disableStr + '=true;' + getCookieExpireDate() + ' ; path=/';
 document.cookie = 'hasConsent=false;' + getCookieExpireDate() + ' ; path=/';
 var div = document.getElementById('cookie-banner');
 // Ci dessous le code de la banni�re affich�e une fois que l'utilisateur s'est oppos� au d�p�t
 // Vous pouvez modifier le contenu et le style
 if (div != null) div.innerHTML = '<div class="cookie"> Vous vous êtes opposé\
 au dépôt de cookies de mesures d\'audience dans votre navigateur </div>'
 window[disableStr] = true;
 deleteAnalyticsCookies();
 }
 
 
 var _gaq = _gaq || [];
 _gaq.push(['_setAccount', 'UA-3328381-1']);
 _gaq.push(['_trackPageview']);
 
 (function () {
 var ga = document.createElement('script');
 ga.type = 'text/javascript';
 ga.async = true;
 ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
 var s = document.getElementsByTagName('script')[0];
 s.parentNode.insertBefore(ga, s);
 })();
 
 $(function () {
 // la bani�re
 var consentCookie = getCookie('hasConsent');
 if (!consentCookie) {//L'utilisateur n'a pas encore de cookie de consentement
 var referrer_host = document.referrer.split('/')[2];
 if (referrer_host === undefined || referrer_host != document.location.hostname) { //si il vient d'un autre site
 //on d�sactive le tracking et on affiche la demande de consentement
 window[disableStr] = true;
 window[disableStr] = true;
 window.onload = askConsent;
 } else { //sinon on lui d�pose un cookie
 document.cookie = 'hasConsent=true; ' + getCookieExpireDate() + ' ; path=/';
 }
 }
 });
 
 
 */

////
var ga_ua = 'UA-3328381-1';
// Remplacez la valeur UA-XXXXXX-Y par l'identifiant analytics de votre site.
gaProperty = ga_ua;

// Désactive le tracking si le cookie d’Opt-out existe déjà.

var disableStr = 'ga-disable-' + gaProperty;

if (document.cookie.indexOf('hasConsent=false') > -1) {
    window[disableStr] = true;
}

//Cette fonction retourne la date d’expiration du cookie de consentement

function getCookieExpireDate() {
    var cookieTimeout = 34214400000;// Le nombre de millisecondes que font 13 mois
    var date = new Date();
    date.setTime(date.getTime() + cookieTimeout);
    var expires = "; expires=" + date.toGMTString();
    return expires;
}

// Cette fonction est appelée pour afficher la demande de consentement
function askConsent() {
    var bodytag = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.setAttribute('id', 'cookie-banner');
    // div.setAttribute('width','70%');

    // Vous pouvez modifier le contenu ainsi que le style
	var tempLang = $('.lang-inline li.lang-active a').text().trim();
	if (tempLang === "EN") {
    div.innerHTML = '<div class="cookie">\n\
<p>By continuing your visit on this website, you accept the use of cookies to compile visitor statistics and offer you content adapted to your interests. <a target="blank" href="/en/private">To find out more and configure your cookies.</a></p><div class="close"><a id="closeCookie"></a></div></div></div>';
	}
	else if (tempLang === "ES") {
    div.innerHTML = '<div class="cookie">\n\
<p>Al continuar la navegación en este sitio web, consideramos que acepta el uso de cookies para obtener datos estadísticos de los usuarios y ofrecerle contenidos adaptados a sus intereses. <a target="blank" href="es/vida-privada">Para más información y para la configuración de las cookies.</a></p><div class="close"><a id="closeCookie"></a></div></div></div>';
	}
	else {
    div.innerHTML = '<div class="cookie">\n\
<p>En poursuivant votre navigation sur ce site, vous acceptez l\'utilisation des cookies pour r&eacute;aliser des statistiques d\'audiences et vous proposer des contenus adapt&eacute;s &agrave; vos centres d\'int&eacute;r&ecirc;ts. <a target="blank" href="/fr/private">Pour en savoir plus et param&eacute;trer vos cookies.</a></p><div class="close"><a id="closeCookie"></a></div></div></div>';
	}
     //bodytag.insertBefore(div,bodytag.firstChild);
     
    // Ajoute la bannière juste au début de la page
    /*  document.getElementsByTagName('body')[0].className+=' cookiebanner';
     
     $('#cookie-banner .close').on('click', function(){
     
     $("#cookie-banner").hide();
     $("body.cookiebanner").removeClass("cookiebanner");
     document.cookie = 'hasConsent=true; '+ getCookieExpireDate() +' ; path=/';
     });;*/
   document.getElementsByTagName('body')[0].className += ' cookiebanner';
    $('#header')
            .prepend(div)
            
                $('#cookie-banner .close').on('click', function(){
                $("#cookie-banner").hide();
                $("body.cookiebanner").removeClass("cookiebanner");
                document.cookie = 'hasConsent=true; ' + getCookieExpireDate() + ' ; path=/';
                $('div#subLogo').addClass("subLogo-cookie-validate");
            })

}


// Retourne la chaine de caractère correspondant à nom=valeur
function getCookie(NomDuCookie) {
    if (document.cookie.length > 0) {
        begin = document.cookie.indexOf(NomDuCookie + "=");
        if (begin != -1) {
            begin += NomDuCookie.length + 1;
            end = document.cookie.indexOf(";", begin);
            if (end == -1)
                end = document.cookie.length;
            return unescape(document.cookie.substring(begin, end));
        }
    }
    return null;
}

// Fonction d'effacement des cookies
function delCookie(name) {
    path = ";path=" + "/";
    domain = ";domain=" + "." + document.location.hostname;
    var expiration = "Thu, 01-Jan-1970 00:00:01 GMT";
    document.cookie = name + "=" + path + domain + ";expires=" + expiration;
}

// Efface tous les types de cookies utilisés par Google Analytics
function deleteAnalyticsCookies() {
    var cookieNames = ["__utma", "__utmb", "__utmc", "__utmz", "_ga"]
    for (var i = 0; i < cookieNames.length; i++)
        delCookie(cookieNames[i])
}

// La fonction d'opt-out
function gaOptout() {
    document.cookie = disableStr + '=true;' + getCookieExpireDate() + ' ; path=/';
    document.cookie = 'hasConsent=false;' + getCookieExpireDate() + ' ; path=/';
    var div = document.getElementById('cookie-banner');
    // Ci dessous le code de la bannière affichée une fois que l'utilisateur s'est opposé au dépôt
    // Vous pouvez modifier le contenu et le style
    if (div != null)
        div.innerHTML = '<p class="headBandCookies"><span> Vous vous êtes opposé \
    au dépôt de cookies de mesures d\'audience dans votre navigateur </span><span class="closeHeadBand">X</span></p>'
    window[disableStr] = true;
    deleteAnalyticsCookies();

}



//Ce bout de code vérifie que le consentement n'a pas déjà été obtenu avant d'afficher
// la baniére
var consentCookie = getCookie('hasConsent');
if (!consentCookie) {//L'utilisateur n'a pas encore de cookie de consentement
    // var referrer_host = document.referrer.split('/')[2];
    //      if ( referrer_host != document.location.hostname ) { //si il vient d'un autre site
    //on désactive le tracking et on affiche la demande de consentement
    window[disableStr] = true;
    window[disableStr] = true;
    window.onload = askConsent;

    //} else { //sinon on lui dépose un cookie

    //    document.cookie = 'hasConsent=true; '+ getCookieExpireDate() +' ; path=/';

    // }
}



var _gaq = _gaq || [];
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();

function recordOutboundLink(link, category, action, delay, blank) {
    try {
        var pageTracker = _gat._getTracker(ga_ua);
        pageTracker._trackEvent(category, action);
        if (delay && !blank)
            setTimeout('document.location = "' + link.href + '"', 100);
        return blank;
    } catch (err) {
        return false;
    }
}
