class PostView extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const div = document.createElement("div");
        div.className = "postview";

        const p = document.createElement("a");
        p.href = "posts.html";
        p.textContent = "Loading posts...";
        div.appendChild(p);

        const ul = document.createElement("ul");
        if (this.getAttribute("fill") == "true")
            ul.className = "fill";
        div.appendChild(ul);
        this.appendChild(div);

        // Fetch posts.
        const gistUrl = "https://api.github.com/gists/e5eba7c7a107f1c2e329c56f0f7d0db4";
        const gistOptions = {
            headers: {
                Accept: "application/vnd.github+json"
            }
        };

        fetch(gistUrl, gistOptions)
            .then(res => res.json())
            .then(json => JSON.parse(json.files["posts.json"].content))
            .then(posts => {
                posts.reverse();
                p.textContent = String.fromCodePoint(0x1F98A) + " Posts and Updates " + String.fromCodePoint(0x1F98A);
                for (const post of posts) {
                    const li = document.createElement("li");
                    const title = document.createElement("h2");
                    title.textContent = post.title + " (" + post.date + ")";
                    li.appendChild(title);
                    const author = document.createElement("h3");
                    author.textContent = "By \"" + post.author + "\"";
                    li.appendChild(author);
                    li.appendChild(document.createTextNode(post.message));

                    if (post.imageUrl)
                    {
                        const img = document.createElement("img");
                        img.src = post.imageUrl;
                        li.appendChild(img);
                    }

                    ul.appendChild(li);
                }
            });
    }
}

customElements.define('post-view', PostView);