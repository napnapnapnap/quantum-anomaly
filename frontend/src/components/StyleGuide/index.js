import React from 'react';

import LayoutClient from '../../layouts/Client';
import Inputs from './Inputs';
import './StyleGuide.scss';
import Typography from './Typography';

const StyleGuide = () => {
  return (
    <LayoutClient>
      <div className="styleguide">
        <Typography />
        <Inputs />
      </div>
    </LayoutClient>
  );
};

export default StyleGuide;
