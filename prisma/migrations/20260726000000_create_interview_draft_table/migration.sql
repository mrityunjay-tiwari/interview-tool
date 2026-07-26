-- CreateTable
CREATE TABLE "InterviewDraft" (
    "id" TEXT NOT NULL,
    "callId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT,
    "seniority" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PROCESSING',
    "transcript" JSONB,
    "reportContext" JSONB,
    "postureStats" JSONB,
    "error" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "reportId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewDraft_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InterviewDraft_callId_key" ON "InterviewDraft"("callId");

-- CreateIndex
CREATE INDEX "InterviewDraft_userId_status_createdAt_idx" ON "InterviewDraft"("userId", "status", "createdAt" DESC);

-- AddForeignKey
ALTER TABLE "InterviewDraft" ADD CONSTRAINT "InterviewDraft_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
