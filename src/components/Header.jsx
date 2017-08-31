import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import styled from 'emotion/react';
import {Row, Text, palette, animations} from './styleguide';

const StickyHeader = styled(Row)`
  composes: ${animations.fadeIn};
  top: 139px;
  margin-left: -40px;
  z-index: 200;
  position: -webkit-sticky;
  position: sticky;
  user-select: none;
`;

const HeaderRow = styled(Row)`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${palette.stroke};
  background-color: ${palette.background};
`;

export default({minimized, onMinimize, title}) => {
  function renderIcon(minimized) {
    return !minimized
      ? <FontIcon className="material-icons" color={palette.stroke}>indeterminate_check_box</FontIcon>
      : <FontIcon className="material-icons" color={palette.stroke}>add_box</FontIcon>;
  }

  return (
    <StickyHeader justify='start'>
      <IconButton onTouchTap={onMinimize}>
        {renderIcon(minimized)}
      </IconButton>
      <HeaderRow grow justify='space-between'>
        <Text uppercase>
          {title}
        </Text>
      </HeaderRow>
    </StickyHeader>
  );
}
