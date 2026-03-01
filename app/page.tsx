import StreamVideoCallRender from "@/components/stream/streamVideoRender";

import HomeContent from "@/components/home/home-content";
import Footer from "@/components/home/footer";

export default async function Home() {

  return (
   <main className="w-full mx-auto flex flex-col items-center">
    <HomeContent />
    <Footer />
   </main>
  );
}
