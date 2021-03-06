// package: cc.arduino.cli.commands
// file: commands.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";
import * as board_pb from "./board_pb";
import * as compile_pb from "./compile_pb";
import * as core_pb from "./core_pb";
import * as upload_pb from "./upload_pb";
import * as lib_pb from "./lib_pb";

export class Configuration extends jspb.Message { 
    getDatadir(): string;
    setDatadir(value: string): void;

    getSketchbookdir(): string;
    setSketchbookdir(value: string): void;

    getDownloadsdir(): string;
    setDownloadsdir(value: string): void;

    clearBoardmanageradditionalurlsList(): void;
    getBoardmanageradditionalurlsList(): Array<string>;
    setBoardmanageradditionalurlsList(value: Array<string>): void;
    addBoardmanageradditionalurls(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Configuration.AsObject;
    static toObject(includeInstance: boolean, msg: Configuration): Configuration.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Configuration, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Configuration;
    static deserializeBinaryFromReader(message: Configuration, reader: jspb.BinaryReader): Configuration;
}

export namespace Configuration {
    export type AsObject = {
        datadir: string,
        sketchbookdir: string,
        downloadsdir: string,
        boardmanageradditionalurlsList: Array<string>,
    }
}

export class InitReq extends jspb.Message { 

    hasConfiguration(): boolean;
    clearConfiguration(): void;
    getConfiguration(): Configuration | undefined;
    setConfiguration(value?: Configuration): void;

    getLibraryManagerOnly(): boolean;
    setLibraryManagerOnly(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InitReq.AsObject;
    static toObject(includeInstance: boolean, msg: InitReq): InitReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InitReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InitReq;
    static deserializeBinaryFromReader(message: InitReq, reader: jspb.BinaryReader): InitReq;
}

export namespace InitReq {
    export type AsObject = {
        configuration?: Configuration.AsObject,
        libraryManagerOnly: boolean,
    }
}

export class InitResp extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): common_pb.Instance | undefined;
    setInstance(value?: common_pb.Instance): void;

    clearPlatformsIndexErrorsList(): void;
    getPlatformsIndexErrorsList(): Array<string>;
    setPlatformsIndexErrorsList(value: Array<string>): void;
    addPlatformsIndexErrors(value: string, index?: number): string;

    getLibrariesIndexError(): string;
    setLibrariesIndexError(value: string): void;


    hasDownloadProgress(): boolean;
    clearDownloadProgress(): void;
    getDownloadProgress(): common_pb.DownloadProgress | undefined;
    setDownloadProgress(value?: common_pb.DownloadProgress): void;


    hasTaskProgress(): boolean;
    clearTaskProgress(): void;
    getTaskProgress(): common_pb.TaskProgress | undefined;
    setTaskProgress(value?: common_pb.TaskProgress): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InitResp.AsObject;
    static toObject(includeInstance: boolean, msg: InitResp): InitResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InitResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InitResp;
    static deserializeBinaryFromReader(message: InitResp, reader: jspb.BinaryReader): InitResp;
}

export namespace InitResp {
    export type AsObject = {
        instance?: common_pb.Instance.AsObject,
        platformsIndexErrorsList: Array<string>,
        librariesIndexError: string,
        downloadProgress?: common_pb.DownloadProgress.AsObject,
        taskProgress?: common_pb.TaskProgress.AsObject,
    }
}

export class DestroyReq extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): common_pb.Instance | undefined;
    setInstance(value?: common_pb.Instance): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DestroyReq.AsObject;
    static toObject(includeInstance: boolean, msg: DestroyReq): DestroyReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DestroyReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DestroyReq;
    static deserializeBinaryFromReader(message: DestroyReq, reader: jspb.BinaryReader): DestroyReq;
}

export namespace DestroyReq {
    export type AsObject = {
        instance?: common_pb.Instance.AsObject,
    }
}

export class DestroyResp extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DestroyResp.AsObject;
    static toObject(includeInstance: boolean, msg: DestroyResp): DestroyResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DestroyResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DestroyResp;
    static deserializeBinaryFromReader(message: DestroyResp, reader: jspb.BinaryReader): DestroyResp;
}

export namespace DestroyResp {
    export type AsObject = {
    }
}

