const albumModule = {
    swiper: null,
    videoFile: document.getElementById("video-file"),
    videoIcon: document.getElementById("video-icon"),
    initAlbum: function() {
        const cards = document.querySelectorAll(".album__card");

        cards.forEach((card) => {
            const cardLinks = card.querySelectorAll("a");
            
            card.querySelector(".album__description").innerText = `${cardLinks.length} photos`;
        });

        albumModule.swiper = new Swiper(".album__container", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            loop: true,
            spaceBetween: 32,
            coverflowEffect: {
                rotate: 0,
            },
        });
    },
    handleVideo: function() {
        if (albumModule.videoFile.paused) {
            albumModule.videoFile.play();
            albumModule.videoIcon.classList.add("ri-pause-line");
            albumModule.videoIcon.classList.remove("ri-play-line");
        } else {
            albumModule.videoFile.pause();
            albumModule.videoIcon.classList.remove("ri-pause-line");
            albumModule.videoIcon.classList.add("ri-play-line");
        }
    },
    handleVideoEnding: function() {
        albumModule.videoIcon.classList.remove("ri-pause-line");
        albumModule.videoIcon.classList.add("ri-play-line");
    }
}
