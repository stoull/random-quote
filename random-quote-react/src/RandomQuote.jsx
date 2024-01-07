
import React, { useState, useRef } from 'react';

import styles from './assets/styles/Quote.module.css'

import picTumblr from './assets/images/tumblr.svg';
import twitterTumblr from './assets/images/x-twitter.svg';

const colors = [
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

let quotesData = {
	"quotes": []
}

let quotesJSON = `{
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
  }`

function getRandomQuote() {
	console.log(`xxxx quotes ${quotesData.quotes}`)
	return quotesData.quotes[
		Math.floor(Math.random() * quotesData.quotes.length) 
	];
}

function getNewColor() {
	return colors[
		Math.floor(Math.random() * colors.length)
	];
}

const getQuotesFromApiAsync = () => {
  return fetch('/quotes.json', {
  		method: 'GET',
	  	headers: {
	    	Accept: 'application/json',
	    	'Content-Type': 'application/json',
	  	}
  	})
    .then(response => response.json())
    .then(json => {
    	quotesData = json
      	return json;
    })
    .catch(error => {
    	console.log(`error ${error}`);
    });
};

class RandomQuote extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			color: '#16a085',
			quote: {
		      "quote": "Life isn’t about getting and having, it’s about giving and being.",
		      "author": "Kevin Kruse"
		    }
		}
		this.updateQuote = this.updateQuote.bind(this);

		quotesData = JSON.parse(quotesJSON);
	}

	componentDidMount() {
		getQuotesFromApiAsync()
	}

	updateQuote() {
		const newColor = getNewColor()
		const newQuote = getRandomQuote()
		console.log(newQuote.quote)
		console.log(`newQuote.quote: ${newColor} `)
		this.setState(state => ({
			color: newColor,
			quote: newQuote
		}));
	}

	render() {
		return (
		<div className= {styles.page} style={{ 'backgroundColor': this.state.color}}>
			<div className= {styles.box} id="quote-box">
				<div className={styles.quoteText} id="text">
					<i className={styles.quoteI}>
					</i>
					<span>
						{ this.state.quote.quote }
					</span>
				</div>
				<div className={styles.quoteAuthor} id='author'>
					- { this.state.quote.author }
				</div>
				<div className={styles.buttons} style={{ 'backgroundColor': this.state.color}}>
					<a className={styles.button} id={styles.tweetQuote} href='./a.html'>
						<img src={picTumblr} alt='twitter'/>
					</a>
					<a className={styles.button} id={styles.tumblrQuote} href='./b.html'>
						<img src={twitterTumblr} alt="tumblr"/>
					</a>
					<button className={styles.button} id={styles.newQuote} onClick={this.updateQuote}> New quote </button>
				</div>
			</div>
		</div>
		
	);
	}
}

export default RandomQuote;