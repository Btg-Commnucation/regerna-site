import ky from "ky";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import FrontHeader from "./components/FrontHeader";
import NumberComponant from "./components/Number";
import { setArticles } from "./feature/article.slice";
import { setfront } from "./feature/front.slice";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector((state: { [key: string]: any }) => state.front);
  const articles = useSelector(
    (state: { [key: string]: any }) => state.articles
  );
  const [articleIsLoading, setArticleIsLoading] = useState(true);

  const getHome = new Promise(async (resolve, reject) => {
    try {
      const response: { [key: string]: any } = await ky(
        "better-rest-endpoints/v1/page/home",
        {
          prefixUrl: "https://regerna.eu/wp-json/",
        }
      ).json();
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  const setDate = (date: string): string => {
    const newDate = moment(date).format("DD/MM/YYYY");
    return newDate;
  };

  const getArticles = new Promise(async (resolve, reject) => {
    try {
      const response: { [key: string]: any }[] = await ky(
        "better-rest-endpoints/v1/posts",
        {
          prefixUrl: "https://regerna.eu/wp-json/",
        }
      ).json();
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  useEffect(() => {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      getHome
        .then((response) => dispatch(setfront(response)))
        .then(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }

    if (Object.keys(data).length === 0 && data.constructor === Object) {
      getArticles
        .then((response: { [key: string]: any }[] | any) => {
          return dispatch(setArticles(response));
        })
        .then(() => setArticleIsLoading(false));
    } else {
      setArticleIsLoading(false);
    }
  }, []);

  return (
    <div className="front-page">
      <FrontHeader />
      {isLoading ? (
        <>
          <section className="in-numbers">
            <div className="container">
              <h2>In numbers</h2>
              <ul className="numbers">
                {Array.from({ length: 5 }).map((_, index: number) => (
                  <>
                    <li key={`number-${index}`}>
                      <strong>...</strong>
                      <p>Loading</p>
                    </li>
                    <li className="separator"></li>
                  </>
                ))}
              </ul>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="in-numbers">
            <div className="container">
              <h2>In numbers</h2>
              <ul className="numbers">
                {data.front.acf.in_numbers.map(
                  (number: { [key: string]: string }, index: number) => (
                    <NumberComponant
                      number={number}
                      index={index}
                      key={`number-${index}`}
                    />
                  )
                )}
              </ul>
            </div>
          </section>
          <section className="introduction">
            <div className="background"></div>
            <div className="container">
              <h2>{data.front.acf.introduction_title}</h2>
              <div className="content-container">
                <img
                  src={data.front.acf.introduction_image.url}
                  alt={data.front.acf.introduction_image.alt}
                />
                <div
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html: data.front.acf.introduction_content,
                  }}
                ></div>
              </div>
            </div>
          </section>
          <section className="objectives">
            <div className="container">
              <h2>Objectives</h2>
              <ul className="objectives-list">
                {data.front.acf.objectives.map(
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
                {data.front.acf.partners_logo.map(
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
              <Link to="/project-partners" className="button">
                All partners
              </Link>
            </div>
          </section>
          <article className="last-news">
            <div className="container">
              <h2>Last news</h2>
              {articleIsLoading ? (
                <h3>Loading ...</h3>
              ) : (
                <ul className="news-list">
                  {articles.articles
                    .slice(0, 2)
                    .map((article: { [key: string]: any }, index: number) => (
                      <li>
                        <h3>{article.title}</h3>
                        <p className="date">{setDate(article.date)}</p>
                        <div
                          className="content"
                          dangerouslySetInnerHTML={{ __html: article.excerpt }}
                        ></div>
                        <Link to={`/news/${article.slug}`}>Read more</Link>
                      </li>
                    ))}
                </ul>
              )}
              <Link to="/news" className="button">
                All news
              </Link>
            </div>
          </article>
        </>
      )}
      <Footer />
    </div>
  );
};

export default App;
