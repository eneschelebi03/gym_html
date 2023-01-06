// Carousel config
function carouselAction() {
    const crslBtns = document.querySelectorAll(".crsl-btn");
    let currentSlide = 1;

    var manualNav = function (manual) {
        slides.forEach((slide) => {
            slide.classList.remove("active");

            crslBtns.forEach((btn) => {
                btn.classList.remove("active");
            });
        });

        slides[manual].classList.add("active");
        crslBtns[manual].classList.add("active");
    };

    crslBtns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            manualNav(i);
            currentSlide = i;
        });
    });

    var repeat = function (activeClass) {
        let active = document.getElementsByClassName("active");
        let i = 1;

        var repeater = () => {
            setTimeout(function () {
                [...active].forEach((activeSide) => {
                    activeSide.classList.remove("active");
                });

                slides[i].classList.add("active");
                crslBtns[i].classList.add("active");
                i++;

                if (slides.length == i) {
                    i = 0;
                }

                if (i >= slides.length) {
                    return;
                }

                repeater();
            }, 10000);
        };
        repeater();
    };
    repeat();
}