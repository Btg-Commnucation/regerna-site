import ky from "ky";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./Banner";
import { setArticles } from "../feature/article.slice";
import { Link } from "react-router-dom";
import moment from "moment";

const Home = ({ page }: { page: { [key: string]: any } }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.articles);
  const [categories, setCategories] = useState<string[]>([]);

  const getArticles = new Promise(async (resolve, reject) => {
    try {
      const response: { [key: string]: any }[] = await ky(
        "better-rest-endpoints/v1/posts",
        {
          prefixUrl: "https://regerna.test/wp-json/",
        }
      ).json();
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  const getCategories = (articles: { [key: string]: any }[]) => {
    articles.map((article: { [key: string]: any }) => {
      article.category_names.map((category: string) => {
        setCategories((categories) => [...categories, category]);
      });
    });
  };

  const setDate = (date: string): string => {
    const newDate = moment(date).format("DD/MM/YYYY");
    return newDate;
  };

  useEffect(() => {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      getArticles
        .then((response: { [key: string]: any }[] | any) =>
          dispatch(setArticles(response))
        )
        .then(() => data.articles && getCategories(data.articles))
        .then(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <article className="template-home">
      <Banner image={page!.acf.banner_background} title={page!.title} />
      {!isLoading && (
        <section className="container">
          <div className="categories">
            <ul>
              <li>All</li>
            </ul>
          </div>
          {data.articles.map((article: { [key: string]: any }) => (
            <div key={article.id} className="article">
              <h2>{article.title}</h2>
              <p className="date">{setDate(article.date)}</p>
              <div
                dangerouslySetInnerHTML={{ __html: article.excerpt }}
                className="excerpt"
              ></div>
              <Link to={`/news/${article.slug}`} className="article-link">
                Read more
              </Link>
            </div>
          ))}
        </section>
      )}
    </article>
  );
};

export default Home;
