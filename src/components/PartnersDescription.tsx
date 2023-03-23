const PartnersDescription = ({
  partner,
}: {
  partner: { [key: string]: any };
}) => {
  return (
    <>
      <div className="picture-container">
        <img src={partner.picture.url} alt={partner.picture.alt} />
        <p>{partner.name}</p>
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: partner.text }}
      ></div>
    </>
  );
};

export default PartnersDescription;
