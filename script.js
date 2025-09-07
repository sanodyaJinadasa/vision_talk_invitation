new WOW({
    boxClass: "animate-on-scroll",
    animateClass: "animate__animated",
    offset: 0,
    mobile: true,
    live: true,
}).init();

function confirmAttendance() {
    showNotification(
        "✓ Confirmation Received",
        "Thank you for confirming your attendance. A calendar invite and reminder will be sent to your email shortly.",
        "success"
    );

    const container = document.querySelector(".invitation-container");
    container.style.borderColor = "#27ae60";
    container.style.boxShadow = "0 25px 50px rgba(39, 174, 96, 0.2)";

    setTimeout(() => {
        container.style.borderColor = "";
        container.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.1)";
    }, 2000);
}

function addToCalendar() {
    const startDate = "20240906T190000Z";
    const endDate = "20240906T200000Z";
    const title = "Professional Interview";
    const meetLink = "https://meet.google.com/abc-defg-hij"; 
    const description =
        `Job Interview via Google Meet. Join using this link: ${meetLink}. Please join 5 minutes early.`;
    const location = meetLink;

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        title
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
        description
    )}&location=${encodeURIComponent(location)}`;

    window.open(googleCalendarUrl, "_blank");
    showNotification(
        "📅 Calendar Event",
        "Opening calendar to schedule your interview appointment.",
        "info"
    );
}


function showNotification(title, message, type) {
    const notification = document.createElement("div");
    const bgColor =
        type === "success"
            ? "linear-gradient(45deg, #27ae60, #2ecc71)"
            : "linear-gradient(45deg, #3498db, #5dade2)";

    notification.style.cssText = `
                position: fixed;
                top: 30px;
                right: 30px;
                background: ${bgColor};
                color: white;
                padding: 20px 25px;
                border-radius: 12px;
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                max-width: 350px;
                transform: translateX(400px);
                transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                font-family: 'Inter', sans-serif;
            `;

    notification.innerHTML = `
                <div style="font-weight: 600; font-size: 1rem; margin-bottom: 8px; display: flex; align-items: center;">
                    ${title}
                </div>
                <div style="opacity: 0.95; line-height: 1.4; font-size: 0.9rem;">
                    ${message}
                </div>
            `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = "translateX(0)";
    }, 100);

    setTimeout(() => {
        notification.style.transform = "translateX(400px)";
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 4000);
}

// Add subtle parallax effect on scroll
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector(".watercolor-bg");
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
});