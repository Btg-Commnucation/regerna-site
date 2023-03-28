import React from 'react';

const Legals = ( { page }: { page: { [key: string]: any } } ) => {
    return (
        <section className="legals">
            <div className="container">
                <h1>{page.title}</h1>
                <div className="content" dangerouslySetInnerHTML={{ __html: page.content }}></div>
            </div>
        </section>
    );
};

export default Legals;