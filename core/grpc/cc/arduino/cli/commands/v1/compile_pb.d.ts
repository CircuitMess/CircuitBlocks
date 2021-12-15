// package: cc.arduino.cli.commands.v1
// file: cc/arduino/cli/commands/v1/compile.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";
import * as cc_arduino_cli_commands_v1_common_pb from "../../../../../cc/arduino/cli/commands/v1/common_pb";
import * as cc_arduino_cli_commands_v1_lib_pb from "../../../../../cc/arduino/cli/commands/v1/lib_pb";

export class CompileRequest extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): cc_arduino_cli_commands_v1_common_pb.Instance | undefined;
    setInstance(value?: cc_arduino_cli_commands_v1_common_pb.Instance): void;

    getFqbn(): string;
    setFqbn(value: string): void;

    getSketchPath(): string;
    setSketchPath(value: string): void;

    getShowProperties(): boolean;
    setShowProperties(value: boolean): void;

    getPreprocess(): boolean;
    setPreprocess(value: boolean): void;

    getBuildCachePath(): string;
    setBuildCachePath(value: string): void;

    getBuildPath(): string;
    setBuildPath(value: string): void;

    clearBuildPropertiesList(): void;
    getBuildPropertiesList(): Array<string>;
    setBuildPropertiesList(value: Array<string>): void;
    addBuildProperties(value: string, index?: number): string;

    getWarnings(): string;
    setWarnings(value: string): void;

    getVerbose(): boolean;
    setVerbose(value: boolean): void;

    getQuiet(): boolean;
    setQuiet(value: boolean): void;

    getVidPid(): string;
    setVidPid(value: string): void;

    getJobs(): number;
    setJobs(value: number): void;

    clearLibrariesList(): void;
    getLibrariesList(): Array<string>;
    setLibrariesList(value: Array<string>): void;
    addLibraries(value: string, index?: number): string;

    getOptimizeForDebug(): boolean;
    setOptimizeForDebug(value: boolean): void;

    getExportDir(): string;
    setExportDir(value: string): void;

    getClean(): boolean;
    setClean(value: boolean): void;

    getCreateCompilationDatabaseOnly(): boolean;
    setCreateCompilationDatabaseOnly(value: boolean): void;


    getSourceOverrideMap(): jspb.Map<string, string>;
    clearSourceOverrideMap(): void;


    hasExportBinaries(): boolean;
    clearExportBinaries(): void;
    getExportBinaries(): google_protobuf_wrappers_pb.BoolValue | undefined;
    setExportBinaries(value?: google_protobuf_wrappers_pb.BoolValue): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CompileRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CompileRequest): CompileRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CompileRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CompileRequest;
    static deserializeBinaryFromReader(message: CompileRequest, reader: jspb.BinaryReader): CompileRequest;
}

export namespace CompileRequest {
    export type AsObject = {
        instance?: cc_arduino_cli_commands_v1_common_pb.Instance.AsObject,
        fqbn: string,
        sketchPath: string,
        showProperties: boolean,
        preprocess: boolean,
        buildCachePath: string,
        buildPath: string,
        buildPropertiesList: Array<string>,
        warnings: string,
        verbose: boolean,
        quiet: boolean,
        vidPid: string,
        jobs: number,
        librariesList: Array<string>,
        optimizeForDebug: boolean,
        exportDir: string,
        clean: boolean,
        createCompilationDatabaseOnly: boolean,

        sourceOverrideMap: Array<[string, string]>,
        exportBinaries?: google_protobuf_wrappers_pb.BoolValue.AsObject,
    }
}

export class CompileResponse extends jspb.Message { 
    getOutStream(): Uint8Array | string;
    getOutStream_asU8(): Uint8Array;
    getOutStream_asB64(): string;
    setOutStream(value: Uint8Array | string): void;

    getErrStream(): Uint8Array | string;
    getErrStream_asU8(): Uint8Array;
    getErrStream_asB64(): string;
    setErrStream(value: Uint8Array | string): void;

    getBuildPath(): string;
    setBuildPath(value: string): void;

    clearUsedLibrariesList(): void;
    getUsedLibrariesList(): Array<cc_arduino_cli_commands_v1_lib_pb.Library>;
    setUsedLibrariesList(value: Array<cc_arduino_cli_commands_v1_lib_pb.Library>): void;
    addUsedLibraries(value?: cc_arduino_cli_commands_v1_lib_pb.Library, index?: number): cc_arduino_cli_commands_v1_lib_pb.Library;

    clearExecutableSectionsSizeList(): void;
    getExecutableSectionsSizeList(): Array<ExecutableSectionSize>;
    setExecutableSectionsSizeList(value: Array<ExecutableSectionSize>): void;
    addExecutableSectionsSize(value?: ExecutableSectionSize, index?: number): ExecutableSectionSize;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CompileResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CompileResponse): CompileResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CompileResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CompileResponse;
    static deserializeBinaryFromReader(message: CompileResponse, reader: jspb.BinaryReader): CompileResponse;
}

export namespace CompileResponse {
    export type AsObject = {
        outStream: Uint8Array | string,
        errStream: Uint8Array | string,
        buildPath: string,
        usedLibrariesList: Array<cc_arduino_cli_commands_v1_lib_pb.Library.AsObject>,
        executableSectionsSizeList: Array<ExecutableSectionSize.AsObject>,
    }
}

export class ExecutableSectionSize extends jspb.Message { 
    getName(): string;
    setName(value: string): void;

    getSize(): number;
    setSize(value: number): void;

    getMaxSize(): number;
    setMaxSize(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExecutableSectionSize.AsObject;
    static toObject(includeInstance: boolean, msg: ExecutableSectionSize): ExecutableSectionSize.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExecutableSectionSize, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExecutableSectionSize;
    static deserializeBinaryFromReader(message: ExecutableSectionSize, reader: jspb.BinaryReader): ExecutableSectionSize;
}

export namespace ExecutableSectionSize {
    export type AsObject = {
        name: string,
        size: number,
        maxSize: number,
    }
}
