"use client";

import {
  Call,
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCall,
  useCallStateHooks,
  type User,
} from "@stream-io/video-react-sdk";
import {
  ParticipantView,
  type StreamVideoParticipant,
} from "@stream-io/video-react-sdk";
import {useEffect, useRef, useState} from "react";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import {usePose} from "@/hooks/usePose";
import { InterviewReportSchema } from "@/app/api/structured-data/schema";
import { experimental_useObject as useObject } from "@ai-sdk/react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const token = process.env.NEXT_PUBLIC_STREAM_TOKEN!;
const userId = process.env.NEXT_PUBLIC_STREAM_USER_ID!;
// const callId = process.env.NEXT_PUBLIC_STREAM_CALL_ID!;
// const apiKey = "mmhfdzb5evj2";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1F1aWx0ZWRfQ2hlY2siLCJ1c2VyX2lkIjoiUXVpbHRlZF9DaGVjayIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzcyMTc0NDYwLCJleHAiOjE3NzI3NzkyNjB9.HRXO6n9gA6jGaYszbYoeYwu2982LDlWPNI-O0bI954I";

// const callId = "TSoZLLpPaIFibq2wn2lYy";

// set up the user object`

// await call.join({create: true});

// export default function StreamVideoCallRender({role}: {role: string}) {
//   const [isReady, setIsReady] = useState(false);

//   const user: User = {
//     id: userId,
//     name: "Oliver",
//     image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
//   };
//   const client = new StreamVideoClient({apiKey, user, token});
//   const call = client.call("default", callId);

//   useEffect(() => {
//     if (!apiKey || !token || !userId || !callId) {
//       console.error("Missing env vars");
//       return;
//     }

//     const joinCall = async () => {
//       try {
//         await call.join({create: true});

//         await navigator.mediaDevices.getUserMedia({video: true, audio: true});

//         await call.camera.enable();
//         await call.microphone.enable();
//         console.log("Mic enabled:", call.microphone.state);
//         setIsReady(true);
//       } catch (err) {
//         console.error("Failed to start media:", err);
//       }
//     };

//     joinCall();
//   }, []);

//   if (!isReady) return <div>Joining call...</div>;
//   return (
//     <StreamVideo client={client}>
//       <StreamCall call={call}>
//         <MyUILayout />
//       </StreamCall>
//     </StreamVideo>
//   );
// }

type MidFeedback = {
  short_feedback: string;
  score: number;
};

// export default function StreamVideoCallRender({role}: {role: string}) {
//   const [isReady, setIsReady] = useState(false);
//   const [client, setClient] = useState<StreamVideoClient | null>(null);
//   const [call, setCall] = useState<Call | null>(null);
//   const [dynamicCallId, setDynamicCallId] = useState<string | null>(null);

//   // Always call hooks first
//   // useEffect(() => {
//   //   if (!apiKey || !token || !userId || !callId) {
//   //     console.error("Missing env vars");
//   //     return;
//   //   }

//   //   const user: User = {
//   //     id: userId,
//   //     name: "Oliver",
//   //     image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
//   //   };

//   //   const startCall = async () => {
//   //     const streamClient = new StreamVideoClient({
//   //       apiKey,
//   //       user,
//   //       token,
//   //     });

//   //     const streamCall = streamClient.call("default", callId);

//   //     setClient(streamClient);
//   //     setCall(streamCall);

//   //     await streamCall.join({create: true});

//   //     await fetch("http://localhost:8000/start-agent", {
//   //       method: "POST",
//   //     });
//   //     await streamCall.camera.select("default");
//   //     await streamCall.microphone.select("default");

//   //     await streamCall.camera.enable();
//   //     await streamCall.microphone.enable();

//   //     setIsReady(true);
//   //   };

//   //   startCall();
//   // }, []);

//   const hasStarted = useRef(false);

//   useEffect(() => {
//   const createSession = async () => {
//     const res = await fetch("http://localhost:8000/create-session", {
//       method: "POST",
//     });

//     const data = await res.json();
//     setDynamicCallId(data.call_id);
//   };

//   createSession();
// }, []);

// useEffect(() => {
//   if (!dynamicCallId) return;
//   if (hasStarted.current) return;

//   hasStarted.current = true;

//   const user: User = {
//   id: userId,
//   name: "Oliver",
//   image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
// };

//   const startCall = async () => {
//     try {
//       const streamClient = new StreamVideoClient({
//         apiKey,
//         user,
//         token,
//       });

//       const streamCall = streamClient.call("default", dynamicCallId);

//       setClient(streamClient);
//       setCall(streamCall);

//       await streamCall.join({ create: true });

//       // SMALL DELAY to let Stream register participant
//       await new Promise(res => setTimeout(res, 500));

