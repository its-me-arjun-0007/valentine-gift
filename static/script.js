document.addEventListener("DOMContentLoaded", function() {
    // --- Existing Reveal Logic ---
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // --- NEW: Audio Autoplay Logic ---
    const audio = document.getElementById("bg-music");

    // Try to play automatically
    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Autoplay prevented by browser. Waiting for user interaction.");
            // Add a one-time click listener to start music if autoplay failed
            document.body.addEventListener('click', function() {
                audio.play();
            }, { once: true }); // {once:true} removes the listener after the first click
        });
    }
});
