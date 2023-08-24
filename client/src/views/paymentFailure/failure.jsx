import './failure.css';
import logo from '../../Images/logowarning.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'

const Failure = () => {
  return (
    <div className='containError'>
      <div className='icon-container'>
        <FontAwesomeIcon icon={faFaceSadTear} style={{ fontSize: '274px', color: 'red' }} />
      </div>
      {/* <h1 className='title'>Failure payment</h1> */}
      {/* <h2 className='message'>Try again in a few minutes</h2> */}
      {/* <img
        src={logo}
        className='alert'
        alt='Error Alert'
      /> */}
      <div className='message-container'>
        <h1>Algo salió  mal en el pago. . .</h1>
      </div>
      <div className='boton-inicio'>
        <Link to='/home'>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Failure;
