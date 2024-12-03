import React from "react";

const HeroLayout = ({
  tag,
  heading,
  subHeading,
  children,
}: {
  tag?: string | null | undefined;
  heading?: string | null | undefined;
  subHeading?: string | null | undefined;
  children?: React.ReactNode;
}) => {
  return (
    <section className="pink-container">
      {tag && <p className="tag">{tag}</p>}
      {heading && <h2 className="heading">{heading}</h2>}
      {subHeading && <p className="sub-heading">{subHeading}</p>}
      {children}
    </section>
  );
};

export default HeroLayout;
