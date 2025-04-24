import Editor from "./components/editor";
import Logo from "./components/logo";
import Plane from "./components/plane";
import Play from "./components/play";
import Reset from "./components/reset";

export default function App() {
  return (
    <div className="p-5 flex justify-between gap-8">
      <div className="flex-[3] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <Reset />
            <Play />
          </div>
        </div>
        <Plane />
      </div>
      <div className="flex-[1]">
        <Editor />
      </div>
    </div>
  );
}
