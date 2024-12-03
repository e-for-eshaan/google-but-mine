import Navbar from "@/components/Navbar/Navbar";
import ImageGrid from "@/components/ImageGrid";
export default async function Home() {

    return (
        <div className="relative min-h-screen flex justify-between items-center flex-col gap-2">
            <Navbar />
            <div className="w-full flex h-full flex-grow">
                <div className="flex-1">left</div>
                <div className="flex-1">
                <ImageGrid />
                </div>
            </div>
        </div>
    );
}
