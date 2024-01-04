import { usePlayer } from "@/contexts/playerContext";
import { MusicData } from "@/schemas/music.schema";
import Image from "next/image";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { TbPlayerStop } from "react-icons/tb";

interface IMusicContainerProps {
  music: MusicData;
}

const MusicContainer = ({ music }: IMusicContainerProps) => {
  const { setCurrentMusic, currentMusic } = usePlayer();
  const isPlaying = currentMusic.music_url === music.music_url;
  return (
    <div className="w-4/5 h-3/4 min-w-[1502px] min-h-[803] bg-pink-800 rounded-lg flex flex-row pb-8 pt-20">
      <div className="flex flex-col justify-center w-2/4 pl-32">
        <p className="text-5xl text-gray-100 pb-6 ml-12">{music.name}</p>
        <div className=" w-[30rem] h-[33rem] ml-12">
          <Image
            className="h-[426px]"
            width={485}
            height={482}
            src={music.cover_image}
            alt="Nome da Música"
          />
          <div className="w-[30rem] bg-gray-100 flex justify-center rounded-b-lg">
            <button
              onClick={() => {
                setCurrentMusic(music, true);
              }}
            >
              {isPlaying ? (
                <TbPlayerStop className="fill-pink-500 w-10 h-10 m-1" />
              ) : (
                <BsFillPlayCircleFill className="fill-pink-500 w-10 h-10 m-1" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-12 w-2/4 justify-center ">
        <p className="text-5xl my-2 text-gray-100">
          {" "}
          <strong>Artista:</strong> {music.artist}
        </p>
        <p className="text-5xl my-2 text-gray-100">
          {" "}
          <strong>Álbum:</strong> {music.album}
        </p>
        <p className="text-5xl my-2 text-gray-100">
          {" "}
          <strong>Gênero:</strong> {music.genre}
        </p>
        <p className="text-5xl my-2 text-gray-100">
          {" "}
          <strong>Ano: </strong> {music.year}
        </p>
      </div>
    </div>
  );
};

export default MusicContainer;
