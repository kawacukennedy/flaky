import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";

interface WebSocketHookOptions {
  onMessage: (event: MessageEvent) => void;
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
}

const useWebSocket = (url: string, options: WebSocketHookOptions) => {
  const dispatch = useDispatch<AppDispatch>();
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = (event) => {
      console.log("WebSocket connected", event);
      options.onOpen && options.onOpen(event);
    };

    ws.current.onmessage = (event) => {
      options.onMessage(event);
    };

    ws.current.onclose = (event) => {
      console.log("WebSocket disconnected", event);
      options.onClose && options.onClose(event);
      // Optional: Reconnect logic
    };

    ws.current.onerror = (event) => {
      console.error("WebSocket error", event);
      options.onError && options.onError(event);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url, dispatch, options]);

  return ws.current;
};

export default useWebSocket;
