import {register,login, getMe} from "../services/auth.service.js" 

export async function registerUser(req,res){
    try{
        const {name,email,password} = req.body

        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            })
        }

        const result = await register(name,email,password)

        return res.status(201).json({
            success: true,
            message: "Registration successful",
            data: result
        })

    } catch(error){
        
        if(error.message === "Email already registered"){
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}

export async function loginUser(req,res){
    try{
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            })
        }
        
        const result = await login(email, password)

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        })
    }catch(error){
        if (error.message === "Invalid email or password") {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export async function getCurrentUser(req, res){
    try{
        const user = await getMe(req.user.id)

        return res.status(200).json({
            success: true,
            data: user
        })
    }catch(error){
        return res.status(404).json({
            success:false,
            message: error.message
        })
    }
}