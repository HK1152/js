(function () {
  const quoteTextEl = document.getElementById("quoteText");
  const quoteAuthorEl = document.getElementById("quoteAuthor");
  const newQuoteBtn = document.getElementById("newQuoteBtn");

  const quotes = [
    { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
    { text: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
    { text: "Your time is limited, don’t waste it living someone else’s life.", author: "Steve Jobs" },
    { text: "Great things are done by a series of small things brought together.", author: "Vincent Van Gogh" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Dream big. Start small. Act now.", author: "Robin Sharma" },
    { text: "Either you run the day, or the day runs you.", author: "Jim Rohn" },
    { text: "What you do today can improve all your tomorrows.", author: "Ralph Marston" }
  ];

  let currentQuoteIndex = 0;

  function showNextQuote() {
    const quote = quotes[currentQuoteIndex];
    quoteTextEl.textContent = `"${quote.text}"`;
    quoteAuthorEl.textContent = `— ${quote.author}`;
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  }

  newQuoteBtn.addEventListener("click", showNextQuote);

  showNextQuote();
})();