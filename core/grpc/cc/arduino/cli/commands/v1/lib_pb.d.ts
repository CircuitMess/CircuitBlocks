// package: cc.arduino.cli.commands.v1
// file: cc/arduino/cli/commands/v1/lib.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as cc_arduino_cli_commands_v1_common_pb from "../../../../../cc/arduino/cli/commands/v1/common_pb";

export class LibraryDownloadRequest extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): cc_arduino_cli_commands_v1_common_pb.Instance | undefined;
    setInstance(value?: cc_arduino_cli_commands_v1_common_pb.Instance): void;

    getName(): string;
    setName(value: string): void;

    getVersion(): string;
    setVersion(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LibraryDownloadRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LibraryDownloadRequest): LibraryDownloadRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LibraryDownloadRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LibraryDownloadRequest;
    static deserializeBinaryFromReader(message: LibraryDownloadRequest, reader: jspb.BinaryReader): LibraryDownloadRequest;
}

export namespace LibraryDownloadRequest {
    export type AsObject = {
        instance?: cc_arduino_cli_commands_v1_common_pb.Instance.AsObject,
        name: string,
        version: string,
    }
}

export class LibraryDownloadResponse extends jspb.Message { 

    hasProgress(): boolean;
    clearProgress(): void;
    getProgress(): cc_arduino_cli_commands_v1_common_pb.DownloadProgress | undefined;
    setProgress(value?: cc_arduino_cli_commands_v1_common_pb.DownloadProgress): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LibraryDownloadResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LibraryDownloadResponse): LibraryDownloadResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LibraryDownloadResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LibraryDownloadResponse;
    static deserializeBinaryFromReader(message: LibraryDownloadResponse, reader: jspb.BinaryReader): LibraryDownloadResponse;
}

export namespace LibraryDownloadResponse {
    export type AsObject = {
        progress?: cc_arduino_cli_commands_v1_common_pb.DownloadProgress.AsObject,
    }
}

export class LibraryInstallRequest extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): cc_arduino_cli_commands_v1_common_pb.Instance | undefined;
    setInstance(value?: cc_arduino_cli_commands_v1_common_pb.Instance): void;

    getName(): string;
    setName(value: string): void;

    getVersion(): string;
    setVersion(value: string): void;

    getNoDeps(): boolean;
    setNoDeps(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LibraryInstallRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LibraryInstallRequest): LibraryInstallRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LibraryInstallRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LibraryInstallRequest;
    static deserializeBinaryFromReader(message: LibraryInstallRequest, reader: jspb.BinaryReader): LibraryInstallRequest;
}

export namespace LibraryInstallRequest {
    export type AsObject = {
        instance?: cc_arduino_cli_commands_v1_common_pb.Instance.AsObject,
        name: string,
        version: string,
        noDeps: boolean,
    }
}

export class LibraryInstallResponse extends jspb.Message { 

    hasProgress(): boolean;
    clearProgress(): void;
    getProgress(): cc_arduino_cli_commands_v1_common_pb.DownloadProgress | undefined;
    setProgress(value?: cc_arduino_cli_commands_v1_common_pb.DownloadProgress): void;


    hasTaskProgress(): boolean;
    clearTaskProgress(): void;
    getTaskProgress(): cc_arduino_cli_commands_v1_common_pb.TaskProgress | undefined;
    setTaskProgress(value?: cc_arduino_cli_commands_v1_common_pb.TaskProgress): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LibraryInstallResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LibraryInstallResponse): LibraryInstallResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LibraryInstallResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LibraryInstallResponse;
    static deserializeBinaryFromReader(message: LibraryInstallResponse, reader: jspb.BinaryReader): LibraryInstallResponse;
}

export namespace LibraryInstallResponse {
    export type AsObject = {
        progress?: cc_arduino_cli_commands_v1_common_pb.DownloadProgress.AsObject,
        taskProgress?: cc_arduino_cli_commands_v1_common_pb.TaskProgress.AsObject,
    }
}

export class LibraryUninstallRequest extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): cc_arduino_cli_commands_v1_common_pb.Instance | undefined;
    setInstance(value?: cc_arduino_cli_commands_v1_common_pb.Instance): void;

    getName(): string;
    setName(value: string): void;

    getVersion(): string;
    setVersion(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LibraryUninstallRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LibraryUninstallRequest): LibraryUninstallRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LibraryUninstallRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LibraryUninstallRequest;
    static deserializeBinaryFromReader(message: LibraryUninstallRequest, reader: jspb.BinaryReader): LibraryUninstallRequest;
}

