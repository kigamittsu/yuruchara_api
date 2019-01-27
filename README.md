*This was created during my time as a student at Code Chrysalis.*

# yuruchara_api  
yuruchara_api is an API for getting Yuruchara data.  
Original data are gotten from [this link](http://www.yurugp.jp/ranking/?year=2018).
## Usage  
This API has the following resolvers.  
### Query
Query | Input | Retern Type
--- | --- | ---
createYuruchara | name: String, prefecture: String, group: String, text: String, img_url: String | Yuruchara
updateYuruchara | id: ID!, name: String, prefecture: String, group: String, text: String, img_url: String | Yuruchara
removeYuruchara | id: ID! | String

### Mutation
Mutation | Input | Retern Type
--- | --- | ---
yurucharas |  | [Yuruchara]
id | id: ID | Yuruchara
name | name: String | [Yuruchara]
prefecture | name: String | [Yuruchara]
## Example
Get all Yuru-Chara data.
```js
fetch('http://localhost:3000/graphql', {
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
```
Get one Yuru-Chara which has target id.
```js
fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query: `query { 
                    id(id:14) { 
                     id,
                     name,
                     prefecture,
                     group,
                     text,
                     img_url
                   }
                 }`
    })
});
```
Get one Yuru-Chara which has target name.
```js
fetch('http://localhost:3000/graphql', {
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
});
```