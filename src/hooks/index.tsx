import React from 'react';

import {GeneralProvider} from './general';

const AppProvider: React.FC = ({children}) => (
  <GeneralProvider>{children}</GeneralProvider>
);

export default AppProvider;
