import React from "react";
import { Button } from "./ui/button";

interface ConfirmationModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }: ConfirmationModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <p className="mb-4">Are you sure you want to delete this startup?</p>
                <div className="flex justify-end">
                    <Button onClick={onCancel} variant="outline" className="mr-2 rounded-full px-4">
                        No
                    </Button>
                    <Button onClick={onConfirm} className="startup-card-delete-btn">
                        Yes
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
