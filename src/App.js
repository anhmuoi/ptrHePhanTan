import logo from './logo.svg';
import BasicControlsContainer from './components/Controls/index.jsx';
import Canvas from './components/Canvas.jsx';
import ObjectControlsContainer from './components/ObjectControls';
import { useSelector } from 'react-redux';

function App() {
    return (
        <div className="work columns">
            <div className="column relative">
                <div>
                    <Canvas />
                </div>
                <BasicControlsContainer />
            </div>
            <div className="column is-narrow">
                <ObjectControlsContainer />
            </div>
        </div>
    );
}

export default App;
