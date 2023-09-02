import React, { useRef, useState, useEffect } from 'react';

interface IImagePicker {
  id: string;
  onInput: (id: string, pickedFile: any, isValid: boolean) => void;
}

const ImageUpload: React.FC<IImagePicker> = ({ id, onInput }) => {
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>();
  const [isValid, setIsValid] = useState<boolean>(false);

  const filePickerRef = useRef<any>();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <label
      id={id}
      className='absolute flex w-12 h-12 bg-brightPurple rounded-full bottom-3 right-3 text-white items-center justify-center text-4xl leading-none transition hover:bg-darkPurple hover:scale-110 hover:cursor-pointer'
    >
      &#43;
      <input
        id={id}
        ref={filePickerRef}
        className='hidden'
        type='file'
        accept='.jpg,.png,.jpeg'
        onChange={pickedHandler}
      />
    </label>
  );
};

export default ImageUpload;
