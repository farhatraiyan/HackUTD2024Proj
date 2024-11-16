import { useState } from "react";
import { Card } from "flowbite-react";
// Import images
import FarhatImage from './Farhat.jpg';
import SudinImage from './Sudin.png';
import KyleImage from './Kyle.jpg';
import AbeImage from './Abe.jpg';

export default function CardComponent() {
    const HoverableCard = ({ name, description, image }) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
            <Card
                href="#"
                className="w-96 mb-1 mr-1 ml-1 mt-1 overflow-hidden flex items-center justify-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ height: "300px", width: "300px" }}
            >
                {/* Conditionally render either the image or the text */}
                {!isHovered ? (
                    <img
                        src={image}
                        alt={`${name} Image`}
                        className="object-cover rounded-xl shadow-md w-full h-full transition-transform duration-300 ease-in-out"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100 p-4 rounded-xl shadow-md transition-opacity duration-200 ease-in-out">
                        <h5 className="text-2xl font-bold text-blue-500 mb-2">
                            {name}
                        </h5>
                        <p className="font-normal text-center">{description}</p>
                    </div>
                )}
            </Card>
        );
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen space-y-4">
            <div className="flex justify-center items-center space-x-4">
                <HoverableCard 
                    name="Farhat R. Kabir" 
                    description="Some description for Farhat." 
                    image={FarhatImage} 
                />
                <HoverableCard 
                    name="Sudin Rajbanshi" 
                    description="Some description for Sudin." 
                    image={SudinImage} 
                />
            </div>
            <div className="flex justify-center items-center space-x-4">
                <HoverableCard 
                    name="Abe Rogers" 
                    description="Some description for Abraham." 
                    image={AbeImage} 
                />
                <HoverableCard 
                    name="Kyle the King" 
                    description="Some description for Kyle." 
                    image={KyleImage} 
                />
            </div>
        </div>
    );
}
