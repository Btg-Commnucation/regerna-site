import { useEffect, useRef, useState } from "react";
import { ScrollRestoration } from "react-router-dom";
import ImageMap from "./ImageMap";
import PartnersDescription from "./PartnersDescription";

const Partners = ({ page }: { page: { [key: string]: any } }) => {
  const institutRef = useRef<HTMLDivElement[]>([]);

  const handleClick = (institutIndex: number, index: number) => {
    const role = institutRef.current[institutIndex].querySelectorAll(".role");
    role.forEach((r) => {
      r.classList.remove('active')
    })
    role[index].classList.add('active')
    const partners =
      institutRef.current[institutIndex].querySelectorAll(".partner");
    console.log(partners);
    partners.forEach((partner) => {
      partner.classList.remove("active");
    });
    partners[index].classList.add("active");
  };

  const handleShow = (
    event: React.FormEvent,
    className: string,
    institutIndex: number
  ) => {
    const target = event.target as HTMLElement;
    target.classList.toggle("active");
    if (className === "research") {
      const involvement =
        institutRef.current[institutIndex].querySelector(".involvement");
      involvement?.classList.remove("active");
    }
    if (className === "involvement") {
      const research =
        institutRef.current[institutIndex].querySelector(".research");
      research?.classList.remove("active");
    }
    const popup = institutRef.current[institutIndex].querySelector(".popup");
    const element = institutRef.current[institutIndex].querySelector(
      `.${className}`
    );
    if (popup && !popup.classList.contains(className)) {
      popup.classList.remove("active");
    }
    if (element) {
      element.classList.toggle("active");
    }
  };

  useEffect(() => {
    const pop = document.querySelectorAll(".popup");
    pop.forEach((p) => {
      p.classList.remove("active");
    });
    const partners = institutRef.current.reduce<Element[]>((acc, institut) => {
      const partnerNodes = institut.querySelectorAll(".partner");
      return [...acc, ...Array.from(partnerNodes)];
    }, []);
    partners.forEach((partner) => {
      partner.classList.remove("active");
    });

    institutRef.current.forEach((institut) => {
      const partn = institut.querySelectorAll(".partner");
      partn[0].classList.add("active");
    });
  }, []);

  return (
    <>
      <ScrollRestoration />
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
          <ImageMap />
        </section>
        <section className="instituts">
          <div className="container">
            {page.acf.institut.map(
              (institut: { [key: string]: any }, institutIndex: number) => (
                <div
                  className="institut-container"
                  key={`institut-${institutIndex}`}
                  ref={(el) => {
                    if (el !== null) {
                      institutRef.current[institutIndex] = el;
                    }
                  }}
                >
                  <div className="institut-description">
                    <img src={institut.image.url} alt={institut.image.alt} />
                    <div className="description-institut">
                      <h3>{institut.name}</h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: institut.description,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="partners">
                    <div className="role-list--container">
                      {institut.leader.map(
                        (
                          partner: { [key: string]: any },
                          roleIndex: number
                        ) => (
                          <button
                            className={ roleIndex === 0 ? "role active" : "role" }
                            key={partner.name}
                            onClick={() =>
                              handleClick(institutIndex, roleIndex)
                            }
                          >
                            {partner.post}
                          </button>
                        )
                      )}
                    </div>
                    {institut.leader.map(
                      (partner: { [key: string]: any }, i: number) => (
                        <div className="partner" key={`partner-${i}`}>
                          <PartnersDescription partner={partner} />
                        </div>
                      )
                    )}
                  </div>
                  <div className="buttons">
                    <button
                      onClick={(e) => handleShow(e, "research", institutIndex)}
                    >
                      Research team <div className="arrow"></div>
                    </button>
                    <button
                      onClick={(e) =>
                        handleShow(e, "involvement", institutIndex)
                      }
                    >
                      Involvement by work package <div className="arrow"></div>
                    </button>
                  </div>
                  <div
                    className="research popup"
                    dangerouslySetInnerHTML={{
                      __html: institut.research_team_description,
                    }}
                  ></div>
                  <div
                    className="involvement popup"
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
    </>
  );
};

export default Partners;
