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

        fetch('/settings.json')
            .then(response => response.json())
            .then(settings => {
                // Fetch posts.
                const gistUrl = settings.posts.gistUrl;
                const gistOptions = {
                    headers: {
                        Accept: "application/vnd.github+json"
                    }
                };

                fetch(gistUrl, gistOptions)
                    .then(res => res.json())
                    .then(json => JSON.parse(json.files[settings.posts.gistFile].content))
                    .then(posts => {
                        posts.reverse();
                        p.textContent = settings.posts.title;
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
            });

        
    }
}

customElements.define('post-view', PostView);