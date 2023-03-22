import React from "react";
import PartnersDescription from "./PartnersDescription";

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
      <section className="instituts">
        <div className="container">
          {page.acf.institut.map(
            (institut: { [key: string]: any }, index: number) => (
              <div className="institut-container" key={index}>
                <div className="institut-description">
                  <img src={institut.image.url} alt={institut.image.alt} />
                  <div className="description-institut">
                    <h3>{institut.name}</h3>
                    <div
                      dangerouslySetInnerHTML={{ __html: institut.description }}
                    ></div>
                  </div>
                </div>
                <div className="partners">
                  {institut.leader.map(
                    (partner: { [key: string]: any }, index: number) => (
                      <div className="partner" key={index}>
                        <button className="role">{partner.post}</button>
                        <PartnersDescription partner={partner} />
                      </div>
                    )
                  )}
                </div>
                <div className="button">
                  <button>Research team</button>
                  <button>Involvement by work package</button>
                </div>
                <div
                  className="research"
                  dangerouslySetInnerHTML={{
                    __html: institut.research_team_description,
                  }}
                ></div>
                <div
                  className="involvement"
                  dangerouslySetInnerHTML={{
                    __html: institut.involvement_by_work_package,
                  }}
                ></div>
              </div>
            )
          )}
        </div>
      </section>
    </article>
  );
};

export default Partners;
