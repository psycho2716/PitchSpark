import React from "react";
import HeroLayout from "./hero-layout";
import { cn } from "@/lib/utils";

const MainLayout = ({
  children,
  tag,
  heading,
  subHeading,
  heroChildren,
  className,
}: {
  children?: React.ReactNode;
  tag?: string | null | undefined;
  heading?: string | null | undefined;
  subHeading?: string | null | undefined;
  heroChildren?: React.ReactNode;
  className?: string;
}) => {
  return (
    <main className={cn("min-h-screen pt-20", className)}>
      {(tag || heading || subHeading) && (
        <HeroLayout tag={tag} heading={heading} subHeading={subHeading}>
          {heroChildren}
        </HeroLayout>
      )}

      <section className="section-container">{children}</section>
    </main>
  );
};

export default MainLayout;
