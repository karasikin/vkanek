"use strict";

main();

async function main() {
    console.log('Extension [Vkanek] executed...');

    try {
        let text = await loadContent("https://google.com");
        console.log(text);
    } catch(e) {
        console.log(e);
    }
}

async function loadContent(url) {
    let response = await fetch(url);

    if(response.ok) {
        return await response.text();
    } else {
        throw new HttpStatusError(response.status);
    }
}

class HttpStatusError extends Error {
    constructor(status) {
        super(`HttpStatusError: ${status}`);
        this.status = status;
    }
}