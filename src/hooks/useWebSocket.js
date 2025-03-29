// src/hooks/useWebSocket.js
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect, useRef, useState } from 'react';

const useWebSocket = (username, code) => {
  const [participants, setParticipants] = useState([]);
  const clientRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/'); // 나중에 백엔드 주소
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("🔗 Connected to WebSocket");

        // 참가자 수신
        client.subscribe("/topic/participants", (message) => {
          const newParticipant = JSON.parse(message.body);
          setParticipants((prev) => [...prev, newParticipant]);
        });

        // 참가자 입장 브로드캐스트
        client.publish({
          destination: "/app/join",
          body: JSON.stringify({ name: username, meetingCode: code }),
        });
      },
      onDisconnect: () => console.log("❌ WebSocket disconnected"),
      reconnectDelay: 5000,
    });

    client.activate();
    clientRef.current = client;

    return () => {
      clientRef.current?.deactivate();
    };
  }, [username, code]);

  return participants;
};

export default useWebSocket;
