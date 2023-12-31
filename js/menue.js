$(document).ready(function () {
    const g = gsap;
    const elements = {
        intro: {
            top: $('div#main-txt').find("span"),
            mid: $("main#intro > div > div:nth-child(2)").find("span"),
            bottom: $("main#intro > div > ul.links").find("span")
        },
        contact: [
            "section#contact.active > div > ul > li",
        ],
        about: [
            "section#about.active > div:nth-child(1) > div:nth-child(1) > h3",
            "section#about.active > div:nth-child(1) > div:nth-child(2) > p"
        ]
    }

    const intro = {
        active: async function () {
            function ehe(elem, speed) {
                g.set(elem, { transformOrigin: 'bottom left' });
                elem.each(function (index, element) {
                    let singleElement = $(element);
                    g.to(singleElement, {
                        scaleY: 1,
                        duration: 0.4,
                        ease: "back.out(1.4)",
                        delay: index * speed
                    });
                });
            }
            await $('#intro').fadeIn(function () {
                $(this).css("display", "flex")
            });
            menuOut(async () => {
                ehe(elements.intro.top, 0.035);
                ehe(elements.intro.mid, 0.08);
                ehe(elements.intro.bottom, 0.26);
                $("div#menu").fadeToggle(
                    function () {
                        g.set("div#menu-wrap > ul > li > span", { clearProps: "all" });
                    }
                );
            });
        },
        deactive: async function () {
            function ehe(elem, speed) {
                g.set(elem, { transformOrigin: 'bottom left' });
                elem.each(function (index, element) {
                    let singleElement = $(element);
                    g.to(singleElement, {
                        scaleY: 0,
                        duration: 0.27,
                        ease: "back.in(1.3)",
                        delay: (elem.length - index - 1) * speed
                    });
                });
                return new Promise((resolve, reject) => {
                    const totalDuration = elem.length * speed + 0.3;
                    setTimeout(() => {
                        resolve();
                    }, totalDuration * 1000);
                });
            };

            await Promise.all([
                ehe(elements.intro.top, 0.02),
                ehe(elements.intro.mid, 0.05),
                ehe(elements.intro.bottom, 0.1),

            ]);
            $('#intro').fadeOut();
            menuIn();
        }
    }
    const active = {
        about: async function () {
            const aboutElements = elements.about;
            menuOut(async () => {
                aboutElements.forEach((ele, ind) => {
                    g.set(ele, {
                        y: 40,
                        opacity: 0,

                    })
                });
                $("section#about").fadeIn(function () {
                    aboutElements.forEach((ele, ind) => {
                        g.to(ele, {
                            y: 0,
                            opacity: 1,
                            duration: 0.4,
                            stagger: 0.3,
                            delay: ind * 1,
                            ease: 'back.in-out(1.5)'
                        })
                    });
                });
                $("div#menu").fadeToggle(
                    function () {
                        g.set("div#menu-wrap > ul > li > span", { clearProps: "all" });
                    }
                );
            });
        },
        work: async function () {
            menuOut(async () => {
                g.from("#work", {
                    y: 40,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'back.in-out(1.5)'
                })
                $("section#work").fadeIn();
                $("div#menu").fadeToggle(
                    function () {
                        g.set("div#menu-wrap > ul > li > span", { clearProps: "all" });
                    }
                );
            });
        },
        contact: async function () {
            const contElements = elements.contact;
            menuOut(async () => {
                contElements.forEach((ele, ind) => {
                    g.set(ele, {
                        y: 40,
                        opacity: 0,

                    })
                });
                $("section#contact").fadeIn(function () {
                    contElements.forEach((ele, ind) => {
                        g.to(ele, {
                            y: 0,
                            opacity: 1,
                            duration: 0.4,
                            stagger: 0.3,
                            delay: ind * 1,
                            ease: 'back.in-out(1.5)'
                        })
                    });
                });
                $("div#menu").fadeToggle(
                    function () {
                        g.set("div#menu-wrap > ul > li > span", { clearProps: "all" });
                    }
                );
            });
        }

    }
    const deactive = {
        contact: async function () {
            const contElements = elements.contact;
            const animationPromises = contElements.map((ele, ind) => {
                return new Promise(resolve => {
                    g.to(ele, {
                        y: 40,
                        opacity: 0,
                        duration: 0.4,
                        stagger: {
                            each: 0.3,
                            from: "end"
                        },
                        ease: 'back.in-out(1.5)',
                        onComplete: () => {
                            resolve();
                        }
                    });
                });
            });
            Promise.all(animationPromises).then(() => {
                $(".active").fadeOut();
                menuIn();
                g.set(".active", { clearProps: "all" })
            });
        },
        about: async function () {
            const aboutElements = elements.about;
            const animationPromises = aboutElements.map((ele, ind) => {
                return new Promise(resolve => {
                    g.to(ele, {
                        y: 40,
                        opacity: 0,
                        duration: 0.4,
                        stagger: {
                            each: 0.3,
                            from: "end"
                        },
                        ease: 'back.in-out(1.5)',
                        onComplete: () => {
                            resolve();
                        }
                    });
                });
            });
            Promise.all(animationPromises).then(() => {
                $(".active").fadeOut();
                menuIn();
                g.set(".active", { clearProps: "all" })
            });
        }
    }

    async function menuIn() {
        await $("div#menu").fadeToggle(function () {
            $(this).css('display', "flex")
        });
        const inAnimation = {
            y: -200,
            opacity: 0,
            duration: 0.9,
            ease: "linear",
            stagger: 0.08,
        };
        g.from("div#menu-wrap > ul > li > span > span", {
            y: -150,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.8)",
            delay: 0.75
        })
        g.from("div#menu-wrap > ul > li > span", inAnimation);
    };
    function menuOut(callback) {
        const outAnimation = {
            y: -200,
            opacity: 0,
            duration: 0.6,
            ease: "back.in(1.4)",
            stagger: 0.04,

        };

        g.to("div#menu-wrap > ul > li > span", outAnimation)
            .then(() => {
                callback();
            });
    };

    function menuTogggle() {
        let activeSection = $(".active");
        if (menu.style.display === 'flex') {
            if ($(activeSection).attr("id") === "intro") {
                intro.active();
            }
            else if ($(activeSection).attr("id") === 'about') {
                active.about();
            }
            else if ($(activeSection).attr("id") === 'work') {
                active.work();
            }
            else {
                active.contact();
            }
            $("div > span.icon:nth-child(2) > svg").removeClass('svgClicked');
        } else {
            if ($(activeSection).attr("id") === "intro") {
                intro.deactive();
            }
            else if ($(activeSection).attr("id") === "contact") {
                deactive.contact();
            }
            else if ($(activeSection).attr("id") === "about") {
                deactive.about();
            }
            else {
                g.to(".active", {
                    y: -40,
                    opacity: 0,
                    duration: 0.4,
                    ease: 'back.in-out(1.5)'
                }).then(() => {
                    g.set(".active", { clearProps: "all" });
                    menuIn();
                })
            }
            $("div > span.icon:nth-child(2) > svg").addClass('svgClicked');
        }
    };
    //menue
    async function menuButtonClicked() {
        $("div#menu-wrap > ul > li").click(function () {
            const data = $(this).data('text');
            let clickedElement = `section#${data}`;
            $('.active').addClass('nonActive');
            $('.active').removeClass('active');
            if (data === 'intro') {
                intro.active();
                clickedElement = `main#intro`;
            }
            else if (data === 'about') {
                active.about();
            }
            else if (data === 'work') {
                active.work();
            }
            else {
                active.contact();
            }
            $("div > span.icon:nth-child(2) > svg").removeClass('svgClicked');
            $(clickedElement).addClass('active');
            $(clickedElement).removeClass('nonActive');
        });
    }
    function menuButtonsHover() {
        for (let i = 0; i < 4; i++) {
            const info = ["home", "about", "work", "contact"];
            let l = info[i].length;
            for (let x = 0; x < l; x++) {
                $(`div#menu-wrap > ul > li:nth-child(${i + 1}) > span`).append(
                    $("<span>").text(info[i][x])
                );
            }
        };
        $(`div#menu-wrap > ul > li`).hover(
            function () {
                const $elem1 = $(this).find("> span:nth-child(1) > span");
                const $elem2 = $(this).find("> span:nth-child(2) > span");
                $(`div#menu-wrap > ul > li > span`).css("opacity", "0.71");
                $(this).find("> span").css({
                    opacity: 1,
                    backgroundColor: "rgba(189, 202, 244, 0.04)",
                });
                g.to($(this).find("> span"), {
                    z: 14,
                    ease: "linear",
                    duration: 0.2,
                });
                g.to($elem1, {
                    scaleY: 0,
                    ease: "linear",
                    duration: 0.2,
                    stagger: 0.065,
                });
                g.to($elem2, {
                    scaleY: 1,
                    ease: "linear",
                    duration: 0.2,
                    stagger: 0.065,
                });
            },
            function () {
                const $elem1 = $(this).find("> span:nth-child(1) > span");
                const $elem2 = $(this).find("> span:nth-child(2) > span");
                $(`div#menu-wrap > ul > li > span`).css("opacity", "1");
                $(this).find("> span").css({
                    backgroundColor: "",
                });
                g.to($(this).find("> span"), {
                    z: 0,
                    ease: "linear",
                    duration: 0.15,
                });
                g.to($elem1, {
                    scaleY: 1,
                    ease: "linear",
                    duration: 0.16,
                    stagger: 0.055,
                });
                g.to($elem2, {
                    scaleY: 0,
                    ease: "linear",
                    duration: 0.16,
                    stagger: 0.055,
                });
            }
        );
    }
    function backToHome() {

    }

    menuButtonClicked();
    menuButtonsHover();
    // $("header#icons > span.icon:nth-child(1)").click(backToHome);
    $("div > span.icon:nth-child(2) > svg").click(menuTogggle);
    //menue ends
});