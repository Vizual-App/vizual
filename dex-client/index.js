const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./api.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const DexService = grpc.loadPackageDefinition(packageDefinition).api.Dex;
const grpcClient = new DexService("212.2.246.126:5557", grpc.credentials.createInsecure());

const githubClient = {
    id: '8cb0ffb71a800aa61112',
    secret: '0edb9187cc52c3a41f5fe69a4e8514d835f602bc',
    redirectUris: ['http://127.0.0.1:5556/callback'],
    trustedPeers: [],
    public: true,
    name: 'Github',
    logo_url: ''
};

const microsoftClient = {
    id: 'cddf4595-71b2-4629-88f2-d758e50efe8',
    secret: 'cfQ7Q~o3OS3syikuBEfhoNDIpefrDiAAtbweN',
    redirectUris: ['http://localhost:5556/dex/callback'],
    trustedPeers: [],
    public: true,
    name: 'Microsoft',
    logo_url: ''
};

const googleClient = {
    id: '412028062383-f271jj2jg1p5emv2qmkpt3a4kt6p1f4t.apps.googleusercontent.com',
    secret: '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',
    redirectUris: ['http://127.0.0.1:5556/dex/callback'],
    trustedPeers: [],
    public: true,
    name: 'Google',
    logo_url: ''
};

grpcClient.CreateClient({ client: githubClient }, (error, res) => {
    if (error) {
        console.log("err", error);
        return;
    }

    console.log(res);
});

grpcClient.CreateClient({ client: microsoftClient }, (error, res) => {
    if (error) {
        console.log("err", error);
        return;
    }

    console.log(res);
});

grpcClient.CreateClient({ client: googleClient }, (error, res) => {
    if (error) {
        console.log("err", error);
        return;
    }

    console.log(res);
});
