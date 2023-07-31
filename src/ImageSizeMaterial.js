import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

export const ImageSizeMaterial = shaderMaterial(
  {
    uRes: new THREE.Vector2(0, 0),
    uImageRes: new THREE.Vector2(0, 0),
    uText: undefined,
  },
  /*glsl*/ `varying vec2 vUv;
void main() {
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,
  /*glsl*/ `uniform sampler2D uText;
uniform vec2 uRes;
uniform vec2 uImageRes;

varying vec2 vUv;

float scale(float _val, float _scale) {
    _val -= 0.5;
    _val *= _scale;
    _val += 0.5;
    return _val;
  }

  vec2 scale(vec2 _val, vec2 _scale) {
    _val -= 0.5;
    _val *= _scale;
    _val += 0.5;
    return _val;
  }

  vec2 coverImage(vec2 _pos, vec2 _res, vec2 _imageRes) {
    float rS = _res.x / _res.y;
    float rI = _imageRes.x / _imageRes.y;

    float scaleX = 1.;
    float scaleY = 1.;

    
    if (rS > rI) {
      scaleY = rI / rS;
    } else {
      scaleX = rS / rI;
    }

    _pos.x = scale(_pos.x, scaleX);
    _pos.y = scale(_pos.y, scaleY);

    return _pos;
  }

void main() {
  vec2 pos = coverImage(vUv, uRes, uImageRes);
  vec4 color = texture2D(uText, pos);
  gl_FragColor = color;
}`
);
