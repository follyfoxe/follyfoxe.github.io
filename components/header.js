class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const div = document.createElement("div");
        div.className = "topnav";

        const p = document.createElement("h1");
        p.textContent = "Folly's lair";
        div.appendChild(p);
        
        const pages = [
            { icon: "images/fox.gif", label: "Home", url: "index.html" },
            { label: String.fromCodePoint(0x2728) + "Projects", url: "projects.html" },
            { label: String.fromCodePoint(0x1F98A) + "About", url: "about.html" },
            { label: String.fromCodePoint(0x1F4C4) + "Archive", url: "archive/index.html" }
        ];
        
        for (const page of pages) {
            const a = document.createElement("a");
            if (document.URL.indexOf(page.url) != -1)
                a.className = "active";
            
            if (page.icon)
            {
                const img = document.createElement("img");
                img.src = page.icon;
                img.height = 32;
                a.appendChild(img);
            }

            a.appendChild(document.createTextNode(page.label));
            a.href = page.url;
            div.appendChild(a);
        }

        this.appendChild(div);
    }
}

customElements.define('header-nav', Header);