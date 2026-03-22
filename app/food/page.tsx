import Header from "../Header";
import { DockDemo } from '../Footer2';
import Image from 'next/image';
import { imgUrl } from '@/lib/cdn';

const foodImages = [
  { filename: 'food1 (1).jpg', caption: 'Duck Ramen, South Korea' },
  { filename: 'food2 (1).jpg', caption: 'Garlic Pasta, South Korea' },
  { filename: 'food3 (1).jpg', caption: '떡볶이, South Korea' },
  { filename: 'food4 (1).jpg', caption: '망고빙수, South Korea' },
  { filename: 'food5 (1).jpg', caption: '삼겹살, South Korea' },
  { filename: 'food6 (1).jpg', caption: 'Ramen, London UK' },
  { filename: 'food7 (1).jpg', caption: 'Cheeseburger, London UK' },
  { filename: 'food8 (1).jpg', caption: '삼겹살, South Korea' },
  { filename: 'food9 (1).jpeg', caption: '돈까스, South Korea' },
  { filename: 'food10 (1).jpeg', caption: 'Eggs Benedict, London UK' },
  { filename: 'food11 (1).jpeg', caption: '갈비, South Korea' },
].map((f) => ({ ...f, src: imgUrl(f.filename) }));
  
export default function Food() {
    return (
        <>
        <Header/>
        <div className="max-w-4xl mx-auto p-8 pb-28">
            <h1 className="text-6xl font-bold text-black dark:text-white italic mb-12">
                favourite foods <span role="img" aria-label="food">🍕</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                a gallery of some of my favourite foods i've eaten so far.
            </p>

            {/* Gallery Grid with Lazy Loading */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {foodImages.map((food, index) => (
                    <div key={food.filename} className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow group dark:shadow-gray-800">
                        <div className="aspect-square relative">
                            <Image
                                src={food.src}
                                alt={food.caption}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                                loading={index < 4 ? "eager" : "lazy"} 
                                sizes="(max-width: 768px) 50vw, 33vw"
                            />
                        </div>
                        
                        {/* Caption Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white text-center text-sm px-4">{food.caption}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <DockDemo/>
        </>
    );
}