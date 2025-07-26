import Avatar from "./components/Avatar";
import Description from "./components/Description";
import Greeting from "./components/Greeting";
import Prompt from "./components/Prompt";

export default function Home() {
  return (
    <form className="flex-1 flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <Avatar />
        <Greeting />
        <Description />
        <Prompt />
      </div>
    </form>
  );
}
