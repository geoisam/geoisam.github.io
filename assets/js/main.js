const userAgent = window.navigator.userAgent || navigator.userAgent
    , isMobile = /Android|webOS|iPhone|iPad|iPod|Mobile/i.test(userAgent)

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    , tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

function sendQQmsg(num) {
    var pcUrl = `tencent://message/?uin=${num}&Site=Sambow&Menu=yes`
        , mobileUrl = `mqqwpa://im/chat?chat_type=wpa&uin=${num}&version=1&src_type=web&web_src=oicqzone.com`
    isMobile ? window.location.href = mobileUrl : window.location.href = pcUrl
}

var myDate = new Date(),
    getYear = myDate.getFullYear()
    , copyright = document.querySelector("footer .copyright")
    , webName = document.querySelector("nav .navbar-brand").innerHTML
copyright.innerHTML = `&copy; ${getYear} ${webName}`

function isBackToTop() {
    var deviceHeight
        , backToTopBtn = document.querySelector("#back-to-top")
        , currentHeight = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    isMobile ? deviceHeight = 567 : deviceHeight = 321
    if(backToTopBtn) {
        if (currentHeight > deviceHeight) {
            backToTopBtn.style.display = "block"
        } else {
            backToTopBtn.style.display = "none"
        }
    }
}

window.addEventListener("load", () => {
    isBackToTop()
    window.addEventListener("scroll", () => {
        isBackToTop()
    })
})

function updateCoords(e) {
    pointerX = (e.clientX || e.touches[0].clientX) - canvasEl.getBoundingClientRect().left,
        pointerY = e.clientY || e.touches[0].clientY - canvasEl.getBoundingClientRect().top
}

function setParticuleDirection(e) {
    var t = anime.random(0, 360) * Math.PI / 180
        , a = anime.random(50, 180)
        , n = [-1, 1][anime.random(0, 1)] * a;
    return {
        x: e.x + n * Math.cos(t),
        y: e.y + n * Math.sin(t)
    }
}

function createParticule(e, t) {
    var a = {};
    return a.x = e,
        a.y = t,
        a.color = colors[anime.random(0, colors.length - 1)],
        a.radius = anime.random(16, 32),
        a.endPos = setParticuleDirection(a),
        a.draw = function () {
            ctx.beginPath(),
                ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0),
                ctx.fillStyle = a.color,
                ctx.fill()
        }
        ,
        a
}

function createCircle(e, t) {
    var a = {};
    return a.x = e,
        a.y = t,
        a.color = "#F00",
        a.radius = .1,
        a.alpha = .5,
        a.lineWidth = 6,
        a.draw = function () {
            ctx.globalAlpha = a.alpha,
                ctx.beginPath(),
                ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0),
                ctx.lineWidth = a.lineWidth,
                ctx.strokeStyle = a.color,
                ctx.stroke(),
                ctx.globalAlpha = 1
        }
        ,
        a
}

function renderParticule(e) {
    for (var t = 0; t < e.animatables.length; t++)
        e.animatables[t].target.draw()
}

function animateParticules(e, t) {
    for (var a = createCircle(e, t), n = [], i = 0; i < numberOfParticules; i++)
        n.push(createParticule(e, t));
    anime.timeline().add({
        targets: n,
        x: function (e) {
            return e.endPos.x
        },
        y: function (e) {
            return e.endPos.y
        },
        radius: .1,
        duration: anime.random(1200, 1800),
        easing: "easeOutExpo",
        update: renderParticule
    }).add({
        targets: a,
        radius: anime.random(80, 160),
        lineWidth: 0,
        alpha: {
            value: 0,
            easing: "linear",
            duration: anime.random(600, 800)
        },
        duration: anime.random(1200, 1800),
        easing: "easeOutExpo",
        update: renderParticule,
        offset: 0
    })
}

function debounce(fn, delay) {
    var timer
    return function () {
        var context = this
        var args = arguments
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, delay)
    }
}

var canvasEl = document.querySelector(".fireworks");
if (canvasEl) {
    var ctx = canvasEl.getContext("2d")
        , numberOfParticules = 30
        , pointerX = 0
        , pointerY = 0
        , tap = "mousedown"
        , colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"]
        , setCanvasSize = debounce(function () {
            canvasEl.width = 2 * window.innerWidth,
                canvasEl.height = 2 * window.innerHeight,
                canvasEl.style.width = window.innerWidth + "px",
                canvasEl.style.height = window.innerHeight + "px",
                canvasEl.getContext("2d").scale(2, 2)
        }, 500)
        , render = anime({
            duration: 1 / 0,
            update: function () {
                ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
            }
        });
    document.addEventListener(tap, function (e) {
        "sidebar" !== e.target.id && "toggle-sidebar" !== e.target.id && "A" !== e.target.nodeName && "IMG" !== e.target.nodeName && (render.play(),
            updateCoords(e),
            animateParticules(pointerX, pointerY))
    }, !1),
        setCanvasSize(),
        window.addEventListener("resize", setCanvasSize, !1)
}
