import React, { Suspense, useEffect, useState } from "react";
import { useThree, extend } from "@react-three/fiber";
import { useAspect, useTexture } from "@react-three/drei";
import D_01 from "./assets/D_01.jpg";
import D_02 from "./assets/D_02.jpg";
import D_03 from "./assets/D_03.jpg";
import D_04 from "./assets/D_04.jpg";
import D_05 from "./assets/D_05.jpg";
import D_06 from "./assets/D_06.jpg";
import D_07 from "./assets/D_07.jpg";
import D_08 from "./assets/D_08.jpg";
import D_09 from "./assets/D_09.jpg";
import D_10 from "./assets/D_10.jpg";
import D_11 from "./assets/D_11.jpg";
import { ImageFadeMaterial } from "./ImageFadeMaterial";
import { ImageSizeMaterial } from "./ImageSizeMaterial";
import * as THREE from "three";
extend({
  ImageFadeMaterial,
  ImageSizeMaterial,
});
export default function ImgBox({ vidurl, ind, scprog }) {
  const { size } = useThree();
  const textures = useTexture([
    D_01,
    D_02,
    D_03,
    D_04,
    D_05,
    D_06,
    D_07,
    D_08,
    D_09,
    D_10,
    D_11,
  ]);
  const planeWidth = size.width;
  const planeHeight = size.height;
  const sz = useAspect(planeWidth, planeHeight);
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = vidurl;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  });
  useEffect(() => {
    if (scprog > 0) {
      video.pause();
    }
  }, [scprog]);
  //   const video = useVideoTexture(vidurl);
  return (
    <mesh scale={sz}>
      <planeGeometry />
      <Suspense fallback={<></>}>
        {/* {ind === 0 ? (
          <meshStandardMaterial
            map={new THREE.VideoTexture(video)}
          ></meshStandardMaterial>
        ) : null} */}
        <imageSizeMaterial
          uRes={new THREE.Vector2(sz[0],sz[1])}
          uImageRes={new THREE.Vector2(2066, 1290)}
          uText={textures[ind]}
        />
        <imageFadeMaterial
          uAlpha={1}
          uTextureA={textures[ind]}
          uTextureB={
            ind + 1 < textures.length ? textures[ind + 1] : textures[0]
          }
          uSwapProgress={scprog}
          uTime={0}
          uTransitionType={ind >= 5 ? 1 : 2}
          uRes={new THREE.Vector2(planeWidth, planeHeight)}
        />
      </Suspense>
    </mesh>
  );
}
