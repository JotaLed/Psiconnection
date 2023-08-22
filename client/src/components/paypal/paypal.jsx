import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

// import { PayPalButtons } from "@paypal/react-paypal-js";
import './paypalButton.css'; // Ruta al archivo CSS con los estilos

const Paypal = ({handleBuyPaypal}) => {
    
        return (
        <div id="paypal-button-container">
        <button className="paypal-button" onClick={handleBuyPaypal}>
        <span className="paypal-logo">
            {/* Aquí puedes insertar el logo de PayPal si lo deseas */}
            <FontAwesomeIcon icon={faPaypal} className="fa-xl" style={{ color: '#ffff'}} /> 
        </span>
         Pagar con PayPal
        </button >
    </div>
    )

}



export default Paypal;