const pool=require('./pool');

const getUserData=async(username)=>{
    const {rows}=await pool.query("SELECT * FROM users WHERE username=$1",[username]);
    const user=rows[0];
    return user;
}

const insertUserData=async (fullname,username,hashedPass) => {
    await pool.query("INSERT INTO users(fullname,username,password) VALUES($1,$2,$3)",[fullname,username,hashedPass]);
}

const updateRole=async (username,role) => {
    await pool.query("UPDATE users SET role=$2 WHERE username=$1",[username,role]);
}

const insertPost=async(message,user_id) => {
    await pool.query("INSERT INTO posts(message,user_id) VALUES($1,$2)",[message,user_id]);
}

const getPosts=async () => {
    const {rows}=await pool.query("SELECT post_id,username,message,created_at FROM posts LEFT JOIN users USING(user_id)");
    return rows
}