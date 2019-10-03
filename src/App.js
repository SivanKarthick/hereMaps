import React, { Component } from 'react';
import './App.css';
import Map from './Map.js';
//import ThemeSelector from './ThemeSelector.js';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            theme: 'normal.day.grey'
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(evt) {
        evt.preventDefault();

        var change = evt.target.id;
        console.log('selected ' + change);
        this.setState({
            "theme": change,
        });
    }

    render() {
        return (
            <div className="App">
                <Map app_id="9XjO6zyM4DJH2Ajfuihk" app_code="G1U2_iHxVGtkYF47FkNqlg" lat="20.5937" lng="78.9629" zoom="5" theme={ this.state.theme }
                />
                {/* <ThemeSelector changeTheme={ this.onChange } /> */}
            </div>
        );
    }
}

export default App;