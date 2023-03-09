import React, { useEffect, useState } from "react";
import logo from "/src/assets/regerna-logo.svg";
import ky from "ky";
import { Link } from "react-router-dom";

const Header = () => {
  const [data, setData] = useState<{ [key: string]: any }[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getMenu = new Promise(async (resolve, reject) => {
    try {
      const response: { [key: string]: any }[] = await ky(
        "better-rest-endpoints/v1/menus/menu-1",
        {
          prefixUrl: "https://regerna.test/wp-json/",
        }
      ).json();
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  useEffect(() => {
    getMenu
      .then((response) => setData(response))
      .then(() => setIsLoading(false));
  }, []);

  return (
    <header className="header">
      {!isLoading && (
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
            <ul>
              {data!.map((item, index) => (
                <li key={index}>
                  <Link to={`${item.slug}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
