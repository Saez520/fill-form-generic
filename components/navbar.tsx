import React from 'react';
import Link from 'next/link';
import { ModeToggle } from './change-mode';
import { Button } from './ui/button';
import { Label } from './ui/label';
import '../app/globals.css';
const Navbar: React.FC = () => {
    return (
        <nav className=" w-full flex items-center justify-between p-4 text-white border-b border-slate-300 animate-fade-in opacity-0 [--animation-delay:200ms]">
            <div className="flex w-full items-center space-x-4 ">
                <div className='w-1/2'>
                    <Label className="font-satoshi font-black tracking-wider bg-gradient-to-r from-purple-400 via-pink-300 to-blue-500 bg-clip-text text-transparent">
                        <Link href="/">
                            FILL FORM
                        </Link>
                    </Label>
                </div>
                <div className="flex w-1/2 justify-end space-x-5">
                    <Link href="/">
                        <Button className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900">Inicio</Button>
                    </Link>
                    <Link href="/form">
                        <Button className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900">Dinamic Form</Button>
                    </Link>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;