import ky from "ky";
import { useEffect, useState } from "react";
import { ScrollRestoration, useParams } from "react-router-dom";
import Ambition from "./Ambition";
import Contact from "./Contact";
import Default from "./Default";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Partners from "./Partners";

const Page = () => {
  const { slug } = useParams();
  const [data, setData] = useState<{ [key: string]: any }>();
  const [isLoading, setIsLoading] = useState(true);

  const getPage = new Promise<{ [key: string]: any }[]>(
    async (resolve, reject) => {
      try {
        const response: { [key: string]: any }[] = await ky(
          `better-rest-endpoints/v1/pages`,
          {
            prefixUrl: "https://regerna.eu/wp-json/",
          }
        ).json();
        resolve(response);
      } catch (error) {
        reject(error);
      }
    }
  );

  useEffect(() => {
    getPage
      .then((response) => setData(response.find((page) => page.slug === slug)))
      .then(() => setIsLoading(false));
  }, [slug]);

  return (
    <>
      <ScrollRestoration />
      <Header />
      {!isLoading ? (
        <>
          {data!.template === "template-home" && <Home page={data!} />}
          {data!.template === "template-contact" && <Contact page={data!} />}
          {data!.template === "template-ambition" && <Ambition page={data!} />}
          {data!.template === "default" && <Default page={data!} />}
          {data!.template === "template-partners" && <Partners page={data!} />}
        </>
      ) : (
        <article className="ambition">
          <div className="container">
            <section className="hero-banner">
              <div className="hero-banner__content">
                <div className="title">
                  <h1>Loading ...</h1>
                  <img src="/contact-decoration.svg" alt="decoration" />
                </div>
              </div>
              <div className="description">
                <p>Loading ...</p>
              </div>
            </section>
            <section className="wordpress-content">Loading ...</section>
            <section className="expected-title">
              <h3>Loading ...</h3>
              {Array.from({ length: 7 }).map((_, index: number) => (
                <div
                  className="bordered-content"
                  key={index}
                  style={{ border: `1px solid #ffb098` }}
                >
                  <h4>
                    Loading <span>...</span>
                  </h4>
                  <div>Loading ...</div>
                </div>
              ))}
            </section>
          </div>
        </article>
      )}
      <Footer />
    </>
  );
};

export default Page;
