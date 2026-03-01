"use client"

import { useSearchParams } from "next/navigation";
import StreamVideoCallRender from "../stream/streamVideoRender";
import { useEffect } from "react";

export const dynamic = "force-dynamic";

export default function InterviewPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const callId = "test-call-123";

  useEffect(() => {
    if (!role) return;

    fetch("http://localhost:8000/start-agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role,
        call_id: callId,
      }),
    });
  }, [role]);

  if (!role) return <div>No role selected</div>;

  return (
    <div className="w-full max-w-[calc(100%-2.5rem)] md:max-w-7xl mx-auto flex flex-col items-center">
      <StreamVideoCallRender role={role ?? "react-developer"} />
    </div>
  );
}
