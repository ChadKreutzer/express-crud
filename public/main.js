// main.js
/*jshint esversion: 6, node: true, browser: true */
/*global fetch*/

"use strict";

import "whatwg-fetch";



const update = document.getElementById('update');

update.addEventListener('click', function() {
    // Send PUT Request here
    fetch('quotes', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': 'Darth Vader',
            'quote': 'I find your lack of faith disturbing.'
        })
    });
});