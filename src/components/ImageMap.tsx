import { useDispatch, useSelector } from "react-redux";
import SvgMap from "./SvgMap";
import { setPartners } from "../feature/partners.slice";
import { useEffect } from "react";

const ImageMap = () => {
  const dispatch = useDispatch();
  const currentPartner = useSelector(
    (state: { [key: string]: any }) => state.partners
  );

  const handleClick = (country: string) => {
    dispatch(setPartners(country));
  };

  const handleClassName = (country: string) => {
    if (
      currentPartner.partners === country ||
      currentPartner.partners === "all"
    ) {
      return "active";
    } else {
      return "";
    }
  };

  return (
    <>
      <div className="map">
        <div className="map__container">
          <SvgMap />
          <img
            src="https://admin.regerna.eu/wp-content/uploads/2023/06/map-rework.svg.svg"
            alt="Map of Europe"
            className="map__image"
          />
        </div>
      </div>
      <div className="partners-map">
        <ul className="button-list">
          <li>
            <button
              className={currentPartner.partners === "all" ? "active" : ""}
              onClick={() => handleClick("all")}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={currentPartner.partners === "france" ? "active" : ""}
              onClick={() => handleClick("france")}
            >
              France
            </button>
          </li>
          <li>
            <button
              className={
                currentPartner.partners === "netherland" ? "active" : ""
              }
              onClick={() => handleClick("netherland")}
            >
              Netherland
            </button>
          </li>
          <li>
            <button
              className={currentPartner.partners === "poland" ? "active" : ""}
              onClick={() => handleClick("poland")}
            >
              Poland
            </button>
          </li>
          <li>
            <button
              className={currentPartner.partners === "belgium" ? "active" : ""}
              onClick={() => handleClick("belgium")}
            >
              Belgium
            </button>
          </li>
          <li>
            <button
              className={
                currentPartner.partners === "switzerland" ? "active" : ""
              }
              onClick={() => handleClick("switzerland")}
            >
              Switzerland
            </button>
          </li>
        </ul>
        <ul className="patners-map__image">
          <li className={handleClassName("france")}>
            <a href="#institut-0">
              <img src="/inserm.png" alt="Inserm" />
            </a>
          </li>
          <li className={handleClassName("netherland")}>
            <a href="#institut-1">
              <img src="/lumc.png" alt="Leids Universitair Medisch Centrum" />
            </a>
          </li>
          <li className={handleClassName("belgium")}>
            <a href="#institut-3">
              <img src="/ku-leuven.png" alt="Ku Leuven" />
            </a>
          </li>
          <li className={handleClassName("france")}>
            <a href="#institut-4">
              <img src="/it.png" alt="Inserm Transfert" />
            </a>
          </li>
          <li className={handleClassName("switzerland")}>
            <a href="#institut-5">
              <img src="/uzh.png" alt="Universitas Turicensis" />
            </a>
          </li>
          <li className={handleClassName("poland")}>
            <a href="#institut-2">
              <img src="/lipid-system.png" alt="Liposome technologies" />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ImageMap;
