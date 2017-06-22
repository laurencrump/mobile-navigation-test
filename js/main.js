jQuery(document).ready(function($){

    //var pageWidth = $(window).width(); 
    var pageWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var raw_navigation = $('.mainNavigation').html(); //grab unaltered html and store it


    function menu() {
        $('.mobileNavigation .mainNavigation li ul').siblings('a').wrap('<div class="links"></div>').addClass('hasChildren').after('<a class="plus" href="#">plus</a>');
        $('.mobileNavigation .mainNavigation li >ul').addClass('nav');
        $('.mobileNavigation .mainNavigation li >ul ul').wrap('<div class="submenu"><div class="wrapper"></div></div>');
        $('.mobileNavigation .submenu .wrapper').append('<a href="#" class="collapse"><span>collapse</span></a>');

        $('.mobileNavigation .submenu .wrapper .collapse').on("click", function(e){
            var submenu = $(this).closest('.submenu');
            submenu.removeClass('opened').parent('li').removeClass('open');
            $('.mainNavigation').removeClass('navOpen');
            e.preventDefault();
            e.stopPropagation();
        });

        $('.plus').on("click", function(e){
            var plus = $(this);
            plus.toggleClass('plusOpen');
            plus.parent('div').parent('li').addClass('open');
            plus.parent('div.links').siblings('div.submenu').addClass('opened');
            $('li.open').parent('ul.nav').parent('li').parent('ul').parent('.mainNavigation').addClass('navOpen');
            e.preventDefault();
        });

        $('.menuToggle').click(function(e){
            $('html').addClass('MenuOpen');
         //   $('.siteHeader').addClass('MenuOpen');
            $('.mobileNavigation').addClass('mobileNavigationOpen');
            e.preventDefault();
        });

        $('.mobileNavigation .menuClose').click(function(e){
            $('html').removeClass('MenuOpen');
        //    $('.siteHeader').removeClass('MenuOpen');
            $('.mobileNavigation').removeClass('mobileNavigationOpen');
            e.preventDefault();
        });

        $('.mobileNavigation .drawer-close').on("click", function(e){
            $('html').removeClass('MenuOpen');
        //    $('.siteHeader').removeClass('MenuOpen');
            $('.mobileNavigation').removeClass('mobileNavigationOpen');
            $('.nav li').removeClass('open');
            $('.submenu').removeClass('opened');
            e.preventDefault();
        });
    }
    
    if(pageWidth >= 1024) {
        $('#navigation').removeClass('mobileNavigation');
    } else {
        $('#navigation').removeClass('siteNavigation');
        menu();
        //add submenu title to the top of 'drawer'
         $('.mobileNavigation .mainNavigation .submenu .wrapper').each(function(){
            var submenuTitle = $(this).closest('.submenu').siblings('.links').children('a:first-child').html();

            $(this).prepend('<p class="submenu-title">' + submenuTitle + '</p>');
         });
    }

    //desktop megamenu
    $('.siteNavigation .mainNavigation ul li >ul').wrap('<div class="megamenu"></div>');

    //desktop active megamenu
    if(pageWidth >= 1024) {
        $('.active-trail').parent('ul').parent('.mainNavigation').parents().eq(4).addClass('active-nav');
        var megamenuHeight = $('.active-nav ul >.active-trail .megamenu').outerHeight(true);
        $('.active-nav').css('padding-bottom', megamenuHeight);
    }


    $(window).resize(function() {

        var pageWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        if(pageWidth >= 1024) {
           // console.log('large');
            // remove the old markup
            $('.mainNavigation').remove();

            //now re-insert clean mark-up
            $('.navigationContainer .container .mainNav-container').prepend("<div class='mainNavigation menu-nav'></div>");
            $('.mainNavigation').html(raw_navigation);
            $('#navigation').addClass('siteNavigation').removeClass('mobileNavigation');
            $('.mainNavigation ul li >ul').removeClass('nav').wrap('<div class="megamenu"></div>');
        } else {
           // console.log('other');
            $('#navigation').addClass('mobileNavigation').removeClass('siteNavigation');
            // remove the old markup
            $('.mainNavigation').remove();

            //now re-insert clean mark-up
            $('.navigationContainer .container .mainNav-container').prepend("<div class='mainNavigation menu-nav'></div>");
            $('.mainNavigation').html(raw_navigation);
            menu();
            $('.mobileNavigation .mainNavigation .submenu .wrapper').each(function(){
                var submenuTitle = $(this).closest('.submenu').siblings('.links').children('a:first-child').html();
                $(this).prepend('<p class="submenu-title">' + submenuTitle + '</p>');
            });
        }

        if(pageWidth >= 1024) {
            //desktop active megamenu
            $('.active-trail').parent('ul').parent('.mainNavigation').parents().eq(4).addClass('active-nav');
            var megamenuHeight = $('.active-nav ul >.active-trail .megamenu').outerHeight(true);
            $('.active-nav').css('padding-bottom', megamenuHeight);
        } else {
            $('.active-nav').css('padding-bottom', 0);
        }

    });

});
