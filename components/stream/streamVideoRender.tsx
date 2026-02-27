"use client";

import {
  CallingState,
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
import {useEffect, useState} from "react";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1F1aWx0ZWRfQ2hlY2siLCJ1c2VyX2lkIjoiUXVpbHRlZF9DaGVjayIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzcyMTc0NDYwLCJleHAiOjE3NzI3NzkyNjB9.HRXO6n9gA6jGaYszbYoeYwu2982LDlWPNI-O0bI954I";
const userId = "Quilted_Check";
const callId = "TSoZLLpPaIFibq2wn2lYy";

// set up the user object
const user: User = {
  id: userId,
  name: "Oliver",
  image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};

const client = new StreamVideoClient({apiKey, user, token});
const call = client.call("default", callId);
// await call.join({create: true});

export default function StreamVideoCallRender() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const joinCall = async () => {
      try {
        await call.join({create: true});

        await navigator.mediaDevices.getUserMedia({video: true, audio: true});

        await call.camera.enable();
        await call.microphone.enable();
        setIsReady(true);
      } catch (err) {
        console.error("Failed to start media:", err);
      }
    };

    joinCall();
  }, []);

  if (!isReady) return <div>Joining call...</div>;
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = () => {
  const call = useCall();

  const {
    useCallCallingState,
    useParticipantCount,
    useLocalParticipant,
    useRemoteParticipants,
  } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Call {call?.id} has {participantCount} participants */}
      <StreamTheme style={{position: "relative"}}>
        <MyParticipantList participants={remoteParticipants} />
        <MyFloatingLocalParticipant participant={localParticipant} />
      </StreamTheme>
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
