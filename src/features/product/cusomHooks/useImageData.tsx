import { useState } from "react";

const useImageData = ({ initialImgShow }: { initialImgShow: string }) => {
  const [imgFile, setImgFile] = useState<File>();
  const [imgShow, setImgShow] = useState(initialImgShow);

  const handleCancelImage = () => {
    setImgFile(undefined);
    setImgShow("");
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    if (e.target.files) {
      if (e.target.files.length !== 0) {
        setImgFile(e.target.files[0]);
        setImgShow(URL.createObjectURL(e.target.files[0]));
      }
    }
  };

  return { imgFile, imgShow, handleCancelImage, handleImageFile };
};

export default useImageData;