export namespace LibraryUninstallRequest {
    export type AsObject = {
        instance?: cc_arduino_cli_commands_v1_common_pb.Instance.AsObject,
        name: string,
        version: string,
    }
}

export class LibraryUninstallResponse extends jspb.Message { 

    hasTaskProgress(): boolean;
    clearTaskProgress(): void;
    getTaskProgress(): cc_arduino_cli_commands_v1_common_pb.TaskProgress | undefined;
    setTaskProgress(value?: cc_arduino_cli_commands_v1_common_pb.TaskProgress): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LibraryUninstallResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LibraryUninstallResponse): LibraryUninstallResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LibraryUninstallResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LibraryUninstallResponse;
    static deserializeBinaryFromReader(message: LibraryUninstallResponse, reader: jspb.BinaryReader): LibraryUninstallResponse;
}

export namespace LibraryUninstallResponse {
    export type AsObject = {
        taskProgress?: cc_arduino_cli_commands_v1_common_pb.TaskProgress.AsObject,
    }
}

export class LibraryUpgradeAllRequest extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): cc_arduino_cli_commands_v1_common_pb.Instance | undefined;
    setInstance(value?: cc_arduino_cli_commands_v1_common_pb.Instance): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LibraryUpgradeAllRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LibraryUpgradeAllRequest): LibraryUpgradeAllRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LibraryUpgradeAllRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LibraryUpgradeAllRequest;
    static deserializeBinaryFromReader(message: LibraryUpgradeAllRequest, reader: jspb.BinaryReader): LibraryUpgradeAllRequest;
}

export namespace LibraryUpgradeAllRequest {
    export type AsObject = {
        instance?: cc_arduino_cli_commands_v1_common_pb.Instance.AsObject,
    }
}

export class LibraryUpgradeAllResponse extends jspb.Message { 

    hasProgress(): boolean;
    clearProgress(): void;
    getProgress(): cc_arduino_cli_commands_v1_common_pb.DownloadProgress | undefined;
    setProgress(value?: cc_arduino_cli_commands_v1_common_pb.DownloadProgress): void;


    hasTaskProgress(): boolean;
    clearTaskProgress(): void;
    getTaskProgress(): cc_arduino_cli_commands_v1_common_pb.TaskProgress | undefined;
    setTaskProgress(value?: cc_arduino_cli_commands_v1_common_pb.TaskProgress): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LibraryUpgradeAllResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LibraryUpgradeAllResponse): LibraryUpgradeAllResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LibraryUpgradeAllResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LibraryUpgradeAllResponse;
    static deserializeBinaryFromReader(message: LibraryUpgradeAllResponse, reader: jspb.BinaryReader): LibraryUpgradeAllResponse;
}

export namespace LibraryUpgradeAllResponse {
    export type AsObject = {
        progress?: cc_arduino_cli_commands_v1_common_pb.DownloadProgress.AsObject,
        taskProgress?: cc_arduino_cli_commands_v1_common_pb.TaskProgress.AsObject,
    }
}

export class LibraryResolveDependenciesRequest extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): cc_arduino_cli_commands_v1_common_pb.Instance | undefined;
    setInstance(value?: cc_arduino_cli_commands_v1_common_pb.Instance): void;

    getName(): string;
    setName(value: string): void;

    getVersion(): string;
    setVersion(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LibraryResolveDependenciesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LibraryResolveDependenciesRequest): LibraryResolveDependenciesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LibraryResolveDependenciesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LibraryResolveDependenciesRequest;
    static deserializeBinaryFromReader(message: LibraryResolveDependenciesRequest, reader: jspb.BinaryReader): LibraryResolveDependenciesRequest;
}

export namespace LibraryResolveDependenciesRequest {
    export type AsObject = {
        instance?: cc_arduino_cli_commands_v1_common_pb.Instance.AsObject,
        name: string,
        version: string,
    }
}

