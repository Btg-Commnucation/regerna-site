const Banner = ({
  image,
  title,
}: {
  image: { [key: string]: string };
  title: string;
}) => {
  return (
    <section
      style={{ background: `url(${image.url}) no-repeat center center` }}
      className="hero-banner"
    >
      <div className="linear-gradient"></div>
      <div className="container">
        <h1>{title}</h1>
        <img src="/decoration.svg" alt={title} className="decoration" />
      </div>
    </section>
  );
};

export default Banner;
