import Card from "@/components/card";
import { usePlayer } from "@/contexts/playerContext";
import { MusicData } from "@/schemas/music.schema";
import api from "@/services/api";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";

interface HomeProps {
  musics: MusicData[];
}

const Home: NextPage<HomeProps> = ({ musics }) => {
  const { setPlaylist } = usePlayer();
  useEffect(() => {
    setPlaylist(musics);
  }, []);
  return (
    <main className={`body min-h-screen p-4`}>
      <div className="flex justify-end p-6">
        <Link href={"/upload"} className="btn-primary">
          Nova música
        </Link>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 justify-items-center">
        {musics.map((music) => {
          return <Card key={music.id} music={music} />;
        })}
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get<MusicData[]>("/musics");

  return {
    props: { musics: response.data },
  };
};

export default Home;
