let quotes = [];

async function loadQuotes() {
  try {
    const res = await fetch('quotes.json');
    if (!res.ok) throw new Error('Quotes file not found!');
    quotes = await res.json();
    showRandomQuote();
  } catch (err) {
    document.getElementById('quote-text').innerText = "Failed to load quotes!";
    document.getElementById('quote-author').innerText = "";
    console.error(err);
  }
}

function showRandomQuote() {
  if (!quotes.length) return;
  const idx = Math.floor(Math.random() * quotes.length);
  const quote = quotes[idx];
  document.getElementById('quote-text').innerText = '“' + quote.quote + '”';
  document.getElementById('quote-author').innerText = "— " + quote.author;
}

window.addEventListener('DOMContentLoaded', function () {
  document.getElementById('new-quote-btn').onclick = showRandomQuote;
  loadQuotes();
});
