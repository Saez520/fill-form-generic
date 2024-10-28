import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import '../app/globals.css';

interface DropzoneProps {
    maxFileSize?: number;
    onFileUpload: (file: File) => void; // Cambiado para pasar un solo archivo
}

const Dropzone: React.FC<DropzoneProps> = ({ maxFileSize = 25000000, onFileUpload }) => {
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files?.[0];
        if (!newFile) return;

        if (newFile.size > maxFileSize) {
            alert("El archivo excede el límite de 25MB");
            return;
        }

        if (newFile.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            alert("Solo se permiten archivos .docx");
            return;
        }

        setFile(newFile);
        onFileUpload(newFile); // Pasa el archivo al formulario principal
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (!droppedFile) return;

        if (droppedFile.size > maxFileSize) {
            alert("El archivo excede el límite de 25MB");
            return;
        }

        if (droppedFile.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            alert("Solo se permiten archivos .docx");
            return;
        }

        setFile(droppedFile);
        onFileUpload(droppedFile); // Pasa el archivo al formulario principal
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

    const handleReset = () => setFile(null);

    return (
        <div
            className="border-2 border-dashed border-gray-500 rounded-lg mt-4 p-8 text-center relative flex flex-col items-center justify-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
        >
            <Input
                type="file"
                ref={fileInputRef}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept=".docx"
                style={{ fontFamily: 'GeistVF' }}
            />
            <Image
                src="/upload.svg"
                alt="Dropzone Image"
                width={50}
                height={50}
            />
            <p className="mt-4">
                {file ? (
                    <span>
                        {file.name} - {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                ) : (
                    "No hay archivos seleccionados"
                )}
            </p>
        </div>
    );
};

export default Dropzone;
