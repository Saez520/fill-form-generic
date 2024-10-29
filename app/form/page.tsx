'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Alert } from '@/components/ui/alert';
import Dropzone from '@/components/drop-zone';

interface VariableChange {
    id: number;
    name: string;
    value: string;
}

interface FormData {
    changes: VariableChange[];
    files: File[]; // Agrega los archivos aquí
}

export default function Component() {
    const [formData, setFormData] = useState<FormData>({
        changes: [
            { id: 1, name: '', value: '' },
            { id: 2, name: '', value: '' }
        ],
        files: []
    });

    const [nextId, setNextId] = useState(3); // Ajuste para el ID inicial

    const addChange = () => {
        setFormData(prev => ({
            ...prev,
            changes: [...prev.changes, { id: nextId, name: '', value: '' }]
        }));
        setNextId(nextId + 1);
    };

    const removeChange = (id: number) => {
        setFormData(prev => ({
            ...prev,
            changes: prev.changes.filter(change => change.id !== id)
        }));
    };

    const updateChange = (id: number, field: 'name' | 'value', value: string) => {
        setFormData(prev => ({
            ...prev,
            changes: prev.changes.map(change =>
                change.id === id ? { ...change, [field]: value } : change
            )
        }));
    };

    const handleFileUpload = (files: File) => {
        setFormData(prev => ({ ...prev, files: [files] }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { changes, files } = formData;
        const emptyFields = changes.filter(change => !change.name || !change.value);

        if (emptyFields.length > 0) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "All fields must be filled out.",
            });
            return;
        }

        const uniqueNames = new Set(changes.map(change => change.name));
        if (uniqueNames.size !== changes.length) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Variable names must be unique.",
            });
            return;
        }

        console.log('Submitted data:', JSON.stringify(formData, null, 2));
        toast({
            title: "Success",
            description: "Variable changes and files submitted successfully.",
        });

        setFormData({
            changes: [],
            files: [] // Limpia los archivos
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
                <Label className="text-3xl text-center font-mono">FILL FORM</Label>

                <Alert>
                    <AlertCircle className="h-4 w-4 text-blue-400" />
                    <h3 className="font-bold text-blue-400 mb-2">Instrucciones</h3>
                    <div className="text-blue-400">
                        <ul className="list-disc text-sm grid grid-cols-2 gap-x-5 gap-y-1 content-between justify-between">
                            <li className="text-justify p-1 rounded-md hover:bg-slate-800">
                                In your .docx file name the variables between braces, for example: <code>{`{variable}`}</code>
                            </li>
                            <li className='text-justify p-1 rounded-md hover:bg-slate-800'>
                                In the <strong>Variable name</strong> field, type the name of the variable as you have it in your .docx file, for example: <code>{`variable`}</code>
                            </li>
                            <li className='text-justify p-1 rounded-md hover:bg-slate-800'>
                                Do not repeat the variables, each one must have a unique name.
                            </li>
                            <li className='text-justify p-1 rounded-md hover:bg-slate-800'>
                                In the <strong>Value</strong> field, type the value you want to replace the variable with.
                            </li>
                        </ul>
                    </div>
                </Alert>

                {formData.changes.map(change => (
                    <div key={change.id} className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                            <Input
                                type="text"
                                value={change.name}
                                onChange={(e) => updateChange(change.id, 'name', e.target.value)}
                                placeholder="Variable name"
                                className="flex-grow bg-gray-800 text-white"
                            />
                            <Input
                                type="text"
                                value={change.value}
                                onChange={(e) => updateChange(change.id, 'value', e.target.value)}
                                placeholder="Value"
                                className="flex-grow bg-gray-800 text-white"
                            />
                            <Button onClick={() => removeChange(change.id)} variant="ghost" size="icon">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}

                <Button type="button" onClick={addChange} className="w-full bg-blue-500 hover:bg-blue-700">
                    Add Variable
                </Button>

                <Dropzone onFileUpload={handleFileUpload} />

                <Button type="submit" className="w-full bg-green-500 hover:bg-green-700">
                    Submit Changes
                </Button>
            </form>
        </div>
    );
}
