import Player from "@/components/player";
import { CurrentMusicType, MusicData } from "@/schemas/music.schema";

import { ReactNode, createContext, useContext, useState } from "react";

interface Props {
  children: ReactNode;
}

interface PlayerProviderData {
  currentMusic: CurrentMusicType;
  setCurrentMusic: (cm: Partial<CurrentMusicType>, replace?: boolean) => void;
  playList: MusicData[];
  setPlaylist: (data: MusicData[]) => void;
}

const defaultMusic: CurrentMusicType = {
  id: "kenzie",
  cover_image: "",
  name: "",
  artist: "",
  album: "",
  genre: "",
  music_url: "",
  year: "",
  isPlaying: false,
};

const PlayerContext = createContext<PlayerProviderData>(
  {} as PlayerProviderData
);

export const PlayerProvider = ({ children }: Props) => {
  const [musics, setMusics] = useState<MusicData[]>([]);
  const [current, setCurrent] = useState<CurrentMusicType>(defaultMusic);

  const setCurrentMusic = (
    music: Partial<CurrentMusicType>,
    replace = false
  ) => {
    if (replace && music.music_url !== current.music_url) {
      setCurrent(music as CurrentMusicType);
    } else {
      setCurrent((prev) => ({ ...prev, ...music }));
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentMusic: current,
        setCurrentMusic,
        playList: musics,
        setPlaylist: setMusics,
      }}
    >
      {children}
      {current.music_url && <Player />}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
