  (function() {
    var cx = '006698745606709901357:aub8s7hf0g8';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
(function($) {
  
  "use strict";  

  $(window).on('load', function() {


  /*Page Loader active
  ========================================================*/
  $('#preloader').fadeOut();

  // Sticky Nav
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.scrolling-navbar').addClass('top-nav-collapse');
        } else {
            $('.scrolling-navbar').removeClass('top-nav-collapse');
        }
    });
    $(document).ready(function() {
      // var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

      $('#menutitle').hover(
        function() { // mouseenter
          // hide & compress initial text
          // $('#menutitle h3').stop().animate({
          //   width: '0px',
          //   opacity: 0
          // }, $('#menutitle h3').hide);

          // show & decompress link options
          $("#menutitle h5").slideDown();

          // $('#menutitle h5').stop().show().animate({
          //   width: w,
          //   opacity: 1
          // });
    
        },
        function() { //mouseleave
          // hide & compress options
          // $('#menutitle h5').stop().animate({
          //   width: '0px',
          //   opacity: 0
          // }, $('#menutitle h5').hide);
          // var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
          $("#menutitle h5").slideUp();

          // show & decompress link options
          // $('#menutitle h3').stop().show().animate({
            
          //   width: w,
          //   opacity: 1
          // });
    
        });
    });
    $(document).ready(function() {
      // var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

      $('.nichewaala').hover(
        function() { // mouseenter

          $(".nichekar").slideDown();


    
        },
        function() { //mouseleave

          $(".nichekar").slideUp();

   
    
        });
    });
    // one page navigation 
    $('.navbar-nav').onePageNav({
      currentClass: 'active'
    });

    /* slicknav mobile menu active  */
    $('.mobile-menu').slicknav({
        prependTo: '.navbar-header',
        parentTag: 'liner',
        allowParentLinks: true,
        duplicate: true,
        label: '',
        closedSymbol: '<i class="fa fa-chevron-right"></i>',
        openedSymbol: '<i class="fa fa-chevron-down"></i>',
      });

    //MixitUp
     $('#portfolio').mixItUp();

    /* Testimonials Carousel 
    ========================================================*/
    $('#single-testimonial-item').owlCarousel({     
        items : 1,
        navigation : true,
        pagination: false,
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true
    });  

    $('#single-testimonial-item').find('.owl-prev').html('<i class="fa fa-angle-left"></i>');
    $('#single-testimonial-item').find('.owl-next').html('<i class="fa fa-angle-right"></i>');

    /* Counter
    ========================================================*/
    $('.timer').countTo({
      refreshInterval: 60,
      formatter: function(value, options) {
        return value.toFixed(options.decimals);
      },
    });

    /* Back Top Link acive
    ========================================================*/
      var offset = 200;
      var duration = 500;
      $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
          $('.back-to-top').fadeIn(400);
        } else {
          $('.back-to-top').fadeOut(400);
        }
      });

      $('.back-to-top').on('click',function(event) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, 600);
        return false;
      });

  });      

}(jQuery));