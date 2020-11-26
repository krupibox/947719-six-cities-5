import {useState} from 'react';

export const withActiveCoords = (Component) => (props) => {

  const [activeCoords, setActiveCoords] = useState(null);
  const [sortingType, setType] = useState(`Popular`);

  return (
    <Component
      {...props}
      activeCoords={activeCoords}
      sortingType={sortingType}
      onCardHover={(coords) => setActiveCoords(coords)}
      onTypeClick={(type) => setType(type)}
    />
  );
};

export default withActiveCoords;

