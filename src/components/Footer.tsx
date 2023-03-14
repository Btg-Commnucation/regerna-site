import { useDispatch, useSelector } from "react-redux";
import { setFooter} from "../feature/footer.slice";

const Footer = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.footer));

  return (
    <footer>
      <div className="container">
        <section className="orange"></section>
        <section className="white"></section>
      </div>
    </footer>
  );
};

export default Footer;
