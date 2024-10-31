import React from 'react';

const articles = [{
  text: 'hello'
}, {
  text: 'wolrd'
}];

export const Articles: React.FC<{ username: string; }> = function({ username }) {

  const listItems = articles.map((t) =>
    <li>{t.text}</li>
  );

  return (
    <React.Fragment>

      <div>
        <h4>{username}</h4>
        <ul>
          {
            listItems
          }

        </ul>

      </div>

    </React.Fragment>
  );

};
