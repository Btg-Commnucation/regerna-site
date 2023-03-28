import { ScrollRestoration } from "react-router-dom";

const Default = ({ page }: { page: { [key: string]: any } }) => {
  return (
    <>
      <ScrollRestoration />
      <article className="page-default">
        <div className="container">
          <section className="hero-banner">
            <div className="hero-banner__content">
              <img
                src={page.acf.title_image.url}
                alt={page.acf.title_image.alt}
                className="hero-banner__image"
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
          <section className="column-part">
            <div className="left-part">
              <div className="first-element">
                <h2>{page.acf.first_element_title}</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: page.acf.first_element_slogan,
                  }}
                ></p>
                <img
                  src={page.acf.first_element_image.url}
                  alt={page.acf.first_element_image.alt}
                />
                <img
                  src="/arrow-bi.svg"
                  alt="Developmental biology to Genetic Engeneering"
                  className="firstArrow"
                />
                <img
                  src="/arrow-bi.svg"
                  alt="Developmental biology to GMP mRNA encapsulation"
                  className="secondArrow"
                />
              </div>
              <div className="second-element">
                <h2>{page.acf.second_element_title}</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: page.acf.second_element_slogan,
                  }}
                ></p>
                <img
                  src={page.acf.second_element_image.url}
                  alt={page.acf.second_element_image.alt}
                />
                <img
                  src="/arrow.svg"
                  alt="Genetic engineering to GMP mRNA encapsulation"
                  className="thirdArrow"
                />
              </div>
              <div className="third-element">
                <h2>{page.acf.third_element_title}</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: page.acf.third_element_slogan,
                  }}
                ></p>
                <img
                  src={page.acf.third_element_image.url}
                  alt={page.acf.third_element_image.alt}
                />
              </div>
              <div className="fourth-element">
                <h2>{page.acf.fourth_element_title}</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: page.acf.fourth_element_slogan,
                  }}
                ></p>
                <img
                  src="/arrow-bi.svg"
                  alt="Genetic engineering to animal studies"
                  className="fourthArrow"
                />
                <img
                  src="/arrow-bi.svg"
                  alt="GMP mRNA encapsulation to animal studies"
                  className="fifthArrow"
                />
              </div>
            </div>
            <div className="right-part">
              <h3>{page.acf.right_column_title}</h3>
              <p>{page.acf.right_column_text}</p>
              <img
                src={page.acf.right_column_image.url}
                alt={page.acf.right_column_image.alt}
              />
            </div>
          </section>
        </div>
        <section
          className="context"
          style={{
            background: `url(${page.acf.the_context_background_image.url}) no-repeat left center`,
          }}
        >
          <div className="background-absolute"></div>
          <div className="container">
            <h3>{page.acf.the_context_title}</h3>
            <div
              className="context-content"
              dangerouslySetInnerHTML={{ __html: page.acf.the_context_content }}
            ></div>
          </div>
        </section>
        <section className="objectives">
          <div className="container">
            <h2>{page.acf.objectives_title}</h2>
            <p>{page.acf.objectives_text}</p>
            <h3>{page.acf.objectives_sub_title}</h3>
            <ul className="objective-list">
              {page.acf.objectives.map(
                (objective: { [key: string]: string }, index: number) => (
                  <li key={index}>
                    <h4>{index + 1}</h4>
                    <div
                      className="objective-content"
                      dangerouslySetInnerHTML={{ __html: objective.content }}
                    ></div>
                  </li>
                )
              )}
            </ul>
          </div>
        </section>
        <section
          className="concept"
          style={{
            background: `url(${page.acf.concept_background_image.url}) no-repeat center center`,
          }}
        >
          <div className="background-absolute"></div>
          <div className="container">
            <h3>{page.acf.concept_title}</h3>
            <div
              className="concept-content"
              dangerouslySetInnerHTML={{ __html: page.acf.concept_text }}
            ></div>
          </div>
        </section>
        <section className="technical">
          <div
            className="container"
            dangerouslySetInnerHTML={{ __html: page.content }}
          ></div>
        </section>
        <section
          className="methodology"
          style={{
            background: `url(${page.acf.methodology_background_image.url}) no-repeat left center`,
          }}
        >
          <div className="background-absolute"></div>
          <div className="container">
            <h3>{page.acf.methodology_title}</h3>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: page.acf.methodology_text }}
            ></div>
          </div>
        </section>
        <section className="bottom">
          <div className="container">
            <div className="red-part">
              <h3>{page.acf.red_background_title}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: page.acf.red_background_text,
                }}
              ></div>
            </div>
            <div className="other-part">
              <h3>{page.acf.below_red_part_title}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: page.acf.below_red_part_content,
                }}
              ></div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default Default;
