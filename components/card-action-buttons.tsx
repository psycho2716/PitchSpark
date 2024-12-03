"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";
import { useStartupForm } from "@/hooks/useStartupForm";
import { PostProps } from "@/types/type";
import Link from "next/link";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import ConfirmationModal from "./confirmation-modal";

interface CardActionButtonsProps {
    post: PostProps;
    session: Session | null;
}

const CardActionButtons = ({ post, session }: CardActionButtonsProps) => {
    const { handleDeleteStartup, formState } = useStartupForm();
    const pathname = usePathname();
    const isUserRoute = pathname === `/user/${session?.user?.id}`;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        handleDeleteStartup(post._id);
        setIsModalOpen(false);
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {formState.status === "IDLE" ? (
                <Link href={`/startup/${post._id}`} className="startup-card-btn">
                    View Details
                </Link>
            ) : (
                <span className="startup-card-btn-disabled">
                    View Details
                    <span className="spinner" />
                </span>
            )}

            {isUserRoute && post.author?._id === session?.user?.id && (
                <>
                    {formState.status === "IDLE" ? (
                        <Link
                            href={`/startup/update/${post._id}`}
                            className="startup-card-update-btn"
                        >
                            Update
                            <span className="spinner" />
                        </Link>
                    ) : (
                        <span className="startup-card-update-btn-disabled">
                            Update
                            <span className="spinner" />
                        </span>
                    )}
                    <Button
                        size="sm"
                        variant="outline"
                        className="startup-card-delete-btn"
                        disabled={formState.status === "SUBMITTING"}
                        onClick={handleDeleteClick}
                    >
                        <Trash2Icon className="h-4 w-4" />
                        {formState.status === "SUBMITTING" && <span className="spinner" />}
                    </Button>
                </>
            )}

            <ConfirmationModal
                isOpen={isModalOpen}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </>
    );
};

export default CardActionButtons;
