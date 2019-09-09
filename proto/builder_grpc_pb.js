// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// compile me with: protoc -I proto/ proto/builder.proto  --go_out=plugins=grpc:proto
//
'use strict';
var grpc = require('grpc');
var builder_pb = require('./builder_pb.js');

function serialize_proto_BuildParams(arg) {
  if (!(arg instanceof builder_pb.BuildParams)) {
    throw new Error('Expected argument of type proto.BuildParams');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_BuildParams(buffer_arg) {
  return builder_pb.BuildParams.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_Response(arg) {
  if (!(arg instanceof builder_pb.Response)) {
    throw new Error('Expected argument of type proto.Response');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_Response(buffer_arg) {
  return builder_pb.Response.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_VerboseParams(arg) {
  if (!(arg instanceof builder_pb.VerboseParams)) {
    throw new Error('Expected argument of type proto.VerboseParams');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_VerboseParams(buffer_arg) {
  return builder_pb.VerboseParams.deserializeBinary(new Uint8Array(buffer_arg));
}


// Interface exported by the server.
var BuilderService = exports.BuilderService = {
  // A server-to-client streaming RPC.
  //
  // Obtains the Features available within the given Rectangle.  Results are
  // streamed rather than returned at once (e.g. in a response message with a
  // repeated field), as the rectangle may cover a large area and contain a
  // huge number of features.
  build: {
    path: '/proto.Builder/Build',
    requestStream: false,
    responseStream: true,
    requestType: builder_pb.BuildParams,
    responseType: builder_pb.Response,
    requestSerialize: serialize_proto_BuildParams,
    requestDeserialize: deserialize_proto_BuildParams,
    responseSerialize: serialize_proto_Response,
    responseDeserialize: deserialize_proto_Response,
  },
  autocomplete: {
    path: '/proto.Builder/Autocomplete',
    requestStream: false,
    responseStream: false,
    requestType: builder_pb.BuildParams,
    responseType: builder_pb.Response,
    requestSerialize: serialize_proto_BuildParams,
    requestDeserialize: deserialize_proto_BuildParams,
    responseSerialize: serialize_proto_Response,
    responseDeserialize: deserialize_proto_Response,
  },
  dropCache: {
    path: '/proto.Builder/DropCache',
    requestStream: false,
    responseStream: false,
    requestType: builder_pb.VerboseParams,
    responseType: builder_pb.Response,
    requestSerialize: serialize_proto_VerboseParams,
    requestDeserialize: deserialize_proto_VerboseParams,
    responseSerialize: serialize_proto_Response,
    responseDeserialize: deserialize_proto_Response,
  },
};

exports.BuilderClient = grpc.makeGenericClientConstructor(BuilderService);
