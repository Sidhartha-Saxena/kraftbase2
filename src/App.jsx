import React, { useRef, Suspense, useEffect, useState } from "react";
import { bg_imgs } from "./assets/bg-img";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImgBox from "./ImgBox";
import { Canvas } from "@react-three/fiber";
import vidurl from "./assets/vid.mp4";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({ markers: true });

export default function App() {
  const bg = useRef([]);
  const [ind, setInd] = useState(0);
  const [scrprog, setScprog] = useState(0);

  useEffect(() => {
    const sectionImage = gsap.utils.toArray(".pages");
    if (bg.current.length > 0) {
      sectionImage.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 10%",
          end: "bottom 10%",
          fastScrollEnd: true,
          onToggle: (self) => {
            if (self.isActive) {
              bg.current[i].style.opacity = 1;
              el.style.opacity = 1;
            } else {
              bg.current[i].style.opacity = 0;
              el.style.opacity = 0;
            }
          },
          toggleClass: "active",
          onEnter: () => {
            setInd(i);
          },
          onEnterBack: () => {
            setInd(i);
          },
          onUpdate: (self) => {
            setScprog(self.progress);
          },
        });
      });
    }
    // ScrollTrigger.create({
    //   trigger: ".container",
    //   start: "top top",
    //   end: "bottom bottom",
    //   onToggle: (self) => {
    //     if (self.isActive) {
    //       // Change the background image
    //       bg.current.style.backgroundImage = `url(${bg_imgs[1]})`;
    //     } else {
    //       // Change the background image back to the original image
    //       bg.current.style.backgroundImage = `url(${bg_imgs[2]})`;
    //     }
    //   },
    // });
  }, []);
  return (
    <>
      <div className="w-screen height fixed top-0 left-0 grad">
        <div className="back-w">
          {bg_imgs.map((el, i) => {
            return (
              <div
                key={i}
                className={"bimg"}
                ref={(b) => (bg.current[i] = b)}
                style={{ backgroundImage: `url('${el}')` }}
              ></div>
            );
          })}

          {/* <div className={"bimg"} ref={bg}></div> */}
        </div>
      </div>
      <Canvas className="t-canvas">
        <Suspense fallback={<></>}>
          <ImgBox vidurl={vidurl} ind={ind} scprog={scrprog} />
        </Suspense>
        <ambientLight color={"white"} intensity={2.5} />
      </Canvas>
      <div className="container">
        <div className="pages">
          <div className="page pos">
            <h1 className="title title1">
              Fashion's
              <br /> next reality
              <br /> starts here.
            </h1>
          </div>
        </div>
        <div className="pages">
          <div className="page pos">
            <h1 className="title">
              The Metaverse is fashions`s newest obsession.
            </h1>
          </div>
        </div>
        <div className="pages">
          <div className="page pos">
            <h1 className="title">
              We get it. In a world that can feel beyond repair, the seductive
              appeal of alternate realms is so alluring.
            </h1>
          </div>
        </div>
        <div className="pages">
          <div className="page pos">
            <h1 className="title">
              Otrium is a fashion platform with a mission, helping to reshape
              the future of fashion.
            </h1>
          </div>
        </div>
        <div className="pages">
          <div className="page pos">
            <h1 className="title">
              There`s still power in rebuilding our world, working together to
              mend this reality over alternate universes.
            </h1>
          </div>
        </div>
        <div className="pages">
          <div className="page pos">
            <h1 className="title">
              Our modern outlet concept aims to make a real impact - right here,
              in this reality.
            </h1>
          </div>
        </div>
        <div className="pages">
          <div className="page pos">
            <h1 className="title">
              Since 2000, clothing production has doubled annually.
            </h1>
          </div>
        </div>
        <div className="pages">
          <div className="page pos">
            <h1 className="title">
              15% of these new items are never worn. These items can end up in
              landfills - or even burned.
            </h1>
          </div>
        </div>
        <div className="pages">
          <div className="page pos">
            <h1 className="title">
              At Otrium we envision a future where all clothing produced is
              worn.
            </h1>
          </div>
        </div>
        <div className="pages">
          <div className="page pos">
            <h1 className="title">It`s a simple idea: Wear over waste.</h1>
          </div>
        </div>
        <div className="pages">
          <div className="page pos">
            <h1 className="title">A positive impact through</h1>
          </div>
        </div>
      </div>
    </>
  );
}
