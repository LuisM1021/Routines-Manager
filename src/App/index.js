import {AppUI} from './AppUI'
import {GeneralProvider} from '../GeneralContext'

function App() {
  return (
      <GeneralProvider>
        <AppUI/>
      </GeneralProvider>
  );
}

export default App;