export class LibraryResolveDependenciesResponse extends jspb.Message { 
    clearDependenciesList(): void;
    getDependenciesList(): Array<LibraryDependencyStatus>;
    setDependenciesList(value: Array<LibraryDependencyStatus>): void;
    addDependencies(value?: LibraryDependencyStatus, index?: number): LibraryDependencyStatus;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LibraryResolveDependenciesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LibraryResolveDependenciesResponse): LibraryResolveDependenciesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LibraryResolveDependenciesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LibraryResolveDependenciesResponse;
    static deserializeBinaryFromReader(message: LibraryResolveDependenciesResponse, reader: jspb.BinaryReader): LibraryResolveDependenciesResponse;
}

export namespace LibraryResolveDependenciesResponse {
    export type AsObject = {
        dependenciesList: Array<LibraryDependencyStatus.AsObject>,
    }
}

export class LibraryDependencyStatus extends jspb.Message { 
    getName(): string;
    setName(value: string): void;

    getVersionRequired(): string;
    setVersionRequired(value: string): void;

    getVersionInstalled(): string;
    setVersionInstalled(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LibraryDependencyStatus.AsObject;
    static toObject(includeInstance: boolean, msg: LibraryDependencyStatus): LibraryDependencyStatus.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LibraryDependencyStatus, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LibraryDependencyStatus;
    static deserializeBinaryFromReader(message: LibraryDependencyStatus, reader: jspb.BinaryReader): LibraryDependencyStatus;
}

export namespace LibraryDependencyStatus {
    export type AsObject = {
        name: string,
        versionRequired: string,
        versionInstalled: string,
    }
}

export class LibrarySearchRequest extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): cc_arduino_cli_commands_v1_common_pb.Instance | undefined;
    setInstance(value?: cc_arduino_cli_commands_v1_common_pb.Instance): void;

    getQuery(): string;
    setQuery(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LibrarySearchRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LibrarySearchRequest): LibrarySearchRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LibrarySearchRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LibrarySearchRequest;
    static deserializeBinaryFromReader(message: LibrarySearchRequest, reader: jspb.BinaryReader): LibrarySearchRequest;
}

export namespace LibrarySearchRequest {
    export type AsObject = {
        instance?: cc_arduino_cli_commands_v1_common_pb.Instance.AsObject,
        query: string,
    }
}

export class LibrarySearchResponse extends jspb.Message { 
    clearLibrariesList(): void;
    getLibrariesList(): Array<SearchedLibrary>;
    setLibrariesList(value: Array<SearchedLibrary>): void;
    addLibraries(value?: SearchedLibrary, index?: number): SearchedLibrary;

    getStatus(): LibrarySearchStatus;
    setStatus(value: LibrarySearchStatus): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LibrarySearchResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LibrarySearchResponse): LibrarySearchResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LibrarySearchResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LibrarySearchResponse;
    static deserializeBinaryFromReader(message: LibrarySearchResponse, reader: jspb.BinaryReader): LibrarySearchResponse;
}

export namespace LibrarySearchResponse {
    export type AsObject = {
        librariesList: Array<SearchedLibrary.AsObject>,
        status: LibrarySearchStatus,
    }
}

export class SearchedLibrary extends jspb.Message { 
    getName(): string;
    setName(value: string): void;


    getReleasesMap(): jspb.Map<string, LibraryRelease>;
    clearReleasesMap(): void;


    hasLatest(): boolean;
    clearLatest(): void;
    getLatest(): LibraryRelease | undefined;
    setLatest(value?: LibraryRelease): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SearchedLibrary.AsObject;
    static toObject(includeInstance: boolean, msg: SearchedLibrary): SearchedLibrary.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SearchedLibrary, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SearchedLibrary;
    static deserializeBinaryFromReader(message: SearchedLibrary, reader: jspb.BinaryReader): SearchedLibrary;
}

export namespace SearchedLibrary {
    export type AsObject = {
        name: string,

        releasesMap: Array<[string, LibraryRelease.AsObject]>,
        latest?: LibraryRelease.AsObject,
    }
}

export class LibraryRelease extends jspb.Message { 
    getAuthor(): string;
    setAuthor(value: string): void;

    getVersion(): string;
    setVersion(value: string): void;

    getMaintainer(): string;
    setMaintainer(value: string): void;

    getSentence(): string;
    setSentence(value: string): void;

    getParagraph(): string;
    setParagraph(value: string): void;

    getWebsite(): string;
    setWebsite(value: string): void;

    getCategory(): string;
    setCategory(value: string): void;

