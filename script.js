"use strict";

main();

async function main() {
    console.log("Extension [Vkanek] executed...");

    try {
        let content = await loadContent("https://anekdot.ru/random/anekdot");
        addContentToPage(parseContent(content, "div.text"));
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

function addContentToPage(content) {
    let sidebar = createSidebar();

    for(let text of content) {
        let div = document.createElement('div');

        div.innerHTML = text;
        sidebar.appendChild(div);
    }

    document.body.appendChild(sidebar);
}

function createSidebar() {
    let sidebar = document.createElement("div");

    sidebar.style.position = "absolute";
    sidebar.style.width = "200px";
    sidebar.style.left = "10px";
    sidebar.style.top = "40px";
    /* sidebar settings... */

    return sidebar;
}

class HttpStatusError extends Error {
    constructor(status) {
        super(`HttpStatusError: ${status}`);
        this.status = status;
    }
}