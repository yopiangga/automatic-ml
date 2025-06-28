import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState({
    id: 1,
    name: "Alfian Prisma Yopiangga",
    email: "yopiangga_owner@email.com",
    role: "admin",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
