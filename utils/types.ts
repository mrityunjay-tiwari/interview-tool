export type InterviewSegment = {
  question: string;
  answer: string;
};

export type FinalizeInterviewRequest = {
  questions: InterviewSegment[];
  userId: string;
  role: string;
  postureStats: {
    min: number;
    max: number;
    avg: number;
  };
};
