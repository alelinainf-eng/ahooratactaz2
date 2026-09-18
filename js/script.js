document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".service-card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.style.cursor = "pointer";
        });

    });

});
