$(function () {
    // Homepage Cycle
    $('.listeProduits > .btn_hp_experience > a').on('click', function(){
        pushTag(
            dataLayer[0]['brand'],
            '',
            'homepage',
            dataLayer[0]['language'],
            dataLayer[0]['country'],
            'kpp',
            $(this).data('type')
        );
    });

    // if($('#experience_page').length) {
    //    var type = $('#experience_page').data('type');
    //
    //    pushTag(
    //         dataLayer[0]['brand'],
    //         '',
    //         type,
    //         dataLayer[0]['language'],
    //         dataLayer[0]['country'],
    //         'kpp',
    //         'cycles'
    //    );
    // }

    // HP Cycle : rubrique
    $('.contentCategory .btn_single_experience').on('click', function(event){
        pushTagEvent(
            'uaevent',
            'button',
            'clic',
            $(this).children("span").text()
        );
    });

    // HP Cycle : cta externe
    $('.cycle-pays .cta-externe').on('click', function(){
        pushTagEvent('uaevent', 'button', 'clic', 'cta externe');
    });

    // HP Cycle : localiser point de vente
    $('.cycle-pays .sales-outlet').on('click', function(){
        pushTagEvent('uaevent', 'button', 'clic', 'point de vente');
    });

    // HP Cycle : les dernieres actualites
    $('.layout-experience .lastActus .actus li .cta-actualite').on('click', function(){
        pushTagEvent(
            'uaevent',
            'button',
            'lien',
            'dernieres actualites | ' + $(this).text()
        );
    });

    // HP Cycle : professionels : devenir importateur
    $('.layout-experience .lastActus .actus li .cta-importateur').on('click', function(){
        pushTagEvent('uaevent', 'button', 'lien', 'devenir importateur');
    });

    // HP Cycle : professionels : bloggueurs
    $('.layout-experience .lastActus .actus li .cta-bloggueur').on('click', function(){
        pushTagEvent('uaevent', 'button', 'lien', 'journaliste | blogueur');
    });

    // Univers Cycle : rubrique
    $('.layout-inner-experience .home .home-menu-list .home-menu-item a').on('click', function(){
        pushTagEvent(
          'uaevent',
          'button',
          'clic',
          $(this).children("span").text()
        );
    });

    // Univers Cycle : rubrique right
    $('#experience_page li a').on('click', function(){
        pushTagEvent(
            'uaevent',
            'menu',
            'clic',
            $(this).text()
        );
    });

    // Univer Cycle : cta externe
    $('.layout-inner-experience .section .section-part-list .section-part .section-content a').on('click', function(){
        pushTagEvent('uaevent', 'button', 'clic', 'cta externe');
    });
});

function pushTag(brand, eventName, virtualPageUrl, lang, country, level1, level2)
{
    dataLayer.push({
        'brand': brand,
        'event': eventName,
        'virtualPageURL': virtualPageUrl,
        'language': lang,
        'country': country,
        'siteTypeLevel1': level1,
        'siteTypeLevel2': level2
    });
}

function pushTagEvent(event,category,action,label) {
    dataLayer.push({
        'event': event,
        'eventCategory': category,
        'eventAction': action,
        'eventLabel': label
    });
}