/**
 * RestWatcher — Presentation Site
 * Screenshot gallery + lightbox
 */

const SCREENSHOTS = [
    { file: "main-menu.png", label: "Главное меню" },
    { file: "sales-summary.png", label: "Сводка продаж" },
    { file: "discounts.png", label: "Скидки" },
    { file: "top-waiters.png", label: "Топ официантов" },
    { file: "hourly-revenue.png", label: "Выручка по часам" },
    { file: "top-tables.png", label: "Топ столов" },
    { file: "ai-assistant.png", label: "ИИ-ассистент" },
    { file: "ai-result.png", label: "Ответ ИИ" },
    { file: "date-range.png", label: "Выбор периода" },
    { file: "compare-periods.png", label: "Сравнение периодов" },
    { file: "open-shift.png", label: "Открытая смена" },
    { file: "cancellations.png", label: "Отмены" },
];

let currentIndex = 0;

function buildGallery() {
    const grid = document.getElementById("screenshots-grid");
    if (!grid) return;

    grid.innerHTML = SCREENSHOTS.map((s, i) => {
        const imgPath = `screenshots/${s.file}`;
        return `
            <div class="screenshot-item" onclick="openLightbox(${i})">
                <img src="${imgPath}" alt="${s.label}" loading="lazy"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="screenshot-placeholder" style="display:none;">
                    <span class="icon">📷</span>
                    <span>${s.label}</span>
                    <span style="font-size:11px;">скриншот скоро</span>
                </div>
                <div class="label">${s.label}</div>
            </div>
        `;
    }).join("");
}

function openLightbox(index) {
    currentIndex = index;
    showScreenshot();
    const lb = document.getElementById("lightbox");
    if (!lb) return;
    lb.classList.add("active");
    document.body.style.overflow = "hidden";
}

function showScreenshot() {
    const img = document.getElementById("lightbox-img");
    const cap = document.getElementById("lightbox-caption");
    const counter = document.getElementById("lightbox-counter");
    if (!img || !cap || !counter) return;

    const s = SCREENSHOTS[currentIndex];
    img.src = `screenshots/${s.file}`;
    cap.textContent = s.label;
    counter.textContent = `${currentIndex + 1} / ${SCREENSHOTS.length}`;
}

function prevScreenshot() {
    currentIndex = (currentIndex - 1 + SCREENSHOTS.length) % SCREENSHOTS.length;
    showScreenshot();
}

function nextScreenshot() {
    currentIndex = (currentIndex + 1) % SCREENSHOTS.length;
    showScreenshot();
}

function closeLightbox() {
    const lb = document.getElementById("lightbox");
    if (!lb) return;
    lb.classList.remove("active");
    document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", buildGallery);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prevScreenshot();
    if (e.key === "ArrowRight") nextScreenshot();
});
