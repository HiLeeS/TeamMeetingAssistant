import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useNavigate } from "react-router-dom"; 
import MeetingLoading from "./MeetingLoading"; 
import React, { useState } from "react";
import useWebSocket from "../hooks/useWebSocket"; 

const OnMeeting = () => {
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(false); 
    const participants = useWebSocket(); 

    // 토큰과 코드 가져오기
    const token = localStorage.getItem("token");
    const code = localStorage.getItem("code");

    const handleEndMeeting = () => {
        setLoading(true); 
        console.log(code);
        setTimeout(() => {
            // ✅ navigate 시 쿼리 파라미터 형식으로 전달
            if (code) {
                navigate(`/meeting/summary?code=${code}`);
            } else {
                console.error("코드가 존재하지 않습니다.");
                alert("회의 코드가 없습니다.");
            }
        }, 3000);
    };
    
    if (loading) {
        return <MeetingLoading />;
    }

    return (
        <main className="bg-white flex flex-col items-center justify-between min-h-screen py-10 px-10">
            <div className="w-full max-w-[1440px] relative flex flex-col items-center">
                <header className="w-full">
                    <div className="w-full">
                        <Button 
                            onClick={() => navigate("/main")}
                            className="font-semibold text-xl mb-16">WSC
                        </Button>
                    </div>
                </header>
                
                <h2 className="mt-5 mb-12 font-bold text-black text-[31px]">
                    회의 중...
                </h2>

                <div className="grid grid-cols-2 gap-8 mb-auto">
                {participants.map((participant) => (
                    participant && (
                        <Card key={participant.id} className="w-[168px] h-[168px] rounded-[10px] bg-[#f3f3f3] opacity-80 relative">
                            <CardContent className="p-0 h-full flex items-center justify-center">
                                <div className={`absolute inset-0 ${participant.bgColor} rounded-[84px]`}></div>
                                <p className="relative z-10 font-normal text-black text-[28px]">
                                    {participant.name}
                                </p>
                            </CardContent>
                        </Card>
                    )
                ))}
                </div>

                <Button 
                    onClick={handleEndMeeting}
                    className="mt-20 w-[179px] h-[60px] bg-[#f7b3b3] rounded-[5px] hover:bg-[#e9a5a5]">
                    <span className="text-white text-[25px]">회의 종료</span>
                </Button>
            </div>
        </main>
    );
}

export default OnMeeting;