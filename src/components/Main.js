import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Main = () => {
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeetings = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("로그인 토큰이 없습니다. 다시 로그인하세요.");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/meeting", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
        });

        const data = await response.json();
        console.log("서버 응답:", data);
        setMeetings(data || []);
      } catch (error) {
        console.error("Error fetching meetings:", error);
        setError("회의 정보를 가져오는 중 오류가 발생했습니다.");
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-full max-w-[1440px] min-h-[900px] relative p-10">
        <div className="font-semibold text-black text-xl mb-16">WSC</div>

        {error && <p className="text-red-500 text-lg mb-4">{error}</p>}

        <div className="flex items-start gap-40">
          <div className="w-2/3 max-w-[700px]">
            {meetings.length > 0 ? (
              meetings.map((meeting, index) => (
                <React.Fragment key={meeting.objectId || index}>
                  <div className="grid grid-cols-[250px_1fr] items-center py-6">
                    <div className="font-bold text-black text-[31px] mr-32">
                      {new Date(meeting.createdAt)
                        .toISOString()
                        .split("T")[0]
                        .replace(/-/g, ".")}
                    </div>
                    <div className="font-bold text-black text-[31px] mr-32">
                      <Link
                        to={`/meeting/summary?code=${meeting.code}`}  // ✅ code 값을 URL에 포함
                        className="text-black hover:underline"
                      >
                        {meeting.title}
                      </Link>
                    </div>
                  </div>
                  <Separator className="bg-black/10 h-[1.5px] mt-5" />
                </React.Fragment>
              ))
            ) : (
              <p className="text-black text-lg">회의가 없습니다.</p>
            )}
          </div>

          <div className="flex flex-col items-end mt-32 gap-8">
            <Link to="/code-input">
              <Button className="h-[60px] w-48 bg-[#f7b3b3] hover:bg-[#f7b3b3]/90 rounded-[5px]">
                <span className="text-white text-[25px]">코드 입력하기</span>
              </Button>
            </Link>

            <Link to="/code-create">
              <Button className="h-[60px] w-48 bg-[#f7b3b3] hover:bg-[#f7b3b3]/90 rounded-[5px]">
                <span className="text-white text-[25px]">코드 생성하기</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
