const projectName="random-qutoe"
let quotesData;

// $(document).ready(function (){
//     console.log('document is ready')
// })

$(function () {
    console.log('document is ready A')
});

$(function () {
    console.log('document is ready B')
});

$(function () {
	// 加载本地的json
	loadLocalQuoteJson()

	// 加载网络的json
    // getQuotes().then(() => {
    // 	getQuote();
    // });

    $('#new-quote').on('click', getQuote);
});

var colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

var currentQuote = '',
	currentAuthor = '';

function getQuotes() {
	return $.ajax({
		headers: {
			Accept: 'application/json'
		},
		url: './static/src/quotes.json',
		success: function (jsonQuotes) {
			if (typeof jsonQuotes === 'string') {
				quotesData = JSON.parse(jsonQuotes);
				console.log('====== quotesData ======');
				console.log(quotesData)
			}
		}
	});
}

function getRandomQuote() {
	return quotesData.quotes[
			Math.floor(Math.random() * quotesData.quotes.length) 
		];
}


function getQuote() {
	let randomQuote = getRandomQuote();
	currentQuote = randomQuote.quote;
	currentAuthor = randomQuote.author;

	$('#tweet-quote').attr(
		'href',
		'https://twitter.com/intent/tweet?hashtags=quotes&related=hut&text' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
		);

	$('#tumblr-quote').attr(
		'href',
    	'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=hut&caption=' +
      	encodeURIComponent(currentAuthor) +
      	'&content=' +
      	encodeURIComponent(currentQuote) +
      	'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
		);

	$('.quote-text').animate( { opacity: 0 }, 500, function () {
		$(this).animate({ opacity: 1 }, 500);
		$('#text span').text(randomQuote.quote)
	});

	$('.quote-author').animate( {opacity: 0}, 500, function () {
		$(this).animate({ opacity: 1 }, 500);
		$('author').html(randomQuote.author);
	});

	var color = Math.floor(Math.random() * colors.length);
	console.log(`new color : ${colors[color]}`);

	// $('html body').css('background-color', colors[color]);
	// $('.button').css('background-color', colors[color]);

	$('html body').animate(
		{
			backgroundColor: colors[color],
			color: colors[color]
		},
		1000,
	);
	$('.button').animate(
		{
			backgroundColor: colors[color]
		},
		1000
	);
}

function loadLocalQuoteJson() {
	const rawJSON = `{
	  "quotes": [
	    {
	      "quote": "Life isn’t about getting and having, it’s about giving and being.",
	      "author": "Kevin Kruse"
	    },
	    {
	      "quote": "Whatever the mind of man can conceive and believe, it can achieve.",
	      "author": "Napoleon Hill"
	    },
	    {
	      "quote": "Strive not to be a success, but rather to be of value.",
	      "author": "Albert Einstein"
	    },
	    {
	      "quote": "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.",
	      "author": "Robert Frost"
	    }
	   ]
	  }`;

	quotesData = JSON.parse(rawJSON);
	console.log('====== quotesData ======');
	console.log(quotesData)

	getQuote();
}





