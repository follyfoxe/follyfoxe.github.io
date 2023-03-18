class ProjectLink extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const div = document.createElement("div");
        div.className = "round-panel wrap-panel--vertical";

        const img = document.createElement("img");
        img.src = this.getAttribute("src");
        img.height = 64;
        div.appendChild(img);

        const a = document.createElement("a");
        a.href = this.getAttribute("href");
        a.appendChild(document.createTextNode(this.textContent));
        div.appendChild(a);

        this.textContent = null;
        this.appendChild(div);
    }
}

customElements.define('project-link', ProjectLink);