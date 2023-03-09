import React from "react";
import { useParams } from "react-router-dom";

const Article = () => {
  const { slug } = useParams();

  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
};

export default Article;
