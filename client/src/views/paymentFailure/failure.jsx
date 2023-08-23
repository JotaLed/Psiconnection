import './failure.css';
import logo from '../../Images/logowarning.png'


const Failure = () => {
    return(
            <div className='containError'>
              <h1 className='title'>Failure payment</h1>
              <h2 className='message'>Try again in a few minutes</h2>
              <img
                src={logo}
                className='alert'
                alt='Error Alert'
              />
            </div>
    );
};

export default Failure;
