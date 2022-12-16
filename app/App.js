import React, { Component } from 'react';
import { I18nManager } from 'react-native';
I18nManager.allowRTL(false);
import RootStack from './routs';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <RootStack navi={this.props} />
        )
    }
}
export default App;