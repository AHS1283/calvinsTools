import Home from "./pages/Home/Home";
import TrailersForSale from "./pages/TrailersForSale/TrailersForSale";
import "./App.css";

function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  switch (path) {
    case "/trailers-for-sale":
      return <TrailersForSale />;

    case "/":
    default:
      return <Home />;
  }
}

export default App;