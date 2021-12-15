// package: cc.arduino.cli.commands.v1
// file: cc/arduino/cli/commands/v1/commands.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as cc_arduino_cli_commands_v1_commands_pb from "../../../../../cc/arduino/cli/commands/v1/commands_pb";
import * as cc_arduino_cli_commands_v1_common_pb from "../../../../../cc/arduino/cli/commands/v1/common_pb";
import * as cc_arduino_cli_commands_v1_board_pb from "../../../../../cc/arduino/cli/commands/v1/board_pb";
import * as cc_arduino_cli_commands_v1_compile_pb from "../../../../../cc/arduino/cli/commands/v1/compile_pb";
import * as cc_arduino_cli_commands_v1_core_pb from "../../../../../cc/arduino/cli/commands/v1/core_pb";
import * as cc_arduino_cli_commands_v1_upload_pb from "../../../../../cc/arduino/cli/commands/v1/upload_pb";
import * as cc_arduino_cli_commands_v1_lib_pb from "../../../../../cc/arduino/cli/commands/v1/lib_pb";

interface IArduinoCoreServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    init: IArduinoCoreServiceService_IInit;
    destroy: IArduinoCoreServiceService_IDestroy;
    rescan: IArduinoCoreServiceService_IRescan;
    updateIndex: IArduinoCoreServiceService_IUpdateIndex;
    updateLibrariesIndex: IArduinoCoreServiceService_IUpdateLibrariesIndex;
    updateCoreLibrariesIndex: IArduinoCoreServiceService_IUpdateCoreLibrariesIndex;
    outdated: IArduinoCoreServiceService_IOutdated;
    upgrade: IArduinoCoreServiceService_IUpgrade;
    version: IArduinoCoreServiceService_IVersion;
    loadSketch: IArduinoCoreServiceService_ILoadSketch;
    archiveSketch: IArduinoCoreServiceService_IArchiveSketch;
    boardDetails: IArduinoCoreServiceService_IBoardDetails;
    boardAttach: IArduinoCoreServiceService_IBoardAttach;
    boardList: IArduinoCoreServiceService_IBoardList;
    boardListAll: IArduinoCoreServiceService_IBoardListAll;
    boardSearch: IArduinoCoreServiceService_IBoardSearch;
    boardListWatch: IArduinoCoreServiceService_IBoardListWatch;
    compile: IArduinoCoreServiceService_ICompile;
    platformInstall: IArduinoCoreServiceService_IPlatformInstall;
    platformDownload: IArduinoCoreServiceService_IPlatformDownload;
    platformUninstall: IArduinoCoreServiceService_IPlatformUninstall;
    platformUpgrade: IArduinoCoreServiceService_IPlatformUpgrade;
    upload: IArduinoCoreServiceService_IUpload;
    uploadUsingProgrammer: IArduinoCoreServiceService_IUploadUsingProgrammer;
    listProgrammersAvailableForUpload: IArduinoCoreServiceService_IListProgrammersAvailableForUpload;
    burnBootloader: IArduinoCoreServiceService_IBurnBootloader;
    platformSearch: IArduinoCoreServiceService_IPlatformSearch;
    platformList: IArduinoCoreServiceService_IPlatformList;
    libraryDownload: IArduinoCoreServiceService_ILibraryDownload;
    libraryInstall: IArduinoCoreServiceService_ILibraryInstall;
    zipLibraryInstall: IArduinoCoreServiceService_IZipLibraryInstall;
    gitLibraryInstall: IArduinoCoreServiceService_IGitLibraryInstall;
    libraryUninstall: IArduinoCoreServiceService_ILibraryUninstall;
    libraryUpgradeAll: IArduinoCoreServiceService_ILibraryUpgradeAll;
    libraryResolveDependencies: IArduinoCoreServiceService_ILibraryResolveDependencies;
    librarySearch: IArduinoCoreServiceService_ILibrarySearch;
    libraryList: IArduinoCoreServiceService_ILibraryList;
}

