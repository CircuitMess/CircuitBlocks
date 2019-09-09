// package: proto
// file: builder.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as builder_pb from "./builder_pb";

interface IBuilderService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    build: IBuilderService_IBuild;
    autocomplete: IBuilderService_IAutocomplete;
    dropCache: IBuilderService_IDropCache;
}

interface IBuilderService_IBuild extends grpc.MethodDefinition<builder_pb.BuildParams, builder_pb.Response> {
    path: string; // "/proto.Builder/Build"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<builder_pb.BuildParams>;
    requestDeserialize: grpc.deserialize<builder_pb.BuildParams>;
    responseSerialize: grpc.serialize<builder_pb.Response>;
    responseDeserialize: grpc.deserialize<builder_pb.Response>;
}
interface IBuilderService_IAutocomplete extends grpc.MethodDefinition<builder_pb.BuildParams, builder_pb.Response> {
    path: string; // "/proto.Builder/Autocomplete"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<builder_pb.BuildParams>;
    requestDeserialize: grpc.deserialize<builder_pb.BuildParams>;
    responseSerialize: grpc.serialize<builder_pb.Response>;
    responseDeserialize: grpc.deserialize<builder_pb.Response>;
}
interface IBuilderService_IDropCache extends grpc.MethodDefinition<builder_pb.VerboseParams, builder_pb.Response> {
    path: string; // "/proto.Builder/DropCache"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<builder_pb.VerboseParams>;
    requestDeserialize: grpc.deserialize<builder_pb.VerboseParams>;
    responseSerialize: grpc.serialize<builder_pb.Response>;
    responseDeserialize: grpc.deserialize<builder_pb.Response>;
}

export const BuilderService: IBuilderService;

export interface IBuilderServer {
    build: grpc.handleServerStreamingCall<builder_pb.BuildParams, builder_pb.Response>;
    autocomplete: grpc.handleUnaryCall<builder_pb.BuildParams, builder_pb.Response>;
    dropCache: grpc.handleUnaryCall<builder_pb.VerboseParams, builder_pb.Response>;
}

export interface IBuilderClient {
    build(request: builder_pb.BuildParams, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<builder_pb.Response>;
    build(request: builder_pb.BuildParams, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<builder_pb.Response>;
    autocomplete(request: builder_pb.BuildParams, callback: (error: grpc.ServiceError | null, response: builder_pb.Response) => void): grpc.ClientUnaryCall;
    autocomplete(request: builder_pb.BuildParams, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: builder_pb.Response) => void): grpc.ClientUnaryCall;
    autocomplete(request: builder_pb.BuildParams, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: builder_pb.Response) => void): grpc.ClientUnaryCall;
    dropCache(request: builder_pb.VerboseParams, callback: (error: grpc.ServiceError | null, response: builder_pb.Response) => void): grpc.ClientUnaryCall;
    dropCache(request: builder_pb.VerboseParams, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: builder_pb.Response) => void): grpc.ClientUnaryCall;
    dropCache(request: builder_pb.VerboseParams, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: builder_pb.Response) => void): grpc.ClientUnaryCall;
}

export class BuilderClient extends grpc.Client implements IBuilderClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public build(request: builder_pb.BuildParams, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<builder_pb.Response>;
    public build(request: builder_pb.BuildParams, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<builder_pb.Response>;
    public autocomplete(request: builder_pb.BuildParams, callback: (error: grpc.ServiceError | null, response: builder_pb.Response) => void): grpc.ClientUnaryCall;
    public autocomplete(request: builder_pb.BuildParams, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: builder_pb.Response) => void): grpc.ClientUnaryCall;
    public autocomplete(request: builder_pb.BuildParams, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: builder_pb.Response) => void): grpc.ClientUnaryCall;
    public dropCache(request: builder_pb.VerboseParams, callback: (error: grpc.ServiceError | null, response: builder_pb.Response) => void): grpc.ClientUnaryCall;
    public dropCache(request: builder_pb.VerboseParams, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: builder_pb.Response) => void): grpc.ClientUnaryCall;
    public dropCache(request: builder_pb.VerboseParams, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: builder_pb.Response) => void): grpc.ClientUnaryCall;
}
