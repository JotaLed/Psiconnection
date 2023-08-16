//import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

// const ProfileAuth0 = () => {
//   const { user, isAuthenticated } = useAuth0();

//   return <div>{isAuthenticated && <div>{user.name}</div>}</div>;
// };

// export default ProfileAuth0;
const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div>
      {console.log(user)}
      {/* isAuthenticated && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          JSON.stringify(user) */}
      {/* </div>
      ) */}
    </div>
  );
};

export default Profile;
