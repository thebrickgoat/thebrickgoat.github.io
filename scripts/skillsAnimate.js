var topY = document.getElementById('skill-container').offsetHeight - 100
var topX = document.getElementById('skill-container').offsetWidth - 200
var animateSkills = function () {
    $('.el').each(function () {
        $(this).animate({
            top:  Math.floor(Math.random() * topY),
            left:  Math.floor(Math.random() * topX)
        }, 10000);
    });
    requestAnimationFrame(animateSkills);
};
animateSkills();