// Creating variables by targeting specific DOM id
const quoteContainer = document.getElementById('quote-generator');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// API has multiple arrays so we make a new array to store it
let apiQuotes = [];

// Show Loading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show new Quote
function newQuote() {
    showLoadingSpinner();
   // Pick a random quote from apiQuotes Array i.e. of length 1643 or something
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
        // Check if author field is blank and return it with unknown
    if(!quote.author) {
        authorText.textContent = 'unknown'
    } else {
        authorText.textContent = quote.author;
    }

        //Check if no quote text & return some string
    if(!quote.text) {
        quoteText.textContent = 'Couldn\'t fetch a single quote, Sorry!'
    } else {
        quote.textContent = quote.text;
    }

    // Check Quote length to determine the styling (prob need to change this later)
    if(quote.text.length > 100) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Get Quote From API
async function getQuote() {
    showLoadingSpinner();
    // using my heroku proxy for cors errors
    const proxyUrl = 'https://enigmatic-peak-49973.herokuapp.com/'
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(proxyUrl + apiUrl)
        apiQuotes = await response.json()
        await newQuote();
    } catch (error) {
        // getQuote();
        console.log(error, 'Whoops, no quote!')
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();