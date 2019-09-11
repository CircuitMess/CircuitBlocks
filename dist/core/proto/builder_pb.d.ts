// package: proto
// file: builder.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class BuildParams extends jspb.Message { 
    getHardwarefolders(): string;
    setHardwarefolders(value: string): void;

    getToolsfolders(): string;
    setToolsfolders(value: string): void;

    getBuiltinlibrariesfolders(): string;
    setBuiltinlibrariesfolders(value: string): void;

    getOtherlibrariesfolders(): string;
    setOtherlibrariesfolders(value: string): void;

    getSketchlocation(): string;
    setSketchlocation(value: string): void;

    getFqbn(): string;
    setFqbn(value: string): void;

    getArduinoapiversion(): string;
    setArduinoapiversion(value: string): void;

    getCustombuildproperties(): string;
    setCustombuildproperties(value: string): void;

    getBuildcachepath(): string;
    setBuildcachepath(value: string): void;

    getBuildpath(): string;
    setBuildpath(value: string): void;

    getWarningslevel(): string;
    setWarningslevel(value: string): void;

    getCodecompleteat(): string;
    setCodecompleteat(value: string): void;

    getVerbose(): boolean;
    setVerbose(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BuildParams.AsObject;
    static toObject(includeInstance: boolean, msg: BuildParams): BuildParams.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BuildParams, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BuildParams;
    static deserializeBinaryFromReader(message: BuildParams, reader: jspb.BinaryReader): BuildParams;
}

export namespace BuildParams {
    export type AsObject = {
        hardwarefolders: string,
        toolsfolders: string,
        builtinlibrariesfolders: string,
        otherlibrariesfolders: string,
        sketchlocation: string,
        fqbn: string,
        arduinoapiversion: string,
        custombuildproperties: string,
        buildcachepath: string,
        buildpath: string,
        warningslevel: string,
        codecompleteat: string,
        verbose: boolean,
    }
}

export class VerboseParams extends jspb.Message { 
    getVerbose(): boolean;
    setVerbose(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VerboseParams.AsObject;
    static toObject(includeInstance: boolean, msg: VerboseParams): VerboseParams.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VerboseParams, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VerboseParams;
    static deserializeBinaryFromReader(message: VerboseParams, reader: jspb.BinaryReader): VerboseParams;
}

export namespace VerboseParams {
    export type AsObject = {
        verbose: boolean,
    }
}

export class Response extends jspb.Message { 
    getLine(): string;
    setLine(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Response.AsObject;
    static toObject(includeInstance: boolean, msg: Response): Response.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Response, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Response;
    static deserializeBinaryFromReader(message: Response, reader: jspb.BinaryReader): Response;
}

export namespace Response {
    export type AsObject = {
        line: string,
    }
}