//       await fetch("http://localhost:8000/start-agent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           role,
//           call_id: dynamicCallId,
//         }),
//       });

//       await streamCall.camera.enable();
//       await streamCall.microphone.enable();

//       setIsReady(true);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   startCall();
// }, [dynamicCallId]);

//   if (!client || !call || !isReady) {
//     return <div>Joining call...</div>;
//   }

//   return (
//     <StreamVideo client={client}>
//       <StreamCall call={call}>
//         <MyUILayout callId={dynamicCallId} />
//       </StreamCall>
//     </StreamVideo>
//   );
// }

export default function StreamVideoCallRender({ role }: { role: string }) {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const [dynamicCallId, setDynamicCallId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const hasJoined = useRef(false);

  // ✅ Step 1: Create session
  useEffect(() => {
    const createSession = async () => {
      const res = await fetch("http://localhost:8000/create-session", {
        method: "POST",
      });

      const data = await res.json();
      setDynamicCallId(data.call_id);
    };

    createSession();
  }, []);

  // ✅ Step 2: Join Stream (only transport logic here)
  useEffect(() => {
    if (!dynamicCallId) return;
    if (hasJoined.current) return;

    hasJoined.current = true;

    const user: User = {
      id: userId,
      name: "Oliver",
      image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
    };

    const startCall = async () => {
      const streamClient = new StreamVideoClient({
        apiKey,
        user,
        token,
      });

      const streamCall = streamClient.call("default", dynamicCallId);

      setClient(streamClient);
      setCall(streamCall);

      await streamCall.join({ create: true });

      await streamCall.camera.enable();
      await streamCall.microphone.enable();

      setIsReady(true);
    };

    startCall();
  }, [dynamicCallId]);

  if (!client || !call || !isReady) {
    return <div>Joining call...</div>;
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout callId={dynamicCallId} role={role} />
      </StreamCall>
    </StreamVideo>
  );
}

// export const MyUILayout = ({ callId }: { callId: string | null }) => {
//   const call = useCall();

//   const {
//     useCallCallingState,
//     useParticipantCount,
//     useLocalParticipant,
//     useRemoteParticipants,
//   } = useCallStateHooks();
//   const callingState = useCallCallingState();
//   const [midFeedback, setMidFeedback] = useState<MidFeedback | null>(null);

//   useEffect(() => {
//     const interval = setInterval(async () => {
//       const res = await fetch(
//         `http://localhost:8000/latest-feedback/${callId}`,
//       );

//       const data = await res.json();

//       if (data.feedback) {
//         setMidFeedback(data.feedback);
//         console.log("NEW FEEDBACK:", data.feedback);
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (callingState === CallingState.LEFT) {
//       console.log("User left the call. Fetching final segments...");

//       fetch(`http://localhost:8000/segments/${callId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           console.log("Final conversation segments:", data.segments);
//         })
//         .catch((err) => {
//           console.error("Failed to fetch segments:", err);
//         });
//     }
//   }, [callingState]);

//   const participantCount = useParticipantCount();
//   const localParticipant = useLocalParticipant();
//   const remoteParticipants = useRemoteParticipants();

//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const {canvasRef, postureScore, nudgeMessage} = usePose(videoRef);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const video = document.querySelector("video") as HTMLVideoElement | null;

//       if (video && video.readyState >= 2) {
//         videoRef.current = video;
//       }
//     }, 500);

//     return () => clearInterval(interval);
//   }, []);

//   if (callingState !== CallingState.JOINED) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex w-full h-[calc(100vh-100px)]">
//       <div className="flex-1 relative">
//         <StreamTheme>
//           <SpeakerLayout participantsBarPosition="top" />
//           <CallControls />
//         </StreamTheme>
//       </div>
//       <div className="p-0.5 border-l border-gray-200 mt-16">
//         <div className="w-[360px] border-l-2 border-gray-200 bg-white/70 backdrop-blur-xl p-6 flex flex-col gap-6">
//           {/* Feedback Section */}
//           {midFeedback && (
//             <div className="p-0.5 border bg-accent/50 border-gray-200 rounded-2xl">
//               <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
//                 <div className="flex justify-between items-center mb-2">
//                   <p className="font-semibold text-gray-800">
//                     Live AI Feedback
//                   </p>
//                   <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
//                     {midFeedback.score}/10
//                   </span>
//                 </div>

//                 <p className="text-sm text-gray-600 leading-relaxed">
//                   {midFeedback.short_feedback}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Posture Section */}
//           <div className="p-0.5 border bg-accent/50 border-gray-200 rounded-2xl">
//             <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
//               <p className="font-semibold text-gray-800 mb-3">
//                 Posture & Presence
//               </p>

//               <canvas
//                 ref={canvasRef}
//                 width={400}
//                 height={300}
//                 className="w-full h-auto"
//               />

//               <div className="mt-3 text-sm font-medium">
//                 Score: {postureScore} —{" "}
//                 <span
//                   className={
//                     postureScore < 0.5 ? "text-red-500" : "text-emerald-600"
//                   }
//                 >
//                   {postureScore < 0.5 ? "Poor" : "Good"} { " "}
//                   {nudgeMessage}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


const MyUILayout = ({
  callId,
  role,
}: {
  callId: string | null;
  role: string;
}) => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const [midFeedback, setMidFeedback] = useState<MidFeedback | null>(null);
  const agentStarted = useRef(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { canvasRef, postureScore, nudgeMessage } = usePose(videoRef);

    const { submit, object } = useObject({
    api: "/api/structured-data",
    schema: InterviewReportSchema,
  });
  
    // ✅ Step 3: Start agent ONLY when fully joined
  useEffect(() => {
    if (!callId) return;
    if (callingState !== CallingState.JOINED) return;
    if (agentStarted.current) return;

    agentStarted.current = true;

    const startAgentWithDelay = async () => {
      // 🔥 Wait for SFU to stabilize
      await new Promise((res) => setTimeout(res, 1000));

      await fetch("http://localhost:8000/start-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          call_id: callId,
        }),
      });
    };

    startAgentWithDelay();
  }, [callingState, callId, role]);

  // ✅ Step 4: Poll feedback
