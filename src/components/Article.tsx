import ky from "ky";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setArticles } from "../feature/article.slice";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Banner from "./Banner";

const Article = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state: { [key: string]: any }) => state.articles);
  const [currentArticle, setCurrentArticle] = useState<{
    [key: string]: any;
  }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadComplete, setLoadComplete] = useState<boolean>(false);

  const getArticles = new Promise(async (resolve, reject) => {
    try {
      const response = await ky("better-rest-endpoints/v1/posts", {
        prefixUrl: "https://regerna.eu/wp-json/",
      }).json();
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  const getCurrentArticle = async () => {
    setCurrentArticle(
      await data.articles.find(
        (article: { [key: string]: any }) => article.slug === slug
      )
    );
    setLoadComplete(true);
  };

  useEffect(() => {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      getArticles
        .then((response) => dispatch(setArticles(response)))
        .then(() => setIsLoading(false));
    } else if (Object.keys(data).length > 0 && data.constructor === Object) {
      getCurrentArticle();
    } else {
      getCurrentArticle();
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <>
      <Header />
      {loadComplete ? (
        <article className="blog-articles">
          <Banner
            image={currentArticle!.acf.banner_background}
            title={currentArticle!.title}
          />
          <div
            className="container"
            dangerouslySetInnerHTML={{ __html: currentArticle!.content }}
          ></div>
        </article>
      ) : (
        <article className="blog-articles">
          <Banner
            image={{ url: "/public/banner-img-scaled.jpg", alt: "Loading ..." }}
            title="Loading ..."
          />
          <div className="container">Loading ...</div>
        </article>
      )}
      <Footer />
    </>
  );
};

export default Article;
