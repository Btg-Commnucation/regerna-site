import { ScrollRestoration } from "react-router-dom";
import Banner from "./Banner";

const Contact = ({ page }: { page: { [key: string]: any } }) => {
  return (
    <>
      <ScrollRestoration />
      <section className="contact">
        <Banner image={page!.acf.background_image} title={page!.title} />
        <article>
          <div className="container">
            {page!.acf.contact.map(
              (
                contact: {
                  [key: string]: any;
                },
                index: number
              ) => (
                <div className="contact-item" key={index}>
                  <img
                    src={contact.profil_picture.url}
                    alt={contact.profil_picture.alt}
                  />
                  <div className="content">
                    <h3>{contact.title_name}</h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: contact.job_introduction,
                      }}
                    ></p>
                    <p
                      className="all-detail"
                      dangerouslySetInnerHTML={{
                        __html: contact.more_precise_information,
                      }}
                    ></p>
                  </div>
                </div>
              )
            )}
          </div>
        </article>
      </section>
    </>
  );
};

export default Contact;
