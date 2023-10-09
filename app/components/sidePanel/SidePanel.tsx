import React from 'react';
import CardSmall from '../cardSmall/CardSmall';

const SidePanel = () => {
  return (
    <div>
      <div>
        <h2>Most popular</h2>
        <ul>
          {[1, 2, 3, 4, 5].map((item, index) => {
            return <CardSmall key={index} />;
          })}
        </ul>
      </div>
      <div>
        <h2>Categories</h2>
        <ul>
          <li>category 1</li>
          <li>category 2</li>
          <li>category 3</li>
          <li>category 4</li>
        </ul>
      </div>
    </div>
  );
};

export default SidePanel;
