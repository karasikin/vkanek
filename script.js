"use strict";

main();

async function main() {
    console.log("Extension [Vkanek] executed...");

    try {
        let content = await loadContent("https://anekdot.ru/random/anekdot");
        removeOldSidebar();
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
        let separator = createSeparator("***");

        let div = document.createElement("div");
        div.classList.add("vkanek-anek-content");
        div.innerText = text;

        sidebar.appendChild(separator);
        sidebar.appendChild(div);
    }

    document.body.appendChild(sidebar);
}

function removeOldSidebar() {
    let sidebar = document.getElementById("vkanek-sidebar");

    sidebar?.remove();
}

function createSidebar() {
    let sidebar = document.createElement("div");
    sidebar.id = "vkanek-sidebar";

    return sidebar;
}

function createSeparator(text) {
    let separator = document.createElement("div");
    separator.classList.add("vkanek-anek-separator");

    separator.innerText = text;

    return separator;
}

class HttpStatusError extends Error {
    constructor(status) {
        super(`HttpStatusError: ${status}`);
        this.status = status;
    }
}