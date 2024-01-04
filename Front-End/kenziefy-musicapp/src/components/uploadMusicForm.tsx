import { useMusic } from "@/contexts/musicContext";
import { ImMusic } from "react-icons/im";
import { useDropzone } from "react-dropzone";

const UploadMusicForm = () => {
  const { setPage, musicInfo, setMusicInfo, setMusic } = useMusic();

  const onDrop = (files: File[]) => {
    setMusic(files[0]);
  };

  const dropzone = useDropzone({
    onDrop,
    accept: {
      "audio/mpeg": [".mp3"],
    },
  });
  const { getRootProps, getInputProps } = dropzone;

  return (
    <div className="container w-3/4 min-w-[1393px] bg-gray-800 flex justify-center">
      <div>
        <p className="text-4xl my-6 font-semibold text-center">Salvar música</p>
        <div className="flex flex-row justify-center mb-6">
          <div className=" bg-blue-400 w-5 h-5 m-1 rounded-full"></div>
          <div className=" bg-gray-400 w-5 h-5 m-1 rounded-full"></div>
        </div>
        <div className="flex flex-row w-4/5">
          <div className=" flex flex-col min-w-[648px] min-h-[410px] bg-blue-900 rounded-lg border-dashed border-2 border-gray-400">
            <label
              htmlFor="dropzone-file"
              className="cursor-pointer w-full h-full"
            >
              <div
                {...getRootProps()}
                className="flex flex-col items-center pt-5 pb-6 w-full h-full gap-2"
              >
                <ImMusic className="fill-gray-200 w-16 h-16 m-4" />
                <p className="text-3xl">Arrasta e solte o áudio aqui</p>
                <p className="text-3xl mt-4">- OU -</p>
                <button
                  className="user-form-button w-48 my-8"
                  onClick={(e) => e.preventDefault()}
                >
                  Busque aqui
                </button>
                <p className="text-lg italic font-gray-200">
                  Áudios suportados: mp3
                </p>
              </div>
            </label>
            <input className="hidden" {...getInputProps()} />
          </div>
          <div className="min-w-[648px] min-h-[410px] justify-center">
            <div className="pl-6">
              <label htmlFor="name" className="user-form-label">
                Nome
              </label>
              <div className="mt-2 mb-12">
                <input
                  type="text"
                  className="user-form-input"
                  value={musicInfo.name}
                  onChange={(e) => {
                    setMusicInfo({ ...musicInfo, name: e.target.value });
                  }}
                  placeholder="Iron man"
                />
              </div>
              <div>
                <label htmlFor="album" className="user-form-label">
                  Album
                </label>
                <div className="mt-2 mb-12">
                  <input
                    type="text"
                    className="user-form-input"
                    value={musicInfo.album}
                    onChange={(e) => {
                      setMusicInfo({ ...musicInfo, album: e.target.value });
                    }}
                    placeholder="Paranoid"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="user-form-label">
                    Artista
                  </label>
                  <div className="mt-2 mb-12">
                    <input
                      type="text"
                      className="user-form-input"
                      value={musicInfo.artist}
                      onChange={(e) => {
                        setMusicInfo({ ...musicInfo, artist: e.target.value });
                      }}
                      placeholder="Black Sabbath"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="user-form-button w-32 my-8"
            onClick={() => {
              setPage((currPage) => currPage + 1);
            }}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadMusicForm;
