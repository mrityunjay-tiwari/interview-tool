import BgGradient from "@/components/home/bg-gradient";
import InterviewPage from "@/components/interview/interview-page";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function InterviewMainPage() {
    const user = await auth();

    if(!user) {
        redirect("/signin");
    }
    return (
        <div>
            <BgGradient />
            <InterviewPage />
        </div>
    )
}