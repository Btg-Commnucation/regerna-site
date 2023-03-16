import ky from "ky";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Contact from "./Contact";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";

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
            prefixUrl: "https://regerna.test/wp-json/",
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
  }, []);

  return (
    <>
      <Header />
      {!isLoading && (
        <>
          {data!.template === "template-home" && <Home page={data!} />}
          {data!.template === "template-contact" && <Contact page={data!} />}
        </>
      )}
      <Footer />
    </>
  );
};

export default Page;
