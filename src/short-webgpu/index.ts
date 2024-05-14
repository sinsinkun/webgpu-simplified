import Primitives from "./primitives";
import Renderer from "./renderer";
import Vec from "./vec";
import Mat4 from "./mat4";

// render object information
export interface RenderObject {
  visible: boolean,
  vertexBuffer: GPUBuffer,
  uvBuffer: GPUBuffer,
  normalBuffer: GPUBuffer,
  vertexCount: number,
  pipelineIndex: number,
  pipelineOffset: number,
  customBindGroup?: RenderBindGroup,
}

// render bind group information
export interface RenderBindGroup {
  base: GPUBindGroup,
  entries: Array<GPUBuffer>,
  texture?: GPUTexture,
}

// render pipeline information
export interface RenderPipeline {
  pipe: GPURenderPipeline,
  bindGroup0: RenderBindGroup,
  bindGroup1?: RenderBindGroup,
  bindGroup2?: RenderBindGroup,
  bindGroup3?: RenderBindGroup,
}

// primitives shape information
export interface Shape {
  vertices: Array<[number, number, number]>,
  uvs: Array<[number, number]>,
  normals: Array<[number, number, number]>,
}

export interface UpdateData {
  id: number,
  translate?: [number, number, number],
  rotateAxis?: [number, number, number],
  rotateDeg?: number,
  scale?: [number, number, number],
  visible?: boolean,
  camera?: CameraType,
}

// camera information
export type CameraType = { type: "ortho" } | {
  type: "persp", fovY: number, near: number, far: number,
};

export { Primitives, Mat4, Vec, Renderer };