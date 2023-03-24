import ky from "ky";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import FrontHeader from "./components/FrontHeader";
import Header from "./components/Header";

const App = () => {
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const article = useSelector((state: { [key: string]: any }) => state.article);

  const getHome = async (): Promise<{ [key: string]: any }> => {
    const response: { [key: string]: any } = await ky(
      "better-rest-endpoints/v1/page/home",
      {
        prefixUrl: "https://regerna.test/wp-json/",
      }
    ).json();
    return response;
  };

  useEffect(() => {
    getHome()
      .then((response) => setData(response))
      .then(() => setIsLoading(false));
  }, []);

  return (
    <div className="front-page">
      <FrontHeader />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <section className="in-numbers">
            <div className="container">
              <h2>In numbers</h2>
              <ul className="numbers">
                {data.acf.in_numbers.map(
                  (number: { [key: string]: string }, index: number) => (
                    <>
                      <li key={`number-${index}`}>
                        <strong>
                          {number.currency.length > 0 && (
                            <span className="currency">{number.currency}</span>
                          )}
                          {number.number}
                          {number.unit.length > 0 && (
                            <span className="unit">{number.unit}</span>
                          )}
                        </strong>
                        <p>{number.objective}</p>
                      </li>
                      <li className="separator"></li>
                    </>
                  )
                )}
              </ul>
            </div>
          </section>
          <section className="introduction">
            <div className="background"></div>
            <div className="container">
              <h2>{data.acf.introduction_title}</h2>
              <div className="content-container">
                <img
                  src={data.acf.introduction_image.url}
                  alt={data.acf.introduction_image.alt}
                />
                <div
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html: data.acf.introduction_content,
                  }}
                ></div>
              </div>
            </div>
          </section>
          <section className="objectives">
            <div className="container">
              <h2>Objectives</h2>
              <ul className="objectives-list">
                {data.acf.objectives.map(
                  (objectif: { [key: string]: string }, index: number) => (
                    <li key={`objectif-${index}`}>
                      <h3>{index + 1}</h3>
                      <div
                        className="content"
                        dangerouslySetInnerHTML={{ __html: objectif.text }}
                      ></div>
                    </li>
                  )
                )}
              </ul>
            </div>
          </section>
          <section className="partners">
            <div className="container">
              <h2>Partners</h2>
              <ul className="partners-list">
                {data.acf.partners_logo.map(
                  (
                    partner: { image: { [key: string]: string } },
                    index: number
                  ) => (
                    <li key={`partner-${index}`}>
                      <img src={partner.image.url} alt={partner.image.alt} />
                    </li>
                  )
                )}
              </ul>
              <Link to="/partners" className="button">
                All partners
              </Link>
            </div>
          </section>
          <article className="last-news">
            <div className="container">
              <h2>Last news</h2>
            </div>
          </article>
        </>
      )}
      <Footer />
    </div>
  );
};

export default App;
