import {useState} from 'react';

export const withActiveId = (Component) => (props) => {

  const [activeId, setActiveId] = useState(null);
  const [sortingType, setType] = useState(`Popular`);

  return (
    <Component
      {...props}
      activeOfferId={activeId}
      sortingType={sortingType}
      onCardHover={(offerId) => setActiveId(offerId)}
      onTypeClick={(type) => setType(type)}
    />
  );
};

export default withActiveId;

