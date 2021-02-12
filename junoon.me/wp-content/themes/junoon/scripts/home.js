// slick slider
$(document).ready(function () {
$('.trackday_slick').slick({
    infinite: true,
    arrows: false,
    dots: false,
    fade: true,
    pauseOnFocus: true,
    autoplay: false,
    speed: 1000
});

//ticking machine
var percentTime;
var tick;
var time = 5;
var progressBarIndex = 0;

var progress = $('.inProgress');

$('.progressBarContainer .progressBar').each(function (index) {
    var progress = "<div class='inProgress inProgress" + index + "'></div>";
    $(this).html(progress);
   
});

function startProgressbar() {
    resetProgressbar();
    percentTime = 0;
    tick = setInterval(interval, 8);
    document.querySelector('.videos-carousal').play();
      
}

function interval() {
    if (($('.slider .slick-track div[data-slick-index="' + progressBarIndex + '"]').attr("aria-hidden")) === "true") {
        progressBarIndex = $('.slider .slick-track div[aria-hidden="false"]').data("slickIndex");
        // play videos

        if (progressBarIndex == 1) {
            $(".inProgress0").addClass('on');
            $(".inProgress1").removeClass('on');
        }
        else if (progressBarIndex == 2) {
            $(".inProgress0").addClass('on');
            $(".inProgress1").addClass('on');
        }
        else if (progressBarIndex == 3) {
            $(".inProgress0").addClass('on');
            $(".inProgress1").addClass('on');
        }
        else if (progressBarIndex == 0) {
            $(".inProgress0").removeClass('on');
            $(".inProgress1").removeClass('on');
        }
        startProgressbar();

    } else {
        
        percentTime += 1 / (time + 3);
        $('.inProgress' + progressBarIndex).css({
            width: percentTime + "%"
        });
        if (percentTime >= 100) {
            $('.single-item').slick('slickNext');

            //console.log(progressBarIndex);

            if (progressBarIndex == 0) {
                $(".inProgress0").addClass('on');

            }
            else if (progressBarIndex == 1) {
                $(".inProgress0").removeClass('on');
                $(".inProgress1").removeClass('on');
            }
            else if (progressBarIndex == 2) {
                $(".inProgress0").removeClass('on');
                $(".inProgress1").removeClass('on');
            }
            else if (progressBarIndex == 3) {
                $(".inProgress0").removeClass('on');
                $(".inProgress1").removeClass('on');
            }

            progressBarIndex++;

            if (progressBarIndex > 2) {
                progressBarIndex = 0;
            }
            startProgressbar();
            
        }

    }
}

function resetProgressbar() {
    $('.inProgress').css({
        width: 0 + '%'
    });
    clearInterval(tick);
}
startProgressbar();
// End ticking machine

$('.progressBarContainer div').click(function () {
    clearInterval(tick);
    var goToThisIndex = $(this).find("span").data("slickIndex");
    $('.single-item').slick('slickGoTo', goToThisIndex, false);
    startProgressbar();
    document.querySelector('.videos-carousal').play();
});
});
$(document).ready(function() {
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        margin: 10,
        nav: false,
        dots: false,
        autoplay:true,
        items: 1,
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
})