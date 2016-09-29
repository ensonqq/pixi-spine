declare module "core/BoneData" {
    export class BoneData {
        index: number;
        name: string;
        parent: BoneData;
        length: number;
        x: number;
        y: number;
        rotation: number;
        scaleX: number;
        scaleY: number;
        shearX: number;
        shearY: number;
        inheritRotation: boolean;
        inheritScale: boolean;
        constructor(index: number, name: string, parent: BoneData);
    }
}
declare module "core/Updatable" {
    export interface Updatable {
        update(): void;
    }
}
declare module "core/Bone" {
    import { Updatable } from "core/Updatable";
    import { BoneData } from "core/BoneData";
    import { Skeleton } from "core/Skeleton";
    import { Vector2 } from "core/Utils";
    export class Bone implements Updatable {
        data: BoneData;
        skeleton: Skeleton;
        parent: Bone;
        children: Bone[];
        x: number;
        y: number;
        rotation: number;
        scaleX: number;
        scaleY: number;
        shearX: number;
        shearY: number;
        appliedRotation: number;
        a: number;
        b: number;
        worldX: number;
        c: number;
        d: number;
        worldY: number;
        worldSignX: number;
        worldSignY: number;
        sorted: boolean;
        constructor(data: BoneData, skeleton: Skeleton, parent: Bone);
        update(): void;
        updateWorldTransform(): void;
        updateWorldTransformWith(x: number, y: number, rotation: number, scaleX: number, scaleY: number, shearX: number, shearY: number): void;
        setToSetupPose(): void;
        getWorldRotationX(): number;
        getWorldRotationY(): number;
        getWorldScaleX(): number;
        getWorldScaleY(): number;
        worldToLocalRotationX(): number;
        worldToLocalRotationY(): number;
        rotateWorld(degrees: number): void;
        updateLocalTransform(): void;
        worldToLocal(world: Vector2): Vector2;
        localToWorld(local: Vector2): Vector2;
    }
}
declare module "core/IkConstraintData" {
    import { BoneData } from "core/BoneData";
    export class IkConstraintData {
        name: string;
        bones: BoneData[];
        target: BoneData;
        bendDirection: number;
        mix: number;
        constructor(name: string);
    }
}
declare module "core/IkConstraint" {
    import { Updatable } from "core/Updatable";
    import { IkConstraintData } from "core/IkConstraintData";
    import { Bone } from "core/Bone";
    import { Skeleton } from "core/Skeleton";
    export class IkConstraint implements Updatable {
        data: IkConstraintData;
        bones: Array<Bone>;
        target: Bone;
        mix: number;
        bendDirection: number;
        level: number;
        constructor(data: IkConstraintData, skeleton: Skeleton);
        apply(): void;
        update(): void;
        apply1(bone: Bone, targetX: number, targetY: number, alpha: number): void;
        apply2(parent: Bone, child: Bone, targetX: number, targetY: number, bendDir: number, alpha: number): void;
    }
}
declare module "core/TransformConstraintData" {
    import { BoneData } from "core/BoneData";
    export class TransformConstraintData {
        name: string;
        bones: BoneData[];
        target: BoneData;
        rotateMix: number;
        translateMix: number;
        scaleMix: number;
        shearMix: number;
        offsetRotation: number;
        offsetX: number;
        offsetY: number;
        offsetScaleX: number;
        offsetScaleY: number;
        offsetShearY: number;
        constructor(name: string);
    }
}
declare module "core/TransformConstraint" {
    import { Updatable } from "core/Updatable";
    import { TransformConstraintData } from "core/TransformConstraintData";
    import { Bone } from "core/Bone";
    import { Vector2 } from "core/Utils";
    import { Skeleton } from "core/Skeleton";
    export class TransformConstraint implements Updatable {
        data: TransformConstraintData;
        bones: Array<Bone>;
        target: Bone;
        rotateMix: number;
        translateMix: number;
        scaleMix: number;
        shearMix: number;
        temp: Vector2;
        constructor(data: TransformConstraintData, skeleton: Skeleton);
        apply(): void;
        update(): void;
    }
}
declare module "core/PathConstraintData" {
    import { BoneData } from "core/BoneData";
    import { SlotData } from "core/SlotData";
    export class PathConstraintData {
        name: string;
        bones: BoneData[];
        target: SlotData;
        positionMode: PositionMode;
        spacingMode: SpacingMode;
        rotateMode: RotateMode;
        offsetRotation: number;
        position: number;
        spacing: number;
        rotateMix: number;
        translateMix: number;
        constructor(name: string);
    }
    export enum PositionMode {
        Fixed = 0,
        Percent = 1,
    }
    export enum SpacingMode {
        Length = 0,
        Fixed = 1,
        Percent = 2,
    }
    export enum RotateMode {
        Tangent = 0,
        Chain = 1,
        ChainScale = 2,
    }
}
declare module "core/PathConstraint" {
    import { Updatable } from "core/Updatable";
    import { PathConstraintData } from "core/PathConstraintData";
    import { Bone } from "core/Bone";
    import { Slot } from "core/Slot";
    import { Skeleton } from "core/Skeleton";
    import { PathAttachment } from "core/attachments/index";
    export class PathConstraint implements Updatable {
        static NONE: number;
        static BEFORE: number;
        static AFTER: number;
        data: PathConstraintData;
        bones: Array<Bone>;
        target: Slot;
        position: number;
        spacing: number;
        rotateMix: number;
        translateMix: number;
        spaces: number[];
        positions: number[];
        world: number[];
        curves: number[];
        lengths: number[];
        segments: number[];
        constructor(data: PathConstraintData, skeleton: Skeleton);
        apply(): void;
        update(): void;
        computeWorldPositions(path: PathAttachment, spacesCount: number, tangents: boolean, percentPosition: boolean, percentSpacing: boolean): number[];
        addBeforePosition(p: number, temp: Array<number>, i: number, out: Array<number>, o: number): void;
        addAfterPosition(p: number, temp: Array<number>, i: number, out: Array<number>, o: number): void;
        addCurvePosition(p: number, x1: number, y1: number, cx1: number, cy1: number, cx2: number, cy2: number, x2: number, y2: number, out: Array<number>, o: number, tangents: boolean): void;
    }
}
declare module "core/Skin" {
    import { Attachment } from "core/attachments/index";
    import { Skeleton } from "core/Skeleton";
    import { Map } from "core/Utils";
    export class Skin {
        name: string;
        attachments: Map<Attachment>[];
        constructor(name: string);
        addAttachment(slotIndex: number, name: string, attachment: Attachment): void;
        getAttachment(slotIndex: number, name: string): Attachment;
        attachAll(skeleton: Skeleton, oldSkin: Skin): void;
    }
}
declare module "core/EventData" {
    export class EventData {
        name: string;
        intValue: number;
        floatValue: number;
        stringValue: string;
        constructor(name: string);
    }
}
declare module "core/Event" {
    import { EventData } from "core/EventData";
    export class Event {
        data: EventData;
        intValue: number;
        floatValue: number;
        stringValue: string;
        time: number;
        constructor(time: number, data: EventData);
    }
}
declare module "core/Animation" {
    import { Event } from "core/Event";
    import { Skeleton } from "core/Skeleton";
    import { VertexAttachment } from "core/attachments/index";
    export class Animation {
        name: string;
        timelines: Array<Timeline>;
        duration: number;
        constructor(name: string, timelines: Array<Timeline>, duration: number);
        apply(skeleton: Skeleton, lastTime: number, time: number, loop: boolean, events: Array<Event>): void;
        mix(skeleton: Skeleton, lastTime: number, time: number, loop: boolean, events: Array<Event>, alpha: number): void;
        static binarySearch(values: ArrayLike<number>, target: number, step?: number): number;
        static linearSearch(values: ArrayLike<number>, target: number, step: number): number;
    }
    export interface Timeline {
        apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number): void;
    }
    export abstract class CurveTimeline implements Timeline {
        static LINEAR: number;
        static STEPPED: number;
        static BEZIER: number;
        static BEZIER_SIZE: number;
        private curves;
        constructor(frameCount: number);
        getFrameCount(): number;
        setLinear(frameIndex: number): void;
        setStepped(frameIndex: number): void;
        getCurveType(frameIndex: number): number;
        setCurve(frameIndex: number, cx1: number, cy1: number, cx2: number, cy2: number): void;
        getCurvePercent(frameIndex: number, percent: number): number;
        abstract apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number): void;
    }
    export class RotateTimeline extends CurveTimeline {
        static ENTRIES: number;
        static PREV_TIME: number;
        static PREV_ROTATION: number;
        static ROTATION: number;
        boneIndex: number;
        frames: ArrayLike<number>;
        constructor(frameCount: number);
        setFrame(frameIndex: number, time: number, degrees: number): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number): void;
    }
    export class TranslateTimeline extends CurveTimeline {
        static ENTRIES: number;
        static PREV_TIME: number;
        static PREV_X: number;
        static PREV_Y: number;
        static X: number;
        static Y: number;
        boneIndex: number;
        frames: ArrayLike<number>;
        constructor(frameCount: number);
        setFrame(frameIndex: number, time: number, x: number, y: number): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number): void;
    }
    export class ScaleTimeline extends TranslateTimeline {
        constructor(frameCount: number);
        apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number): void;
    }
    export class ShearTimeline extends TranslateTimeline {
        constructor(frameCount: number);
        apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number): void;
    }
    export class ColorTimeline extends CurveTimeline {
        static ENTRIES: number;
        static PREV_TIME: number;
        static PREV_R: number;
        static PREV_G: number;
        static PREV_B: number;
        static PREV_A: number;
        static R: number;
        static G: number;
        static B: number;
        static A: number;
        slotIndex: number;
        frames: ArrayLike<number>;
        constructor(frameCount: number);
        setFrame(frameIndex: number, time: number, r: number, g: number, b: number, a: number): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number): void;
    }
    export class AttachmentTimeline implements Timeline {
        slotIndex: number;
        frames: ArrayLike<number>;
        attachmentNames: Array<string>;
        constructor(frameCount: number);
        getFrameCount(): number;
        setFrame(frameIndex: number, time: number, attachmentName: string): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number): void;
    }
    export class EventTimeline implements Timeline {
        frames: ArrayLike<number>;
        events: Array<Event>;
        constructor(frameCount: number);
        getFrameCount(): number;
        setFrame(frameIndex: number, event: Event): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number): void;
    }
    export class DrawOrderTimeline implements Timeline {
        frames: ArrayLike<number>;
        drawOrders: Array<Array<number>>;
        constructor(frameCount: number);
        getFrameCount(): number;
        setFrame(frameIndex: number, time: number, drawOrder: Array<number>): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number): void;
    }
    export class DeformTimeline extends CurveTimeline {
        frames: ArrayLike<number>;
        frameVertices: Array<ArrayLike<number>>;
        slotIndex: number;
        attachment: VertexAttachment;
        constructor(frameCount: number);
        setFrame(frameIndex: number, time: number, vertices: ArrayLike<number>): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number): void;
    }
    export class IkConstraintTimeline extends CurveTimeline {
        static ENTRIES: number;
        static PREV_TIME: number;
        static PREV_MIX: number;
        static PREV_BEND_DIRECTION: number;
        static MIX: number;
        static BEND_DIRECTION: number;
        ikConstraintIndex: number;
        frames: ArrayLike<number>;
        constructor(frameCount: number);
        setFrame(frameIndex: number, time: number, mix: number, bendDirection: number): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number): void;
    }
    export class TransformConstraintTimeline extends CurveTimeline {
        static ENTRIES: number;
        static PREV_TIME: number;
        static PREV_ROTATE: number;
        static PREV_TRANSLATE: number;
        static PREV_SCALE: number;
        static PREV_SHEAR: number;
        static ROTATE: number;
        static TRANSLATE: number;
        static SCALE: number;
        static SHEAR: number;
        transformConstraintIndex: number;
        frames: ArrayLike<number>;
        constructor(frameCount: number);
        setFrame(frameIndex: number, time: number, rotateMix: number, translateMix: number, scaleMix: number, shearMix: number): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number): void;
    }
    export class PathConstraintPositionTimeline extends CurveTimeline {
        static ENTRIES: number;
        static PREV_TIME: number;
        static PREV_VALUE: number;
        static VALUE: number;
        pathConstraintIndex: number;
        frames: ArrayLike<number>;
        constructor(frameCount: number);
        setFrame(frameIndex: number, time: number, value: number): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number): void;
    }
    export class PathConstraintSpacingTimeline extends PathConstraintPositionTimeline {
        constructor(frameCount: number);
        apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number): void;
    }
    export class PathConstraintMixTimeline extends CurveTimeline {
        static ENTRIES: number;
        static PREV_TIME: number;
        static PREV_ROTATE: number;
        static PREV_TRANSLATE: number;
        static ROTATE: number;
        static TRANSLATE: number;
        pathConstraintIndex: number;
        frames: ArrayLike<number>;
        constructor(frameCount: number);
        setFrame(frameIndex: number, time: number, rotateMix: number, translateMix: number): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number): void;
    }
}
declare module "core/SkeletonData" {
    import { BoneData } from "core/BoneData";
    import { SlotData } from "core/SlotData";
    import { Skin } from "core/Skin";
    import { EventData } from "core/EventData";
    import { Animation } from "core/Animation";
    import { IkConstraintData } from "core/IkConstraintData";
    import { TransformConstraintData } from "core/TransformConstraintData";
    import { PathConstraintData } from "core/PathConstraintData";
    export class SkeletonData {
        name: string;
        bones: BoneData[];
        slots: SlotData[];
        skins: Skin[];
        defaultSkin: Skin;
        events: EventData[];
        animations: Animation[];
        ikConstraints: IkConstraintData[];
        transformConstraints: TransformConstraintData[];
        pathConstraints: PathConstraintData[];
        width: number;
        height: number;
        version: string;
        hash: string;
        imagesPath: string;
        findBone(boneName: string): BoneData;
        findBoneIndex(boneName: string): number;
        findSlot(slotName: string): SlotData;
        findSlotIndex(slotName: string): number;
        findSkin(skinName: string): Skin;
        findEvent(eventDataName: string): EventData;
        findAnimation(animationName: string): Animation;
        findIkConstraint(constraintName: string): IkConstraintData;
        findTransformConstraint(constraintName: string): TransformConstraintData;
        findPathConstraint(constraintName: string): PathConstraintData;
        findPathConstraintIndex(pathConstraintName: string): number;
    }
}
declare module "core/Skeleton" {
    import { Slot } from "core/Slot";
    import { Bone } from "core/Bone";
    import { IkConstraint } from "core/IkConstraint";
    import { TransformConstraint } from "core/TransformConstraint";
    import { PathConstraint } from "core/PathConstraint";
    import { Color, Vector2 } from "core/Utils";
    import { Skin } from "core/Skin";
    import { SkeletonData } from "core/SkeletonData";
    import { Updatable } from "core/Updatable";
    import { Attachment } from "core/attachments/index";
    export class Skeleton {
        data: SkeletonData;
        bones: Array<Bone>;
        slots: Array<Slot>;
        drawOrder: Array<Slot>;
        ikConstraints: Array<IkConstraint>;
        ikConstraintsSorted: Array<IkConstraint>;
        transformConstraints: Array<TransformConstraint>;
        pathConstraints: Array<PathConstraint>;
        _updateCache: Updatable[];
        skin: Skin;
        color: Color;
        time: number;
        flipX: boolean;
        flipY: boolean;
        x: number;
        y: number;
        constructor(data: SkeletonData);
        updateCache(): void;
        sortPathConstraintAttachment(skin: Skin, slotIndex: number, slotBone: Bone): void;
        sortPathConstraintAttachmentWith(attachment: Attachment, slotBone: Bone): void;
        sortBone(bone: Bone): void;
        sortReset(bones: Array<Bone>): void;
        updateWorldTransform(): void;
        setToSetupPose(): void;
        setBonesToSetupPose(): void;
        setSlotsToSetupPose(): void;
        getRootBone(): Bone;
        findBone(boneName: string): Bone;
        findBoneIndex(boneName: string): number;
        findSlot(slotName: string): Slot;
        findSlotIndex(slotName: string): number;
        setSkinByName(skinName: string): void;
        setSkin(newSkin: Skin): void;
        getAttachmentByName(slotName: string, attachmentName: string): Attachment;
        getAttachment(slotIndex: number, attachmentName: string): Attachment;
        setAttachment(slotName: string, attachmentName: string): void;
        findIkConstraint(constraintName: string): IkConstraint;
        findTransformConstraint(constraintName: string): TransformConstraint;
        findPathConstraint(constraintName: string): PathConstraint;
        getBounds(offset: Vector2, size: Vector2): void;
        update(delta: number): void;
    }
}
declare module "core/Utils" {
    import { Skeleton } from "core/Skeleton";
    export interface Map<T> {
        [key: string]: T;
    }
    export interface Disposable {
        dispose(): void;
    }
    export class Color {
        r: number;
        g: number;
        b: number;
        a: number;
        static WHITE: Color;
        static RED: Color;
        static GREEN: Color;
        static BLUE: Color;
        static MAGENTA: Color;
        constructor(r?: number, g?: number, b?: number, a?: number);
        set(r: number, g: number, b: number, a: number): this;
        setFromColor(c: Color): this;
        setFromString(hex: string): this;
        add(r: number, g: number, b: number, a: number): this;
        clamp(): this;
    }
    export class MathUtils {
        static PI: number;
        static PI2: number;
        static radiansToDegrees: number;
        static radDeg: number;
        static degreesToRadians: number;
        static degRad: number;
        static clamp(value: number, min: number, max: number): number;
        static cosDeg(degrees: number): number;
        static sinDeg(degrees: number): number;
        static signum(value: number): number;
        static toInt(x: number): number;
        static cbrt(x: number): number;
    }
    export class Utils {
        static SUPPORTS_TYPED_ARRAYS: boolean;
        static arrayCopy<T>(source: ArrayLike<T>, sourceStart: number, dest: ArrayLike<T>, destStart: number, numElements: number): void;
        static setArraySize<T>(array: Array<T>, size: number, value?: any): Array<T>;
        static newArray<T>(size: number, defaultValue: T): Array<T>;
        static newFloatArray(size: number): ArrayLike<number>;
        static toFloatArray(array: Array<number>): Float32Array | number[];
    }
    export class DebugUtils {
        static logBones(skeleton: Skeleton): void;
    }
    export class Pool<T> {
        private items;
        private instantiator;
        constructor(instantiator: () => T);
        obtain(): T;
        free(item: T): void;
        freeAll(items: ArrayLike<T>): void;
        clear(): void;
    }
    export class Vector2 {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        set(x: number, y: number): Vector2;
        length(): number;
        normalize(): this;
    }
    export class TimeKeeper {
        maxDelta: number;
        framesPerSecond: number;
        delta: number;
        totalTime: number;
        private lastTime;
        private frameCount;
        private frameTime;
        update(): void;
    }
}
declare module "core/BlendMode" {
    export enum BlendMode {
        Normal = 0,
        Additive = 1,
        Multiply = 2,
        Screen = 3,
    }
}
declare module "core/SlotData" {
    import { BoneData } from "core/BoneData";
    import { Color } from "core/Utils";
    import { BlendMode } from "core/BlendMode";
    export class SlotData {
        index: number;
        name: string;
        boneData: BoneData;
        color: Color;
        attachmentName: string;
        blendMode: BlendMode;
        constructor(index: number, name: string, boneData: BoneData);
    }
}
declare module "core/Slot" {
    import { Attachment } from "core/attachments/index";
    import { SlotData } from "core/SlotData";
    import { Bone } from "core/Bone";
    import { Color } from "core/Utils";
    export class Slot {
        data: SlotData;
        bone: Bone;
        color: Color;
        private attachment;
        private attachmentTime;
        attachmentVertices: number[];
        constructor(data: SlotData, bone: Bone);
        getAttachment(): Attachment;
        setAttachment(attachment: Attachment): void;
        setAttachmentTime(time: number): void;
        getAttachmentTime(): number;
        setToSetupPose(): void;
    }
}
declare module "core/attachments/Attachment" {
    import { Slot } from "core/Slot";
    export abstract class Attachment {
        name: string;
        constructor(name: string);
    }
    export abstract class VertexAttachment extends Attachment {
        bones: Array<number>;
        vertices: ArrayLike<number>;
        worldVerticesLength: number;
        constructor(name: string);
        computeWorldVertices(slot: Slot, worldVertices: ArrayLike<number>): void;
        computeWorldVerticesWith(slot: Slot, start: number, count: number, worldVertices: ArrayLike<number>, offset: number): void;
        applyDeform(sourceAttachment: VertexAttachment): boolean;
    }
}
declare module "core/Texture" {
    export abstract class Texture {
        protected _image: HTMLImageElement;
        constructor(image: HTMLImageElement);
        getImage(): HTMLImageElement;
        abstract setFilters(minFilter: TextureFilter, magFilter: TextureFilter): void;
        abstract setWraps(uWrap: TextureWrap, vWrap: TextureWrap): void;
        abstract dispose(): void;
        static filterFromString(text: string): TextureFilter;
        static wrapFromString(text: string): TextureWrap;
    }
    export enum TextureFilter {
        Nearest = 9728,
        Linear = 9729,
        MipMap = 9987,
        MipMapNearestNearest = 9984,
        MipMapLinearNearest = 9985,
        MipMapNearestLinear = 9986,
        MipMapLinearLinear = 9987,
    }
    export enum TextureWrap {
        MirroredRepeat = 33648,
        ClampToEdge = 33071,
        Repeat = 10497,
    }
    export class TextureRegion {
        renderObject: any;
        u: number;
        v: number;
        u2: number;
        v2: number;
        width: number;
        height: number;
        rotate: boolean;
        offsetX: number;
        offsetY: number;
        originalWidth: number;
        originalHeight: number;
    }
}
declare module "core/attachments/RegionAttachment" {
    import { Attachment } from "core/attachments/Attachment";
    import { Color } from "core/Utils";
    import { TextureRegion } from "core/Texture";
    import { Slot } from "core/Slot";
    export class RegionAttachment extends Attachment {
        static OX1: number;
        static OY1: number;
        static OX2: number;
        static OY2: number;
        static OX3: number;
        static OY3: number;
        static OX4: number;
        static OY4: number;
        static X1: number;
        static Y1: number;
        static C1R: number;
        static C1G: number;
        static C1B: number;
        static C1A: number;
        static U1: number;
        static V1: number;
        static X2: number;
        static Y2: number;
        static C2R: number;
        static C2G: number;
        static C2B: number;
        static C2A: number;
        static U2: number;
        static V2: number;
        static X3: number;
        static Y3: number;
        static C3R: number;
        static C3G: number;
        static C3B: number;
        static C3A: number;
        static U3: number;
        static V3: number;
        static X4: number;
        static Y4: number;
        static C4R: number;
        static C4G: number;
        static C4B: number;
        static C4A: number;
        static U4: number;
        static V4: number;
        x: number;
        y: number;
        scaleX: number;
        scaleY: number;
        rotation: number;
        width: number;
        height: number;
        color: Color;
        path: string;
        rendererObject: any;
        region: TextureRegion;
        offset: ArrayLike<number>;
        vertices: ArrayLike<number>;
        tempColor: Color;
        constructor(name: string);
        setRegion(region: TextureRegion): void;
        updateOffset(): void;
        updateWorldVertices(slot: Slot, premultipliedAlpha: boolean): ArrayLike<number>;
    }
}
declare module "core/attachments/MeshAttachment" {
    import { VertexAttachment } from "core/attachments/Attachment";
    import { TextureRegion } from "core/Texture";
    import { Color } from "core/Utils";
    import { Slot } from "core/Slot";
    export class MeshAttachment extends VertexAttachment {
        region: TextureRegion;
        path: string;
        regionUVs: ArrayLike<number>;
        worldVertices: ArrayLike<number>;
        triangles: Array<number>;
        color: Color;
        hullLength: number;
        private parentMesh;
        inheritDeform: boolean;
        tempColor: Color;
        constructor(name: string);
        updateUVs(): void;
        updateWorldVertices(slot: Slot, premultipliedAlpha: boolean): ArrayLike<number>;
        applyDeform(sourceAttachment: VertexAttachment): boolean;
        getParentMesh(): MeshAttachment;
        setParentMesh(parentMesh: MeshAttachment): void;
    }
}
declare module "core/attachments/BoundingBoxAttachment" {
    import { VertexAttachment } from "core/attachments/Attachment";
    import { Color } from "core/Utils";
    export class BoundingBoxAttachment extends VertexAttachment {
        color: Color;
        constructor(name: string);
    }
}
declare module "core/attachments/PathAttachment" {
    import { VertexAttachment } from "core/attachments/Attachment";
    import { Color } from "core/Utils";
    export class PathAttachment extends VertexAttachment {
        lengths: Array<number>;
        closed: boolean;
        constantSpeed: boolean;
        color: Color;
        constructor(name: string);
    }
}
declare module "core/attachments/AttachmentLoader" {
    import { Skin } from "core/Skin";
    import { RegionAttachment } from "core/attachments/RegionAttachment";
    import { MeshAttachment } from "core/attachments/MeshAttachment";
    import { BoundingBoxAttachment } from "core/attachments/BoundingBoxAttachment";
    import { PathAttachment } from "core/attachments/PathAttachment";
    export interface AttachmentLoader {
        newRegionAttachment(skin: Skin, name: string, path: string): RegionAttachment;
        newMeshAttachment(skin: Skin, name: string, path: string): MeshAttachment;
        newBoundingBoxAttachment(skin: Skin, name: string): BoundingBoxAttachment;
        newPathAttachment(skin: Skin, name: string): PathAttachment;
    }
}
declare module "core/attachments/AttachmentType" {
    export enum AttachmentType {
        Region = 0,
        BoundingBox = 1,
        Mesh = 2,
        LinkedMesh = 3,
        Path = 4,
    }
}
declare module "core/attachments/index" {
    export { Attachment, VertexAttachment } from "core/attachments/Attachment";
    export { AttachmentLoader } from "core/attachments/AttachmentLoader";
    export { AttachmentType } from "core/attachments/AttachmentType";
    export { BoundingBoxAttachment } from "core/attachments/BoundingBoxAttachment";
    export { MeshAttachment } from "core/attachments/MeshAttachment";
    export { PathAttachment } from "core/attachments/PathAttachment";
    export { RegionAttachment } from "core/attachments/RegionAttachment";
}
declare module "core/AnimationStateData" {
    import { Animation } from "core/Animation";
    import { SkeletonData } from "core/SkeletonData";
    import { Map } from "core/Utils";
    export class AnimationStateData {
        skeletonData: SkeletonData;
        animationToMixTime: Map<number>;
        defaultMix: number;
        constructor(skeletonData: SkeletonData);
        setMix(fromName: string, toName: string, duration: number): void;
        setMixWith(from: Animation, to: Animation, duration: number): void;
        getMix(from: Animation, to: Animation): number;
    }
}
declare module "core/AssetManager" {
    import { Disposable, Map } from "core/Utils";
    export class AssetManager implements Disposable {
        private pathPrefix;
        private textureLoader;
        private assets;
        private errors;
        private toLoad;
        private loaded;
        constructor(textureLoader: (image: HTMLImageElement) => any, pathPrefix?: string);
        loadText(path: string, success?: (path: string, text: string) => void, error?: (path: string, error: string) => void): void;
        loadTexture(path: string, success?: (path: string, image: HTMLImageElement) => void, error?: (path: string, error: string) => void): void;
        get(path: string): any;
        remove(path: string): void;
        removeAll(): void;
        isLoadingComplete(): boolean;
        getToLoad(): number;
        getLoaded(): number;
        dispose(): void;
        hasErrors(): boolean;
        getErrors(): Map<string>;
    }
}
declare module "core/SharedAssetManager" {
    import { Disposable, Map } from "core/Utils";
    export class SharedAssetManager implements Disposable {
        private pathPrefix;
        private clientAssets;
        private queuedAssets;
        private rawAssets;
        private errors;
        constructor(pathPrefix?: string);
        private queueAsset(clientId, textureLoader, path);
        loadText(clientId: string, path: string): void;
        loadJson(clientId: string, path: string): void;
        loadTexture(clientId: string, textureLoader: (image: HTMLImageElement) => any, path: string): void;
        get(clientId: string, path: string): any;
        private updateClientAssets(clientAssets);
        isLoadingComplete(clientId: string): boolean;
        dispose(): void;
        hasErrors(): boolean;
        getErrors(): Map<string>;
    }
}
declare module "core/SkeletonBounds" {
    import { Skeleton } from "core/Skeleton";
    import { BoundingBoxAttachment } from "core/attachments/index";
    export class SkeletonBounds {
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
        boundingBoxes: BoundingBoxAttachment[];
        polygons: ArrayLike<number>[];
        private polygonPool;
        update(skeleton: Skeleton, updateAabb: boolean): void;
        aabbCompute(): void;
        aabbContainsPoint(x: number, y: number): boolean;
        aabbIntersectsSegment(x1: number, y1: number, x2: number, y2: number): boolean;
        aabbIntersectsSkeleton(bounds: SkeletonBounds): boolean;
        containsPoint(x: number, y: number): BoundingBoxAttachment;
        containsPointPolygon(polygon: ArrayLike<number>, x: number, y: number): boolean;
        intersectsSegment(x1: number, y1: number, x2: number, y2: number): BoundingBoxAttachment;
        intersectsSegmentPolygon(polygon: ArrayLike<number>, x1: number, y1: number, x2: number, y2: number): boolean;
        getPolygon(boundingBox: BoundingBoxAttachment): ArrayLike<number>;
        getWidth(): number;
        getHeight(): number;
    }
}
declare module "core/SkeletonJson" {
    import { SkeletonData } from "core/SkeletonData";
    import { PositionMode, SpacingMode, RotateMode } from "core/PathConstraintData";
    import { Skin } from "core/Skin";
    import { Attachment, AttachmentLoader, VertexAttachment } from "core/attachments/index";
    import { CurveTimeline } from "core/Animation";
    import { BlendMode } from "core/BlendMode";
    export class SkeletonJson {
        attachmentLoader: AttachmentLoader;
        scale: number;
        private linkedMeshes;
        constructor(attachmentLoader: AttachmentLoader);
        readSkeletonData(json: string | any): SkeletonData;
        readAttachment(map: any, skin: Skin, slotIndex: number, name: string): Attachment;
        readVertices(map: any, attachment: VertexAttachment, verticesLength: number): void;
        readAnimation(map: any, name: string, skeletonData: SkeletonData): void;
        readCurve(map: any, timeline: CurveTimeline, frameIndex: number): void;
        getValue(map: any, prop: string, defaultValue: any): any;
        static blendModeFromString(str: string): BlendMode;
        static positionModeFromString(str: string): PositionMode;
        static spacingModeFromString(str: string): SpacingMode;
        static rotateModeFromString(str: string): RotateMode;
    }
}
declare module "core/TextureAtlas" {
    import { Disposable } from "core/Utils";
    import { Texture, TextureWrap, TextureRegion, TextureFilter } from "core/Texture";
    export class TextureAtlas implements Disposable {
        pages: TextureAtlasPage[];
        regions: TextureAtlasRegion[];
        constructor(atlasText: string, textureLoader: (path: string) => any);
        private load(atlasText, textureLoader);
        findRegion(name: string): TextureAtlasRegion;
        dispose(): void;
    }
    export class TextureAtlasPage {
        name: string;
        minFilter: TextureFilter;
        magFilter: TextureFilter;
        uWrap: TextureWrap;
        vWrap: TextureWrap;
        texture: Texture;
        width: number;
        height: number;
    }
    export class TextureAtlasRegion extends TextureRegion {
        page: TextureAtlasPage;
        name: string;
        x: number;
        y: number;
        index: number;
        rotate: boolean;
        texture: Texture;
    }
}
declare module "core/TextureAtlasAttachmentLoader" {
    import { Skin } from "core/Skin";
    import { AttachmentLoader, BoundingBoxAttachment, MeshAttachment, PathAttachment, RegionAttachment } from "core/attachments/index";
    import { TextureAtlas } from "core/TextureAtlas";
    export class TextureAtlasAttachmentLoader implements AttachmentLoader {
        atlas: TextureAtlas;
        constructor(atlas: TextureAtlas);
        newRegionAttachment(skin: Skin, name: string, path: string): RegionAttachment;
        newMeshAttachment(skin: Skin, name: string, path: string): MeshAttachment;
        newBoundingBoxAttachment(skin: Skin, name: string): BoundingBoxAttachment;
        newPathAttachment(skin: Skin, name: string): PathAttachment;
    }
}
declare module "core/index" {
    import * as attachments from "core/attachments/index";
    export { attachments };
    export { Timeline, ColorTimeline, AttachmentTimeline, RotateTimeline, TranslateTimeline, ScaleTimeline, ShearTimeline, IkConstraintTimeline, TransformConstraintTimeline, PathConstraintPositionTimeline, PathConstraintSpacingTimeline, PathConstraintMixTimeline, DeformTimeline, DrawOrderTimeline, EventTimeline, Animation, CurveTimeline } from "core/Animation";
    export { AnimationStateData } from "core/AnimationStateData";
    export { AssetManager } from "core/AssetManager";
    export { BlendMode } from "core/BlendMode";
    export { Bone } from "core/Bone";
    export { BoneData } from "core/BoneData";
    export { Event } from "core/Event";
    export { EventData } from "core/EventData";
    export { IkConstraint } from "core/IkConstraint";
    export { IkConstraintData } from "core/IkConstraintData";
    export { PathConstraint } from "core/PathConstraint";
    export { PathConstraintData, SpacingMode, RotateMode, PositionMode } from "core/PathConstraintData";
    export { SharedAssetManager } from "core/SharedAssetManager";
    export { Skeleton } from "core/Skeleton";
    export { SkeletonBounds } from "core/SkeletonBounds";
    export { SkeletonData } from "core/SkeletonData";
    export { SkeletonJson } from "core/SkeletonJson";
    export { Skin } from "core/Skin";
    export { Slot } from "core/Slot";
    export { SlotData } from "core/SlotData";
    export { Texture, TextureWrap, TextureRegion, TextureFilter } from "core/Texture";
    export { TextureAtlas } from "core/TextureAtlas";
    export { TextureAtlasAttachmentLoader } from "core/TextureAtlasAttachmentLoader";
    export { TransformConstraint } from "core/TransformConstraint";
    export { TransformConstraintData } from "core/TransformConstraintData";
    export { Updatable } from "core/Updatable";
    export { Disposable, Map, Utils, Pool, MathUtils, Color, Vector2 } from "core/Utils";
}
declare module "index" {
    import * as core from "core/index";
    export { core };
}