useEffect(() => {
  if (!callId) return;
  if (callingState !== CallingState.JOINED) return;

  const interval = setInterval(async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/latest-feedback/${callId}`
      );

      if (!res.ok) return;

      const data = await res.json();

      if (data?.feedback) {
        setMidFeedback(data.feedback);
      }
    } catch (err) {
      console.error("Feedback polling error:", err);
    }
  }, 5000);

  return () => clearInterval(interval);
}, [callId, callingState]);

  // ✅ Step 5: Fetch segments after leaving
  useEffect(() => {
    if (!callId) return;
    if (callingState !== CallingState.LEFT) return;

    // fetch(`http://localhost:8000/segments/${callId}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("Final conversation segments:", data.segments);
    //     submit({
    //       questions: data.segments,
    //     });
    //   });
    const generateFinalReport = async () => {
    const res = await fetch(
      `http://localhost:8000/segments/${callId}`
    );

    const data = await res.json();

    if (!data?.segments?.length) return;

    // 🔥 Send segments to Vercel AI SDK route
    submit({
       questions: data.segments,
    });
  };

  generateFinalReport();
  }, [callingState, callId]);

  // console.log("The final object after processing : ",{object})
  // Attach video reference
  useEffect(() => {
    const interval = setInterval(() => {
      const video = document.querySelector("video") as HTMLVideoElement | null;
      if (video && video.readyState >= 2) {
        videoRef.current = video;
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full h-[calc(100vh-100px)]">
      <div className="flex-1 relative">
        <StreamTheme>
          <SpeakerLayout participantsBarPosition="top" />
          <CallControls />
        </StreamTheme>
      </div>

      <div className="w-[360px] border-l border-gray-200 bg-white/70 backdrop-blur-xl p-6 flex flex-col gap-6">
        {midFeedback && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-gray-800">
                Live AI Feedback
              </p>
              <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                {midFeedback.score}/10
              </span>
            </div>

            <p className="text-sm text-gray-600">
              {midFeedback.short_feedback}
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="font-semibold text-gray-800 mb-3">
            Posture & Presence
          </p>

          <canvas
            ref={canvasRef}
            width={400}
            height={300}
            className="w-full h-auto"
          />

          <div className="mt-3 text-sm font-medium">
            Score: {postureScore} —{" "}
            <span
              className={
                postureScore < 0.5
                  ? "text-red-500"
                  : "text-emerald-600"
              }
            >
              {postureScore < 0.5 ? "Poor" : "Good"} {nudgeMessage}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MyParticipantList = (props: {
  participants: StreamVideoParticipant[];
}) => {
  const {participants} = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "8px",
        width: "100vw",
      }}
    >
      {participants.map((participant) => (
        <ParticipantView
          muteAudio
          participant={participant}
          key={participant.sessionId}
        />
      ))}
    </div>
  );
};

export const MyFloatingLocalParticipant = (props: {
  participant?: StreamVideoParticipant;
}) => {
  const {participant} = props;
  if (!participant) {
    return <p>Error: No local participant</p>;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "15px",
        left: "15px",
        width: "240px",
        height: "135px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 3px",
        borderRadius: "12px",
      }}
    >
      {participant && <ParticipantView muteAudio participant={participant} />}
    </div>
  );
};
