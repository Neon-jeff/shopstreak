import Form from "@/components/Form";
import Camera from "@/components/Camera";
import { IconShoppingCart } from '@tabler/icons-react';


export default function Home() {
  return (
    <div className="bg-white py-10 px-2 text-black text-sm min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* canvas to start streaming the video */}
      <div className="lg:w-1/3 p-5 bg-gray-50 rounded-xl mx-auto space-y-3">
      <h1 className="text-lg font-semibold text-orange-400 text-center flex flex-col items-center gap-1"><IconShoppingCart stroke={2} />
      Precious Food Stores</h1>
      <Camera/>
      <Form/>
      </div>
    </div>
  );
}
