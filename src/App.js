import React from 'react';
import './App.scss';
import {
  EuiPage, EuiPageBody, EuiFlexGroup, EuiFlexItem
} from "@elastic/eui"
import User from './components/User';

import '@elastic/eui/dist/eui_theme_light.css';

function App() {
  return (
    <EuiPage className="App">
      <EuiPageBody component="div">
      <EuiFlexGroup justifyContent={"spaceAround"}>
          <EuiFlexItem style={{maxWidth: '700px'}}>
            <User />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageBody>
    </EuiPage>
  );
}

export default App;
