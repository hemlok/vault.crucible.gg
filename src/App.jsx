import React, { Component } from "react";
import styled from "react-emotion";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import FlatButton from "material-ui/FlatButton";
import { muiThemeDeclaration } from "./components/styleguide";
import {
  InventoryGrid,
  SnackbarContainer,
  LocationsRow,
  Landing,
  TopBar
} from "./components";
import Reducer from "./Reducer";

const muiTheme = getMuiTheme(muiThemeDeclaration);

const StyledTopBar = styled(TopBar)`
  position: fixed !important;
  top: 0 !important;
`;

const StyledSnackbarContainer = styled(SnackbarContainer)`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 300;
`;

const SignInButton = styled(FlatButton)`
  span {
    font-size: 16px !important;
  }
`;

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <Reducer
            manifestVersion={this.props.manifestVersion}
            firebaseService={this.props.firebaseService}
            apiKey={this.props.apiKey}
          >
            {({ store, actions }) => (
              <div>
                <StyledTopBar
                  searchForItem={actions.searchForItem}
                  authenticated={store.authenticated}
                  onReload={actions.onReload}
                  onLogout={actions.onLogout}
                  onAuthorize={actions.onAuthorize}
                  destinyAccounts={store.membership.destinyMemberships}
                  selectedAccount={store.destinyMembership}
                  handleAccountChange={actions.handleAccountChange}
                  query={store.query}
                  onFeedback={actions.onFeedback}
                  SignInButton={SignInButton}
                />

                {store.authenticated ? (
                  <div>
                    <LocationsRow
                      characters={store.characters}
                      vault={store.vault}
                    />
                    <InventoryGrid
                      moveItem={actions.moveItem}
                      getItemDetail={actions.getItemDetail}
                      vaultColumns={store.vaultColumns}
                      characters={store.charactersByID}
                      clientWidth={store.clientWidth}
                      clientXY={store.clientXY}
                      items={store.items}
                      statsDefinitions={store.statsDefinitions}
                      perksDefinitions={store.perksDefinitions}
                      startInventoryPolling={actions.startInventoryPolling}
                      stopInventoryPolling={actions.stopInventoryPolling}
                      query={store.query}
                    />
                  </div>
                ) : (
                  <Landing
                    onAuthorize={actions.onAuthorize}
                    SignInButton={SignInButton}
                  />
                )}
                <StyledSnackbarContainer messages={store.notifications} />
              </div>
            )}
          </Reducer>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
