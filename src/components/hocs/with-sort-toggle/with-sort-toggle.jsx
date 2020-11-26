import {useState} from 'react';

const withSortToggle = (Component) => (props) => {

  const [isMenu, setMenu] = useState(false);

  return (
    <Component
      {...props}
      isMenu={isMenu}
      onToggleMenuClick={() => setMenu(!isMenu)}
    />
  );
};

export default withSortToggle;
