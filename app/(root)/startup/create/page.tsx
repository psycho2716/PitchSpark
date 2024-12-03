import MainLayout from "@/components/layout/main-layout";
import StartupForm from "@/components/startup-form";
import React from "react";

const Create = () => {
    return (
        <MainLayout heading="Submit your startup!">
            <StartupForm />
        </MainLayout>
    );
};

export default Create;
