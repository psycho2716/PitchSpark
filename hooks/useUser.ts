import { useEffect, useState } from "react";
import { User } from "next-auth";
import { getSession } from "next-auth/react"; // Use the client-side compatible method

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await getSession(); // Client-side compatible method
        setUser(session?.user as User);
      } catch (error) {
        console.error("Failed to fetch user session:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return user;
};

export default useUser;
