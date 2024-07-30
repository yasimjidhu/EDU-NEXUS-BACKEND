import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { Instructor } from '../../domain/entities/instructor';

// Path to the .proto file
const PROTO_PATH = __dirname +  '../../../../proto/userService.proto'
 
// Load and parse the .proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const userProto = protoDescriptor.userservice as any;

// Define the service client class
export class UserServiceClient {
    private client: any;

    constructor(address: string) {
        this.client = new userProto.UserService(address, grpc.credentials.createInsecure());
    }

    // Fetch instructors by IDs
    getInstructors(instructorIds: string[]): Promise<Instructor[]> {
        return new Promise((resolve, reject) => {
            this.client.GetInstructorsByIds({ instructor_ids: instructorIds }, (error: any, response: any) => {
                if (error) {
                    reject(error);
                } else {
                    console.log('respone from user service of grpc call',response.instructors)
                    resolve(response.instructors);
                }
            });
        });
    }
}