    clearArchitecturesList(): void;
    getArchitecturesList(): Array<string>;
    setArchitecturesList(value: Array<string>): void;
    addArchitectures(value: string, index?: number): string;

    clearTypesList(): void;
    getTypesList(): Array<string>;
    setTypesList(value: Array<string>): void;
    addTypes(value: string, index?: number): string;


    hasResources(): boolean;
    clearResources(): void;
    getResources(): DownloadResource | undefined;
    setResources(value?: DownloadResource): void;

    getLicense(): string;
    setLicense(value: string): void;

    clearProvidesIncludesList(): void;
    getProvidesIncludesList(): Array<string>;
    setProvidesIncludesList(value: Array<string>): void;
    addProvidesIncludes(value: string, index?: number): string;

    clearDependenciesList(): void;
    getDependenciesList(): Array<LibraryDependency>;
    setDependenciesList(value: Array<LibraryDependency>): void;
    addDependencies(value?: LibraryDependency, index?: number): LibraryDependency;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LibraryRelease.AsObject;
    static toObject(includeInstance: boolean, msg: LibraryRelease): LibraryRelease.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LibraryRelease, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LibraryRelease;
    static deserializeBinaryFromReader(message: LibraryRelease, reader: jspb.BinaryReader): LibraryRelease;
}

export namespace LibraryRelease {
    export type AsObject = {
        author: string,
        version: string,
        maintainer: string,
        sentence: string,
        paragraph: string,
        website: string,
        category: string,
        architecturesList: Array<string>,
        typesList: Array<string>,
        resources?: DownloadResource.AsObject,
        license: string,
        providesIncludesList: Array<string>,
        dependenciesList: Array<LibraryDependency.AsObject>,
    }
}

export class LibraryDependency extends jspb.Message { 
    getName(): string;
    setName(value: string): void;

    getVersionConstraint(): string;
    setVersionConstraint(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LibraryDependency.AsObject;
    static toObject(includeInstance: boolean, msg: LibraryDependency): LibraryDependency.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LibraryDependency, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LibraryDependency;
    static deserializeBinaryFromReader(message: LibraryDependency, reader: jspb.BinaryReader): LibraryDependency;
}

export namespace LibraryDependency {
    export type AsObject = {
        name: string,
        versionConstraint: string,
    }
}

export class DownloadResource extends jspb.Message { 
    getUrl(): string;
    setUrl(value: string): void;

    getArchiveFilename(): string;
    setArchiveFilename(value: string): void;

    getChecksum(): string;
    setChecksum(value: string): void;

    getSize(): number;
    setSize(value: number): void;

    getCachePath(): string;
    setCachePath(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DownloadResource.AsObject;
    static toObject(includeInstance: boolean, msg: DownloadResource): DownloadResource.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DownloadResource, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DownloadResource;
    static deserializeBinaryFromReader(message: DownloadResource, reader: jspb.BinaryReader): DownloadResource;
}

export namespace DownloadResource {
    export type AsObject = {
        url: string,
        archiveFilename: string,
        checksum: string,
        size: number,
        cachePath: string,
    }
}

export class LibraryListRequest extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): cc_arduino_cli_commands_v1_common_pb.Instance | undefined;
    setInstance(value?: cc_arduino_cli_commands_v1_common_pb.Instance): void;

    getAll(): boolean;
    setAll(value: boolean): void;

    getUpdatable(): boolean;
    setUpdatable(value: boolean): void;

    getName(): string;
    setName(value: string): void;

    getFqbn(): string;
    setFqbn(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LibraryListRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LibraryListRequest): LibraryListRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LibraryListRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LibraryListRequest;
    static deserializeBinaryFromReader(message: LibraryListRequest, reader: jspb.BinaryReader): LibraryListRequest;
}

export namespace LibraryListRequest {
    export type AsObject = {
        instance?: cc_arduino_cli_commands_v1_common_pb.Instance.AsObject,
        all: boolean,
        updatable: boolean,
        name: string,
        fqbn: string,
    }
}

export class LibraryListResponse extends jspb.Message { 
    clearInstalledLibrariesList(): void;
    getInstalledLibrariesList(): Array<InstalledLibrary>;
    setInstalledLibrariesList(value: Array<InstalledLibrary>): void;
    addInstalledLibraries(value?: InstalledLibrary, index?: number): InstalledLibrary;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LibraryListResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LibraryListResponse): LibraryListResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LibraryListResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LibraryListResponse;
    static deserializeBinaryFromReader(message: LibraryListResponse, reader: jspb.BinaryReader): LibraryListResponse;
}

