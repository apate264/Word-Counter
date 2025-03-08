document.addEventListener('DOMContentLoaded', () => {
    // Existing word counter elements
    const textInput = document.getElementById('textInput');
    const wordCount = document.getElementById('wordCount');
    const charCount = document.getElementById('charCount');
    const sentenceCount = document.getElementById('sentenceCount');
    const paragraphCount = document.getElementById('paragraphCount');
    const readingTime = document.getElementById('readingTime');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');

    // Timer elements
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const startTimer = document.getElementById('startTimer');
    const pauseTimer = document.getElementById('pauseTimer');
    const resetTimer = document.getElementById('resetTimer');
    const presetBtns = document.querySelectorAll('.preset-btn');
    // Notes elements
    const noteInput = document.getElementById('noteInput');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const notesList = document.getElementById('notesList');
    // Timer variables
    let timeLeft = 25 * 60; // 25 minutes in seconds
    let timerId = null;
    let isRunning = false;
    // Timer functions
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }
    function startCountdown() {
        if (!isRunning) {
            isRunning = true;
            timerId = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timerId);
                    isRunning = false;
                    // Play notification sound
                    new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YWoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PtvlwYBkCT1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DvxmweCjqN0/HPgDMGHm7A7+OZRA0PVqzn77NdGQg+ltryznMpBSF6yfDckz4LElyx6OyrWBUIQ5ze8MVqHww4is/wz4Q2Bhxsvd3mlEINEVeq4+Q6Xw1frdPlq2wqDliw19uIVhJKoN3Ok14aM5nPxHpGH0ap2smANw5QptfHb0Aq8/7LNp9f3Lc9h1leWluWwK2RYDcyWp3N16dfGAQ7ls7sx3EiBiZ8wujcizcHFmS15edqSw0KTZ7a6b5VFAM4jc/sy3UoAx11vuXhjT0HD1Sp4uiYTwwHQ5fW68RkGgYyg8XpyHIiAxZqtNvjizsECUmZ0+DDYQ8ELnvA5ctvJAUcb7nY0ng6EigUdLOyhEAQHkWGuuWkVBYPPY3GzntBHixMi7PEeUsgNHiouJ1QKxFEi6ZEX3o1bJOkbHl3Vk5Qi4tiUkQ0aJevcn1sTjU2bn+TVmFPIjNSdYxl+37g2LN0m3SSmpzLzIU+CQ9Lk8/1yG0bAiB1wOvfhzIFEF6r4umXSQsFPJHP68VfFwQudLzk3409BxJWqNfciU0MB0CU0OXEYxkGMYHD5sl0JQQZa7Ta34o7BAhHl9Hjw2APAyt5vOPYbSMDGmy11tV2OQ8mEnKAqYhBDxs+hLTjoVITDTqLwct4QB0qSYmuxHhJHjJ2pLWbTioOQYmiQF15M2mRoGd4dVRKTIeJZFNFNWUvbo1pVHpLkI97jH1sU1lpiIeEgHh0b4KRjH1eOThqnrutfVwVBT+PzO3BZxoFKHK85N6HMgQPWqjd6JJGCgQ6j87qxF4WBCx3u+Pae0AHFV6q1+SHTQ0HRJbQ5MNgGAYuhr/lyHMkBBptttndiDgDCEaY0eLCXxADKHu84NlsIwMaarTW1XU5DyYScn6niUIPHECFs+KgUBMNOYrAyno/HipJiK3DeUkeM3ajr5pNKQ9BiaBCXHkyapDfanl1VEpMh4hj8mxnt2Z8b0xBK16OodN6Sg8GP4vB0YRGExFNoKvGhE4TE0iJpsxkNw0ZVZWlyXAoChdjhpx4YE8aMX+gr3xGJyFMiJ+6dkoaDF+JoeD3f0gLFVqNvuNCKhAYH1+54996OQoQSZWz2oI+ExNEiq64g1MUDTBwr8+MRx0JLWqk0oJGIA0pXZWxp08fDyVwmrOLPxkKN4KqyH1BFQsvb6PEgEcfBSpak6q6eUobC06IpcdsOw8NQomctGNKEAxQmbO+dUcEB0uUs8lZLgsTXJezx2IyDRlqpbuNQBoFKXCkzoA/FwktcaLCfUUdBilhk6auQB0OGWR/oYBOJhEobpekaUIVEFCNn6hXMAwZWpCglVIiFRlaj4+ORSUPGlqPo5dOJREaYZKkrUAcDRhigJ18RyQRJ26XomhBFBBSj6ClVjEMGFmPhJBIIxIaXY+hmU4lERtkkqWvQh0OGGJ/nXxGJBEobZeiZ0AUEFKPoaVVMAwYWY+DkEgjEhpej6CYTSUQG2SSpa9CHQ0YYn+dfEYjEShtmKJnQBQPUpChpVUxDBhZj4SQSCMRGl+PoZhNJRAbZJKlr0IdDRhif518RiQRKG2XomdAFA9SkKGlVTEMGFmPhJBIIxIaXY+hmU4lERtkkqWvQh0OGGJ/nXxGJxEobZeiZ0AUEFKPoaVVMAwYWY+EkEgjERpfj6GYTSUQG2SSpa9CHQ0YYn+dfEYjEShtmKJnQBQPUpChpVYxDBhYjYSQSCMRGl+PoZhNJRAbZJOlr0IdDRhhf518RiMRKG2XomdAFA9Sj6GlVjIMF1gA').play();
                }
            }, 1000);
        }
    }
    function pauseCountdown() {
        clearInterval(timerId);
        isRunning = false;
    }
    function resetCountdown() {
        clearInterval(timerId);
        isRunning = false;
        timeLeft = parseInt(document.querySelector('.preset-btn.active').dataset.time) * 60;
        updateTimerDisplay();
    }
    // Timer event listeners
    startTimer.addEventListener('click', startCountdown);
    pauseTimer.addEventListener('click', pauseCountdown);
    resetTimer.addEventListener('click', resetCountdown);
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            timeLeft = parseInt(btn.dataset.time) * 60;
            updateTimerDisplay();
            pauseCountdown();
        });
    });
    // Notes functions
    function addNote() {
        const noteText = noteInput.value.trim();
        if (noteText) {
            const noteItem = document.createElement('div');
            noteItem.className = 'note-item';
            noteItem.innerHTML = `
                <span>${noteText}</span>
                <button class="delete-note"><i class="fas fa-times"></i></button>
            `;
            notesList.appendChild(noteItem);
            noteInput.value = '';
            // Add delete functionality
            noteItem.querySelector('.delete-note').addEventListener('click', () => {
                noteItem.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => noteItem.remove(), 300);
            });
        }
    }
    // Notes event listeners
    addNoteBtn.addEventListener('click', addNote);
    noteInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addNote();
        }
});


    // Existing word counter functions
    const countWords = (text) => {
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    };

    // Function to count sentences
    const countSentences = (text) => {
        return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    };

    // Function to count paragraphs
    const countParagraphs = (text) => {
        return text.split('\n\n').filter(para => para.trim().length > 0).length;
    };

    // Function to calculate reading time
    const calculateReadingTime = (wordCount) => {
        const wordsPerMinute = 200;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return `${minutes} min`;
    };

    //Exisiting animation function
    const animateCount = (element, target) => {
        const current = parseInt(element.textContent);
        const increment = (target - current) / 10;
        let count = current;

        const animate = () => {
            if ((increment > 0 && count < target) || (increment < 0 && count > target)) {
                count += increment;
                element.textContent = Math.round(count);
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };

        requestAnimationFrame(animate);
    };

    // Update all counts
    const updateCounts = () => {
        const text = textInput.value;
        const words = countWords(text);
        const chars = text.length;
        const sentences = countSentences(text);
        const paragraphs = countParagraphs(text);
        animateCount(wordCount, words);
        animateCount(charCount, chars);
        sentenceCount.textContent = sentences;
        paragraphCount.textContent = paragraphs;
        readingTime.textContent = calculateReadingTime(words);
    };

    // Existing event listeners
    textInput.addEventListener('input', updateCounts);

    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(textInput.value);
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    });

    clearBtn.addEventListener('click', () => {
        textInput.value = '';
        updateCounts();
    });

    // Initialise
    updateCounts();

    updateTimerDisplay();
});


