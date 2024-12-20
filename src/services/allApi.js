import commonAPI from "./commonApi";
import SERVER_BASE_URL from "./serverUrl";

// register api
export const registrApi = async(reqBody)=>{
   return await commonAPI("POST",`${SERVER_BASE_URL}/register`,reqBody)
}

// login api
export const loginApi = async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/login`,reqBody)
 }

// add blog
 export const addBlogApi = async(reqBody,reqHeader)=>{
   return await commonAPI("POST",`${SERVER_BASE_URL}/add-blog`,reqBody,reqHeader)
}

// user blog
export const userBlogApi = async(reqHeader)=>{
   return await commonAPI("GET",`${SERVER_BASE_URL}/user-blog`,{},reqHeader)
}

// all blog
export const allBlogApi = async(reqHeader)=>{
   return await commonAPI("GET",`${SERVER_BASE_URL}/all-blog`,{},reqHeader)
}

// edit blog
// blogs/67644d0d795da83537505bcd/edit

export const updateBlogApi = async(id,reqBody,reqHeader)=>{
   return await commonAPI("PUT",`${SERVER_BASE_URL}/blogs/${id}/edit`,reqBody,reqHeader)

}


// remove blog

export const deleteBlogApi = async(id,reqHeader)=>{
   return await commonAPI("DELETE",`${SERVER_BASE_URL}/blogs/${id}/remove`,{},reqHeader)

}
// profile edit
export const updateUserApi = async(reqBody,reqHeader)=>{
   return await commonAPI("PUT",`${SERVER_BASE_URL}/user/edit`,reqBody,reqHeader)

}


