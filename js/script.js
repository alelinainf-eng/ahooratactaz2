document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       WARRANTY CHECK
    ========================= */

    const warrantyForm = document.querySelector(".warranty-form");
    const warrantyResult = document.querySelector("#result");

    if (
        warrantyForm &&
        warrantyResult &&
        document.querySelector("#serial") &&
        document.querySelector("#national")
    ) {

        warrantyForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const serial =
                document.querySelector("#serial").value.trim();

            const code =
                document.querySelector("#national").value.trim();

            warrantyResult.classList.add("active");

            if (!serial || !code) {

                warrantyResult.innerHTML = `
                    <span style="color:#e5c45a;">
                        لطفاً تمام اطلاعات را وارد کنید.
                    </span>
                `;

                return;
            }

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

    const requestForm =
        document.querySelector("#requestForm");

    const requestResult =
        document.querySelector("#requestResult");

    if (requestForm && requestResult) {

        requestForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                document.querySelector("#name")?.value.trim();

            const phone =
                document.querySelector("#phone")?.value.trim();

            const serial =
                document.querySelector("#serialRequest")?.value.trim();

            requestResult.classList.add("active");

            if (!name || !phone || !serial) {

                requestResult.innerHTML = `
                    <span style="color:#e5c45a;">
                        لطفاً تمام اطلاعات را وارد کنید.
                    </span>
                `;

                return;
            }

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

    const trackingForm =
        document.querySelector("#trackingForm");

    const trackingResult =
        document.querySelector("#trackingResult");


    if (trackingForm && trackingResult) {

        trackingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const enteredCode =
                document
                    .querySelector("#trackingCode")
                    ?.value
                    .trim()
                    .toUpperCase();


            trackingResult.classList.add("active");


            if (!enteredCode) {

                trackingResult.innerHTML = `
                    <span style="color:#e5c45a;">
                        لطفاً کد پیگیری را وارد کنید.
                    </span>
                `;

                return;
            }


            let requestData = null;

            try {

                requestData =
                    JSON.parse(
                        localStorage.getItem(
                            "warrantyRequest"
                        )
                    );

            } catch {

                requestData = null;

            }


            if (
                !requestData ||
                requestData.trackingCode !== enteredCode
            ) {

                trackingResult.innerHTML = `
                    <div style="color:#e5c45a;">
                        کد پیگیری پیدا نشد.
                    </div>

                    <div style="
                        margin-top:8px;
                        color:#777;
                        line-height:2;
                    ">
                        لطفاً کد پیگیری را بررسی کرده و دوباره وارد کنید.
                    </div>
                `;

                return;
            }


            /* =========================
               SHOW REQUEST
            ========================= */

            const services =
                requestData.services || [];


            trackingResult.innerHTML = `

                <div style="
                    text-align:right;
                    line-height:2;
                ">

                    <div style="
                        color:#e5c45a;
                        font-size:15px;
                        font-weight:700;
                        margin-bottom:12px;
                    ">
                        ✓ درخواست شما پیدا شد
                    </div>


                    <div style="
                        border-bottom:1px solid #292929;
                        padding:7px 0;
                    ">
                        <span style="color:#777;">
                            نام:
                        </span>

                        <strong>
                            ${requestData.name}
                        </strong>
                    </div>


                    <div style="
                        border-bottom:1px solid #292929;
                        padding:7px 0;
                    ">
                        <span style="color:#777;">
                            شماره تماس:
                        </span>

                        <strong>
                            ${requestData.phone}
                        </strong>
                    </div>


                    <div style="
                        border-bottom:1px solid #292929;
                        padding:7px 0;
                    ">
                        <span style="color:#777;">
                            سریال قطعه:
                        </span>

                        <strong>
                            ${requestData.serial}
                        </strong>
                    </div>


                    <div style="
                        border-bottom:1px solid #292929;
                        padding:7px 0;
                    ">
                        <span style="color:#777;">
                            کد پیگیری:
                        </span>

                        <strong style="color:#e5c45a;">
                            ${requestData.trackingCode}
                        </strong>
                    </div>


                    <div style="
                        padding:10px 0 0;
                    ">

                        <span style="color:#777;">
                            خدمات:
                        </span>

                        <div style="
                            margin-top:6px;
                            color:#ddd;
                        ">
                            ${services.map(service => `
                                <div>
                                    ✓ ${service}
                                </div>
                            `).join("")}
                        </div>

                    </div>


                    <div style="
                        margin-top:14px;
                        padding:10px;
                        background:#090909;
                        border:1px solid #292929;
                        color:#c9a227;
                        text-align:center;
                    ">
                        وضعیت درخواست: در حال بررسی
                    </div>

                </div>
            `;

        });
    }


    /* =========================
       SERVICE CART
    ========================= */

    const cartInputs =
        document.querySelectorAll(".cart-service input");

    const cartCount =
        document.querySelector("#cartCount");

    const continueCart =
        document.querySelector("#continueCart");

    const cartResult =
        document.querySelector("#cartResult");


    function getSelectedServices() {

        return Array.from(
            document.querySelectorAll(
                ".cart-service input:checked"
            )
        ).map(input => input.value);

    }


    function updateCartCount() {

        if (!cartCount) return;

        const selected =
            getSelectedServices();

        cartCount.textContent =
            `${selected.length.toLocaleString("fa-IR")} مورد`;
    }


    cartInputs.forEach(input => {

        input.addEventListener("change", () => {

            updateCartCount();

        });

    });


    if (continueCart) {

        continueCart.addEventListener("click", event => {

            event.preventDefault();

            const selected =
                getSelectedServices();


            if (selected.length === 0) {

                if (cartResult) {

                    cartResult.classList.add("active");

                    cartResult.innerHTML = `
                        <span style="color:#e5c45a;">
                            لطفاً حداقل یک خدمت را انتخاب کنید.
                        </span>
                    `;
                }

                return;
            }


            localStorage.setItem(
                "selectedServices",
                JSON.stringify(selected)
            );


            window.location.assign(
                "checkout.html"
            );

        });
    }


    updateCartCount();


    /* =========================
       CHECKOUT
    ========================= */

    const selectedServicesBox =
        document.querySelector("#selectedServices");

    const checkoutCount =
        document.querySelector("#checkoutCount");

    const checkoutForm =
        document.querySelector("#checkoutForm");

    const checkoutResult =
        document.querySelector("#checkoutResult");


    if (selectedServicesBox) {

        let selectedServices = [];

        try {

            selectedServices =
                JSON.parse(
                    localStorage.getItem(
                        "selectedServices"
                    )
                ) || [];

        } catch {

            selectedServices = [];

        }


        if (checkoutCount) {

            checkoutCount.textContent =
                `${selectedServices.length.toLocaleString("fa-IR")} مورد`;
        }


        if (selectedServices.length === 0) {

            selectedServicesBox.innerHTML = `
                <div class="empty-cart">
                    هنوز خدمتی انتخاب نشده است.
                </div>
            `;

        } else {

            selectedServicesBox.innerHTML =
                selectedServices.map(service => `

                    <div class="selected-service-item">

                        <span class="selected-service-icon">
                            ✓
                        </span>

                        <span>
                            ${service}
                        </span>

                    </div>

                `).join("");
        }
    }


    /* =========================
       CHECKOUT SUBMIT
    ========================= */

    if (checkoutForm && checkoutResult) {

        checkoutForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const selectedServices =
                    JSON.parse(
                        localStorage.getItem(
                            "selectedServices"
                        )
                    ) || [];


                const name =
                    document
                        .querySelector("#checkoutName")
                        ?.value.trim();

                const phone =
                    document
                        .querySelector("#checkoutPhone")
                        ?.value.trim();

                const serial =
                    document
                        .querySelector("#checkoutSerial")
                        ?.value.trim();


                if (selectedServices.length === 0) {

                    checkoutResult.classList.add("active");

                    checkoutResult.innerHTML = `
                        <span style="color:#e5c45a;">
                            هیچ خدمتی انتخاب نشده است.
                        </span>
                    `;

                    return;
                }


                if (!name || !phone || !serial) {

                    checkoutResult.classList.add("active");

                    checkoutResult.innerHTML = `
                        <span style="color:#e5c45a;">
                            لطفاً تمام اطلاعات مشتری را وارد کنید.
                        </span>
                    `;

                    return;
                }


                /* =========================
                   GENERATE TRACKING CODE
                ========================= */

                const randomNumber =
                    Math.floor(
                        100000 + Math.random() * 900000
                    );


                const trackingCode =
                    "ATK-" + randomNumber;


                const requestData = {

                    trackingCode: trackingCode,

                    name: name,

                    phone: phone,

                    serial: serial,

                    services: selectedServices,

                    date: new Date().toLocaleDateString(
                        "fa-IR"
                    )

                };


                localStorage.setItem(
                    "warrantyRequest",
                    JSON.stringify(requestData)
                );


                localStorage.setItem(
                    "trackingCode",
                    trackingCode
                );


                window.location.assign(
                    "success.html"
                );

            }
        );
    }


    /* =========================
       SUCCESS PAGE
    ========================= */

    const generatedTrackingCode =
        document.querySelector(
            "#generatedTrackingCode"
        );


    if (generatedTrackingCode) {

        const trackingCode =
            localStorage.getItem(
                "trackingCode"
            );


        if (trackingCode) {

            generatedTrackingCode.textContent =
                trackingCode;

        } else {

            generatedTrackingCode.textContent =
                "------";

        }
    }

});