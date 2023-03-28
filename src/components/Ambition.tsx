import { ScrollRestoration } from "react-router-dom";

const Ambition = ({ page }: { page: { [key: string]: any } }) => {
  return (
    <>
      <ScrollRestoration />
      <article className="ambition">
        <div className="container">
          <section className="hero-banner">
            <div className="hero-banner__content">
              <img
                src={page.acf.main_image.url}
                alt={page.acf.main_image.alt}
              />
              <div className="title">
                <h1>{page.title}</h1>
                <img src="/contact-decoration.svg" alt="decoration" />
              </div>
            </div>
            <div className="description">
              <p>{page.acf.text_under_title}</p>
            </div>
          </section>
          <section
            className="wordpress-content"
            dangerouslySetInnerHTML={{ __html: page.content }}
          ></section>
          <section className="expected-title">
            <h3>{page.acf.expected_title}</h3>
            {page.acf.bordered_content.map(
              (content: { [key: string]: string }, index: number) => (
                <div
                  className="bordered-content"
                  key={index}
                  style={{ border: `1px solid ${content.border_color}` }}
                >
                  <h4>
                    {content.normal_title}{" "}
                    <span>{content.with_effect_title}</span>
                  </h4>
                  <div
                    dangerouslySetInnerHTML={{ __html: content.content }}
                  ></div>
                </div>
              )
            )}
          </section>
        </div>
        <section
          className="red-bg"
          style={{
            background: `url(${page.acf.background_image.url}) no-repeat left center`,
          }}
        >
          <div className="background-absolute"></div>
          <div
            className="container"
            dangerouslySetInnerHTML={{ __html: page.acf.background_text }}
          ></div>
        </section>
        <section className="impacts">
          <div className="container">
            <h3>{page.acf.impacts_title}</h3>
            <p>{page.acf.sub_title}</p>
            <div className="card-container">
              {page.acf.impatcs.map(
                (impact: { [key: string]: any }, index: number) => (
                  <div className="card" key={index}>
                    <img src={impact.image.url} alt={impact.image.alt} />
                    <h4>{impact.title}</h4>
                    <p>{impact.text_content}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
        <section
          className="blue-background"
          style={{
            background: `url(${page.acf.background_blue_image.url}) no-repeat left center`,
          }}
        >
          <div className="background-absolute"></div>
          <div className="container">
            <h4>{page.acf.title_blue_background}</h4>
            <p
              className="content"
              dangerouslySetInnerHTML={{
                __html: page.acf.text_blue_background,
              }}
            ></p>
          </div>
        </section>
      </article>
    </>
  );
};

export default Ambition;
