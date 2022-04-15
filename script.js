const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

// Get quotes from API
async function getQuotes() {
	const apiUrl = 'https://type.fit/api/quotes';
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
		// Catch error here
	}
}

// Show new quote
function newQuote() {
	// Pick a random quote from apiQuotes array
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	// Check if author field is blank and replace with 'unknown'
	!quote.author
		? (authorText.textContent = 'Unknown')
		: (authorText.textContent = quote.author);
	quoteText.textContent = quote.text;

	// check quote length
	quote.text.length > 120
		? quoteText.classList.add('long-quote')
		: quoteText.classList.remove('long-quote');
}

// Tweet Quote
function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
	window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();
