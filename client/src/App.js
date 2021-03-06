import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { initWeb3 } from './store/mainSlice';
import Pets from './containers/Pets/Pets';
import './App.css';

function App() {
  const web3 = useSelector(state => state.main.web3);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initWeb3());
  }, []);

  return (
    <div>
      {web3
        ? <Pets />
        : <div className="web3-error">
          <span className="error-heading">Unable to initialize Web3</span>
          <span className="error-description">Make sure you have metamask installed and connected with Ropsten</span>
          </div>}
    </div>
  );
}

export default App;
