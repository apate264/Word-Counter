document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const textInput = document.getElementById('textInput');
    const wordCount = document.getElementById('wordCount');
    const charCount = document.getElementById('charCount');
    const sentenceCount = document.getElementById('sentenceCount');
    const paragraphCount = document.getElementById('paragraphCount');
    const readingTime = document.getElementById('readingTime');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');

    // Function to count words
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

    // Function to update all counts
    const updateCounts = () => {
        const text = textInput.value;
        const words = countWords(text);
        const chars = text.length;
        const sentences = countSentences(text);
        const paragraphs = countParagraphs(text);

        // Update the display with animation
        animateCount(wordCount, words);
        animateCount(charCount, chars);
        sentenceCount.textContent = sentences;
        paragraphCount.textContent = paragraphs;
        readingTime.textContent = calculateReadingTime(words);
    };

    // Animate count changes
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

    // Event listeners
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

    // Initialize counts
    updateCounts();

    // Add focus animation to textarea
    textInput.addEventListener('focus', () => {
        textInput.style.boxShadow = `0 0 20px rgba(0, 159, 253, 0.3)`;
    });

    textInput.addEventListener('blur', () => {
        textInput.style.boxShadow = 'none';
    });

    // Add tooltip functionality
    const buttons = document.querySelectorAll('.action-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.getAttribute('aria-label');
            document.body.appendChild(tooltip);

            const rect = e.target.getBoundingClientRect();
            tooltip.style.position = 'absolute';
            tooltip.style.top = `${rect.top - 30}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
        });

        button.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
});


