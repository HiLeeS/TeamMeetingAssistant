import { useEffect, useState } from 'react';

const useFakeWebSocket = () => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fakeUsers = [
      { id: 1, name: "서연", bgColor: "bg-[#ff6edf52]" },
      { id: 2, name: "승준", bgColor: "bg-[#f6ccd3]" },
      { id: 3, name: "유석", bgColor: "bg-[#d5eaff]" },
      { id: 4, name: "성원", bgColor: "bg-[#fffade]" },
    ];

    let index = 0;

    const interval = setInterval(() => {
      if (index < fakeUsers.length) {
        const user = fakeUsers[index];

        // ✅ 방어 코드 추가
        if (user && user.bgColor && user.name) {
          console.log("참가자 추가됨:", user); // 로그 찍기
          setParticipants(prev => [...prev, user]);
        } else {
          console.warn("잘못된 참가자 데이터:", user);
        }

        index++;
      } else {
        clearInterval(interval);
        console.log("✅ 모든 참가자 추가 완료");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return participants;
};

export default useFakeWebSocket;
