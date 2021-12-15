// package: cc.arduino.cli.commands.v1
// file: cc/arduino/cli/commands/v1/upload.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as cc_arduino_cli_commands_v1_common_pb from "../../../../../cc/arduino/cli/commands/v1/common_pb";

export class UploadRequest extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): cc_arduino_cli_commands_v1_common_pb.Instance | undefined;
    setInstance(value?: cc_arduino_cli_commands_v1_common_pb.Instance): void;

    getFqbn(): string;
    setFqbn(value: string): void;

    getSketchPath(): string;
    setSketchPath(value: string): void;

    getPort(): string;
    setPort(value: string): void;

    getVerbose(): boolean;
    setVerbose(value: boolean): void;

    getVerify(): boolean;
    setVerify(value: boolean): void;

    getImportFile(): string;
    setImportFile(value: string): void;

    getImportDir(): string;
    setImportDir(value: string): void;

    getProgrammer(): string;
    setProgrammer(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UploadRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UploadRequest): UploadRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UploadRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UploadRequest;
    static deserializeBinaryFromReader(message: UploadRequest, reader: jspb.BinaryReader): UploadRequest;
}

export namespace UploadRequest {
    export type AsObject = {
        instance?: cc_arduino_cli_commands_v1_common_pb.Instance.AsObject,
        fqbn: string,
        sketchPath: string,
        port: string,
        verbose: boolean,
        verify: boolean,
        importFile: string,
        importDir: string,
        programmer: string,
    }
}

export class UploadResponse extends jspb.Message { 
    getOutStream(): Uint8Array | string;
    getOutStream_asU8(): Uint8Array;
    getOutStream_asB64(): string;
    setOutStream(value: Uint8Array | string): void;

    getErrStream(): Uint8Array | string;
    getErrStream_asU8(): Uint8Array;
    getErrStream_asB64(): string;
    setErrStream(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UploadResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UploadResponse): UploadResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UploadResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UploadResponse;
    static deserializeBinaryFromReader(message: UploadResponse, reader: jspb.BinaryReader): UploadResponse;
}

export namespace UploadResponse {
    export type AsObject = {
        outStream: Uint8Array | string,
        errStream: Uint8Array | string,
    }
}

export class UploadUsingProgrammerRequest extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): cc_arduino_cli_commands_v1_common_pb.Instance | undefined;
    setInstance(value?: cc_arduino_cli_commands_v1_common_pb.Instance): void;

    getFqbn(): string;
    setFqbn(value: string): void;

    getSketchPath(): string;
    setSketchPath(value: string): void;

    getPort(): string;
    setPort(value: string): void;

    getVerbose(): boolean;
    setVerbose(value: boolean): void;

    getVerify(): boolean;
    setVerify(value: boolean): void;

    getImportFile(): string;
    setImportFile(value: string): void;

    getImportDir(): string;
    setImportDir(value: string): void;

    getProgrammer(): string;
    setProgrammer(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UploadUsingProgrammerRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UploadUsingProgrammerRequest): UploadUsingProgrammerRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UploadUsingProgrammerRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UploadUsingProgrammerRequest;
    static deserializeBinaryFromReader(message: UploadUsingProgrammerRequest, reader: jspb.BinaryReader): UploadUsingProgrammerRequest;
}

export namespace UploadUsingProgrammerRequest {
    export type AsObject = {
        instance?: cc_arduino_cli_commands_v1_common_pb.Instance.AsObject,
        fqbn: string,
        sketchPath: string,
        port: string,
        verbose: boolean,
        verify: boolean,
        importFile: string,
        importDir: string,
        programmer: string,
    }
}

export class UploadUsingProgrammerResponse extends jspb.Message { 
    getOutStream(): Uint8Array | string;
    getOutStream_asU8(): Uint8Array;
    getOutStream_asB64(): string;
    setOutStream(value: Uint8Array | string): void;

    getErrStream(): Uint8Array | string;
    getErrStream_asU8(): Uint8Array;
    getErrStream_asB64(): string;
    setErrStream(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UploadUsingProgrammerResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UploadUsingProgrammerResponse): UploadUsingProgrammerResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UploadUsingProgrammerResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UploadUsingProgrammerResponse;
    static deserializeBinaryFromReader(message: UploadUsingProgrammerResponse, reader: jspb.BinaryReader): UploadUsingProgrammerResponse;
}