interface IArduinoCoreServiceService_IInit extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_commands_pb.InitRequest, cc_arduino_cli_commands_v1_commands_pb.InitResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/Init"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.InitRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.InitRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.InitResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.InitResponse>;
}
interface IArduinoCoreServiceService_IDestroy extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_commands_pb.DestroyRequest, cc_arduino_cli_commands_v1_commands_pb.DestroyResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/Destroy"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.DestroyRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.DestroyRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.DestroyResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.DestroyResponse>;
}
interface IArduinoCoreServiceService_IRescan extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_commands_pb.RescanRequest, cc_arduino_cli_commands_v1_commands_pb.RescanResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/Rescan"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.RescanRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.RescanRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.RescanResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.RescanResponse>;
}
interface IArduinoCoreServiceService_IUpdateIndex extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_commands_pb.UpdateIndexRequest, cc_arduino_cli_commands_v1_commands_pb.UpdateIndexResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/UpdateIndex"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.UpdateIndexRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.UpdateIndexRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.UpdateIndexResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.UpdateIndexResponse>;
}
interface IArduinoCoreServiceService_IUpdateLibrariesIndex extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_commands_pb.UpdateLibrariesIndexRequest, cc_arduino_cli_commands_v1_commands_pb.UpdateLibrariesIndexResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/UpdateLibrariesIndex"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.UpdateLibrariesIndexRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.UpdateLibrariesIndexRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.UpdateLibrariesIndexResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.UpdateLibrariesIndexResponse>;
}
interface IArduinoCoreServiceService_IUpdateCoreLibrariesIndex extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_commands_pb.UpdateCoreLibrariesIndexRequest, cc_arduino_cli_commands_v1_commands_pb.UpdateCoreLibrariesIndexResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/UpdateCoreLibrariesIndex"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.UpdateCoreLibrariesIndexRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.UpdateCoreLibrariesIndexRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.UpdateCoreLibrariesIndexResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.UpdateCoreLibrariesIndexResponse>;
}
interface IArduinoCoreServiceService_IOutdated extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_commands_pb.OutdatedRequest, cc_arduino_cli_commands_v1_commands_pb.OutdatedResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/Outdated"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.OutdatedRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.OutdatedRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.OutdatedResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.OutdatedResponse>;
}
interface IArduinoCoreServiceService_IUpgrade extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_commands_pb.UpgradeRequest, cc_arduino_cli_commands_v1_commands_pb.UpgradeResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/Upgrade"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.UpgradeRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.UpgradeRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.UpgradeResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.UpgradeResponse>;
}
interface IArduinoCoreServiceService_IVersion extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_commands_pb.VersionRequest, cc_arduino_cli_commands_v1_commands_pb.VersionResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/Version"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.VersionRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.VersionRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.VersionResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.VersionResponse>;
}
interface IArduinoCoreServiceService_ILoadSketch extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_commands_pb.LoadSketchRequest, cc_arduino_cli_commands_v1_commands_pb.LoadSketchResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/LoadSketch"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.LoadSketchRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.LoadSketchRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.LoadSketchResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.LoadSketchResponse>;
}
interface IArduinoCoreServiceService_IArchiveSketch extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_commands_pb.ArchiveSketchRequest, cc_arduino_cli_commands_v1_commands_pb.ArchiveSketchResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/ArchiveSketch"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.ArchiveSketchRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.ArchiveSketchRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_commands_pb.ArchiveSketchResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_commands_pb.ArchiveSketchResponse>;
}
interface IArduinoCoreServiceService_IBoardDetails extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_board_pb.BoardDetailsRequest, cc_arduino_cli_commands_v1_board_pb.BoardDetailsResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/BoardDetails"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_board_pb.BoardDetailsRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_board_pb.BoardDetailsRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_board_pb.BoardDetailsResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_board_pb.BoardDetailsResponse>;
}
interface IArduinoCoreServiceService_IBoardAttach extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_board_pb.BoardAttachRequest, cc_arduino_cli_commands_v1_board_pb.BoardAttachResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/BoardAttach"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_board_pb.BoardAttachRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_board_pb.BoardAttachRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_board_pb.BoardAttachResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_board_pb.BoardAttachResponse>;
}
interface IArduinoCoreServiceService_IBoardList extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_board_pb.BoardListRequest, cc_arduino_cli_commands_v1_board_pb.BoardListResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/BoardList"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_board_pb.BoardListRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_board_pb.BoardListRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_board_pb.BoardListResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_board_pb.BoardListResponse>;
}
interface IArduinoCoreServiceService_IBoardListAll extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_board_pb.BoardListAllRequest, cc_arduino_cli_commands_v1_board_pb.BoardListAllResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/BoardListAll"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_board_pb.BoardListAllRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_board_pb.BoardListAllRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_board_pb.BoardListAllResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_board_pb.BoardListAllResponse>;
}
interface IArduinoCoreServiceService_IBoardSearch extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_board_pb.BoardSearchRequest, cc_arduino_cli_commands_v1_board_pb.BoardSearchResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/BoardSearch"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_board_pb.BoardSearchRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_board_pb.BoardSearchRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_board_pb.BoardSearchResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_board_pb.BoardSearchResponse>;
}
interface IArduinoCoreServiceService_IBoardListWatch extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_board_pb.BoardListWatchRequest, cc_arduino_cli_commands_v1_board_pb.BoardListWatchResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/BoardListWatch"
    requestStream: boolean; // true
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_board_pb.BoardListWatchRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_board_pb.BoardListWatchRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_board_pb.BoardListWatchResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_board_pb.BoardListWatchResponse>;
}
interface IArduinoCoreServiceService_ICompile extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_compile_pb.CompileRequest, cc_arduino_cli_commands_v1_compile_pb.CompileResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/Compile"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_compile_pb.CompileRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_compile_pb.CompileRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_compile_pb.CompileResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_compile_pb.CompileResponse>;
}
interface IArduinoCoreServiceService_IPlatformInstall extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_core_pb.PlatformInstallRequest, cc_arduino_cli_commands_v1_core_pb.PlatformInstallResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/PlatformInstall"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_core_pb.PlatformInstallRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_core_pb.PlatformInstallRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_core_pb.PlatformInstallResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_core_pb.PlatformInstallResponse>;
}
interface IArduinoCoreServiceService_IPlatformDownload extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_core_pb.PlatformDownloadRequest, cc_arduino_cli_commands_v1_core_pb.PlatformDownloadResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/PlatformDownload"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_core_pb.PlatformDownloadRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_core_pb.PlatformDownloadRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_core_pb.PlatformDownloadResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_core_pb.PlatformDownloadResponse>;
}
interface IArduinoCoreServiceService_IPlatformUninstall extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_core_pb.PlatformUninstallRequest, cc_arduino_cli_commands_v1_core_pb.PlatformUninstallResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/PlatformUninstall"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_core_pb.PlatformUninstallRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_core_pb.PlatformUninstallRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_core_pb.PlatformUninstallResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_core_pb.PlatformUninstallResponse>;
}
interface IArduinoCoreServiceService_IPlatformUpgrade extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_core_pb.PlatformUpgradeRequest, cc_arduino_cli_commands_v1_core_pb.PlatformUpgradeResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/PlatformUpgrade"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_core_pb.PlatformUpgradeRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_core_pb.PlatformUpgradeRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_core_pb.PlatformUpgradeResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_core_pb.PlatformUpgradeResponse>;
}
interface IArduinoCoreServiceService_IUpload extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_upload_pb.UploadRequest, cc_arduino_cli_commands_v1_upload_pb.UploadResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/Upload"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_upload_pb.UploadRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_upload_pb.UploadRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_upload_pb.UploadResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_upload_pb.UploadResponse>;
}
interface IArduinoCoreServiceService_IUploadUsingProgrammer extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_upload_pb.UploadUsingProgrammerRequest, cc_arduino_cli_commands_v1_upload_pb.UploadUsingProgrammerResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/UploadUsingProgrammer"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_upload_pb.UploadUsingProgrammerRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_upload_pb.UploadUsingProgrammerRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_upload_pb.UploadUsingProgrammerResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_upload_pb.UploadUsingProgrammerResponse>;
}
interface IArduinoCoreServiceService_IListProgrammersAvailableForUpload extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_upload_pb.ListProgrammersAvailableForUploadRequest, cc_arduino_cli_commands_v1_upload_pb.ListProgrammersAvailableForUploadResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/ListProgrammersAvailableForUpload"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_upload_pb.ListProgrammersAvailableForUploadRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_upload_pb.ListProgrammersAvailableForUploadRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_upload_pb.ListProgrammersAvailableForUploadResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_upload_pb.ListProgrammersAvailableForUploadResponse>;
}
interface IArduinoCoreServiceService_IBurnBootloader extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_upload_pb.BurnBootloaderRequest, cc_arduino_cli_commands_v1_upload_pb.BurnBootloaderResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/BurnBootloader"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_upload_pb.BurnBootloaderRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_upload_pb.BurnBootloaderRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_upload_pb.BurnBootloaderResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_upload_pb.BurnBootloaderResponse>;
}
interface IArduinoCoreServiceService_IPlatformSearch extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_core_pb.PlatformSearchRequest, cc_arduino_cli_commands_v1_core_pb.PlatformSearchResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/PlatformSearch"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_core_pb.PlatformSearchRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_core_pb.PlatformSearchRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_core_pb.PlatformSearchResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_core_pb.PlatformSearchResponse>;
}
interface IArduinoCoreServiceService_IPlatformList extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_core_pb.PlatformListRequest, cc_arduino_cli_commands_v1_core_pb.PlatformListResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/PlatformList"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_core_pb.PlatformListRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_core_pb.PlatformListRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_core_pb.PlatformListResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_core_pb.PlatformListResponse>;
}
interface IArduinoCoreServiceService_ILibraryDownload extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_lib_pb.LibraryDownloadRequest, cc_arduino_cli_commands_v1_lib_pb.LibraryDownloadResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/LibraryDownload"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_lib_pb.LibraryDownloadRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_lib_pb.LibraryDownloadRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_lib_pb.LibraryDownloadResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_lib_pb.LibraryDownloadResponse>;
}
interface IArduinoCoreServiceService_ILibraryInstall extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_lib_pb.LibraryInstallRequest, cc_arduino_cli_commands_v1_lib_pb.LibraryInstallResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/LibraryInstall"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_lib_pb.LibraryInstallRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_lib_pb.LibraryInstallRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_lib_pb.LibraryInstallResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_lib_pb.LibraryInstallResponse>;
}
interface IArduinoCoreServiceService_IZipLibraryInstall extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_lib_pb.ZipLibraryInstallRequest, cc_arduino_cli_commands_v1_lib_pb.ZipLibraryInstallResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/ZipLibraryInstall"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_lib_pb.ZipLibraryInstallRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_lib_pb.ZipLibraryInstallRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_lib_pb.ZipLibraryInstallResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_lib_pb.ZipLibraryInstallResponse>;
}
interface IArduinoCoreServiceService_IGitLibraryInstall extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_lib_pb.GitLibraryInstallRequest, cc_arduino_cli_commands_v1_lib_pb.GitLibraryInstallResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/GitLibraryInstall"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_lib_pb.GitLibraryInstallRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_lib_pb.GitLibraryInstallRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_lib_pb.GitLibraryInstallResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_lib_pb.GitLibraryInstallResponse>;
}
interface IArduinoCoreServiceService_ILibraryUninstall extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_lib_pb.LibraryUninstallRequest, cc_arduino_cli_commands_v1_lib_pb.LibraryUninstallResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/LibraryUninstall"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_lib_pb.LibraryUninstallRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_lib_pb.LibraryUninstallRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_lib_pb.LibraryUninstallResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_lib_pb.LibraryUninstallResponse>;
}
interface IArduinoCoreServiceService_ILibraryUpgradeAll extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_lib_pb.LibraryUpgradeAllRequest, cc_arduino_cli_commands_v1_lib_pb.LibraryUpgradeAllResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/LibraryUpgradeAll"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_lib_pb.LibraryUpgradeAllRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_lib_pb.LibraryUpgradeAllRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_lib_pb.LibraryUpgradeAllResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_lib_pb.LibraryUpgradeAllResponse>;
}
interface IArduinoCoreServiceService_ILibraryResolveDependencies extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_lib_pb.LibraryResolveDependenciesRequest, cc_arduino_cli_commands_v1_lib_pb.LibraryResolveDependenciesResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/LibraryResolveDependencies"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_lib_pb.LibraryResolveDependenciesRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_lib_pb.LibraryResolveDependenciesRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_lib_pb.LibraryResolveDependenciesResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_lib_pb.LibraryResolveDependenciesResponse>;
}
interface IArduinoCoreServiceService_ILibrarySearch extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_lib_pb.LibrarySearchRequest, cc_arduino_cli_commands_v1_lib_pb.LibrarySearchResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/LibrarySearch"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_lib_pb.LibrarySearchRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_lib_pb.LibrarySearchRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_lib_pb.LibrarySearchResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_lib_pb.LibrarySearchResponse>;
}
interface IArduinoCoreServiceService_ILibraryList extends grpc.MethodDefinition<cc_arduino_cli_commands_v1_lib_pb.LibraryListRequest, cc_arduino_cli_commands_v1_lib_pb.LibraryListResponse> {
    path: string; // "/cc.arduino.cli.commands.v1.ArduinoCoreService/LibraryList"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<cc_arduino_cli_commands_v1_lib_pb.LibraryListRequest>;
    requestDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_lib_pb.LibraryListRequest>;
    responseSerialize: grpc.serialize<cc_arduino_cli_commands_v1_lib_pb.LibraryListResponse>;
    responseDeserialize: grpc.deserialize<cc_arduino_cli_commands_v1_lib_pb.LibraryListResponse>;
}

