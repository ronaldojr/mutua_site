function taggage(a) {

}
$(function () {
    $("area").live("mouseenter",function () {
        $("#mapHover").css({
            "background-image": 'url("templates/peugeot/images/map.png")',
            "background-position": "-" + parseInt(this.id.replace("map_", "")) * 500 + "px 0px"
        })
    }).live("mouseleave", function () {
        $("#mapHover").css({
            "background-image": "none",
            "background-position": "0px 0px"
        })
    });
    $(" #buttonReturn").live("click touchstart", function () {
        $("#globalMenu").load("?option=com_peugeot&view=boussole&format=raw&lang=" + $("#languageSite").val(), {
            noGeo: true
        })
    });

    $(" #searchMap").live("click touchstart", function (a) {
        a.preventDefault();
        $("#globalMenu").load("?option=com_peugeot&view=boussole&format=raw&lang=" + $("#languageSite").val())
    });

    $("#buttonReturn01").live("click touchstart", function (a) {
        a.preventDefault();
        $("#globalMenu").load("?option=com_peugeot&view=boussole&format=raw&layout=continent&lang=" + $("#languageSite").val(), {
            continent: $(this).attr("alt"),
            noGeo: true
        })
    });
    $("area").live("click touchstart", function (a) {
        a.preventDefault();
        $("#globalMenu").load("?option=com_peugeot&view=boussole&format=raw&layout=continent&lang=" + $("#languageSite").val(), {
            continent: $(this).attr("alt")
        });
        $("#mapHover").css({
            "background-image": 'url("templates/peugeot/images/map.png")',
            "background-position": "-" + parseInt(this.id.replace("map_", "")) * 500 + "px 0px"
        })
    });

    $(".linkBoussole").live("click touchstart", function (a) {
        a.preventDefault();
        var b = $(this).attr("rel").split('-');
        $("#globalMenu").load("?option=com_peugeot&view=boussole&format=raw&layout=pays&lang=" + $("#languageSite").val(), {
            continent: b[0],
            pays: b[1]
        }, function () {
            $("#navMenu").hide();
            $(".mappemonde  .globalMenu").show();
            filterBox();
        })
    });

    $(".pays li").live("click touchstart", function (a) {
        a.preventDefault();
        var b = $(this).find("img").attr("title");
        $("#globalMenu").load("?option=com_peugeot&view=boussole&format=raw&layout=pays&lang=" + $("#languageSite").val(), {
            continent: $("#apercuContinent").attr("alt"),
            pays: b
        });
    });
    $(".mapWorld .link").live("click touchstart", function (a) {
        a.preventDefault();
        if ($(this).parent().hasClass('hideUp'))
			$(this).parent().removeClass("hideUp");
		else
			$(this).parent().addClass('hideUp');
        $(this).siblings('.address').slideToggle();
        $(this).siblings('.meaInfos').toggle();
        $(this).parent().siblings('.hideShow').children('.address,.meaInfos').hide();
    });


    $("#import").live("click touchstart", function () {
        $("#import .importChild").slideToggle();
        $(this).toggleClass('open');

    });
    $("#import .importChild").live("click touchstart", function (event) {
        event.stopImmediatePropagation();
    });
    if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
        $(".globalMenu .reseaux .youtube a").live("click touchstart", function () {
            window.open($(this).attr("href"), "_blank");
        });
    }
})