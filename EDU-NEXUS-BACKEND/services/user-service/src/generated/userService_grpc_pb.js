// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var userService_pb = require('./userService_pb.js');

function serialize_userservice_GetInstructorsByIdsRequest(arg) {
  if (!(arg instanceof userService_pb.GetInstructorsByIdsRequest)) {
    throw new Error('Expected argument of type userservice.GetInstructorsByIdsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_userservice_GetInstructorsByIdsRequest(buffer_arg) {
  return userService_pb.GetInstructorsByIdsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_userservice_GetInstructorsByIdsResponse(arg) {
  if (!(arg instanceof userService_pb.GetInstructorsByIdsResponse)) {
    throw new Error('Expected argument of type userservice.GetInstructorsByIdsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_userservice_GetInstructorsByIdsResponse(buffer_arg) {
  return userService_pb.GetInstructorsByIdsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserServiceService = exports.UserServiceService = {
  getInstructorsByIds: {
    path: '/userservice.UserService/GetInstructorsByIds',
    requestStream: false,
    responseStream: false,
    requestType: userService_pb.GetInstructorsByIdsRequest,
    responseType: userService_pb.GetInstructorsByIdsResponse,
    requestSerialize: serialize_userservice_GetInstructorsByIdsRequest,
    requestDeserialize: deserialize_userservice_GetInstructorsByIdsRequest,
    responseSerialize: serialize_userservice_GetInstructorsByIdsResponse,
    responseDeserialize: deserialize_userservice_GetInstructorsByIdsResponse,
  },
};

exports.UserServiceClient = grpc.makeGenericClientConstructor(UserServiceService);