export const ArduinoCoreServiceService: IArduinoCoreServiceService;

export interface IArduinoCoreServiceServer {
    init: grpc.handleServerStreamingCall<cc_arduino_cli_commands_v1_commands_pb.InitRequest, cc_arduino_cli_commands_v1_commands_pb.InitResponse>;
    destroy: grpc.handleUnaryCall<cc_arduino_cli_commands_v1_commands_pb.DestroyRequest, cc_arduino_cli_commands_v1_commands_pb.DestroyResponse>;
    rescan: grpc.handleUnaryCall<cc_arduino_cli_commands_v1_commands_pb.RescanRequest, cc_arduino_cli_commands_v1_commands_pb.RescanResponse>;
    updateIndex: grpc.handleServerStreamingCall<cc_arduino_cli_commands_v1_commands_pb.UpdateIndexRequest, cc_arduino_cli_commands_v1_commands_pb.UpdateIndexResponse>;
    updateLibrariesIndex: grpc.handleServerStreamingCall<cc_arduino_cli_commands_v1_commands_pb.UpdateLibrariesIndexRequest, cc_arduino_cli_commands_v1_commands_pb.UpdateLibrariesIndexResponse>;
    updateCoreLibrariesIndex: grpc.handleServerStreamingCall<cc_arduino_cli_commands_v1_commands_pb.UpdateCoreLibrariesIndexRequest, cc_arduino_cli_commands_v1_commands_pb.UpdateCoreLibrariesIndexResponse>;
    outdated: grpc.handleUnaryCall<cc_arduino_cli_commands_v1_commands_pb.OutdatedRequest, cc_arduino_cli_commands_v1_commands_pb.OutdatedResponse>;
    upgrade: grpc.handleServerStreamingCall<cc_arduino_cli_commands_v1_commands_pb.UpgradeRequest, cc_arduino_cli_commands_v1_commands_pb.UpgradeResponse>;
    version: grpc.handleUnaryCall<cc_arduino_cli_commands_v1_commands_pb.VersionRequest, cc_arduino_cli_commands_v1_commands_pb.VersionResponse>;
    loadSketch: grpc.handleUnaryCall<cc_arduino_cli_commands_v1_commands_pb.LoadSketchRequest, cc_arduino_cli_commands_v1_commands_pb.LoadSketchResponse>;
    archiveSketch: grpc.handleUnaryCall<cc_arduino_cli_commands_v1_commands_pb.ArchiveSketchRequest, cc_arduino_cli_commands_v1_commands_pb.ArchiveSketchResponse>;
    boardDetails: grpc.handleUnaryCall<cc_arduino_cli_commands_v1_board_pb.BoardDetailsRequest, cc_arduino_cli_commands_v1_board_pb.BoardDetailsResponse>;
    boardAttach: grpc.handleServerStreamingCall<cc_arduino_cli_commands_v1_board_pb.BoardAttachRequest, cc_arduino_cli_commands_v1_board_pb.BoardAttachResponse>;
    boardList: grpc.handleUnaryCall<cc_arduino_cli_commands_v1_board_pb.BoardListRequest, cc_arduino_cli_commands_v1_board_pb.BoardListResponse>;
    boardListAll: grpc.handleUnaryCall<cc_arduino_cli_commands_v1_board_pb.BoardListAllRequest, cc_arduino_cli_commands_v1_board_pb.BoardListAllResponse>;
    boardSearch: grpc.handleUnaryCall<cc_arduino_cli_commands_v1_board_pb.BoardSearchRequest, cc_arduino_cli_commands_v1_board_pb.BoardSearchResponse>;
    boardListWatch: grpc.handleBidiStreamingCall<cc_arduino_cli_commands_v1_board_pb.BoardListWatchRequest, cc_arduino_cli_commands_v1_board_pb.BoardListWatchResponse>;
    compile: grpc.handleServerStreamingCall<cc_arduino_cli_commands_v1_compile_pb.CompileRequest, cc_arduino_cli_commands_v1_compile_pb.CompileResponse>;
    platformInstall: grpc.handleServerStreamingCall<cc_arduino_cli_commands_v1_core_pb.PlatformInstallRequest, cc_arduino_cli_commands_v1_core_pb.PlatformInstallResponse>;
    platformDownload: grpc.handleServerStreamingCall<cc_arduino_cli_commands_v1_core_pb.PlatformDownloadRequest, cc_arduino_cli_commands_v1_core_pb.PlatformDownloadResponse>;
    platformUninstall: grpc.handleServerStreamingCall<cc_arduino_cli_commands_v1_core_pb.PlatformUninstallRequest, cc_arduino_cli_commands_v1_core_pb.PlatformUninstallResponse>;
    platformUpgrade: grpc.handleServerStreamingCall<cc_arduino_cli_commands_v1_core_pb.PlatformUpgradeRequest, cc_arduino_cli_commands_v1_core_pb.PlatformUpgradeResponse>;
    upload: grpc.handleServerStreamingCall<cc_arduino_cli_commands_v1_upload_pb.UploadRequest, cc_arduino_cli_commands_v1_upload_pb.UploadResponse>;
    uploadUsingProgrammer: grpc.handleServerStreamingCall<cc_arduino_cli_commands_v1_upload_pb.UploadUsingProgrammerRequest, cc_arduino_cli_commands_v1_upload_pb.UploadUsingProgrammerResponse>;
    listProgrammersAvailableForUpload: grpc.handleUnaryCall<cc_arduino_cli_commands_v1_upload_pb.ListProgrammersAvailableForUploadRequest, cc_arduino_cli_commands_v1_upload_pb.ListProgrammersAvailableForUploadResponse>;
    burnBootloader: grpc.handleServerStreamingCall<cc_arduino_cli_commands_v1_upload_pb.BurnBootloaderRequest, cc_arduino_cli_commands_v1_upload_pb.BurnBootloaderResponse>;
    platformSearch: grpc.handleUnaryCall<cc_arduino_cli_commands_v1_core_pb.PlatformSearchRequest, cc_arduino_cli_commands_v1_core_pb.PlatformSearchResponse>;
    platformList: grpc.handleUnaryCall<cc_arduino_cli_commands_v1_core_pb.PlatformListRequest, cc_arduino_cli_commands_v1_core_pb.PlatformListResponse>;
    libraryDownload: grpc.handleServerStreamingCall<cc_arduino_cli_commands_v1_lib_pb.LibraryDownloadRequest, cc_arduino_cli_commands_v1_lib_pb.LibraryDownloadResponse>;
    libraryInstall: grpc.handleServerStreamingCall<cc_arduino_cli_commands_v1_lib_pb.LibraryInstallRequest, cc_arduino_cli_commands_v1_lib_pb.LibraryInstallResponse>;
    zipLibraryInstall: grpc.handleServerStreamingCall<cc_arduino_cli_commands_v1_lib_pb.ZipLibraryInstallRequest, cc_arduino_cli_commands_v1_lib_pb.ZipLibraryInstallResponse>;
    gitLibraryInstall: grpc.handleServerStreamingCall<cc_arduino_cli_commands_v1_lib_pb.GitLibraryInstallRequest, cc_arduino_cli_commands_v1_lib_pb.GitLibraryInstallResponse>;
    libraryUninstall: grpc.handleServerStreamingCall<cc_arduino_cli_commands_v1_lib_pb.LibraryUninstallRequest, cc_arduino_cli_commands_v1_lib_pb.LibraryUninstallResponse>;
    libraryUpgradeAll: grpc.handleServerStreamingCall<cc_arduino_cli_commands_v1_lib_pb.LibraryUpgradeAllRequest, cc_arduino_cli_commands_v1_lib_pb.LibraryUpgradeAllResponse>;
    libraryResolveDependencies: grpc.handleUnaryCall<cc_arduino_cli_commands_v1_lib_pb.LibraryResolveDependenciesRequest, cc_arduino_cli_commands_v1_lib_pb.LibraryResolveDependenciesResponse>;
    librarySearch: grpc.handleUnaryCall<cc_arduino_cli_commands_v1_lib_pb.LibrarySearchRequest, cc_arduino_cli_commands_v1_lib_pb.LibrarySearchResponse>;
    libraryList: grpc.handleUnaryCall<cc_arduino_cli_commands_v1_lib_pb.LibraryListRequest, cc_arduino_cli_commands_v1_lib_pb.LibraryListResponse>;
}

