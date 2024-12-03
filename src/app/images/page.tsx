import Navbar from "@/components/Navbar/Navbar";
import ImageGrid from "@/components/ImageGrid";
export default async function Home() {

    return (
        <div className="relative min-h-screen flex justify-between items-center flex-col gap-2">
            <Navbar />
            <div className="w-full flex h-full flex-grow">
                <div className="flex-1" style={{
                    maxHeight: "calc(100vh - 68px)",
                    overflowY: "auto",
                }}>
                    <img
                        src="https://picsum.photos/200/300"
                        alt="left"
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="flex-1" style={{
                    maxHeight: "calc(100vh - 68px)",
                    overflowY: "auto",
                }}>
                    <ImageGrid />
                </div>
            </div>
        </div>
    );
}
