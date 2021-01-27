var Init = {

  /* Scroll to top
  -------------------------------*/
  scrollToTop: function () {
    $("#toTop").on('click', function () {
      $("html, body").animate({ scrollTop: 0 }, 800);
    })
  },

  /* Smooth Scroll
  -------------------------------*/
  smoothScroll: function () {
    $('a[href^="#"]').on('click', function () {
      var h = $('#header').height();
      var hr = $(this).attr('href');
      var t = $(hr == "#" || hr == "" ? 'body' : hr);
      var p = t.offset().top - h;
      $('html,body').animate({
        scrollTop: p
      }, 300);
      return false;
    });
  },


  /* Accordion
  -------------------------------*/
  accordion: function () {
    $(".set > a").on("click", function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this)
          .siblings(".content")
          .slideUp(200);
        $(".set > a i")
          .removeClass("fa-minus")
          .addClass("fa-plus");
      } else {
        $(".set > a i")
          .removeClass("fa-minus")
          .addClass("fa-plus");
        $(this)
          .find("i")
          .removeClass("fa-plus")
          .addClass("fa-minus");
        $(".set > a").removeClass("active");
        $(this).addClass("active");
        $(".content").slideUp(200);
        $(this)
          .siblings(".content")
          .slideDown(200);
      }
    });
  },


  /* active hamburger
  -------------------------------*/
  handelHamburger: function () {
    $('.header-nav__hamburger').on('click', function (e) {
      e.preventDefault();
      $(this).toggleClass('is-active');
      $('.header-nav').slideToggle();
      if ($('body').hasClass('no-scroll')) {
        Init.scrollPage(false);
      } else {
        Init.scrollPage(true);
      }
    })
  },


  /* active menu
  -------------------------------*/
  handleActiveLinkMenu: function () {
    $('.header-nav-link').on('click', function (e) {
      e.preventDefault();
      var ww = $(window).width();

      $('.header-nav-link').removeClass('is-active');
      $(this).addClass('is-active');

      if (ww < 640) {
        $('.header-nav__hamburger').removeClass('is-active');
        $('.header-nav').slideUp('fast');
        if ($('body').hasClass('no-scroll')) {
          Init.scrollPage(false);
        } else {
          Init.scrollPage(true);
        }
      }
    })
  },

  /* active menu
  -------------------------------*/
  scrollPage: function (_flag) {
    t = $(window).scrollTop();
    console.log('scrollPage', t);
    if (_flag) {
      // $('body').addClass('no-scroll').css({ 'top': -t });
      $('body').addClass('no-scroll').css({ 'top': 0 });
      _flag = true;
    } else {
      $('body').removeClass('no-scroll').removeAttr('style');
      window.scrollTo(0, t);
      _flag = false;
    }
  },


  /* no scroll when open modal
  -------------------------------*/
  no_scroll: function () {
    var current_scrollY = $(window).scrollTop();
    $('.show-modal').css({
      position: 'fixed',
      left: 0,
      right: 0,
      width: '100%',
      top: -1 * current_scrollY
    });
  },


  /* return scroll when close modal
  -------------------------------*/
  return_scroll: function () {
    var current_scrollY = $(window).scrollTop();
    $('.show-modal').attr({ style: '' });
    $('html, body').prop({ scrollTop: current_scrollY });
  },


  /* Tabs
  -------------------------------*/
  handleTab: function () {
    $('.panel').hide();
    $('#panel-1').show();
    $('.tabs li a').on('click', function (e) {
      e.preventDefault();
      $('.panel').hide();
      $('.tabs li a').removeClass('active');
      $(this).addClass('active');
      var panel = $(this).attr('data-tab');
      $('#' + panel).fadeIn(800);

      return false;
    })
  },


  /* effect fadeIn
  -------------------------------*/
  effectCSS: function () {
    $(window).scroll(function () {
      $('.fadein').each(function () {
        var elemPos = $(this).offset().top;
        console.log('elemPos fadein ', elemPos);
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        console.log('windowHeight', windowHeight);
        if (scroll > elemPos - windowHeight) {
          $(this).addClass('scrollin');
        }
      });
    });
  },
}

/* check mobile device
-------------------------------*/
var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

// user
if (isMobile.any()) {
  //code here
}


$(window).on('load resize', Init.scrollToTop());
$(window).on('load resize', Init.smoothScroll());


$(document).ready(function () {

  // call function
  Init.accordion();
  Init.handelHamburger();
  Init.handleActiveLinkMenu();
  Init.handleTab();
  Init.effectCSS();

  $('body').append("<div class='modal'>Appended item</div>");
  setTimeout(() => {
    $(".modal").remove();
  }, 5000);
});


// scroll browser show back-to-top
$(window).scroll(function () {
  var hHeader = $("#header").innerHeight(), hScroll = Math.round($(this).scrollTop());
  if (hScroll > hHeader) {
    $("#toTop").addClass('show-to-top');
  } else {
    $("#toTop").removeClass('show-to-top');
  }
});

// smooth fixed header on scroll
$(window).scroll(function () {
  var hHeader = $("#header").innerHeight(), hScroll = Math.round($(this).scrollTop());
  if (hScroll > hHeader) {
    $("#header").addClass('fixed-top');
  } else {
    $("#header").removeClass('fixed-top');
  }
});

