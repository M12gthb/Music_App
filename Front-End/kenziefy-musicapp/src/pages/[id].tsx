import MusicContainer from "@/components/musicContainer";
import { MusicData } from "@/schemas/music.schema";
import api from "@/services/api";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

interface MusicProps {
  music: MusicData;
}

const Music: NextPage<MusicProps> = ({ music }: MusicProps) => {
  const router = useRouter();

  return (
    <main className="body min-h-screen">
      <button
        className="btn-primary m-6"
        onClick={() => {
          router.push("/");
        }}
      >
        Voltar
      </button>

      <div className="flex items-center justify-center">
        <MusicContainer music={music} />
      </div>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "5f7495f8-f18d-4d35-8707-a3236dd6e5d8" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<MusicProps> = async (ctx) => {
  const id = ctx.params!.id;
  const response = await api.get<MusicData>(`/musics/${id}`);

  return { props: { music: response.data }, revalidate: 60 };
};

export default Music;
