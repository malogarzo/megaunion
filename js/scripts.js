$(function() {

    "use strict";

    var wind = $(window);

    // scrollIt
    $.scrollIt({
      upKey: 38,                // key code to navigate to the next section
      downKey: 40,              // key code to navigate to the previous section
      easing: 'swing',          // the easing function for animation
      scrollTime: 600,          // how long (in ms) the animation takes
      activeClass: 'active',    // class given to the active nav element
      onPageChange: null,       // function(pageIndex) that is called when page is changed
      topOffset: -80            // offste (in px) for fixed top navigation
    });

    // navbar scrolling background
    wind.on("scroll",function () {

        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar"),
            logo = $(".navbar .ti-logo> img");

        if(bodyScroll > 100){
            navbar.addClass("nav-scroll");
            logo.attr('src', 'img/logo_megaunion.png');
        }else{
            navbar.removeClass("nav-scroll");
            logo.attr('src', 'img/logo_megaunion.png');
        }
    });

    // header textillate
    $('.tlt').textillate({
        selector: '.texts',
        loop: true,
        in: {
            effect: 'fadeIn',
            delayScale: 1.5,
            delay: 50
        },
        out: {
            effect: 'fadeOut',
            delayScale: 1.5,
            delay: 50
        },
        type: 'char'
      });

    // sections background image from data background
    var pageSection = $(".bg-img, section");
    pageSection.each(function(indx){
        
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

    // progress bar
    wind.on('scroll', function () {
        $(".ti-skill-progress .ti-progres").each(function () {
            var bottom_of_object = 
            $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = 
            $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if(bottom_of_window > bottom_of_object) {
                $(this).css({
                    width : myVal
                });
            }
        });
    });
    
    // === owl-carousel === //

    // Testimonials owlCarousel
    $('.ti-testimonails .owl-carousel').owlCarousel({
        items:2,
        loop:true,
        margin: 15,
        mouseDrag:true,
        autoplay:true,
        mouseDrag:true,
        smartSpeed:500,
        responsive:{
            0:{
                items:1
            },
            700:{
                items:2
            },
            1000:{
                items:2
            }
        }
    });

    // Client owlCarousel
    $('.ti-clients .owl-carousel').owlCarousel({
        items:4,
        loop:true,
        margin: 15,
        mouseDrag:true,
        autoplay:true,
        smartSpeed:500,
        dots: false,
        responsiveClass:true,
        responsive:{
            0:{
                items:1
            },
            700:{
                items:2
            },
            1000:{
                items:4
            }
        }
    });
    
    // === End owl-carousel === //

    // magnificPopup
    $('.ti-portfolio-gallery').magnificPopup({
        delegate: '.popimg',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    // YouTubePopUp
    $("a.vid").YouTubePopUp();

    // countUp
    $('.ti-numbers .ti-number-count').countUp({
        delay: 10,
        time: 1500
    });

});


// === window When Loading === //
$(window).on("load",function (){

    var wind = $(window);

    // Preloader
    $(".loading").fadeOut(500);

    // stellar
    wind.stellar();

    // isotope
    $('.ti-portfolio-gallery').isotope({
      // options
      itemSelector: '.ti-portfolio-items'
    });

    var $gallery = $('.ti-portfolio-gallery').isotope({
      // options
    });

    // filter items on button click
    $('.ti-portfolio-filter').on( 'click', 'span', function() {

        var filterValue = $(this).attr('data-filter');

        $gallery.isotope({ filter: filterValue });

    });

    $('.ti-portfolio-filter').on( 'click', 'span', function() {

        $(this).addClass('active').siblings().removeClass('active');

    });

    // contact form validator
    $('#contact-form').validator({focus:false});

    $('#contact-form').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageAlert && messageText) {
                        $('#contact-form').find('.messages').html(alertBox);
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    });

});