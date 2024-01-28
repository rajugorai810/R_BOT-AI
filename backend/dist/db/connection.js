import { connect, disconnect } from "mongoose";
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot connect to MongoDB");
    }
}
async function disConnectFromDatabase() {
    try {
        await disconnect();
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot disconnect to MongoDB");
    }
}
export { connectToDatabase, disConnectFromDatabase };
//# sourceMappingURL=connection.js.map