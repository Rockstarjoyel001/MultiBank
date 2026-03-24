const request = require("supertest")
const express = require("express")

// Mock app (same as your backend)
const app = express()

let tickers = [
  { symbol: "BTC-USD", price: 40000 },
  { symbol: "ETH-USD", price: 2000 }
]

app.get("/tickers", (req, res) => {
  res.json(tickers)
})

describe("GET /tickers", () => {
  it("should return ticker list", async () => {
    const res = await request(app).get("/tickers")

    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
  })
})