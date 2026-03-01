import { marker, sans } from "@/lib/fonts";
import JoinMeeting from "./join-meeting";
import BottomCarousel from "./bottom-carousel";
import { Highlighter } from "../ui/highlighter";

export default async function HomeContent() {
    
    return (
        <div className="flex items-end justify-between sm:max-w-xl md:max-w-4xl p-5 md:p-10 md:px-14  dark:bg-neutral-900 my-10 md:mt-[70px] mt-[66px]">
            <div className="flex flex-col items-center gap-5">
                <h1 className={`text-3xl md:text-6xl font-bold text-neutral-700 text-center dark:text-neutral-100 ${sans.className}`}>Prepnova.</h1>
                <p className={`text-lg text-neutral-500 dark:text-neutral-400 text-center ${sans.className}`}>Real-time AI interview coach with technical and behavioral analytics for measurable progress tracking.<Highlighter action="underline" color="#87CEFA">For everyone who master one but miss the later.</Highlighter>{" "} </p>
                
                <JoinMeeting />
                <hr className="w-full border-0.5 border-neutral-200 dark:border-neutral-700" />
                
                <BottomCarousel />
    
            </div>
            
        </div>
    )
}