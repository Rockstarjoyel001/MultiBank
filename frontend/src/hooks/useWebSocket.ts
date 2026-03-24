import { useEffect } from "react"

export const useWebSocket = (onMessage: any) => {
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001")
    ws.onmessage = (e) => onMessage(JSON.parse(e.data))
    return () => ws.close()
  }, [])
}
