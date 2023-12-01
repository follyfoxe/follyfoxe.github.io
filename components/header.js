class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const div = document.createElement("div");
        div.className = "topnav";

        const p = document.createElement("h1");
        p.textContent = String.fromCodePoint(0x1F98A) + "Loading...";
        div.appendChild(p);
        this.appendChild(div);

        fetch('settings.json')
            .then(response => response.json())
            .then(settings => {
                p.textContent = settings.navText;
                for (const page of settings.pages) {
                    const a = document.createElement("a");
                    if (document.URL.indexOf(page.url) != -1)
                        a.className = "active";
                    
                    if (page.icon)
                    {
                        const img = document.createElement("img");
                        img.src = page.icon;
                        img.style = "height: 3.4vh;";
                        a.appendChild(img);
                    }
        
                    a.appendChild(document.createTextNode(page.label));
                    a.href = page.url;
                    div.appendChild(a);
                }
            });
    }
}

customElements.define('header-nav', Header);