/* =========================
   SUPABASE CONFIG
========================= */

const SUPABASE_URL =
    "https://zsbnrfrkjhywqupqrrvy.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_juN7qKZtLx2w5qfFDAV_0g_qIQp7Hga";


/* =========================
   LOAD SUPABASE
========================= */

const supabaseScript =
    document.createElement("script");

supabaseScript.src =
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

supabaseScript.onload = () => {

    window.supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );

    initWebsite();

};

document.head.appendChild(supabaseScript);


/* =========================
   WEBSITE
========================= */

function initWebsite() {

    /* =========================
       WARRANTY CHECK
    ========================= */

    const warrantyForm =
        document.querySelector(".warranty-form");

    const warrantyResult =
        document.querySelector("#result");


    if (
        warrantyForm &&
        warrantyResult &&
        document.querySelector("#serial") &&
        document.querySelector("#national")
    ) {

        warrantyForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const serial =
                    document.querySelector("#serial")
                        .value.trim();

                const code =
                    document.querySelector("#national")
                        .value.trim();

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
                        اطلاعات دریافت شد.
                    </strong>
                `;

            }
        );

    }


    /* =========================
       SERVICE CART
    ========================= */

    const cartInputs =
        document.querySelectorAll(
            ".cart-service input"
        );

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
        ).map(
            input => input.value
        );

    }


    function updateCartCount() {

        if (!cartCount) return;

        const selected =
            getSelectedServices();

        cartCount.textContent =
            `${selected.length.toLocaleString("fa-IR")} مورد`;

    }


    cartInputs.forEach(input => {

        input.addEventListener(
            "change",
            updateCartCount
        );

    });


    if (continueCart) {

        continueCart.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const selected =
                    getSelectedServices();


                if (selected.length === 0) {

                    if (cartResult) {

                        cartResult.classList.add(
                            "active"
                        );

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

            }
        );

    }


    updateCartCount();


    /* =========================
       CHECKOUT
    ========================= */

    const selectedServicesBox =
        document.querySelector(
            "#selectedServices"
        );

    const checkoutCount =
        document.querySelector(
            "#checkoutCount"
        );

    const checkoutForm =
        document.querySelector(
            "#checkoutForm"
        );

    const checkoutResult =
        document.querySelector(
            "#checkoutResult"
        );


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


    if (selectedServicesBox) {

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
                selectedServices
                    .map(
                        service => `
                            <div class="selected-service-item">

                                <span class="selected-service-icon">
                                    ✓
                                </span>

                                <span>
                                    ${service}
                                </span>

                            </div>
                        `
                    )
                    .join("");

        }

    }


    /* =========================
       CHECKOUT SUBMIT
    ========================= */

    if (
        checkoutForm &&
        checkoutResult
    ) {

        checkoutForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


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

                    checkoutResult.classList.add(
                        "active"
                    );

                    checkoutResult.innerHTML = `
                        <span style="color:#e5c45a;">
                            هیچ خدمتی انتخاب نشده است.
                        </span>
                    `;

                    return;

                }


                if (!name || !phone || !serial) {

                    checkoutResult.classList.add(
                        "active"
                    );

                    checkoutResult.innerHTML = `
                        <span style="color:#e5c45a;">
                            لطفاً تمام اطلاعات مشتری را وارد کنید.
                        </span>
                    `;

                    return;

                }


                const randomNumber =
                    Math.floor(
                        100000 +
                        Math.random() * 900000
                    );


                const trackingCode =
                    "ATK-" + randomNumber;


                checkoutResult.classList.add(
                    "active"
                );


                checkoutResult.innerHTML = `
                    <span style="color:#e5c45a;">
                        در حال ثبت درخواست...
                    </span>
                `;


                try {

                    const {
                        error
                    } =
                        await window.supabaseClient
                            .from(
                                "warranty_requests"
                            )
                            .insert([
                                {
                                    tracking_code:
                                        trackingCode,

                                    name:
                                        name,

                                    phone:
                                        phone,

                                    serial:
                                        serial,

                                    services:
                                        selectedServices,

                                    status:
                                        "در حال بررسی"
                                }
                            ]);


                    if (error) {

                        throw error;

                    }


                    localStorage.setItem(
                        "trackingCode",
                        trackingCode
                    );


                    localStorage.setItem(
                        "warrantyRequest",
                        JSON.stringify({

                            trackingCode:
                                trackingCode,

                            name:
                                name,

                            phone:
                                phone,

                            serial:
                                serial,

                            services:
                                selectedServices,

                            status:
                                "در حال بررسی"

                        })
                    );


                    localStorage.removeItem(
                        "selectedServices"
                    );


                    window.location.assign(
                        "success.html"
                    );


                } catch (error) {

                    console.error(
                        "SUPABASE ERROR:",
                        error
                    );


                    checkoutResult.innerHTML = `

                        <div style="
                            color:#e5c45a;
                            font-weight:700;
                        ">
                            خطای ثبت درخواست
                        </div>

                        <div style="
                            margin-top:10px;
                            color:#aaa;
                            direction:ltr;
                            text-align:left;
                            word-break:break-word;
                            font-size:10px;
                        ">
                            ${error?.message || "Unknown error"}
                        </div>

                    `;

                }

            }
        );

    }


    /* =========================
       REQUEST TRACKING
    ========================= */

    const trackingForm =
        document.querySelector(
            "#trackingForm"
        );

    const trackingResult =
        document.querySelector(
            "#trackingResult"
        );


    if (
        trackingForm &&
        trackingResult
    ) {

        trackingForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                const trackingCode =
                    document
                        .querySelector(
                            "#trackingCode"
                        )
                        ?.value
                        .trim()
                        .toUpperCase();


                trackingResult.classList.add(
                    "active"
                );


                if (!trackingCode) {

                    trackingResult.innerHTML = `
                        <span style="color:#e5c45a;">
                            لطفاً کد پیگیری را وارد کنید.
                        </span>
                    `;

                    return;

                }


                trackingResult.innerHTML = `
                    <span style="color:#e5c45a;">
                        در حال جستجوی درخواست...
                    </span>
                `;


                try {

                    const {
                        data,
                        error
                    } =
                        await window.supabaseClient
                            .rpc(
                                "get_warranty_request",
                                {
                                    p_tracking_code:
                                        trackingCode
                                }
                            );


                    if (error) {

                        throw error;

                    }


                    if (
                        !data ||
                        data.length === 0
                    ) {

                        trackingResult.innerHTML = `
                            <div style="
                                color:#e5c45a;
                                font-weight:700;
                            ">
                                درخواست پیدا نشد.
                            </div>

                            <div style="
                                margin-top:8px;
                                color:#777;
                            ">
                                کد پیگیری را بررسی کنید.
                            </div>
                        `;

                        return;

                    }


                    const request =
                        data[0];


                    const services =
                        Array.isArray(
                            request.services
                        )
                            ? request.services
                            : [];


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
                                    ${request.name}
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
                                    ${request.phone}
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
                                    ${request.serial}
                                </strong>
                            </div>


                            <div style="
                                border-bottom:1px solid #292929;
                                padding:7px 0;
                            ">
                                <span style="color:#777;">
                                    کد پیگیری:
                                </span>

                                <strong style="
                                    color:#e5c45a;
                                ">
                                    ${request.tracking_code}
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

                                    ${
                                        services
                                            .map(
                                                service => `
                                                    <div>
                                                        ✓ ${service}
                                                    </div>
                                                `
                                            )
                                            .join("")
                                    }

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
                                وضعیت درخواست:
                                ${request.status}
                            </div>

                        </div>

                    `;


                } catch (error) {

                    console.error(
                        "TRACKING ERROR:",
                        error
                    );


                    trackingResult.innerHTML = `

                        <div style="
                            color:#e5c45a;
                            font-weight:700;
                        ">
                            خطا در پیگیری درخواست
                        </div>


                        <div style="
                            margin-top:10px;
                            padding:10px;
                            background:#090909;
                            border:1px solid #292929;
                            color:#aaa;
                            direction:ltr;
                            text-align:left;
                            word-break:break-word;
                            font-size:10px;
                        ">
                            ${error?.message || "Unknown error"}
                        </div>

                    `;

                }

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


        generatedTrackingCode.textContent =
            trackingCode || "------";

    }

}