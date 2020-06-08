var database = firebase.database();
var auth = firebase.auth();
var globalslaps = document.getElementById('globalslaps');
var hsc = document.getElementById('horseslap');

lowLag.init();
lowLag.load("slap.mp3");
lowLag.load("horse1.mp3");
lowLag.load("horse2.mp3");
lowLag.load("horse0.mp3");
lowLag.load("squeak.mp3");

//animate.css extend function
$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function () {

            $(this).removeClass('animated ' + animationName);
            if (callback) {
                callback();
            }
        });
        return this;
    }
});

//horsebase
auth.signInAnonymously().catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
});
database.ref('/globalslaps/slaps').on('value', function (snapshot) {
    globalslaps.innerHTML = snapshot.val();
    globalslapnumber = snapshot.val();
});

function userslap() {
    var slap = 'slap.mp3'
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
    hsc.style.cursor = "url('/imgs/hands-03.png'), auto";
    var critical = Math.floor((Math.random() * 10) + 1);
    lowLag.play(slap);
    if (critical === 10) {
        globalslapnumber = globalslapnumber + 5
        var n = document.createTextNode('5');
        var rhs = Math.floor(Math.random() * 2);
        var neigh = "horse" + rhs + ".mp3"
        lowLag.play(neigh);
        $('#globalslaps').animateCss('pulse');
    } else {
        globalslapnumber = globalslapnumber + 1
        var n = document.createTextNode('1');
        $('#globalslaps').animateCss('pulse');
    }
}

function userupslap() {
    hsc.style.cursor = "url('/imgs/hands-02.png'), auto";
    database.ref('/globalslaps').set({
        slaps: globalslapnumber
    });
}

//slideup

function slideUp() {
    $('#contact').hide();
    $('#work').show();
    $('#horseslap').addClass('slideOutUp');
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    //Animates

    $('.el').on('click', function () {
        var infoName = $(this).attr('data-attribute-name');
        var dislikes = $(this).attr('data-attribute-dislikes');
        var likes = $(this).attr('data-attribute-likes');
        var infoImage = $(this).children("img").attr("src");
        $('#moreInfoPic').attr('src', infoImage);
        $('.infoName').text(infoName);
        $('.dislikes').text(dislikes);
        $('.likes').text(likes);
    });

    //isotope

    var $grid = $('.grid').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'masonry'
    }).isotope('shuffle');

    $('.filterButtons').on('click', 'button', function () {
        var filterVal = $(this).attr('class');
        $grid.isotope({ filter: '.' + filterVal });
        console.log('clicked' + ' ' + this + ' ' + filterVal);
    }
    );

    //Swipper ALL swiping

    var swiper = new Swiper('.sticker-slider', {
        direction: 'vertical',
        slidesPerView: 1,
        loop: true,
        autoplay: true,
        lazy: true,
        speed: 300,
        allowTouchMove: false
    });

    //Lazy Fades
    AOS.init({
        duration: 700
    }

    );

}