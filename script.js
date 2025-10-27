document.addEventListener('DOMContentLoaded', () => {


    // loading the tasksss from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // --- 2. SELECTORS ---
    const searchInput = document.getElementById('search');


    // gm and gn
    function updateGreeting() {
        const hour = new Date().getHours();
        const greetingEl = document.querySelector('.welcome h2');

        if (hour < 12) {
            greetingEl.textContent = 'Good morning, Ayushi!';
        } else if (hour < 18) {
            greetingEl.textContent = 'Good afternoon, Ayushi!';
        } else {
            greetingEl.textContent = 'Good evening, Ayushi!';
        }
    }

    /**
     * Finds pending tasks from 'tasks' localStorage and updates the stat.
     */
    function updateStats() {
        const pendingTasks = tasks.filter(t => !t.completed).length;
        const taskStatEl = document.querySelector('.stats .stat:nth-child(2) h3');

        if (taskStatEl) {
            taskStatEl.dataset.count = pendingTasks; // Set the real target
        }

        // Animate all stats
        document.querySelectorAll('.stat h3[data-count]').forEach(animateStat);
    }

    /**
     * Animates a single stat number counting up.
     */
    function animateStat(el) {
        const target = parseInt(el.dataset.count, 10);
        
        // If target is 0 or not a number, just set it and return
        if (!target) {
            el.textContent = target;
            return;
        }

        let current = 0;
        const increment = Math.max(1, target / 50); // Controls speed (50 steps or at least 1)

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.ceil(current);
            }
        }, 20); // 20ms interval
    }

    /**
     * Filters the "Quick Access" cards based on search input.
     */
    function filterCards() {
        const query = searchInput.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.quick-access .card');

        cards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            if (cardText.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }


    // --- 4. EVENT LISTENERS ---

    // Dashboard Widgets
    searchInput.addEventListener('input', filterCards);


    // --- 5. INITIALIZATION ---
    updateGreeting();
    updateStats();
});
