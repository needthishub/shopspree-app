import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

export type ThemeContextValue = 'light' | 'dark';

export const ThemeContext = React.createContext<ThemeContextValue>('light');

interface ThemeContextProviderState {
    theme: ThemeContextValue;
    showThemeButton: boolean;
}

class ThemeContextProvider extends React.Component<{}, ThemeContextProviderState> {
    root: HTMLDivElement;
    el: HTMLDivElement;
    body: HTMLBodyElement;

    constructor(props: {}) {
        super(props);

        this.state = {
            theme: 'light',
            showThemeButton: false,
        }

        this.root = document.querySelector("#root") as HTMLDivElement;
        this.el = document.createElement('div');
        this.body = document.querySelector("body") as HTMLBodyElement;
    }

    componentDidMount() {
        this.root.appendChild(this.el);
        this.setState({
            showThemeButton: true,
        })
    }

    componentWillUnmount() {
        this.root.removeChild(this.el);
    }

    handleChangeTheme = () => {
        this.setState({
            theme: this.state.theme === 'light' ? 'dark' : 'light',
        })
    }

    render() {
        const {theme, showThemeButton} = this.state;
        const isLightTheme = theme === 'light';
        this.body.style.backgroundColor = isLightTheme ? 'white' : 'black';
        const iconClassName = isLightTheme ? 'fa-sun' : 'fa-moon';

        const themeButton = showThemeButton ? ReactDOM.createPortal(
            <i className={`fas ${iconClassName} theme-context-button ${theme}`} onClick={this.handleChangeTheme}/>,
            this.el
        ): null;

        return (
            <ThemeContext.Provider value={theme}>
                <div className={`app-container ${theme}`}>
                    {this.props.children}
                </div>
                {themeButton}
            </ThemeContext.Provider>
        )
    }
}

export default ThemeContextProvider;
