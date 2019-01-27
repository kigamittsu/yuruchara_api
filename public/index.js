document.getElementById("submitAll").addEventListener("click", () => {
    document.getElementById("result").innerHTML = "";
    const res = fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: `query { 
                             yurucharas { 
                              id,
                              name,
                              prefecture,
                              group,
                              text,
                              img_url
                            }
                          }`
            })
        })
        .then(res => {
            return res.json();
        }).then((data) => {
            return data.data.yurucharas;
        }).then((yurucharas) => {
            const result = document.getElementById("result");
            result.className = "detail";
            yurucharas.forEach((yuruchara) => {
                const name = document.createElement("div");
                name.innerText = yuruchara.name;
                name.className = "yuruchara-name";
                const prefecture = document.createElement("div");
                prefecture.innerText = yuruchara.prefecture;
                prefecture.className = "yuruchara-prefecture";
                const img = document.createElement("img");
                img.src = yuruchara.img_url;
                img.width = 400;
                img.height = 500;
                img.className = "yuruchara-img"
                result.appendChild(name);
                result.appendChild(prefecture);
                result.appendChild(img);
            });
        });
});

document.getElementById("submitID").addEventListener("click", () => {
    document.getElementById("result").innerHTML = "";
    const id = document.getElementById("query-id").value;
    const res = fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: `query { 
                    id(id:${id}) { 
                     id,
                     name,
                     prefecture,
                     group,
                     text,
                     img_url
                   }
                 }`
            })
        })
        .then(res => {
            return res.json();
        }).then((data) => {
            return data.data.id;
        }).then((yuruchara) => {
            const result = document.getElementById("result");
            result.className = "detail";
            const name = document.createElement("div");
            name.innerText = yuruchara.name;
            name.className = "yuruchara-name";
            const prefecture = document.createElement("div");
            prefecture.innerText = yuruchara.prefecture;
            prefecture.className = "yuruchara-prefecture";
            const img = document.createElement("img");
            img.src = yuruchara.img_url;
            img.width = 400;
            img.height = 500;
            img.className = "yuruchara-img"
            result.appendChild(name);
            result.appendChild(prefecture);
            result.appendChild(img);
        });
});

document.getElementById("submitName").addEventListener("click", () => {
    document.getElementById("result").innerHTML = "";
    const name = document.getElementById("query-name").value;
    const res = fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: `query { 
                    name(name:"${name}") { 
                     id,
                     name,
                     prefecture,
                     group,
                     text,
                     img_url
                   }
                 }`
            })
        })
        .then(res => {
            return res.json();
        }).then((data) => {
            return data.data.name;
        }).then((yurucharas) => {
            const result = document.getElementById("result");
            result.className = "detail";
            yurucharas.forEach((yuruchara) => {
                const name = document.createElement("div");
                name.innerText = yuruchara.name;
                name.className = "yuruchara-name";
                const prefecture = document.createElement("div");
                prefecture.innerText = yuruchara.prefecture;
                prefecture.className = "yuruchara-prefecture";
                const img = document.createElement("img");
                img.src = yuruchara.img_url;
                img.width = 400;
                img.height = 500;
                img.className = "yuruchara-img"
                result.appendChild(name);
                result.appendChild(prefecture);
                result.appendChild(img);
            });
        });
});