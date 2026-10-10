// Layered sine swells plus a pointer ripple, drawn as soft points on a tilted grid.
// uExtent is the half size of the grid. Points fade toward the edges so the field dissolves naturally.
export const waveVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2 uPointer;
  uniform vec2 uExtent;
  attribute float aSeed;
  varying float vSignal;
  varying float vFade;

  void main() {
    vec3 p = position;

    float swell = sin(p.x * 0.8 + uTime * 0.9) * 0.26
      + sin(p.y * 1.2 - uTime * 0.7) * 0.2
      + sin((p.x + p.y) * 0.45 + uTime * 0.45) * 0.16;

    float pointerDistance = distance(p.xy, uPointer);
    float ripple = sin(pointerDistance * 5.0 - uTime * 3.2) * exp(-pointerDistance * 0.9) * 0.45;

    p.z += swell + ripple;
    vSignal = swell + ripple;
    vFade = 1.0 - smoothstep(0.55, 1.0, length(position.xy / uExtent));

    vec4 viewPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = (34.0 + aSeed * 22.0) * uPixelRatio / -viewPosition.z;
  }
`;

export const waveFragmentShader = /* glsl */ `
  uniform vec3 uColorLow;
  uniform vec3 uColorHigh;
  uniform float uOpacity;
  varying float vSignal;
  varying float vFade;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    float core = 1.0 - smoothstep(0.0, 0.5, dist);
    float mixAmount = clamp(vSignal * 1.4 + 0.5, 0.0, 1.0);
    vec3 color = mix(uColorLow, uColorHigh, mixAmount);
    gl_FragColor = vec4(color, core * vFade * uOpacity);
  }
`;
