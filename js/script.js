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
            const serial = document.querySelector("#serial").value.trim();
            const code = document.querySelector("#national").value.trim();
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
    const requestForm = document.querySelector("#requestForm");
    const requestResult = document.querySelector("#requestResult");
    if (requestForm && requestResult) {
        requestForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.querySelector("#name")?.value.trim();
            const phone = document.querySelector("#phone")?.value.trim();
            const serial = document.querySelector("#serialRequest")?.value.trim();
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
    const trackingForm = document.querySelector("#trackingForm");
    const trackingResult = document.querySelector("#trackingResult");
    if (trackingForm && trackingResult) {
        trackingForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const trackingCode =
                document.querySelector("#trackingCode")?.value.trim();
            trackingResult.classList.add("active");
            if (!trackingCode) {
                trackingResult.innerHTML = `
                    <span style="color:#e5c45a;">
                        لطفاً کد پیگیری را وارد کنید.
                    </span>
                `;
                return;
            }
            trackingResult.innerHTML = `
                <strong style="color:#e5c45a;">
                    در حال بررسی درخواست...
                </strong>
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
        const selected = getSelectedServices();
        cartCount.textContent =
            `${selected.length.toLocaleString("fa-IR")} مورد`;
    }
    cartInputs.forEach(input => {
        input.addEventListener("change", function () {
            updateCartCount();
        });
    });
    /*
       دکمه ادامه سبد خدمات
    */
    if (continueCart) {
        continueCart.addEventListener("click", function (event) {
            event.preventDefault();
            const selected = getSelectedServices();
            /* هیچ خدمتی انتخاب نشده */
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
            /* ذخیره خدمات */
            localStorage.setItem(
                "selectedServices",
                JSON.stringify(selected)
            );
            /* انتقال به checkout */
            window.location.assign("checkout.html");
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
                    localStorage.getItem("selectedServices")
                ) || [];
        } catch (error) {
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
       CHECKOUT FORM
    ========================= */
    if (checkoutForm && checkoutResult) {
        checkoutForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const selectedServices =
                JSON.parse(
                    localStorage.getItem("selectedServices")
                ) || [];
            const name =
                document.querySelector("#checkoutName")?.value.trim();
            const phone =
                document.querySelector("#checkoutPhone")?.value.trim();
            const serial =
                document.querySelector("#checkoutSerial")?.value.trim();
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
            checkoutResult.classList.add("active");
            checkoutResult.innerHTML = `
                <strong style="color:#e5c45a;">
                    اطلاعات با موفقیت ثبت شد.
                </strong>
                <div style="
                    margin-top:10px;
                    color:#aaa;
                    line-height:2;
                ">
                    درخواست شما آماده ادامه مراحل است.
                </div>
            `;
        });
    }
});