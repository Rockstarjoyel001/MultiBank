import React, { useEffect, useState } from "react"
import { Ticker, PricePoint } from "./types"
import { fetchTickers, fetchHistory } from "./services/api"
import { useWebSocket } from "./hooks/useWebSocket"
import TickerList from "./components/TickerList"
import PriceChart from "./components/PriceChart"

export default function App() {
  const [tickers, setTickers] = useState<Ticker[]>([])
  const [selected, setSelected] = useState<string>("BTC-USD")
  const [history, setHistory] = useState<PricePoint[]>([])

  useEffect(() => {
    fetchTickers().then(setTickers)
  }, [])

  useEffect(() => {
    fetchHistory(selected).then(setHistory)
  }, [selected])

  useWebSocket((data) => {
    setTickers(data)

    const updated = data.find((t) => t.symbol === selected)
    if (updated) {
      setHistory((prev) => [
        ...prev.slice(-20),
        { time: Date.now(), price: updated.price }
      ])
    }
  })

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>📊 Market</h2>
        <TickerList data={tickers} onSelect={setSelected} />
      </div>

      <div style={styles.main}>
        <h2 style={styles.title}>{selected} Price Chart</h2>
        <div style={styles.card}>
          <PriceChart data={history} />
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#0f172a",
    color: "white"
  },
  sidebar: {
    width: "250px",
    borderRight: "1px solid #1e293b",
    padding: "20px"
  },
  main: {
    flex: 1,
    padding: "20px"
  },
  logo: {
    marginBottom: "20px"
  },
  title: {
    marginBottom: "20px"
  },
  card: {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "10px"
  }
}