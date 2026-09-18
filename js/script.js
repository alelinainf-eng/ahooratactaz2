document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".service-card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.style.cursor = "pointer";
        });

    });

});
const warrantyForm = document.querySelector(".warranty-form");

if (warrantyForm) {

    warrantyForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const serial = document.querySelector("#serial").value.trim();
        const code = document.querySelector("#national").value.trim();
        const result = document.querySelector("#result");

        if (!serial || !code) {

            result.classList.add("active");
            result.innerHTML = `
                <span style="color:#e5c45a;">
                    لطفاً تمام اطلاعات را وارد کنید.
                </span>
            `;

            return;
        }

        result.classList.add("active");

        result.innerHTML = `
            <strong style="color:#e5c45a;">
                در حال بررسی اطلاعات...
            </strong>
        `;

    });

}