export class RescanReq extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): common_pb.Instance | undefined;
    setInstance(value?: common_pb.Instance): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RescanReq.AsObject;
    static toObject(includeInstance: boolean, msg: RescanReq): RescanReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RescanReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RescanReq;
    static deserializeBinaryFromReader(message: RescanReq, reader: jspb.BinaryReader): RescanReq;
}

export namespace RescanReq {
    export type AsObject = {
        instance?: common_pb.Instance.AsObject,
    }
}

export class RescanResp extends jspb.Message { 
    clearPlatformsIndexErrorsList(): void;
    getPlatformsIndexErrorsList(): Array<string>;
    setPlatformsIndexErrorsList(value: Array<string>): void;
    addPlatformsIndexErrors(value: string, index?: number): string;

    getLibrariesIndexError(): string;
    setLibrariesIndexError(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RescanResp.AsObject;
    static toObject(includeInstance: boolean, msg: RescanResp): RescanResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RescanResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RescanResp;
    static deserializeBinaryFromReader(message: RescanResp, reader: jspb.BinaryReader): RescanResp;
}

export namespace RescanResp {
    export type AsObject = {
        platformsIndexErrorsList: Array<string>,
        librariesIndexError: string,
    }
}

export class UpdateIndexReq extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): common_pb.Instance | undefined;
    setInstance(value?: common_pb.Instance): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateIndexReq.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateIndexReq): UpdateIndexReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateIndexReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateIndexReq;
    static deserializeBinaryFromReader(message: UpdateIndexReq, reader: jspb.BinaryReader): UpdateIndexReq;
}

export namespace UpdateIndexReq {
    export type AsObject = {
        instance?: common_pb.Instance.AsObject,
    }
}

export class UpdateIndexResp extends jspb.Message { 

    hasDownloadProgress(): boolean;
    clearDownloadProgress(): void;
    getDownloadProgress(): common_pb.DownloadProgress | undefined;
    setDownloadProgress(value?: common_pb.DownloadProgress): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateIndexResp.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateIndexResp): UpdateIndexResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateIndexResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateIndexResp;
    static deserializeBinaryFromReader(message: UpdateIndexResp, reader: jspb.BinaryReader): UpdateIndexResp;
}

export namespace UpdateIndexResp {
    export type AsObject = {
        downloadProgress?: common_pb.DownloadProgress.AsObject,
    }
}

export class UpdateLibrariesIndexReq extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): common_pb.Instance | undefined;
    setInstance(value?: common_pb.Instance): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateLibrariesIndexReq.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateLibrariesIndexReq): UpdateLibrariesIndexReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateLibrariesIndexReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateLibrariesIndexReq;
    static deserializeBinaryFromReader(message: UpdateLibrariesIndexReq, reader: jspb.BinaryReader): UpdateLibrariesIndexReq;
}

export namespace UpdateLibrariesIndexReq {
    export type AsObject = {
        instance?: common_pb.Instance.AsObject,
    }
}

export class UpdateLibrariesIndexResp extends jspb.Message { 

    hasDownloadProgress(): boolean;
    clearDownloadProgress(): void;
    getDownloadProgress(): common_pb.DownloadProgress | undefined;
    setDownloadProgress(value?: common_pb.DownloadProgress): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateLibrariesIndexResp.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateLibrariesIndexResp): UpdateLibrariesIndexResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateLibrariesIndexResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateLibrariesIndexResp;
    static deserializeBinaryFromReader(message: UpdateLibrariesIndexResp, reader: jspb.BinaryReader): UpdateLibrariesIndexResp;
}

export namespace UpdateLibrariesIndexResp {
    export type AsObject = {
        downloadProgress?: common_pb.DownloadProgress.AsObject,
    }
}

export class VersionReq extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VersionReq.AsObject;
    static toObject(includeInstance: boolean, msg: VersionReq): VersionReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VersionReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VersionReq;
    static deserializeBinaryFromReader(message: VersionReq, reader: jspb.BinaryReader): VersionReq;
}

export namespace VersionReq {
    export type AsObject = {
    }
}

export class VersionResp extends jspb.Message { 
    getVersion(): string;
    setVersion(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VersionResp.AsObject;
    static toObject(includeInstance: boolean, msg: VersionResp): VersionResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VersionResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VersionResp;
    static deserializeBinaryFromReader(message: VersionResp, reader: jspb.BinaryReader): VersionResp;
}

export namespace VersionResp {
    export type AsObject = {
        version: string,
    }
}
