import MainLayout from "@/components/layout/main-layout";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFound = () => {
    return (
        <MainLayout className="bg-primary-100 flex items-center justify-center">
            <main className="flex-1 flex-grow text-center">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h1 className="text-4xl font-bold text-[#F33A6A] mb-4">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
                    <p className="text-gray-600 mb-8">
                        Oops! The startup you&apos;re looking for seems to have pivoted away.
                        Let&apos;s get you back on track.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 bg-[#F33A6A] text-white rounded-md hover:bg-[#D32955] transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back to Homepage
                    </Link>
                </div>
            </main>
        </MainLayout>
    );
};

export default NotFound;
