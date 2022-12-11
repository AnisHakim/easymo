import React from 'react';
import IcoMoon from 'react-icomoon';
const iconSet = require('../../assets/icons/icomoon/selection.json');
const AtomIcon = ({ ...props }) => {
  return <IcoMoon iconSet={iconSet} {...props} />;
};
export default AtomIcon;
