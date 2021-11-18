"use strict";

main();

async function main() {
    console.log('Extension [Vkanek] executed...');

    let content;

    try {
        content = await loadContent("https://anekdot.ru/random/anekdot");
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

function parseContent(content, selector) {
    let element = document.createElement("div");
    element.innerHTML = content;

    let elements = element.querySelectorAll(selector);

    return Array.from(elements).map(x => x.textContent);
} 

class HttpStatusError extends Error {
    constructor(status) {
        super(`HttpStatusError: ${status}`);
        this.status = status;
    }
}