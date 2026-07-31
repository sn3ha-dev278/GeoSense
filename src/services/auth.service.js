import bcrypt from "bcrypt"
import {createUser, findUserByEmail, findUserById} from "../repositories/user.repository.js"
import {generateToken} from "../utils/jwt.js"

export async function register(name, email, password){
    const existingUser = await findUserByEmail(email)
    
    if(existingUser){
        throw new Error("Email already registered")
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await createUser(name, email, passwordHash)
    const token = generateToken(user);
    return {user, token}
    
}

export async function login(email, password){
    const user = await findUserByEmail(email)
    if(!user){
        throw new Error("Invalid email or password")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash)

    if(!isPasswordValid){
        throw new Error("Invalid email or password")
    }

    const token = generateToken(user)

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        token: token
    }
}

export async function getMe(userId){
    const user = await findUserById(userId)

    if(!user){
        throw new Error("User not found")
    }
    
    return user
}
