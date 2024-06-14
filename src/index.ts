import Primitives from "./primitives";
import Renderer from "./renderer";
import Vec from "./vec";
import Mat4 from "./mat4";
import ModelLoader from "./modelLoader";

// render object information
export interface RenderObject {
  visible: boolean,
  vertexBuffer: GPUBuffer,
  uvBuffer: GPUBuffer,
  normalBuffer: GPUBuffer,
  vertexCount: number,
  pipelineIndex: number,
  indexBuffer?: GPUBuffer,
  indexCount?: number,
  instances?: number,
}

// render bind group information
export interface RenderBindGroup {
  base: GPUBindGroup,
  entries: Array<GPUBuffer>,
}

// render pipeline information
export interface RenderPipeline {
  pipe: GPURenderPipeline,
  objects: Array<RenderObject>,
  maxObjCount: number,
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
  index?: Array<number>
}

/**
 * Inputs for updating an object in a pipeline
 * 
 * Note that uniformData arrays must be in the Float32Array/Int32Array format,
 * not as a default js array. The Vec.float() function can also be used.
 * 
 * Also note that even individual values must be wrapped in a Float32Array/Int32Array
 * due to fixed size requirements
 * 
 * @param {number} pipelineId
 * @param {number} objectId
 * @param {[number, number, number]} translate
 * @param {[number, number, number]} rotateAxis the axis on which rotation occurs
 * @param {number} rotateDeg
 * @param {[number, number, number]} scale
 * @param {boolean} visible whether or not to render the object
 * @param {Camera} camera camera object to determine view transform
 * @param {Array<Float32Array | Int32Array>} uniformData custom uniform data can be passed in here
 */
export interface UpdateData {
  pipelineId: number,
  objectId: number,
  translate?: [number, number, number],
  rotateAxis?: [number, number, number],
  rotateDeg?: number,
  scale?: [number, number, number],
  visible?: boolean,
  camera?: Camera,
  uniformData?: Array<Float32Array | Int32Array>
}

/**
 * Configurations for custom uniform binding.
 * 
 * Note that dynamic uniforms have a max size of 256 bytes.
 * If passing in a struct, use sizeInBytes to describe the size.
 * 
 * @param {number} bindSlot binding index in WGSL
 * @param {string} visibility which shader function to expose this uniform to
 * @param {boolean} dynamic whether or not uniform is different per object in the pipeline
 * @param {string} type type of uniform (determines size)
 * @param {number | undefined} sizeInBytes size of uniform in bytes (if type is struct)
 */
export interface UniformDescription {
  bindSlot: number,
  visibility: 'vertex' | 'fragment' | 'both',
  type: 'i32' | 'f32' | 'vec2f'| 'vec3f' | 'vec4f' | 'struct',
  sizeInBytes?: number,
}

// additional options when creating a pipeline
export interface PipelineOptions {
  textureId?: number,
  cullMode?: 'back' | 'front' | 'none',
  uniforms?: Array<UniformDescription>,
  vertexFunction?: string,
  fragmentFunction?: string,
}

// camera information
interface CameraTransform {
  translate: [number, number, number],
  lookAt: [number, number, number],
  up: [number, number, number],
}
interface OrthoCamera {
  type: "ortho",
  near: number,
  far: number,
}
interface PerspCamera {
  type: "persp",
  fovY: number,
  near: number,
  far: number,
}
export interface CameraOptions {
  fovY?: number,
  near?: number,
  far?: number,
  translate?: [number, number, number],
  lookAt?: [number, number, number],
  up?: [number, number, number],
}
export type Camera = CameraTransform & (OrthoCamera | PerspCamera);

export { Primitives, Mat4, Vec, Renderer, ModelLoader };