export namespace UploadUsingProgrammerResponse {
    export type AsObject = {
        outStream: Uint8Array | string,
        errStream: Uint8Array | string,
    }
}

export class BurnBootloaderRequest extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): cc_arduino_cli_commands_v1_common_pb.Instance | undefined;
    setInstance(value?: cc_arduino_cli_commands_v1_common_pb.Instance): void;

    getFqbn(): string;
    setFqbn(value: string): void;

    getPort(): string;
    setPort(value: string): void;

    getVerbose(): boolean;
    setVerbose(value: boolean): void;

    getVerify(): boolean;
    setVerify(value: boolean): void;

    getProgrammer(): string;
    setProgrammer(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BurnBootloaderRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BurnBootloaderRequest): BurnBootloaderRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BurnBootloaderRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BurnBootloaderRequest;
    static deserializeBinaryFromReader(message: BurnBootloaderRequest, reader: jspb.BinaryReader): BurnBootloaderRequest;
}

export namespace BurnBootloaderRequest {
    export type AsObject = {
        instance?: cc_arduino_cli_commands_v1_common_pb.Instance.AsObject,
        fqbn: string,
        port: string,
        verbose: boolean,
        verify: boolean,
        programmer: string,
    }
}

export class BurnBootloaderResponse extends jspb.Message { 
    getOutStream(): Uint8Array | string;
    getOutStream_asU8(): Uint8Array;
    getOutStream_asB64(): string;
    setOutStream(value: Uint8Array | string): void;

    getErrStream(): Uint8Array | string;
    getErrStream_asU8(): Uint8Array;
    getErrStream_asB64(): string;
    setErrStream(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BurnBootloaderResponse.AsObject;
    static toObject(includeInstance: boolean, msg: BurnBootloaderResponse): BurnBootloaderResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BurnBootloaderResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BurnBootloaderResponse;
    static deserializeBinaryFromReader(message: BurnBootloaderResponse, reader: jspb.BinaryReader): BurnBootloaderResponse;
}

export namespace BurnBootloaderResponse {
    export type AsObject = {
        outStream: Uint8Array | string,
        errStream: Uint8Array | string,
    }
}

export class ListProgrammersAvailableForUploadRequest extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): cc_arduino_cli_commands_v1_common_pb.Instance | undefined;
    setInstance(value?: cc_arduino_cli_commands_v1_common_pb.Instance): void;

    getFqbn(): string;
    setFqbn(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListProgrammersAvailableForUploadRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListProgrammersAvailableForUploadRequest): ListProgrammersAvailableForUploadRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListProgrammersAvailableForUploadRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListProgrammersAvailableForUploadRequest;
    static deserializeBinaryFromReader(message: ListProgrammersAvailableForUploadRequest, reader: jspb.BinaryReader): ListProgrammersAvailableForUploadRequest;
}

export namespace ListProgrammersAvailableForUploadRequest {
    export type AsObject = {
        instance?: cc_arduino_cli_commands_v1_common_pb.Instance.AsObject,
        fqbn: string,
    }
}

export class ListProgrammersAvailableForUploadResponse extends jspb.Message { 
    clearProgrammersList(): void;
    getProgrammersList(): Array<cc_arduino_cli_commands_v1_common_pb.Programmer>;
    setProgrammersList(value: Array<cc_arduino_cli_commands_v1_common_pb.Programmer>): void;
    addProgrammers(value?: cc_arduino_cli_commands_v1_common_pb.Programmer, index?: number): cc_arduino_cli_commands_v1_common_pb.Programmer;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListProgrammersAvailableForUploadResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListProgrammersAvailableForUploadResponse): ListProgrammersAvailableForUploadResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListProgrammersAvailableForUploadResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListProgrammersAvailableForUploadResponse;
    static deserializeBinaryFromReader(message: ListProgrammersAvailableForUploadResponse, reader: jspb.BinaryReader): ListProgrammersAvailableForUploadResponse;
}

export namespace ListProgrammersAvailableForUploadResponse {
    export type AsObject = {
        programmersList: Array<cc_arduino_cli_commands_v1_common_pb.Programmer.AsObject>,
    }
}
