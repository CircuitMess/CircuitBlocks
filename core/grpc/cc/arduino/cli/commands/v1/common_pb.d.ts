// package: cc.arduino.cli.commands.v1
// file: cc/arduino/cli/commands/v1/common.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Instance extends jspb.Message { 
    getId(): number;
    setId(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Instance.AsObject;
    static toObject(includeInstance: boolean, msg: Instance): Instance.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Instance, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Instance;
    static deserializeBinaryFromReader(message: Instance, reader: jspb.BinaryReader): Instance;
}

export namespace Instance {
    export type AsObject = {
        id: number,
    }
}

export class DownloadProgress extends jspb.Message { 
    getUrl(): string;
    setUrl(value: string): void;

    getFile(): string;
    setFile(value: string): void;

    getTotalSize(): number;
    setTotalSize(value: number): void;

    getDownloaded(): number;
    setDownloaded(value: number): void;

    getCompleted(): boolean;
    setCompleted(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DownloadProgress.AsObject;
    static toObject(includeInstance: boolean, msg: DownloadProgress): DownloadProgress.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DownloadProgress, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DownloadProgress;
    static deserializeBinaryFromReader(message: DownloadProgress, reader: jspb.BinaryReader): DownloadProgress;
}

export namespace DownloadProgress {
    export type AsObject = {
        url: string,
        file: string,
        totalSize: number,
        downloaded: number,
        completed: boolean,
    }
}

export class TaskProgress extends jspb.Message { 
    getName(): string;
    setName(value: string): void;

    getMessage(): string;
    setMessage(value: string): void;

    getCompleted(): boolean;
    setCompleted(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TaskProgress.AsObject;
    static toObject(includeInstance: boolean, msg: TaskProgress): TaskProgress.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TaskProgress, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TaskProgress;
    static deserializeBinaryFromReader(message: TaskProgress, reader: jspb.BinaryReader): TaskProgress;
}

export namespace TaskProgress {
    export type AsObject = {
        name: string,
        message: string,
        completed: boolean,
    }
}

export class Programmer extends jspb.Message { 
    getPlatform(): string;
    setPlatform(value: string): void;

    getId(): string;
    setId(value: string): void;

    getName(): string;
    setName(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Programmer.AsObject;
    static toObject(includeInstance: boolean, msg: Programmer): Programmer.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Programmer, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Programmer;
    static deserializeBinaryFromReader(message: Programmer, reader: jspb.BinaryReader): Programmer;
}

export namespace Programmer {
    export type AsObject = {
        platform: string,
        id: string,
        name: string,
    }
}

export class Platform extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getInstalled(): string;
    setInstalled(value: string): void;

    getLatest(): string;
    setLatest(value: string): void;

    getName(): string;
    setName(value: string): void;

    getMaintainer(): string;
    setMaintainer(value: string): void;

    getWebsite(): string;
    setWebsite(value: string): void;

    getEmail(): string;
    setEmail(value: string): void;

    clearBoardsList(): void;
    getBoardsList(): Array<Board>;
    setBoardsList(value: Array<Board>): void;
    addBoards(value?: Board, index?: number): Board;

    getManuallyInstalled(): boolean;
    setManuallyInstalled(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Platform.AsObject;
    static toObject(includeInstance: boolean, msg: Platform): Platform.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Platform, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Platform;
    static deserializeBinaryFromReader(message: Platform, reader: jspb.BinaryReader): Platform;
}

export namespace Platform {
    export type AsObject = {
        id: string,
        installed: string,
        latest: string,
        name: string,
        maintainer: string,
        website: string,
        email: string,
        boardsList: Array<Board.AsObject>,
        manuallyInstalled: boolean,
    }
}

export class Board extends jspb.Message { 
    getName(): string;
    setName(value: string): void;

    getFqbn(): string;
    setFqbn(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Board.AsObject;
    static toObject(includeInstance: boolean, msg: Board): Board.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Board, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Board;
    static deserializeBinaryFromReader(message: Board, reader: jspb.BinaryReader): Board;
}

export namespace Board {
    export type AsObject = {
        name: string,
        fqbn: string,
    }
}
