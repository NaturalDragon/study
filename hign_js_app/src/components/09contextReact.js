import React from 'react'
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};



/**
 * 
const ThemeContext = React.createContext(themes.dark);
ThemeContext.displayName = "MyDisplayName"

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      theme: themes.light,
    }

  }
  toggleTheme = () => {
    this.setState(state => ({
      theme:
        state.theme === themes.dark
          ? themes.light
          : themes.dark,
    }));
  };
  shouldComponentUpdate(){
    return false;
  }
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value={this.state.theme} >
        <Toolbar changeTheme={this.toggleTheme}></Toolbar>
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
  return (
    <div>
      <ThemedButton onClick={props.changeTheme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  constructor(props, context) {
    super(props)

  }
  componentDidMount() {

  }
  shouldComponentUpdate() {

  }

  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  //static contextType = ThemeContext;
  //指定当前组件需要使用的context对象 
  static contextType = ThemeContext
  render() {

    return <button {...this.props} theme={this.context} style={{ backgroundColor: this.context.background, color: this.context.foreground }}>11</button>;
  }
}
 */


/**
 **/

const ThemeContext = React.createContext({
   theme: themes.dark,
   toggleTheme: () => { }
});
ThemeContext.displayName = 'MyDisplayName';
export default class App extends React.Component {
   constructor(props) {
       super(props);

       this.toggleTheme = () => {
           this.setState(state => ({
               theme:
                   state.theme === themes.dark
                       ? themes.light
                       : themes.dark,
           }));
       };
       this.state = {
           theme: themes.light,
           toggleTheme: this.toggleTheme,
       };
   }
 
   render() {
       // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
       // 无论多深，任何组件都能读取这个值。
       // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
       return (
           <ThemeContext.Provider value={this.state}>
               <Content></Content>
           </ThemeContext.Provider>
       );
   }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Content() {
   return (
       <div>
           <ThemeToggerButton />
       </div>
   );
}

function ThemeToggerButton() {
   return (
       <ThemeContext.Consumer>
           {
               ({ theme, toggleTheme }) => {
debugger
                   return <button onClick={toggleTheme} style={{ backgroundColor: theme.background, color: theme.foreground }}>11</button>;
               }
           }
       </ThemeContext.Consumer>
   )
}
