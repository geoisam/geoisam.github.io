const userAgent = window.navigator.userAgent || navigator.userAgent
    , isMobile = /Android|webOS|iPhone|iPad|iPod|Mobile/i.test(userAgent)

function sendQQmsg(num) {
    var pcUrl = `tencent://message/?uin=${num}&Site=Sambow&Menu=yes`
        , mobileUrl = `mqqwpa://im/chat?chat_type=wpa&uin=${num}&version=1&src_type=web&web_src=oicqzone.com`
    isMobile ? window.location.href = mobileUrl : window.location.href = pcUrl
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    const seconds = String(date.getSeconds()).padStart(2, "0")

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

document.addEventListener("DOMContentLoaded", () => {
    initBackToTop()
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        , tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

})

function initBackToTop() {
    const backToTopButton = document.querySelector("#back-to-top")

    if (backToTopButton) {
        window.addEventListener("scroll", () => {
            if (window.scrollY < 520) {
                backToTopButton.style.display = "none"
            } else {
                backToTopButton.style.display = "block"
            }
        })

        backToTopButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        })
    }
}
