import Welcome from "../components/welcome";
import ColorPalette from "../components/color-palettes";

const Home = () => {
  return (
    <div className="homeContainer">
      <div>
        <Welcome />
      </div>
      <div>
        <ColorPalette />
      </div>
    </div>
  );
};

export default Home;
