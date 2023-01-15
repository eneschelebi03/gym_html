const slides = [];

$(document).ready(function () {
    loadMainCarousel();
    loadTopSupplements();
    loadTopWear();
});

function loadMainCarousel() {
    $.get("http://localhost:8080/carousel", function (responseJson) {

        let exclusiveCarousel = document.getElementById('offers')

        $.each(responseJson, function (index, exclusive) {

            let slide = document.createElement('div')
            slide.classList.add('slide')
            slide.classList.add('active')
            exclusiveCarousel.append(slide)

            slides.push(slide)

            let picUrl = exclusive.pictureUrl

            let offerPicture = document.createElement('img')
            offerPicture.setAttribute('src', picUrl)
            slide.append(offerPicture);

        });

    }).done(function () {
        carouselAction();

    }).fail(function () {
        alert('failed')
    })
}





