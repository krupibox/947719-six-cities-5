import {useState, useEffect} from 'react';

const withSortToggle = (Component) => (props) => {

  let {onTypeClick} = props;
  const [isMenu, setMenu] = useState(false);
  const [sortingType, setType] = useState(`Popular`);
  const handleToggleMenuClick = () => setMenu(!isMenu);

  useEffect(() => {
    onTypeClick = (value) => setType(value);
  }, [sortingType]);

  return (
    <Component
      {...props}
      isMenu={isMenu}
      onTypeClick={onTypeClick}
      onToggleMenuClick={handleToggleMenuClick}
    />
  );
};

export default withSortToggle;
