import { useDispatch, useSelector } from "react-redux";
import SvgMap from "./SvgMap";
import { setPartners } from "../feature/partners.slice";
import { useEffect } from "react";

const ImageMap = () => {
    const dispatch = useDispatch()
    const currentPartner = useSelector((state: { [key: string]: any}) => state.partners)

    const handleClick = (country: string) => {
        dispatch( setPartners(country) )
    }

    const handleClassName = ( country: string ) => {
        if ( currentPartner.partners === country || currentPartner.partners === 'all' ) {
            return 'active'
        } else {
            return ''
        }
    }

  return (
    <>
      <div className="map">
        <div className="map__container">
          <SvgMap />
          <img
            src="https://regerna.eu/wp-content/uploads/2022/11/map-rework.svg"
            alt="Map of Europe"
            className="map__image"
          />
        </div>
      </div>
      <div className="partners-map">
        <ul className="button-list">
            <li>
                <button className={ currentPartner.partners === 'all' ? 'active' : '' } onClick={ () => handleClick("all") } >All</button>
            </li>
            <li>
                <button className={ currentPartner.partners === 'france' ? 'active' : '' } onClick={ () => handleClick("france") }>France</button>
            </li>
            <li>
                <button className={ currentPartner.partners === 'netherland' ? 'active' : '' } onClick={ () => handleClick("netherland") }>Netherland</button>
            </li>
            <li>
                <button className={ currentPartner.partners === 'poland' ? 'active' : '' } onClick={ () => handleClick("poland") }>Poland</button>
            </li>
            <li>
                <button className={ currentPartner.partners === 'belgium' ? 'active' : '' } onClick={ () => handleClick("belgium") }>Belgium</button>
            </li>
            <li>
                <button className={ currentPartner.partners === 'switzerland' ? 'active' : '' } onClick={ () => handleClick("switzerland") }>Switzerland</button>
            </li>
        </ul>
        <ul className="patners-map__image">
            <li className={ handleClassName('france') } >
                <img src="/inserm.png" alt="Inserm" />
            </li>
            <li className={ handleClassName('netherland') }>
                <img src="/lumc.png" alt="Leids Universitair Medisch Centrum" />
            </li>
            <li className={ handleClassName('belgium') }>
                <img src="/ku-leuven.png" alt="Ku Leuven" />
            </li>
            <li className={ handleClassName('france') }>
                <img src="/it.png" alt="Inserm Transfert" />
            </li>
            <li className={ handleClassName('switzerland') }>
                <img src="/uzh.png" alt="Universitas Turicensis" />
            </li>
            <li className={ handleClassName('poland') }>
                <img src="/lipid-system.png" alt="Liposome technologies" />
            </li>
        </ul>
      </div>
    </>
  );
};

export default ImageMap;
