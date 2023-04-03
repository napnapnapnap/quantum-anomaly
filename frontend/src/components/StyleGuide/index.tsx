import React from 'react';

import LayoutBase from '../../layouts/Base';
import Inputs from './Inputs';
import './StyleGuide.scss';
import Typography from './Typography';

const StyleGuide = () => {
  return (
    <LayoutBase>
      <div className="styleguide">
        <Typography />
        <Inputs />
      </div>
    </LayoutBase>
  );
};

export default StyleGuide;
