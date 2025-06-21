// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Body from "./components/Body";
// import Login from "./components/Login";
// import Profile from "./components/Profile";
// import { Provider } from "react-redux";
// import appStore from "./utils/appStore";
// import Feed from "./components/Feed";
// import Connections from "./components/Connections";
// import Requests from "./components/Requests";
// import Chat from "./components/Chat";
// import LandingPage from "./components/LandingPage";

// function App() {
//   return (
//     <div className="w-full min-h-screen font-sans bg-[#232429]">
//       <Provider store={appStore}>
//         <BrowserRouter>
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<LandingPage />} />
           

            
//             <Route path="/" element={<Body />}>
//              <Route path="/login" element={<Login />} />
//               <Route path="feed" element={<Feed />} />
//               <Route path="connections" element={<Connections />} />
//               <Route path="requests" element={<Requests />} />
//               <Route path="chat/:targetUserId" element={<Chat />} />
//               <Route path="profile" element={<Profile />} />
//             </Route>
//           </Routes>
//         </BrowserRouter>
//       </Provider>
//     </div>
//   );
// }

// export default App;




import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div className="w-full min-h-screen font-sans bg-[#232429]">
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            {/* Private routes inside Body layout */}
            <Route path="/" element={<Body />}>
              <Route path="feed" element={<Feed />} />
              <Route path="connections" element={<Connections />} />
              <Route path="requests" element={<Requests />} />
              <Route path="chat/:targetUserId" element={<Chat />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
