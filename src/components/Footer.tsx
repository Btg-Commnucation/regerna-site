import ky from "ky";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setFooter } from "../feature/footer.slice";

const Footer = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: { [key: string]: any }) => state.footer);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getFooter = new Promise(async (resolve, reject) => {
    try {
      const response = await ky("better-rest-endpoints/v1/options/acf", {
        prefixUrl: "https://admin.regerna.eu/wp-json",
      }).json();
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  const handleFooterMenu = (url: string) => {
    return url.replace("https://admin.regerna.eu", "");
  }

  useEffect(() => {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      getFooter
        .then((response) => dispatch(setFooter(response)))
        .then(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <footer>
      {!isLoading && (
        <>
          <div className="container">
            <section className="orange">
              <div className="left">
                <img src={data.footer.image.url} alt={data.footer.image.alt} />
                <p>{data.footer.short_text}</p>
                <div className="links">
                  { data.footer.link_pages.map( ( { link }: { [key: string]: any }, index: number ) => (
                    <Link to={handleFooterMenu(link.url)} key={`link-${index}`}>{link.title}</Link>
                  ) ) }
                </div>
              </div>
              <div className="right">
                <h3>{data.footer.title_right_part}</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.footer.content_right_part,
                  }}
                ></div>
              </div>
            </section>
          </div>
          <section className="white">
            <div
              className="credit"
              dangerouslySetInnerHTML={{ __html: data.footer.credit }}
            ></div>
          </section>
        </>
      )}
    </footer>
  );
};

export default Footer;
