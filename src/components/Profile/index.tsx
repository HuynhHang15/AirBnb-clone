import { auth, logout, signInWithGoogle } from "@/firebase/firebaseConfig";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const [activeMenu, setActiveMenu] = useState(false);

  const handleMenu = () => {
    user ? setActiveMenu(!activeMenu) : signInWithGoogle();
  };

  useEffect(() => {
    if (loading) {
      return;
    }
  }, [user, loading]);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <div className="py-2 px-4 rounded-full hover:bg-gray-100 cursor-pointer">
          <div className="font-semibold">Airbnb your home</div>
        </div>
        <div className="py-3 px-4 rounded-full hover:bg-gray-100 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
        </div>
      </div>
      <div
        className="relative flex items-center p-1 border rounded-full hover:shadow-md cursor-pointer"
        onClick={handleMenu}
      >
        <div className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <div className="w-10 h-10">
          {user ? (
            <div>
              <img
                src={user.photoURL!}
                referrerPolicy="no-referrer"
                alt={user.displayName!}
                className="w-full h-full rounded-full"
              />
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        {/* menu */}
        {user && activeMenu && (
          <div className="w-48 h-auto flex flex-col absolute top-12 right-0 bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
            <Link href="/wishlists" className="py-2 px-4 hover:bg-gray-200" >Wishlists</Link>
            <hr />
            <div
              onClick={() => logout()}
              className="py-2 px-4 hover:bg-gray-200"
            >
              Log out
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
