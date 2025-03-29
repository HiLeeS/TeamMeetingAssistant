import React, { useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CodeInput = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (code.trim() === "") return;
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인 토큰이 없습니다. 다시 로그인하세요.");
        return;
      }
  
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/meeting/join"}?code=${code}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
  
      if (response.data === "회의 참가 완료!") {
        alert("성공.");
  
        // ✅ 코드 값을 로컬 스토리지에 저장
        localStorage.setItem("code", code);
  
        navigate(`/onmeeting`);
      } else {
        alert("코드가 유효하지 않습니다.");
      }
    } catch (error) {
      console.error("코드 확인 중 에러 발생:", error);
      alert("코드를 확인하는 중 오류가 발생했습니다. 다시 시도해 주세요.");
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
          Your Logo
        </Button>
      </div>

      {/* 중앙 입력란 */}
      <div className="flex items-center justify-center flex-1">
        <label className="font-bold text-[28px] mr-4">Your code :</label>
        <input
          type="text"
          placeholder="Enter your code...."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border-b border-black focus:outline-none text-lg placeholder-gray-400 w-[300px] text-3xl"
        />
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-center mt-10">
        <Button
          onClick={handleSubmit}
          className="w-48 h-[60px] bg-[#f7b3b3] hover:bg-[#f7b3b3]/90 rounded-[5px]"
        >
          <span className="text-white text-[25px]">회의하러 가기</span>
        </Button>
      </div>
    </div>
  );
};

export default CodeInput;