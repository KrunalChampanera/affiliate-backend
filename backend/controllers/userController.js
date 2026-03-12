// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { User } = require("../models");

// exports.registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   const exist = await User.findOne({ where: { email } });
//   if (exist) return res.status(400).json({ message: "Email already exists" });

//   const hashed = await bcrypt.hash(password, 10);

//   await User.create({
//     name,
//     email,
//     password: hashed,
//     role: "user"
//   });

//   res.status(201).json({ message: "User registered successfully" });
// };

// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ where: { email } });
//   if (!user || user.role !== "user")
//     return res.status(400).json({ message: "Invalid credentials" });

//   const match = await bcrypt.compare(password, user.password);
//   if (!match)
//     return res.status(400).json({ message: "Invalid credentials" });

//   const token = jwt.sign(
//     { id: user.id, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: "7d" }
//   );

//   res.json({ token });
// };

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { User } = require("../models")

exports.registerUser = async (req,res)=>{

try{

const { name,email,password } = req.body

if(!name || !email || !password){
return res.status(400).json({message:"All fields are required"})
}

if(password.length < 6){
return res.status(400).json({message:"Password must be at least 6 characters"})
}

const normalizedEmail = email.toLowerCase()

const exist = await User.findOne({
where:{email:normalizedEmail}
})

if(exist){
return res.status(400).json({message:"Email already exists"})
}

const hashed = await bcrypt.hash(password,10)

const user = await User.create({
name,
email:normalizedEmail,
password:hashed,
role:"user"
})

res.status(201).json({
message:"User registered successfully",
user:{
id:user.id,
name:user.name,
email:user.email,
role:user.role
}
})

}catch(error){

res.status(500).json({
message:error.message
})

}

}

exports.loginUser = async (req,res)=>{

try{

const { email,password } = req.body

if(!email || !password){
return res.status(400).json({message:"Email and password required"})
}

const normalizedEmail = email.toLowerCase()

const user = await User.findOne({
where:{email:normalizedEmail}
})

if(!user){
return res.status(400).json({message:"Invalid credentials"})
}

const match = await bcrypt.compare(password,user.password)

if(!match){
return res.status(400).json({message:"Invalid credentials"})
}

if(!process.env.JWT_SECRET){
return res.status(500).json({message:"JWT secret not configured"})
}

const token = jwt.sign(
{
id:user.id,
role:user.role
},
process.env.JWT_SECRET,
{
expiresIn:"7d"
}
)

res.json({
message:"Login successful",
token,
user:{
id:user.id,
name:user.name,
email:user.email,
role:user.role
}
})

}catch(error){

res.status(500).json({
message:error.message
})

}

}
