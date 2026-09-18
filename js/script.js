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

supabaseScript.onerror = () => {

    const result =
        document.querySelector("#checkoutResult");

    if (result) {

        result.classList.add("active");

        result.innerHTML = `
            <div style="color:#e5c45a;">
                کتابخانه Supabase بارگذاری نشد.
            </div>
        `;

    }

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
                    document
                        .querySelector("#serial")
                        .value
                        .trim();


                const code =
                    document
                        .querySelector("#national")
                        .value
                        .trim();


                warrantyResult.classList.add(
                    "active"
                );


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
        document.querySelector(
            "#cartCount"
        );


    const continueCart =
        document.querySelector(
            "#continueCart"
        );


    const cartResult =
        document.querySelector(
            "#cartResult"
        );


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


                if (
                    selected.length === 0
                ) {

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


        if (
            selectedServices.length === 0
        ) {

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
                        .querySelector(
                            "#checkoutName"
                        )
                        ?.value
                        .trim();


                const phone =
                    document
                        .querySelector(
                            "#checkoutPhone"
                        )
                        ?.value
                        .trim();


                const serial =
                    document
                        .querySelector(
                            "#checkoutSerial"
                        )
                        ?.value
                        .trim();


                /* =========================
                   VALIDATION
                ========================= */

                if (
                    selectedServices.length === 0
                ) {

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


                if (
                    !name ||
                    !phone ||
                    !serial
                ) {

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


                /* =========================
                   GENERATE TRACKING CODE
                ========================= */

                const randomNumber =
                    Math.floor(
                        100000 +
                        Math.random() * 900000
                    );


                const trackingCode =
                    "ATK-" + randomNumber;


                /* =========================
                   LOADING
                ========================= */

                checkoutResult.classList.add(
                    "active"
                );


                checkoutResult.innerHTML = `
                    <span style="color:#e5c45a;">
                        در حال ثبت درخواست...
                    </span>
                `;


                /* =========================
                   CHECK SUPABASE
                ========================= */

                if (
                    !window.supabaseClient
                ) {

                    checkoutResult.innerHTML = `
                        <div style="color:#e5c45a;">
                            اتصال به Supabase برقرار نشد.
                        </div>
                    `;

                    return;

                }


                /* =========================
                   INSERT
                ========================= */

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


                    /* =========================
                       SAVE LOCAL DATA
                    ========================= */

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


                    /* =========================
                       SUCCESS
                    ========================= */

                    window.location.assign(
                        "success.html"
                    );


                } catch (error) {

                    console.error(
                        "SUPABASE ERROR:",
                        error
                    );


                    const errorMessage =
                        error?.message ||
                        error?.details ||
                        error?.hint ||
                        "Unknown error";


                    checkoutResult.innerHTML = `

                        <div style="
                            color:#e5c45a;
                            font-size:13px;
                            font-weight:700;
                            margin-bottom:10px;
                        ">
                            خطای اتصال
                        </div>


                        <div style="
                            margin-top:8px;
                            padding:12px;
                            background:#090909;
                            border:1px solid #292929;
                            color:#aaa;
                            direction:ltr;
                            text-align:left;
                            word-break:break-word;
                            line-height:1.8;
                            font-family:monospace;
                            font-size:10px;
                        ">
                            ${errorMessage}
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