export interface IArduinoCoreServiceClient {
    init(request: cc_arduino_cli_commands_v1_commands_pb.InitRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_commands_pb.InitResponse>;
    init(request: cc_arduino_cli_commands_v1_commands_pb.InitRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_commands_pb.InitResponse>;
    destroy(request: cc_arduino_cli_commands_v1_commands_pb.DestroyRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.DestroyResponse) => void): grpc.ClientUnaryCall;
    destroy(request: cc_arduino_cli_commands_v1_commands_pb.DestroyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.DestroyResponse) => void): grpc.ClientUnaryCall;
    destroy(request: cc_arduino_cli_commands_v1_commands_pb.DestroyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.DestroyResponse) => void): grpc.ClientUnaryCall;
    rescan(request: cc_arduino_cli_commands_v1_commands_pb.RescanRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.RescanResponse) => void): grpc.ClientUnaryCall;
    rescan(request: cc_arduino_cli_commands_v1_commands_pb.RescanRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.RescanResponse) => void): grpc.ClientUnaryCall;
    rescan(request: cc_arduino_cli_commands_v1_commands_pb.RescanRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.RescanResponse) => void): grpc.ClientUnaryCall;
    updateIndex(request: cc_arduino_cli_commands_v1_commands_pb.UpdateIndexRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_commands_pb.UpdateIndexResponse>;
    updateIndex(request: cc_arduino_cli_commands_v1_commands_pb.UpdateIndexRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_commands_pb.UpdateIndexResponse>;
    updateLibrariesIndex(request: cc_arduino_cli_commands_v1_commands_pb.UpdateLibrariesIndexRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_commands_pb.UpdateLibrariesIndexResponse>;
    updateLibrariesIndex(request: cc_arduino_cli_commands_v1_commands_pb.UpdateLibrariesIndexRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_commands_pb.UpdateLibrariesIndexResponse>;
    updateCoreLibrariesIndex(request: cc_arduino_cli_commands_v1_commands_pb.UpdateCoreLibrariesIndexRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_commands_pb.UpdateCoreLibrariesIndexResponse>;
    updateCoreLibrariesIndex(request: cc_arduino_cli_commands_v1_commands_pb.UpdateCoreLibrariesIndexRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_commands_pb.UpdateCoreLibrariesIndexResponse>;
    outdated(request: cc_arduino_cli_commands_v1_commands_pb.OutdatedRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.OutdatedResponse) => void): grpc.ClientUnaryCall;
    outdated(request: cc_arduino_cli_commands_v1_commands_pb.OutdatedRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.OutdatedResponse) => void): grpc.ClientUnaryCall;
    outdated(request: cc_arduino_cli_commands_v1_commands_pb.OutdatedRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.OutdatedResponse) => void): grpc.ClientUnaryCall;
    upgrade(request: cc_arduino_cli_commands_v1_commands_pb.UpgradeRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_commands_pb.UpgradeResponse>;
    upgrade(request: cc_arduino_cli_commands_v1_commands_pb.UpgradeRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_commands_pb.UpgradeResponse>;
    version(request: cc_arduino_cli_commands_v1_commands_pb.VersionRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.VersionResponse) => void): grpc.ClientUnaryCall;
    version(request: cc_arduino_cli_commands_v1_commands_pb.VersionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.VersionResponse) => void): grpc.ClientUnaryCall;
    version(request: cc_arduino_cli_commands_v1_commands_pb.VersionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.VersionResponse) => void): grpc.ClientUnaryCall;
    loadSketch(request: cc_arduino_cli_commands_v1_commands_pb.LoadSketchRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.LoadSketchResponse) => void): grpc.ClientUnaryCall;
    loadSketch(request: cc_arduino_cli_commands_v1_commands_pb.LoadSketchRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.LoadSketchResponse) => void): grpc.ClientUnaryCall;
    loadSketch(request: cc_arduino_cli_commands_v1_commands_pb.LoadSketchRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.LoadSketchResponse) => void): grpc.ClientUnaryCall;
    archiveSketch(request: cc_arduino_cli_commands_v1_commands_pb.ArchiveSketchRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.ArchiveSketchResponse) => void): grpc.ClientUnaryCall;
    archiveSketch(request: cc_arduino_cli_commands_v1_commands_pb.ArchiveSketchRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.ArchiveSketchResponse) => void): grpc.ClientUnaryCall;
    archiveSketch(request: cc_arduino_cli_commands_v1_commands_pb.ArchiveSketchRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.ArchiveSketchResponse) => void): grpc.ClientUnaryCall;
    boardDetails(request: cc_arduino_cli_commands_v1_board_pb.BoardDetailsRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardDetailsResponse) => void): grpc.ClientUnaryCall;
    boardDetails(request: cc_arduino_cli_commands_v1_board_pb.BoardDetailsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardDetailsResponse) => void): grpc.ClientUnaryCall;
    boardDetails(request: cc_arduino_cli_commands_v1_board_pb.BoardDetailsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardDetailsResponse) => void): grpc.ClientUnaryCall;
    boardAttach(request: cc_arduino_cli_commands_v1_board_pb.BoardAttachRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_board_pb.BoardAttachResponse>;
    boardAttach(request: cc_arduino_cli_commands_v1_board_pb.BoardAttachRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_board_pb.BoardAttachResponse>;
    boardList(request: cc_arduino_cli_commands_v1_board_pb.BoardListRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardListResponse) => void): grpc.ClientUnaryCall;
    boardList(request: cc_arduino_cli_commands_v1_board_pb.BoardListRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardListResponse) => void): grpc.ClientUnaryCall;
    boardList(request: cc_arduino_cli_commands_v1_board_pb.BoardListRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardListResponse) => void): grpc.ClientUnaryCall;
    boardListAll(request: cc_arduino_cli_commands_v1_board_pb.BoardListAllRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardListAllResponse) => void): grpc.ClientUnaryCall;
    boardListAll(request: cc_arduino_cli_commands_v1_board_pb.BoardListAllRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardListAllResponse) => void): grpc.ClientUnaryCall;
    boardListAll(request: cc_arduino_cli_commands_v1_board_pb.BoardListAllRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardListAllResponse) => void): grpc.ClientUnaryCall;
    boardSearch(request: cc_arduino_cli_commands_v1_board_pb.BoardSearchRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardSearchResponse) => void): grpc.ClientUnaryCall;
    boardSearch(request: cc_arduino_cli_commands_v1_board_pb.BoardSearchRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardSearchResponse) => void): grpc.ClientUnaryCall;
    boardSearch(request: cc_arduino_cli_commands_v1_board_pb.BoardSearchRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardSearchResponse) => void): grpc.ClientUnaryCall;
    boardListWatch(): grpc.ClientDuplexStream<cc_arduino_cli_commands_v1_board_pb.BoardListWatchRequest, cc_arduino_cli_commands_v1_board_pb.BoardListWatchResponse>;
    boardListWatch(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<cc_arduino_cli_commands_v1_board_pb.BoardListWatchRequest, cc_arduino_cli_commands_v1_board_pb.BoardListWatchResponse>;
    boardListWatch(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<cc_arduino_cli_commands_v1_board_pb.BoardListWatchRequest, cc_arduino_cli_commands_v1_board_pb.BoardListWatchResponse>;
    compile(request: cc_arduino_cli_commands_v1_compile_pb.CompileRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_compile_pb.CompileResponse>;
    compile(request: cc_arduino_cli_commands_v1_compile_pb.CompileRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_compile_pb.CompileResponse>;
    platformInstall(request: cc_arduino_cli_commands_v1_core_pb.PlatformInstallRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_core_pb.PlatformInstallResponse>;
    platformInstall(request: cc_arduino_cli_commands_v1_core_pb.PlatformInstallRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_core_pb.PlatformInstallResponse>;
    platformDownload(request: cc_arduino_cli_commands_v1_core_pb.PlatformDownloadRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_core_pb.PlatformDownloadResponse>;
    platformDownload(request: cc_arduino_cli_commands_v1_core_pb.PlatformDownloadRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_core_pb.PlatformDownloadResponse>;
    platformUninstall(request: cc_arduino_cli_commands_v1_core_pb.PlatformUninstallRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_core_pb.PlatformUninstallResponse>;
    platformUninstall(request: cc_arduino_cli_commands_v1_core_pb.PlatformUninstallRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_core_pb.PlatformUninstallResponse>;
    platformUpgrade(request: cc_arduino_cli_commands_v1_core_pb.PlatformUpgradeRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_core_pb.PlatformUpgradeResponse>;
    platformUpgrade(request: cc_arduino_cli_commands_v1_core_pb.PlatformUpgradeRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_core_pb.PlatformUpgradeResponse>;
    upload(request: cc_arduino_cli_commands_v1_upload_pb.UploadRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_upload_pb.UploadResponse>;
    upload(request: cc_arduino_cli_commands_v1_upload_pb.UploadRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_upload_pb.UploadResponse>;
    uploadUsingProgrammer(request: cc_arduino_cli_commands_v1_upload_pb.UploadUsingProgrammerRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_upload_pb.UploadUsingProgrammerResponse>;
    uploadUsingProgrammer(request: cc_arduino_cli_commands_v1_upload_pb.UploadUsingProgrammerRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_upload_pb.UploadUsingProgrammerResponse>;
    listProgrammersAvailableForUpload(request: cc_arduino_cli_commands_v1_upload_pb.ListProgrammersAvailableForUploadRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_upload_pb.ListProgrammersAvailableForUploadResponse) => void): grpc.ClientUnaryCall;
    listProgrammersAvailableForUpload(request: cc_arduino_cli_commands_v1_upload_pb.ListProgrammersAvailableForUploadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_upload_pb.ListProgrammersAvailableForUploadResponse) => void): grpc.ClientUnaryCall;
    listProgrammersAvailableForUpload(request: cc_arduino_cli_commands_v1_upload_pb.ListProgrammersAvailableForUploadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_upload_pb.ListProgrammersAvailableForUploadResponse) => void): grpc.ClientUnaryCall;
    burnBootloader(request: cc_arduino_cli_commands_v1_upload_pb.BurnBootloaderRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_upload_pb.BurnBootloaderResponse>;
    burnBootloader(request: cc_arduino_cli_commands_v1_upload_pb.BurnBootloaderRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_upload_pb.BurnBootloaderResponse>;
    platformSearch(request: cc_arduino_cli_commands_v1_core_pb.PlatformSearchRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_core_pb.PlatformSearchResponse) => void): grpc.ClientUnaryCall;
    platformSearch(request: cc_arduino_cli_commands_v1_core_pb.PlatformSearchRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_core_pb.PlatformSearchResponse) => void): grpc.ClientUnaryCall;
    platformSearch(request: cc_arduino_cli_commands_v1_core_pb.PlatformSearchRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_core_pb.PlatformSearchResponse) => void): grpc.ClientUnaryCall;
    platformList(request: cc_arduino_cli_commands_v1_core_pb.PlatformListRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_core_pb.PlatformListResponse) => void): grpc.ClientUnaryCall;
    platformList(request: cc_arduino_cli_commands_v1_core_pb.PlatformListRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_core_pb.PlatformListResponse) => void): grpc.ClientUnaryCall;
    platformList(request: cc_arduino_cli_commands_v1_core_pb.PlatformListRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_core_pb.PlatformListResponse) => void): grpc.ClientUnaryCall;
    libraryDownload(request: cc_arduino_cli_commands_v1_lib_pb.LibraryDownloadRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.LibraryDownloadResponse>;
    libraryDownload(request: cc_arduino_cli_commands_v1_lib_pb.LibraryDownloadRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.LibraryDownloadResponse>;
    libraryInstall(request: cc_arduino_cli_commands_v1_lib_pb.LibraryInstallRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.LibraryInstallResponse>;
    libraryInstall(request: cc_arduino_cli_commands_v1_lib_pb.LibraryInstallRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.LibraryInstallResponse>;
    zipLibraryInstall(request: cc_arduino_cli_commands_v1_lib_pb.ZipLibraryInstallRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.ZipLibraryInstallResponse>;
    zipLibraryInstall(request: cc_arduino_cli_commands_v1_lib_pb.ZipLibraryInstallRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.ZipLibraryInstallResponse>;
    gitLibraryInstall(request: cc_arduino_cli_commands_v1_lib_pb.GitLibraryInstallRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.GitLibraryInstallResponse>;
    gitLibraryInstall(request: cc_arduino_cli_commands_v1_lib_pb.GitLibraryInstallRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.GitLibraryInstallResponse>;
    libraryUninstall(request: cc_arduino_cli_commands_v1_lib_pb.LibraryUninstallRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.LibraryUninstallResponse>;
    libraryUninstall(request: cc_arduino_cli_commands_v1_lib_pb.LibraryUninstallRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.LibraryUninstallResponse>;
    libraryUpgradeAll(request: cc_arduino_cli_commands_v1_lib_pb.LibraryUpgradeAllRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.LibraryUpgradeAllResponse>;
    libraryUpgradeAll(request: cc_arduino_cli_commands_v1_lib_pb.LibraryUpgradeAllRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.LibraryUpgradeAllResponse>;
    libraryResolveDependencies(request: cc_arduino_cli_commands_v1_lib_pb.LibraryResolveDependenciesRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_lib_pb.LibraryResolveDependenciesResponse) => void): grpc.ClientUnaryCall;
    libraryResolveDependencies(request: cc_arduino_cli_commands_v1_lib_pb.LibraryResolveDependenciesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_lib_pb.LibraryResolveDependenciesResponse) => void): grpc.ClientUnaryCall;
    libraryResolveDependencies(request: cc_arduino_cli_commands_v1_lib_pb.LibraryResolveDependenciesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_lib_pb.LibraryResolveDependenciesResponse) => void): grpc.ClientUnaryCall;
    librarySearch(request: cc_arduino_cli_commands_v1_lib_pb.LibrarySearchRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_lib_pb.LibrarySearchResponse) => void): grpc.ClientUnaryCall;
    librarySearch(request: cc_arduino_cli_commands_v1_lib_pb.LibrarySearchRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_lib_pb.LibrarySearchResponse) => void): grpc.ClientUnaryCall;
    librarySearch(request: cc_arduino_cli_commands_v1_lib_pb.LibrarySearchRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_lib_pb.LibrarySearchResponse) => void): grpc.ClientUnaryCall;
    libraryList(request: cc_arduino_cli_commands_v1_lib_pb.LibraryListRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_lib_pb.LibraryListResponse) => void): grpc.ClientUnaryCall;
    libraryList(request: cc_arduino_cli_commands_v1_lib_pb.LibraryListRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_lib_pb.LibraryListResponse) => void): grpc.ClientUnaryCall;
    libraryList(request: cc_arduino_cli_commands_v1_lib_pb.LibraryListRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_lib_pb.LibraryListResponse) => void): grpc.ClientUnaryCall;
}

export class ArduinoCoreServiceClient extends grpc.Client implements IArduinoCoreServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public init(request: cc_arduino_cli_commands_v1_commands_pb.InitRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_commands_pb.InitResponse>;
    public init(request: cc_arduino_cli_commands_v1_commands_pb.InitRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_commands_pb.InitResponse>;
    public destroy(request: cc_arduino_cli_commands_v1_commands_pb.DestroyRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.DestroyResponse) => void): grpc.ClientUnaryCall;
    public destroy(request: cc_arduino_cli_commands_v1_commands_pb.DestroyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.DestroyResponse) => void): grpc.ClientUnaryCall;
    public destroy(request: cc_arduino_cli_commands_v1_commands_pb.DestroyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.DestroyResponse) => void): grpc.ClientUnaryCall;
    public rescan(request: cc_arduino_cli_commands_v1_commands_pb.RescanRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.RescanResponse) => void): grpc.ClientUnaryCall;
    public rescan(request: cc_arduino_cli_commands_v1_commands_pb.RescanRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.RescanResponse) => void): grpc.ClientUnaryCall;
    public rescan(request: cc_arduino_cli_commands_v1_commands_pb.RescanRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.RescanResponse) => void): grpc.ClientUnaryCall;
    public updateIndex(request: cc_arduino_cli_commands_v1_commands_pb.UpdateIndexRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_commands_pb.UpdateIndexResponse>;
    public updateIndex(request: cc_arduino_cli_commands_v1_commands_pb.UpdateIndexRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_commands_pb.UpdateIndexResponse>;
    public updateLibrariesIndex(request: cc_arduino_cli_commands_v1_commands_pb.UpdateLibrariesIndexRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_commands_pb.UpdateLibrariesIndexResponse>;
    public updateLibrariesIndex(request: cc_arduino_cli_commands_v1_commands_pb.UpdateLibrariesIndexRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_commands_pb.UpdateLibrariesIndexResponse>;
    public updateCoreLibrariesIndex(request: cc_arduino_cli_commands_v1_commands_pb.UpdateCoreLibrariesIndexRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_commands_pb.UpdateCoreLibrariesIndexResponse>;
    public updateCoreLibrariesIndex(request: cc_arduino_cli_commands_v1_commands_pb.UpdateCoreLibrariesIndexRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_commands_pb.UpdateCoreLibrariesIndexResponse>;
    public outdated(request: cc_arduino_cli_commands_v1_commands_pb.OutdatedRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.OutdatedResponse) => void): grpc.ClientUnaryCall;
    public outdated(request: cc_arduino_cli_commands_v1_commands_pb.OutdatedRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.OutdatedResponse) => void): grpc.ClientUnaryCall;
    public outdated(request: cc_arduino_cli_commands_v1_commands_pb.OutdatedRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.OutdatedResponse) => void): grpc.ClientUnaryCall;
    public upgrade(request: cc_arduino_cli_commands_v1_commands_pb.UpgradeRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_commands_pb.UpgradeResponse>;
    public upgrade(request: cc_arduino_cli_commands_v1_commands_pb.UpgradeRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_commands_pb.UpgradeResponse>;
    public version(request: cc_arduino_cli_commands_v1_commands_pb.VersionRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.VersionResponse) => void): grpc.ClientUnaryCall;
    public version(request: cc_arduino_cli_commands_v1_commands_pb.VersionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.VersionResponse) => void): grpc.ClientUnaryCall;
    public version(request: cc_arduino_cli_commands_v1_commands_pb.VersionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.VersionResponse) => void): grpc.ClientUnaryCall;
    public loadSketch(request: cc_arduino_cli_commands_v1_commands_pb.LoadSketchRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.LoadSketchResponse) => void): grpc.ClientUnaryCall;
    public loadSketch(request: cc_arduino_cli_commands_v1_commands_pb.LoadSketchRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.LoadSketchResponse) => void): grpc.ClientUnaryCall;
    public loadSketch(request: cc_arduino_cli_commands_v1_commands_pb.LoadSketchRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.LoadSketchResponse) => void): grpc.ClientUnaryCall;
    public archiveSketch(request: cc_arduino_cli_commands_v1_commands_pb.ArchiveSketchRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.ArchiveSketchResponse) => void): grpc.ClientUnaryCall;
    public archiveSketch(request: cc_arduino_cli_commands_v1_commands_pb.ArchiveSketchRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.ArchiveSketchResponse) => void): grpc.ClientUnaryCall;
    public archiveSketch(request: cc_arduino_cli_commands_v1_commands_pb.ArchiveSketchRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_commands_pb.ArchiveSketchResponse) => void): grpc.ClientUnaryCall;
    public boardDetails(request: cc_arduino_cli_commands_v1_board_pb.BoardDetailsRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardDetailsResponse) => void): grpc.ClientUnaryCall;
    public boardDetails(request: cc_arduino_cli_commands_v1_board_pb.BoardDetailsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardDetailsResponse) => void): grpc.ClientUnaryCall;
    public boardDetails(request: cc_arduino_cli_commands_v1_board_pb.BoardDetailsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardDetailsResponse) => void): grpc.ClientUnaryCall;
    public boardAttach(request: cc_arduino_cli_commands_v1_board_pb.BoardAttachRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_board_pb.BoardAttachResponse>;
    public boardAttach(request: cc_arduino_cli_commands_v1_board_pb.BoardAttachRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_board_pb.BoardAttachResponse>;
    public boardList(request: cc_arduino_cli_commands_v1_board_pb.BoardListRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardListResponse) => void): grpc.ClientUnaryCall;
    public boardList(request: cc_arduino_cli_commands_v1_board_pb.BoardListRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardListResponse) => void): grpc.ClientUnaryCall;
    public boardList(request: cc_arduino_cli_commands_v1_board_pb.BoardListRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardListResponse) => void): grpc.ClientUnaryCall;
    public boardListAll(request: cc_arduino_cli_commands_v1_board_pb.BoardListAllRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardListAllResponse) => void): grpc.ClientUnaryCall;
    public boardListAll(request: cc_arduino_cli_commands_v1_board_pb.BoardListAllRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardListAllResponse) => void): grpc.ClientUnaryCall;
    public boardListAll(request: cc_arduino_cli_commands_v1_board_pb.BoardListAllRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardListAllResponse) => void): grpc.ClientUnaryCall;
    public boardSearch(request: cc_arduino_cli_commands_v1_board_pb.BoardSearchRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardSearchResponse) => void): grpc.ClientUnaryCall;
    public boardSearch(request: cc_arduino_cli_commands_v1_board_pb.BoardSearchRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardSearchResponse) => void): grpc.ClientUnaryCall;
    public boardSearch(request: cc_arduino_cli_commands_v1_board_pb.BoardSearchRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_board_pb.BoardSearchResponse) => void): grpc.ClientUnaryCall;
    public boardListWatch(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<cc_arduino_cli_commands_v1_board_pb.BoardListWatchRequest, cc_arduino_cli_commands_v1_board_pb.BoardListWatchResponse>;
    public boardListWatch(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<cc_arduino_cli_commands_v1_board_pb.BoardListWatchRequest, cc_arduino_cli_commands_v1_board_pb.BoardListWatchResponse>;
    public compile(request: cc_arduino_cli_commands_v1_compile_pb.CompileRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_compile_pb.CompileResponse>;
    public compile(request: cc_arduino_cli_commands_v1_compile_pb.CompileRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_compile_pb.CompileResponse>;
    public platformInstall(request: cc_arduino_cli_commands_v1_core_pb.PlatformInstallRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_core_pb.PlatformInstallResponse>;
    public platformInstall(request: cc_arduino_cli_commands_v1_core_pb.PlatformInstallRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_core_pb.PlatformInstallResponse>;
    public platformDownload(request: cc_arduino_cli_commands_v1_core_pb.PlatformDownloadRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_core_pb.PlatformDownloadResponse>;
    public platformDownload(request: cc_arduino_cli_commands_v1_core_pb.PlatformDownloadRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_core_pb.PlatformDownloadResponse>;
    public platformUninstall(request: cc_arduino_cli_commands_v1_core_pb.PlatformUninstallRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_core_pb.PlatformUninstallResponse>;
    public platformUninstall(request: cc_arduino_cli_commands_v1_core_pb.PlatformUninstallRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_core_pb.PlatformUninstallResponse>;
    public platformUpgrade(request: cc_arduino_cli_commands_v1_core_pb.PlatformUpgradeRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_core_pb.PlatformUpgradeResponse>;
    public platformUpgrade(request: cc_arduino_cli_commands_v1_core_pb.PlatformUpgradeRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_core_pb.PlatformUpgradeResponse>;
    public upload(request: cc_arduino_cli_commands_v1_upload_pb.UploadRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_upload_pb.UploadResponse>;
    public upload(request: cc_arduino_cli_commands_v1_upload_pb.UploadRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_upload_pb.UploadResponse>;
    public uploadUsingProgrammer(request: cc_arduino_cli_commands_v1_upload_pb.UploadUsingProgrammerRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_upload_pb.UploadUsingProgrammerResponse>;
    public uploadUsingProgrammer(request: cc_arduino_cli_commands_v1_upload_pb.UploadUsingProgrammerRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_upload_pb.UploadUsingProgrammerResponse>;
    public listProgrammersAvailableForUpload(request: cc_arduino_cli_commands_v1_upload_pb.ListProgrammersAvailableForUploadRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_upload_pb.ListProgrammersAvailableForUploadResponse) => void): grpc.ClientUnaryCall;
    public listProgrammersAvailableForUpload(request: cc_arduino_cli_commands_v1_upload_pb.ListProgrammersAvailableForUploadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_upload_pb.ListProgrammersAvailableForUploadResponse) => void): grpc.ClientUnaryCall;
    public listProgrammersAvailableForUpload(request: cc_arduino_cli_commands_v1_upload_pb.ListProgrammersAvailableForUploadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_upload_pb.ListProgrammersAvailableForUploadResponse) => void): grpc.ClientUnaryCall;
    public burnBootloader(request: cc_arduino_cli_commands_v1_upload_pb.BurnBootloaderRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_upload_pb.BurnBootloaderResponse>;
    public burnBootloader(request: cc_arduino_cli_commands_v1_upload_pb.BurnBootloaderRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_upload_pb.BurnBootloaderResponse>;
    public platformSearch(request: cc_arduino_cli_commands_v1_core_pb.PlatformSearchRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_core_pb.PlatformSearchResponse) => void): grpc.ClientUnaryCall;
    public platformSearch(request: cc_arduino_cli_commands_v1_core_pb.PlatformSearchRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_core_pb.PlatformSearchResponse) => void): grpc.ClientUnaryCall;
    public platformSearch(request: cc_arduino_cli_commands_v1_core_pb.PlatformSearchRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_core_pb.PlatformSearchResponse) => void): grpc.ClientUnaryCall;
    public platformList(request: cc_arduino_cli_commands_v1_core_pb.PlatformListRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_core_pb.PlatformListResponse) => void): grpc.ClientUnaryCall;
    public platformList(request: cc_arduino_cli_commands_v1_core_pb.PlatformListRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_core_pb.PlatformListResponse) => void): grpc.ClientUnaryCall;
    public platformList(request: cc_arduino_cli_commands_v1_core_pb.PlatformListRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_core_pb.PlatformListResponse) => void): grpc.ClientUnaryCall;
    public libraryDownload(request: cc_arduino_cli_commands_v1_lib_pb.LibraryDownloadRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.LibraryDownloadResponse>;
    public libraryDownload(request: cc_arduino_cli_commands_v1_lib_pb.LibraryDownloadRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.LibraryDownloadResponse>;
    public libraryInstall(request: cc_arduino_cli_commands_v1_lib_pb.LibraryInstallRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.LibraryInstallResponse>;
    public libraryInstall(request: cc_arduino_cli_commands_v1_lib_pb.LibraryInstallRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.LibraryInstallResponse>;
    public zipLibraryInstall(request: cc_arduino_cli_commands_v1_lib_pb.ZipLibraryInstallRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.ZipLibraryInstallResponse>;
    public zipLibraryInstall(request: cc_arduino_cli_commands_v1_lib_pb.ZipLibraryInstallRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.ZipLibraryInstallResponse>;
    public gitLibraryInstall(request: cc_arduino_cli_commands_v1_lib_pb.GitLibraryInstallRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.GitLibraryInstallResponse>;
    public gitLibraryInstall(request: cc_arduino_cli_commands_v1_lib_pb.GitLibraryInstallRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.GitLibraryInstallResponse>;
    public libraryUninstall(request: cc_arduino_cli_commands_v1_lib_pb.LibraryUninstallRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.LibraryUninstallResponse>;
    public libraryUninstall(request: cc_arduino_cli_commands_v1_lib_pb.LibraryUninstallRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.LibraryUninstallResponse>;
    public libraryUpgradeAll(request: cc_arduino_cli_commands_v1_lib_pb.LibraryUpgradeAllRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.LibraryUpgradeAllResponse>;
    public libraryUpgradeAll(request: cc_arduino_cli_commands_v1_lib_pb.LibraryUpgradeAllRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cc_arduino_cli_commands_v1_lib_pb.LibraryUpgradeAllResponse>;
    public libraryResolveDependencies(request: cc_arduino_cli_commands_v1_lib_pb.LibraryResolveDependenciesRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_lib_pb.LibraryResolveDependenciesResponse) => void): grpc.ClientUnaryCall;
    public libraryResolveDependencies(request: cc_arduino_cli_commands_v1_lib_pb.LibraryResolveDependenciesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_lib_pb.LibraryResolveDependenciesResponse) => void): grpc.ClientUnaryCall;
    public libraryResolveDependencies(request: cc_arduino_cli_commands_v1_lib_pb.LibraryResolveDependenciesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_lib_pb.LibraryResolveDependenciesResponse) => void): grpc.ClientUnaryCall;
    public librarySearch(request: cc_arduino_cli_commands_v1_lib_pb.LibrarySearchRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_lib_pb.LibrarySearchResponse) => void): grpc.ClientUnaryCall;
    public librarySearch(request: cc_arduino_cli_commands_v1_lib_pb.LibrarySearchRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_lib_pb.LibrarySearchResponse) => void): grpc.ClientUnaryCall;
    public librarySearch(request: cc_arduino_cli_commands_v1_lib_pb.LibrarySearchRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_lib_pb.LibrarySearchResponse) => void): grpc.ClientUnaryCall;
    public libraryList(request: cc_arduino_cli_commands_v1_lib_pb.LibraryListRequest, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_lib_pb.LibraryListResponse) => void): grpc.ClientUnaryCall;
    public libraryList(request: cc_arduino_cli_commands_v1_lib_pb.LibraryListRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_lib_pb.LibraryListResponse) => void): grpc.ClientUnaryCall;
    public libraryList(request: cc_arduino_cli_commands_v1_lib_pb.LibraryListRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cc_arduino_cli_commands_v1_lib_pb.LibraryListResponse) => void): grpc.ClientUnaryCall;
}
