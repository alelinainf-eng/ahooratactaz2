document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       DASHBOARD
    ========================= */

    const cards = document.querySelectorAll(".service-card");

    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.cursor = "pointer";
        });
    });


    /* =========================
       WARRANTY CHECK
    ========================= */

    const warrantyForm = document.querySelector(".warranty-form");
    const warrantyResult = document.querySelector("#result");

    if (warrantyForm && warrantyResult) {

        warrantyForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const serial = document.querySelector("#serial")?.value.trim();
            const code = document.querySelector("#national")?.value.trim();

            if (!serial || !code) {

                warrantyResult.classList.add("active");

                warrantyResult.innerHTML = `
                    <span style="color:#e5c45a;">
                        لطفاً تمام اطلاعات را وارد کنید.
                    </span>
                `;

                return;
            }

            warrantyResult.classList.add("active");

            warrantyResult.innerHTML = `
                <strong style="color:#e5c45a;">
                    در حال بررسی اطلاعات...
                </strong>
            `;

        });
    }


    /* =========================
       WARRANTY REQUEST
    ========================= */

    const requestForm = document.querySelector("#requestForm");
    const requestResult = document.querySelector("#requestResult");

    if (requestForm && requestResult) {

        requestForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.querySelector("#name")?.value.trim();
            const phone = document.querySelector("#phone")?.value.trim();
            const serial = document.querySelector("#serialRequest")?.value.trim();

            if (!name || !phone || !serial) {

                requestResult.classList.add("active");

                requestResult.innerHTML = `
                    <span style="color:#e5c45a;">
                        لطفاً تمام اطلاعات را وارد کنید.
                    </span>
                `;

                return;
            }

            requestResult.classList.add("active");

            requestResult.innerHTML = `
                <strong style="color:#e5c45a;">
                    درخواست شما با موفقیت ثبت شد.
                </strong>
            `;

            requestForm.reset();

        });
    }


    /* =========================
       REQUEST TRACKING
    ========================= */

    const trackingForm = document.querySelector("#trackingForm");
    const trackingResult = document.querySelector("#trackingResult");

    if (trackingForm && trackingResult) {

        trackingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const trackingCode =
                document.querySelector("#trackingCode")?.value.trim();

            if (!trackingCode) {

                trackingResult.classList.add("active");

                trackingResult.innerHTML = `
                    <span style="color:#e5c45a;">
                        لطفاً کد پیگیری را وارد کنید.
                    </span>
                `;

                return;
            }

            trackingResult.classList.add("active");

            trackingResult.innerHTML = `
                <strong style="color:#e5c45a;">
                    در حال بررسی درخواست...
                </strong>
            `;

        });
    }

});