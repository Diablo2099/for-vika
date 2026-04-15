// 1. НАСТРОЙКА ЦЕНТРИРОВАНИЯ (ЭТО САМОЕ ВАЖНОЕ)
// GSAP берет все элементы с классом .abs-center и сдвигает их ровно на их центр.
gsap.set(".abs-center", { xPercent: -50, yPercent: -50 });

document.getElementById('start-screen').addEventListener('click', function () {
    this.style.display = 'none';
    document.getElementById('main-container').style.display = 'block';

    const audio = document.getElementById('bg-music');
    audio.play();

    // Эффект тряски
    function shake() {
        gsap.fromTo("#main-container",
            { x: -5, y: 5, rotation: -0.5 },
            { x: 0, y: 0, rotation: 0, duration: 0.2, ease: "rough({strength: 2, points: 10})" }
        );
    }

    const tl = gsap.timeline();

    // Включаем декорации
    tl.to(".decor", { opacity: 0.5, duration: 1 })
        .to("#flash-white", { opacity: 1, duration: 0.05 })
        .to("#flash-white", { opacity: 0, duration: 0.2 });

    // КАДР 1
    tl.fromTo("#photo-1",
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
    )
        .to("#photo-1", { scale: 1.05, duration: 2 }, "<")
        .to("#fg-txt-1", { opacity: 1, scale: 1.1, duration: 0.1 }, "-=1.8")
        .to(["#photo-1", "#fg-txt-1"], { opacity: 0, duration: 0.1 }, "+=1.5");

    // КАДР 2 (Жесткий)
    tl.call(shake)
        .to("#flash-red", { opacity: 0.7, duration: 0.1 })
        .to("#flash-red", { opacity: 0, duration: 0.3 })
        .to("#bg-txt-1", { opacity: 0.8, scale: 1.1, duration: 0.1 }, "<")
        .fromTo("#photo-2",
            { scale: 1.2, opacity: 0, rotation: -2 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.3, ease: "back.out(1.5)" }, "<"
        )
        .to("#photo-2", { scale: 1.05, duration: 1.5 }, "<")
        .to(["#photo-2", "#bg-txt-1"], { opacity: 0, duration: 0.1 }, "+=1.2");

    // КАДР 3 и 4 (Быстрые)
    tl.to("#flash-black", { opacity: 1, duration: 0.05 })
        .to("#flash-black", { opacity: 0, duration: 0.05 })
        .to("#bg-txt-3", { opacity: 1, duration: 0.1 }, "<")
        .to("#photo-3", { opacity: 1, scale: 1.05, duration: 0.1 }, "<")
        .to(["#photo-3", "#bg-txt-3"], { opacity: 0, duration: 0.1 }, "+=0.4")

        .to("#flash-white", { opacity: 1, duration: 0.05 })
        .to("#flash-white", { opacity: 0, duration: 0.05 })
        .to("#fg-txt-3", { opacity: 1, duration: 0.1 }, "<")
        .to("#photo-4", { opacity: 1, scale: 0.95, duration: 0.1 }, "<")
        .to(["#photo-4", "#fg-txt-3"], { opacity: 0, duration: 0.1 }, "+=0.4");

    // КАДР 5 (Самое красивое фото, замедление)
    tl.call(shake)
        .to("#flash-white", { opacity: 1, duration: 0.1 })
        .to("#flash-white", { opacity: 0, duration: 1.5 })
        .to("#bg-txt-2", { opacity: 0.2, scale: 1.1, duration: 4 }, "-=1.5")
        .fromTo("#photo-5",
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, "-=1.5"
        )
        .to("#photo-5", { scale: 1.03, duration: 3 }, "<");

    // ==========================================
    // ФИНАЛ: ПОЯВЛЕНИЕ ПОЗДРАВЛЕНИЯ
    // ==========================================
    tl.to("#photo-5", { filter: "blur(15px) brightness(0.4)", duration: 1.5 }, "+=0.5") // Размываем и затемняем фото Вики на фоне
        .to("#bg-txt-2", { opacity: 0, duration: 1 }, "<") // Убираем задний текст
        .fromTo("#final-screen",
            { opacity: 0, yPercent: -40 }, // Начинает чуть выше центра
            { opacity: 1, yPercent: -50, duration: 1.5, ease: "power3.out" }, "<" // Плавно опускается ровно в центр
        );
});