import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { setOrders } from "../../Redux/actions";
import style from "../filters/filters.module.css"
const Orders = () => {
    const dispatch = useDispatch();
    const [order, setOrder] = useState("alf")

    const handleOrder = (event) => {
        const value = event.target.value;
        setOrder(value)
        dispatch(setOrders(value))
    }

    useEffect(() => {
        dispatch(setOrders(order))
    }, [])
    return (
        <div>
            <label className={style.label}>Ordenar por: </label>
            <div className={style.selectContainer}>
            <select className={style.select} value={order} onChange={handleOrder}>
                <option value= 'alf'>Nombre</option>
                <option value= "ascPr">Mayor tarifa</option>
                <option value= "desPr">Menor tarifa</option>
                <option value= "desPu">Mayor puntuación</option>
            </select>
        </div>
        </div>
       
    )
}

export default Orders;