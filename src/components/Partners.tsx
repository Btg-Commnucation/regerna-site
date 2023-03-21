import React from "react";

const Partners = ({ page }: { page: { [key: string]: any } }) => {
  return (
    <article className="partners">
      <div className="container">
        <section className="hero-banner">
          <div className="hero-banner__content">
            <img
              src={page.acf.title_image.url}
              alt={page.acf.title_image.alt}
            />
            <div className="title">
              <h1>{page.title}</h1>
              <img src="/contact-decoration.svg" alt="decoration" />
            </div>
          </div>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: page.acf.hero_banner_text }}
          ></div>
        </section>
      </div>
      <section className="image-map-pro">
        <h2>--- A faire ---</h2>
      </section>
    </article>
  );
};

export default Partners;
