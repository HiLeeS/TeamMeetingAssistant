import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const CodeCreate = () => {
  const navigate = useNavigate();
  const [codeValue, setCodeValue] = useState("");
  const [meetingName, setMeetingName] = useState("");  // 회의 이름 상태 추가

  const createCode = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!meetingName) {
        alert("회의 이름을 입력하세요!");
        return;
      }
  
      // 백엔드로 코드 생성 요청
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/meeting"}?title=${encodeURIComponent(meetingName)}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : ""
          }
        }
      );
  
      const generatedCode = response.data;
      console.log("서버 응답:", generatedCode);
  
      // ✅ 코드 값을 로컬 스토리지에 저장
      localStorage.setItem("code", generatedCode);
  
      setCodeValue(generatedCode);
    } catch (error) {
      console.error("서버 요청 실패:", error);
      alert("코드 생성 실패! 다시 시도해 주세요.");
    }
  };
  


  return (
    <div className="bg-white flex flex-col justify-between items-center w-full h-screen p-10">
      {/* 상단 */}
      <div className="w-full">
        <Button
          onClick={() => navigate("/main")}
          className="font-semibold text-xl mb-16"
        >
          WSC
        </Button>
      </div>

      {/* 중앙 영역 */}
      <div className="flex flex-col items-center justify-center h-[600px]">
        {/* 회의 이름 입력 필드 */}
        <div className="flex items-center gap-4 mb-8">
          <label className="font-bold text-[28px]">회의이름 :</label>
          <input
            type="text"
            placeholder="회의 이름을 입력하세요..."
            value={meetingName}
            onChange={(e) => setMeetingName(e.target.value)}
            className="text-[28px] border-b-2 border-gray-400 focus:outline-none focus:border-black"
          />
          <Button
            onClick={createCode}
            className="ml-4 h-[50px] w-48 bg-[#f7b3b3] hover:bg-[#f7b3b3]/90 rounded-[5px]"
          >
            <span className="text-white text-[25px]">코드 생성하기</span>
          </Button>
        </div>

        {/* 코드 표시 영역 */}
        <div className="flex items-end gap-4">
          <span className="font-bold text-[28px]">Your code is...</span>
          <div className="flex flex-col items-start">
            <span className="text-[28px]">{codeValue || "Loading..."}</span>
            <Separator className="w-[500px] h-[1px] bg-black mt-1" />
          </div>
        </div>
      </div>

      {/* 회의하러 가기 버튼 */}
      <div className="flex justify-center mt-10">
        <Button
          onClick={() => navigate("/onmeeting")}
          className="w-48 h-[60px] bg-[#f7b3b3] hover:bg-[#f7b3b3]/90 rounded-[5px]"
        >
          <span className="text-white text-[25px]">회의하러 가기</span>
        </Button>
      </div>
    </div>
  );
};

export default CodeCreate;