import ky from "ky";
import headerImage from "/src/assets/header-image.svg";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setMenu } from "../feature/menu.slice";

type Response = { [key: string]: any };

const FrontHeader = () => {
  const dispatch = useDispatch();
  const data: { menu: Response[] } = useSelector(
    (state: { [key: string]: any }) => state.menu
  );
  const [isLoading, setIsLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const menuItems = useRef<HTMLUListElement | null>(null);

  const isExternal = (url: string) => {
    const regepx = /^(https?:\/\/)|^(www\.)/i;
    return regepx.test(url);
  };

  const NavigationItem = (lien: { [key: string]: string }) => {
    if (lien.slug === "regerna.eu") {
      return <Link to={`/`}>{lien.title}</Link>;
    } else if (isExternal(lien.slug)) {
      return (
        <a href={lien.url} target="_blank" rel="noopener noreferrer">
          {lien.title}
        </a>
      );
    } else {
      return <Link to={`/${lien.slug}`}>{lien.title}</Link>;
    }
  };

  const getMenu = new Promise(async (resolve, reject) => {
    try {
      const response: Response[] = await ky(
        "better-rest-endpoints/v1/menus/menu-1",
        {
          prefixUrl: "https://regerna.eu/wp-json/",
        }
      ).json();
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  const handleMenu = () => {
    if (screenWidth <= 1000) {
      menuItems?.current?.classList.toggle("active");
    }
  };

  useEffect(() => {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      getMenu
        .then((response) => dispatch(setMenu(response)))
        .then(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <header className="front-header">
      {!isLoading ? (
        <>
          <section className="top">
            <div className="logo-container">
              <img
                src="/regerna-logo-fat.svg"
                alt="Regerna, Leveraging the heart's natural regeneration mechanisms for treating heart failure"
              />
            </div>
            <div className="slogan-container">
              <h1>
                Leveraging the heart's natural regeneration mechanisms for
                treating heart failure
              </h1>
              <img src="/contact-decoration.svg" alt="" />
            </div>
          </section>
          <section className="menu">
            <div className="white"></div>
            <nav className="orange">
              <ul ref={menuItems}>
                {data.menu.map((item, index) => (
                  <li key={index} className="menu-items">
                    {NavigationItem(item)}
                  </li>
                ))}
              </ul>
              <div className="burger-items" onClick={handleMenu}>
                <img src={headerImage} alt="Regerna" className="header-image" />
              </div>
            </nav>
          </section>
        </>
      ) : (
        <>
          <section className="top">
            <div className="logo-container">
              <img
                src="/regerna-logo-fat.svg"
                alt="Regerna, Leveraging the heart's natural regeneration mechanisms for treating heart failure"
              />
            </div>
            <div className="slogan-container">
              <h1>
                Leveraging the heart's natural regeneration mechanisms for
                treating heart failure
              </h1>
              <img src="/contact-decoration.svg" alt="" />
            </div>
          </section>
          <section className="menu">
            <div className="white"></div>
            <nav className="orange">
              <ul ref={menuItems}>
                {Array.from({ length: 7 }).map((item, index) => (
                  <li key={index} className="menu-items">
                    <a href="#">Loading...</a>
                  </li>
                ))}
              </ul>
              <div className="burger-items" onClick={handleMenu}>
                <img src={headerImage} alt="Regerna" className="header-image" />
              </div>
            </nav>
          </section>
        </>
      )}
    </header>
  );
};

export default FrontHeader;
