const chai = require("chai");
const axios = require("axios");
chai.should();
const yurucharas = require("../index");
const sinon = require("sinon");

describe("Yuruchara API Server", () => {
    describe("Get All Yuruchara", () => {
        let spy;
        beforeEach(() => {
            spy = sinon.spy(axios, "post");
        });
        afterEach(() => {
            spy.restore();
        });
        it("should return the list of Yuruchara", async () => {
            const res = await axios.post("http://localhost:3000/graphql", {
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
            }).then(res => res);

            spy.callCount.should.equal(1);
            res.status.should.deep.equal(200);
            res.data.data.yurucharas.length.should.deep.equal(100);
        });

        it("should return one Yuruchara", async () => {
            const res = await axios.post("http://localhost:3000/graphql", {
                query: `query { 
                    id(id:52) { 
                     id,
                     name,
                     prefecture,
                     group,
                     text,
                     img_url
                   }
                 }`
            }).then(res => {
                return res;
            });
            spy.callCount.should.equal(1);
            res.status.should.deep.equal(200);
            res.data.data.id.id.should.deep.equal("52");
        });

        it("should return one Yuruchara By name", async () => {
            const res = await axios.post("http://localhost:3000/graphql", {
                query: `query { 
                        name(name:"ASAPI") { 
                         id,
                         name,
                         prefecture,
                         group,
                         text,
                         img_url
                       }
                     }`
            }).then(res => {
                return res;
            });
            spy.callCount.should.equal(1);
            res.status.should.deep.equal(200);
            res.data.data.name[0].name.should.deep.equal("ASAPI");
        });

        it("should create new Yuruchara", async () => {
            const res = await axios.post("http://localhost:3000/graphql", {
                query: `mutation { 
                        createYuruchara(name: "HogeHoge", prefecture: "Unknown", group: "Unknown", text: "Unknown", img_url: "Unknown") { 
                          name,
                          prefecture,
                          group,
                          text,
                          img_url
                        }
                      }`
            }).then(res => {
                return res;
            });
            spy.callCount.should.equal(1);
            res.status.should.deep.equal(200);
            res.data.data.createYuruchara.name.should.deep.equal("HogeHoge");
        });

        it("should remove Yuruchara", async () => {
            const res = await axios.post("http://localhost:3000/graphql", {
                query: `mutation { 
                        removeYuruchara(id: 101)
                      }`
            }).then(res => {
                return res;
            });
            spy.callCount.should.equal(1);
            res.status.should.deep.equal(200);
            res.data.data.removeYuruchara.should.deep.equal("Deleted id : 101");
        });
    });
});