export namespace LibraryListResponse {
    export type AsObject = {
        installedLibrariesList: Array<InstalledLibrary.AsObject>,
    }
}

export class InstalledLibrary extends jspb.Message { 

    hasLibrary(): boolean;
    clearLibrary(): void;
    getLibrary(): Library | undefined;
    setLibrary(value?: Library): void;


    hasRelease(): boolean;
    clearRelease(): void;
    getRelease(): LibraryRelease | undefined;
    setRelease(value?: LibraryRelease): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InstalledLibrary.AsObject;
    static toObject(includeInstance: boolean, msg: InstalledLibrary): InstalledLibrary.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InstalledLibrary, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InstalledLibrary;
    static deserializeBinaryFromReader(message: InstalledLibrary, reader: jspb.BinaryReader): InstalledLibrary;
}

export namespace InstalledLibrary {
    export type AsObject = {
        library?: Library.AsObject,
        release?: LibraryRelease.AsObject,
    }
}

export class Library extends jspb.Message { 
    getName(): string;
    setName(value: string): void;

    getAuthor(): string;
    setAuthor(value: string): void;

    getMaintainer(): string;
    setMaintainer(value: string): void;

    getSentence(): string;
    setSentence(value: string): void;

    getParagraph(): string;
    setParagraph(value: string): void;

    getWebsite(): string;
    setWebsite(value: string): void;

    getCategory(): string;
    setCategory(value: string): void;

    clearArchitecturesList(): void;
    getArchitecturesList(): Array<string>;
    setArchitecturesList(value: Array<string>): void;
    addArchitectures(value: string, index?: number): string;

    clearTypesList(): void;
    getTypesList(): Array<string>;
    setTypesList(value: Array<string>): void;
    addTypes(value: string, index?: number): string;

    getInstallDir(): string;
    setInstallDir(value: string): void;

    getSourceDir(): string;
    setSourceDir(value: string): void;

    getUtilityDir(): string;
    setUtilityDir(value: string): void;

    getContainerPlatform(): string;
    setContainerPlatform(value: string): void;

    getRealName(): string;
    setRealName(value: string): void;

    getDotALinkage(): boolean;
    setDotALinkage(value: boolean): void;

    getPrecompiled(): boolean;
    setPrecompiled(value: boolean): void;

    getLdFlags(): string;
    setLdFlags(value: string): void;

    getIsLegacy(): boolean;
    setIsLegacy(value: boolean): void;

    getVersion(): string;
    setVersion(value: string): void;

    getLicense(): string;
    setLicense(value: string): void;


    getPropertiesMap(): jspb.Map<string, string>;
    clearPropertiesMap(): void;

    getLocation(): LibraryLocation;
    setLocation(value: LibraryLocation): void;

    getLayout(): LibraryLayout;
    setLayout(value: LibraryLayout): void;

    clearExamplesList(): void;
    getExamplesList(): Array<string>;
    setExamplesList(value: Array<string>): void;
    addExamples(value: string, index?: number): string;

    clearProvidesIncludesList(): void;
    getProvidesIncludesList(): Array<string>;
    setProvidesIncludesList(value: Array<string>): void;
    addProvidesIncludes(value: string, index?: number): string;


    getCompatibleWithMap(): jspb.Map<string, boolean>;
    clearCompatibleWithMap(): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Library.AsObject;
    static toObject(includeInstance: boolean, msg: Library): Library.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Library, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Library;
    static deserializeBinaryFromReader(message: Library, reader: jspb.BinaryReader): Library;
}

export namespace Library {
    export type AsObject = {
        name: string,
        author: string,
        maintainer: string,
        sentence: string,
        paragraph: string,
        website: string,
        category: string,
        architecturesList: Array<string>,
        typesList: Array<string>,
        installDir: string,
        sourceDir: string,
        utilityDir: string,
        containerPlatform: string,
        realName: string,
        dotALinkage: boolean,
        precompiled: boolean,
        ldFlags: string,
        isLegacy: boolean,
        version: string,
        license: string,

        propertiesMap: Array<[string, string]>,
        location: LibraryLocation,
        layout: LibraryLayout,
        examplesList: Array<string>,
        providesIncludesList: Array<string>,

        compatibleWithMap: Array<[string, boolean]>,
    }
}

