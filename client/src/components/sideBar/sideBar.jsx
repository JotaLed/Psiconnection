import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../Images/logoPsiconnetion.png";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const currentUser = useSelector((store) => store.currentUser);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  let tokenId = '';
  let tokenRoll = '';

  if (token) {
    const tokenData = token.split('.')[1];
    const decodedData = window.atob(tokenData);
    const jsonObject = JSON.parse(decodedData);

    tokenId = jsonObject.id;
    tokenRoll = jsonObject.roll;
  }

  const DetailAcount = (id) => {
    navigate(`/account/client/${id}`);
  }

  return (
    <nav className={`navbar ${visible ? "" : "navbar-hidden"}`}>
<div className="navbar-container">
        <NavLink to="/home">
          <img className="navbar-logo" src={logo} alt="" />
          <div className="logoNameHome">
            PSICONNECTION
          </div> 
        </NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink  to="/home" activeClassName="active" className="nav-link">
            <i className='bx bx-home nav-icon'></i>
              HOME
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink  to="/nosotros" activeClassName="active" className="nav-link">
            <i className='bx bxs-group nav-icon'></i>
              ABOUT US
              </NavLink>
          </li>
          {
            !tokenId ? (
              <li className="nav-item">
                <NavLink  to="/form" activeClassName="active" className="nav-link">
                <i className='bx bx-user nav-icon'></i>
                  SING UP
                  </NavLink>
              </li>
            ) : (
              <NavLink className="nav-item-perfil" to={tokenRoll === "usuario" ? `/account/client/${tokenId}` : tokenRoll === "admin" ? "/account/admin/" : `/account/${tokenId}`}>
  {currentUser && currentUser.foto ? <img className="foto_perfil" src={currentUser.foto} alt="" /> : "Perfil"}
</NavLink>

            )
          }
        </ul>
      </div>
    </nav>
  );
};




// import React, { useEffect } from "react";
// import { Link, Navigate, useNavigate, NavLink } from "react-router-dom";
// import "./sidebar.css";
// import logo from "../../Images/logoPsiconnetion.png";
// import { useDispatch, useSelector } from "react-redux"
// //importamos actions 
// import { loadCurrentUser } from "../../Redux/actions";

// export default function Sidebar() {
//   //importamos estados globales 
//   const currentUser = useSelector(store => store.currentUser)
//   console.log(currentUser);
//   let token = localStorage.getItem('authToken');
//   console.log("tokennnn", token)
//   const navigate = useNavigate();
  
//   let tokenId = '';
//   let tokenRoll = '';

//   if(token || null || ''){
//     const tokenData = token.split('.').at(1)
//     console.log("tokenData", tokenData)
//     const decodedData = window.atob(tokenData)
//     const jsonObject = JSON.parse(decodedData);

//   //   console.log("decodedData", decodedData)
//   //   console.log('parseJson', jsonObject)
//   //  console.log('id', jsonObject.id)

//     tokenId = jsonObject.id
//     tokenRoll = jsonObject.roll
//   }
//   //useEffect
//   useEffect(()=>{

//   },[])

//   console.log("tokenId", tokenId)
//   console.log('tokenRoll', tokenRoll)

//   // eyJpZCI6ImFiYzA2YTQzLWI5NDAtNGM3MC1hYTgzLTE0YTM2MDQxYjU0NSIsInJvbGwiOiJ1c3VhcmlvIiwibm9tYnJlIjoiZ2FicmllbCIsImFwZWxsaWRvIjoiZmVybmFuZGV6IiwiaWF0IjoxNjkyMTYyMTUxfQ

//   // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiYzA2YTQzLWI5NDAtNGM3MC1hYTgzLTE0YTM2MDQxYjU0NSIsInJvbGwiOiJ1c3VhcmlvIiwibm9tYnJlIjoiZ2FicmllbCIsImFwZWxsaWRvIjoiZmVybmFuZGV6IiwiaWF0IjoxNjkyMTYyMTUxfQ.oYvMSurD_UtqipUnTRx2HQcdyyITjuSdBQ9A4q8_QH0"

//   const DetailAcount = (id) => {
//       navigate(`/account/client/${id}`)
//   }


//   return (
//     <nav className="navbar" >
//       <div className="navbar-container">
//         <Link to="/home" className="navbar-logo_conteiner">
//           <img className="navbar-logo" src={logo} alt="" />
//         </Link>
//         <ul className="nav-menu" >
//           <li className="nav-item" >
//             <Link to="/home">Home</Link>
//           </li>
//           {/* <li className="nav-item"><Link to="/detail">Perfil</Link></li> */}
//           <li className="nav-item">
//             <Link to="/nosotros">About us</Link>
//           </li>

//           {
//             !tokenId ? <li className="nav-item">
//             <NavLink to="/form">Sign up</NavLink>
//           </li> 
//           : <NavLink className="nav-item-perfil" to={tokenRoll == "usuario" ? `/account/client/${tokenId}` 
//           : tokenRoll == "admin"? "/account/admin/" : `/account/${tokenId}`}>
//             {currentUser.foto ? <img className="foto_perfil" src={currentUser.foto} alt="" /> : "Perfil" }
//             </NavLink>
//           }

//         </ul>
//       </div>
//     </nav>
//   );
// };