;(function () {

    const isMobile = /Android|webOS|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)

    function sendQQmsg(num) {
        const pcUrl = `tencent://message/?uin=${num}&Site=Sambow&Menu=yes`
        const mobileUrl = `mqqwpa://im/chat?chat_type=wpa&uin=${num}&version=1&src_type=web&web_src=oicqzone.com`
        window.location.href = isMobile ? mobileUrl : pcUrl
    }

    function formatTimestamp(ts) {
        const d = new Date(ts * 1000)
        const pad = (n) => String(n).padStart(2, "0")
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
    }

    function formatValue(v) {
        return v === null ? "\u2014" : v
    }

    // --- Render ---

    function renderLinks(data) {
        return data.map((item) =>
            `<li><a href="${item.link}" target="_blank" title="${item.title}">${item.icon}</a></li>`
        ).join("")
    }

    function renderSkills(data) {
        return data.map((item) =>
            `<div class="col my-3">
                <h6 class="fw-bold my-2">${item.name}</h6>
                <mdui-tooltip placement="bottom" content="${item.desc}">
                    <mdui-linear-progress value="${item.progress}" max="100"></mdui-linear-progress>
                </mdui-tooltip>
            </div>`
        ).join("")
    }

    function renderTable(data) {
        const rows = data.map((item, i) =>
            `<tr>
                <td class="align-middle d-none">${i + 1}</td>
                <td class="align-middle">${formatTimestamp(item.time)}</td>
                <td class="align-middle">${formatValue(item.name)}</td>
                <td class="align-middle text-end">\u00A5${item.amount.toFixed(2)}</td>
                <td class="align-middle">${item.payment == 1 ? "WeChat" : "Alipay"}</td>
            </tr>`
        ).join("")

        return `<table class="table table-bordered text-center">
            <tr>
                <th class="align-middle d-none">#</th>
                <th class="align-middle">时间</th>
                <th class="align-middle">用户名</th>
                <th class="align-middle">金额</th>
                <th class="align-middle">渠道</th>
            </tr>
            ${rows}
        </table>`
    }

    function renderFriends(data) {
        const applyCard = `<div class="p-2">
            <mdui-card class="py-2" style="background:url(/assets/img/ic_logo_round.svg) center no-repeat;background-size: contain;" variant="filled" href="https://github.com/geoisam/geoisam.github.io/issues/1" target="_blank">
                <div class="fw-bold">友链申请</div>
            </mdui-card>
        </div>`

        const cards = data.map((item) =>
            `<div class="p-2">
                <mdui-tooltip placement="bottom" content="${formatValue(item.desc)}">
                    <mdui-card class="py-2" style="background:url(${item.icon}) center no-repeat;background-size: contain;" variant="filled" href="${item.link}" target="_blank">
                        <div class="fw-bold">${item.name}</div>
                    </mdui-card>
                </mdui-tooltip>
            </div>`
        ).join("")

        return applyCard + cards
    }

    // --- Init ---

    function initNavbar() {
        const nav = document.getElementById("mainNav")
        const toggle = document.getElementById("navToggle")
        const collapse = document.getElementById("navbarCollapse")
        if (!nav || !toggle || !collapse) return

        toggle.addEventListener("click", (e) => {
            e.preventDefault()
            e.stopPropagation()
            collapse.classList.toggle("show")
        })

        collapse.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => collapse.classList.remove("show"))
        })

        document.addEventListener("click", (e) => {
            if (!nav.contains(e.target) && collapse.classList.contains("show")) {
                collapse.classList.remove("show")
            }
        })
    }

    function initBackToTop() {
        const btn = document.querySelector("#back-to-top")
        if (!btn) return

        window.addEventListener("scroll", () => {
            btn.style.display = window.scrollY < 520 ? "none" : "block"
        })

        btn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" })
        })
    }

    function initContent() {
        const $ = (sel) => document.querySelector(sel)
        if ($("#home .contact")) $("#home .contact").innerHTML = renderLinks(links)
        if ($("#skills .skills")) $("#skills .skills").innerHTML = renderSkills(skills)
        if ($("#sponsor .sponsor")) $("#sponsor .sponsor").innerHTML = renderTable(sponsor)
        if ($("#friends .friends")) $("#friends .friends").innerHTML = renderFriends(friends)
    }

    // --- Entry ---

    document.addEventListener("DOMContentLoaded", () => {
        initNavbar()
        initBackToTop()
        initContent()
    })

})()
