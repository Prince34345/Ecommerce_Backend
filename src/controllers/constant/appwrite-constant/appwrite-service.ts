import {
    Client,
    Users,
} from 'node-appwrite'
import { appwriteUrl } from '../constant'

const client = new Client().setEndpoint(appwriteUrl).setProject(process.env.APPWRITE_PROJECT_ID).setKey(process.env.APPWRITE_API_SECRET_KEY)
const users = new Users(client)

export {client, users}
