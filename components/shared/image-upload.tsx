import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import { config } from "@/lib/config";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";

const { publicKey, urlEndpoint } = config.env.imagekit;

async function authenticator() {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const { token, signature, expire } = await response.json();

    return { token, signature, expire };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
}

interface Props {
  onFileChange: (filePath: string) => void;
}

export default function ImageUpload({ onFileChange }: Props) {
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const ikUploadRef = useRef(null);

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast.success("Image upload successfully");
  };

  const onError = (error: any) => {
    console.log(error);
    toast.error("Image upload failed");
  };

  const onUpload = () => {
    if (ikUploadRef.current) {
      // @ts-ignore
      ikUploadRef.current?.click();
    }
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className={"hidden"}
        ref={ikUploadRef}
        onSuccess={onSuccess}
        onError={onError}
        fileName={file?.filePath}
      />
      <Button
        type={"button"}
        className={"upload-btn bg-dark-300 hover:bg-dark-300"}
        onClick={onUpload}
      >
        <Image
          src={"/icons/upload.svg"}
          alt={"Upload Icon"}
          width={20}
          height={20}
          className={"object-contain"}
        />
        <p className={"text-base text-light-100"}>Upload a file</p>
        {file && <p className={"upload-filename"}>{file.filePath}</p>}
      </Button>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
}
