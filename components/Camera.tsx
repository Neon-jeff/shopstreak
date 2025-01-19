"use client";

import React, { useEffect, useRef, useState } from "react";
import { IconCamera, IconTrash,IconCameraRotate } from "@tabler/icons-react";
import Image from "next/image";

const Camera = () => {
  const [openCam, setOpenCam] = useState(false);
  const [rotate,setRotate]=useState(false)
  const [images, setImages] = useState<Array<string>>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const constraints = {
    video: {
      // width: { min: 300, ideal: 300, max: 400 },
      // height: { min: 200, ideal: 200, max: 200 },
      aspectRatio: { ideal: 2 },
      facingMode: rotate? "user":"environment",
    },
    audio: false,
  };

  const getVideo = async () => {
    const stream = await navigator.mediaDevices
      .getUserMedia(constraints)
      .catch((err) => {
        console.error(err);
      });
    const elem = videoRef.current;
    if (!elem) {
      return;
    }
    elem.srcObject = stream;
  };
  const handleCaptureImage = () => {
    const width = 200
    const height = 200

    const video = videoRef.current;
    const photo = canvasRef.current;
    if (!video && !photo) return;

    photo.width = width;
    photo.height = height;

    const ctx = photo?.getContext("2d");
    ctx?.drawImage(video, 0, 0, width, height);
    console.log(photo);
    setImages((prev) => [...prev, photo?.toDataURL("image/jpeg", 0.7)]);
  };
  useEffect(() => {
  
    getVideo();
  }, [videoRef,rotate]);
  return (
    <div className="space-y-3">
      <p>Capture Item</p>
      <div className="relative w-full">
        <video
          src={undefined}
          className="  w-full bg-red-100  rounded-xl"
          ref={videoRef}
          autoPlay
        ></video>
        <canvas ref={canvasRef} className=" h-0 w-0"></canvas>
        {/* controls */}
        <div className="absolute bottom-5 left-1/2 flex items-center gap-5 ml-5 -translate-x-1/2">
          <div
            className="cursor-pointer p-3 bg-white flex gap-5  rounded-full"
            onClick={handleCaptureImage}
          >
            <IconCamera stroke={1.5} size={25} color="black" className="" />
          </div>
          <IconCameraRotate stroke={1.5} className="cursor-pointer" color="white" onClick={()=>{setRotate(prev=>!prev)}}/>
        </div>
      </div>

      <p>{constraints.video.facingMode}</p>

      <div className="flex gap-2 ">
        {images.map((image, index) => (
          <div className="relative" key={index}>
            <Image
              src={decodeURIComponent(image)}
              width={300}
              height={300}
              alt={"Image capture"}
              key={index}
              className="h-16 w-16 rounded-lg object-cover "
            />
            <IconTrash
              stroke={2}
              color="#f77070"
              size={15}
              onClick={() => {
                setImages((prev) => prev.filter((item) => item != image));
              }}
              className="absolute top-1 right-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Camera;
