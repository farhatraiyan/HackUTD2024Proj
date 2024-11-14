import { Card } from "flowbite-react";

export default function CardComponent() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex justify-center items-center">
                <Card href="#" className="w-96 mb-1 mr-1 ml-1 mt-1">
                    <h5 className="text-2xl font-bold tracking-tight">
                        Farhat R. Kabir
                    </h5>
                    <p className="font-normal h-16">
                        Some desc.
                    </p>
                </Card>
                <Card href="#" className="w-96 mb-1 mr-1 ml-1 mt-1">
                    <h5 className="text-2xl font-bold tracking-tight">
                        Sudin Rajbanshi
                    </h5>
                    <p className="font-normal h-16">
                        Some desc.
                    </p>
                </Card>
            </div>
            <div className="flex justify-center items-center">
                <Card href="#" className="w-96 mb-1 mr-1 ml-1 mt-1">
                    <h5 className="text-2xl font-bold tracking-tight">
                        Abraham G. R. Rogers
                    </h5>
                    <p className="font-normal h-16">
                        Some desc.
                    </p>
                </Card>
                <Card href="#" className="w-96 mb-1 mr-1 ml-1 mt-1">
                    <h5 className="text-2xl font-bold tracking-tight">
                        Kyle Paul
                    </h5>
                    <p className="font-normal h-16">
                        Some desc.
                    </p>
                </Card>
            </div>
        </div>
    );
}