const BASE_URL = "http://localhost:3001"

export const fetchTickers = async () => {
  const res = await fetch(`${BASE_URL}/tickers`)
  return res.json()
}

export const fetchHistory = async (symbol: string) => {
  const res = await fetch(`${BASE_URL}/history?ticker=${symbol}`)
  return res.json()
}
