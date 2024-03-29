import { useEffect, useRef, useState } from "react";
import logo from "/src/assets/regerna-logo.svg";
import headerImage from "/src/assets/header-image.svg";
import ky from "ky";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMenu } from "../feature/menu.slice";

type Response = { [key: string]: any };

const Header = () => {
  const dispatch = useDispatch();
  const data: { menu: Response[] } = useSelector(
    (state: { [key: string]: any }) => state.menu
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const menuItems = useRef<HTMLUListElement | null>(null);

  const isExternal = (url: string) => {
    const regex = /^(https?:\/\/)|^(www\.)/i;
    return regex.test(url);
  };

  const NavigationItem = (lien: { [key: string]: string }) => {
    if (lien.slug === "admin.regerna.eu") {
      return <Link to={`/`}>{lien.title}</Link>;
    } else if (lien.title === "Extranet") {
      return (
        <a href={lien.url} target="_blank" rel="noopener noreferrer" onClick={ () => handleMenu() }>
          {lien.title}
        </a>
      );
    } else {
      return <Link to={`/${lien.slug}`} onClick={() => handleMenu()}>{lien.title}</Link>;
    }
  };

  const getMenu = new Promise(async (resolve, reject) => {
    try {
      const response: Response[] = await ky(
        "better-rest-endpoints/v1/menus/menu-1",
        {
          prefixUrl: "https://admin.regerna.eu/wp-json",
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
    <header className="header">
      {!isLoading ? (
        <>
          <div className="white">
            <h1>
              <Link to="/">
                <img
                  src={logo}
                  alt="Logo marqué Regerna en bleu foncé avec le second e souligné en rouge"
                />
              </Link>
            </h1>
          </div>
          <nav className="orange">
            <ul ref={menuItems}>
              {data.menu.map((item, index) => (
                <li key={index} className="menu-items">
                  {NavigationItem(item)}
                </li>
              ))}
            </ul>
            <div className="burger-items" onClick={handleMenu}>
              {screenWidth <= 1000 ? (
                <img
                  src="/menu.svg"
                  alt="Menu Responsive"
                  className="menu-responsive"
                />
              ) : (
                <img src={headerImage} alt="Regerna" className="header-image" />
              )}
            </div>
          </nav>
        </>
      ) : (
        <>
          <div className="white">
            <h1>
              <img
                src={logo}
                alt="Logo marqué Regerna en bleu foncé avec le second e souligné en rouge"
              />
            </h1>
          </div>
          <nav className="orange">
            <ul ref={menuItems}>
              {Array.from({ length: 7 }).map((item, index) => (
                <li key={index} className="menu-items">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Loading...
                  </a>
                </li>
              ))}
            </ul>
            <div className="burger-items" onClick={handleMenu}>
              {screenWidth <= 1000 ? (
                <img
                  src="/menu.svg"
                  alt="Menu Responsive"
                  className="menu-responsive"
                />
              ) : (
                <img src={headerImage} alt="Regerna" className="header-image" />
              )}
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
