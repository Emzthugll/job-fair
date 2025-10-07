import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-start overflow-y-auto bg-[#074797] p-4 sm:p-6">
            <div className="w-full max-w-3xl">{children}</div>
        </div>
    );
}
