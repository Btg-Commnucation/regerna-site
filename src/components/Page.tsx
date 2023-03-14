import { useParams } from "react-router-dom";

const Page = () => {
  const { slug } = useParams();

  return <div>{slug}</div>;
};

export default Page;
