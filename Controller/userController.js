const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const RegisterUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Required Details are Missing" });
    } else {
        try {
            const exsistingUser = await User.findOne({ email });
            if (exsistingUser) {
                return res.status(400).json({
                    message: "User Already Exsist"
                });
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                role
            });
            await newUser.save();
            const token = jwt.sign({
                _id: newUser._id
            }, 'secretkey123', { expiresIn: '1d' });
            res.status(200).json({
                user: { name: newUser.name, email: newUser.email, role: newUser.role },
                message: "New User has been saved Successfully",
                requestedAt : req.requestedAt,
                token
            })
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong"
            });
        }
    }
}

const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Email or Password is Missing"
        })
    } else {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                res.status(404).json({
                    message: "User Not Found"
                });
            } else {
                const isPasswordValid = await bcrypt.compare(password, user.password);
                const token = jwt.sign({
                    _id: user._id
                }, 'secretkey123', { expiresIn: '1d' });
                if (!isPasswordValid) {
                    res.status(401).json({
                        message: "Password is Incorrect"
                    })
                } else {
                    const userData = {
                        name : user.name,
                        email : user.email,
                        role : user.role
                    }                    
                    res.status(200).json({
                        message: "Login Successful",
                        user : userData,
                        requestedAt : req.requestedAt,
                        token
                    })
                }
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({
                message: "Something went wrong"
            });
        }
    }
}


const GetUser = async (req, res) => {
    try {
        const Users = await User.find({}, '-password')
        if (Users.length !== 0) {
            res.status(200).json({
                Users: Users,
                requestedAt : req.requestedAt,
                message: "List of Users"
            })
        } else {
            res.status(404).json({
                message: "No user found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server not found"
        })
    }
}

const GetUserByID = async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const getUserByID = await User.findById(userId);
        if (getUserByID) {
            res.status(200).json({
                user: getUserByID,
                requestedAt : req.requestedAt,
                message: "User found successfully",
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const UpdateUser = async (req, res) => {
    const { userId } = req.params;
    const updates = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            {requestedAt : req.requestedAt},
            userId,
            updates
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};

const DeleteUserByID = async (req, res) => {
    const { userId } = req.params;
    if (userId) {
        try {
            const DeleteUser = await User.findByIdAndDelete(userId);
            if (!DeleteUser) {
                res.status(400).json({
                    message: "User ID not found"
                });
            } else {
                res.status(200).json({
                    message: "User Deleted Successfully",
                    requestedAt : req.requestedAt,
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Server not found"
            });
            console.error(error.message);

        }
    }
}

const SearchUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const filter = {};
        if (name) {
            filter.name = {
                $regex: name,
                $options: 'i'
            }
        }
        if (email) {
            filter.email = {
                $regex: email,
                $options: 'i'
            }
        }
        if (role) {
            filter.role = {
                $regex: role,
                $options: 'i'
            }
        }
        const searchUser = await User.find(filter);
        if (searchUser.length > 0) {
            res.status(200).json({
                searchUser,
                requestedAt : req.requestedAt,
                message: "User Searched Successfully"
            })
        } else {
            res.status(404).json({
                message: "No user Found"
            })
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

module.exports = { RegisterUser, GetUser, UpdateUser, DeleteUserByID, GetUserByID, SearchUser, LoginUser };