export class ZipLibraryInstallRequest extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): cc_arduino_cli_commands_v1_common_pb.Instance | undefined;
    setInstance(value?: cc_arduino_cli_commands_v1_common_pb.Instance): void;

    getPath(): string;
    setPath(value: string): void;

    getOverwrite(): boolean;
    setOverwrite(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ZipLibraryInstallRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ZipLibraryInstallRequest): ZipLibraryInstallRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ZipLibraryInstallRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ZipLibraryInstallRequest;
    static deserializeBinaryFromReader(message: ZipLibraryInstallRequest, reader: jspb.BinaryReader): ZipLibraryInstallRequest;
}

export namespace ZipLibraryInstallRequest {
    export type AsObject = {
        instance?: cc_arduino_cli_commands_v1_common_pb.Instance.AsObject,
        path: string,
        overwrite: boolean,
    }
}

export class ZipLibraryInstallResponse extends jspb.Message { 

    hasTaskProgress(): boolean;
    clearTaskProgress(): void;
    getTaskProgress(): cc_arduino_cli_commands_v1_common_pb.TaskProgress | undefined;
    setTaskProgress(value?: cc_arduino_cli_commands_v1_common_pb.TaskProgress): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ZipLibraryInstallResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ZipLibraryInstallResponse): ZipLibraryInstallResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ZipLibraryInstallResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ZipLibraryInstallResponse;
    static deserializeBinaryFromReader(message: ZipLibraryInstallResponse, reader: jspb.BinaryReader): ZipLibraryInstallResponse;
}

export namespace ZipLibraryInstallResponse {
    export type AsObject = {
        taskProgress?: cc_arduino_cli_commands_v1_common_pb.TaskProgress.AsObject,
    }
}

export class GitLibraryInstallRequest extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): cc_arduino_cli_commands_v1_common_pb.Instance | undefined;
    setInstance(value?: cc_arduino_cli_commands_v1_common_pb.Instance): void;

    getUrl(): string;
    setUrl(value: string): void;

    getOverwrite(): boolean;
    setOverwrite(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GitLibraryInstallRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GitLibraryInstallRequest): GitLibraryInstallRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GitLibraryInstallRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GitLibraryInstallRequest;
    static deserializeBinaryFromReader(message: GitLibraryInstallRequest, reader: jspb.BinaryReader): GitLibraryInstallRequest;
}

export namespace GitLibraryInstallRequest {
    export type AsObject = {
        instance?: cc_arduino_cli_commands_v1_common_pb.Instance.AsObject,
        url: string,
        overwrite: boolean,
    }
}

export class GitLibraryInstallResponse extends jspb.Message { 

    hasTaskProgress(): boolean;
    clearTaskProgress(): void;
    getTaskProgress(): cc_arduino_cli_commands_v1_common_pb.TaskProgress | undefined;
    setTaskProgress(value?: cc_arduino_cli_commands_v1_common_pb.TaskProgress): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GitLibraryInstallResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GitLibraryInstallResponse): GitLibraryInstallResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GitLibraryInstallResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GitLibraryInstallResponse;
    static deserializeBinaryFromReader(message: GitLibraryInstallResponse, reader: jspb.BinaryReader): GitLibraryInstallResponse;
}

export namespace GitLibraryInstallResponse {
    export type AsObject = {
        taskProgress?: cc_arduino_cli_commands_v1_common_pb.TaskProgress.AsObject,
    }
}

export enum LibrarySearchStatus {
    LIBRARY_SEARCH_STATUS_FAILED = 0,
    LIBRARY_SEARCH_STATUS_SUCCESS = 1,
}

export enum LibraryLayout {
    LIBRARY_LAYOUT_FLAT = 0,
    LIBRARY_LAYOUT_RECURSIVE = 1,
}

export enum LibraryLocation {
    LIBRARY_LOCATION_IDE_BUILTIN = 0,
    LIBRARY_LOCATION_USER = 1,
    LIBRARY_LOCATION_PLATFORM_BUILTIN = 2,
    LIBRARY_LOCATION_REFERENCED_PLATFORM_BUILTIN = 3,
}
