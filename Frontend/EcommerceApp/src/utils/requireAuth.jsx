
export const requireAuth = ()=>{
    const token = JSON.parse(localStorage.getItem("user_info").token)

    return token
}