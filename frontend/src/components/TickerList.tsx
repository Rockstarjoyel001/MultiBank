import React from "react"
import { Ticker } from "../types"

interface Props {
  data: Ticker[]
  onSelect: (symbol: string) => void
}

export default function TickerList({ data, onSelect }: Props) {
  return (
    <div>
      {data.map((t) => (
        <div
          key={t.symbol}
          onClick={() => onSelect(t.symbol)}
          style={{
            padding: "10px",
            marginBottom: "8px",
            background: "#1e293b",
            borderRadius: "6px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <span>{t.symbol}</span>
          <span style={{ color: "#38bdf8" }}>
            {t.price.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  )
}