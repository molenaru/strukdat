import Nav from "./Navbar";
import Card from "./components/Card";

function App() {
  return (
    <div className="min-h-screen">

      <Nav />

      <div className="flex justify-centr p-10">
        <Card />
      </div>

    </div>
  );
}

export default App;