import axiosInstance from "../../core/instant_service/instant_service";
import axios from 'axios';

interface TopicAddPayload {
  password: string;
  name: string;
}



const TopicService={
  getTopics : async (page: number, limit: number, search = "", sortElement = "", direction = "") => {
    try {
      const params: any = { page, limit };
      if (search) params.search = search;
      if (sortElement) params.sortElement = sortElement;
      if (direction) params.direction = direction;
  
      const response = await axiosInstance.get("/topics", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  },


  addTopic : async (topicAddPayload:TopicAddPayload) => {
    try{
    const response = await axiosInstance.post("/topic", topicAddPayload);
    if(response.status==200)
        {
            return "success";
        }
        return "Something went wrong";
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400) {
  
            console.log("Error 400:",  data.message);
            return data.message;
          }
        } else {
  
          return "some thing went wrong";
        }
      } else {
        return "Unexpected error";
      }
      console.log(error);
      return "Add Topic Fail";
    }
  },


  editTopic : async (topicAddPayload:TopicAddPayload,id:String) => {
    try{
    console.log(localStorage.getItem("authToken"));
    const response = await axiosInstance.patch(`/topic/${id}`, topicAddPayload);
    
    if(response.status==200)
        {
            return "success";
        }
        return `Something went wrong + ${response.status}` ;
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400) {
            console.log("Error 400:",  data.message);
            return data.message;
          }
        } else {
  
          return "some thing went wrong";
        }
      } else {
        return "Unexpected error";
      }
      console.log(error);
      return "Edit Topic fail";
    }
  },
}

export default TopicService;

