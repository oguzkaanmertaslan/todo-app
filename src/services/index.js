import axios from "axios";

//axios ile bize verilen endpoint'i base url olarak tanımlıyoruz ve değişkende tutuyoruz
const instance = axios.create({
  baseURL: "https://61c381269cfb8f0017a3ebe3.mockapi.io",
});
//post ile endpointimize yeni eleman ekliyoruz
const createTodo = (newTodo) => {
  return instance.post("/todos/", newTodo);
};
//get ile tüm verilerin listelenmesi için enpointimize istekte bulunuyoruz 
const getAllTodos = async () => {
   const response=await instance.get("/todos");
   return await response.data;
};
//delete ile id si verilen liste elemanını siliyoruz
const deleteTodoById = (id) => {
  return instance.delete(`/todos/${id}`);
};
//put ile id si verilen liste elemanının isCompleted değerini true veya false göndererek düzenleme işlemi yapıyoruz
const updateTodo = (id, updatedTodo) => {
  return instance.put(`/todos/${id}`, updatedTodo);
};

export { createTodo, getAllTodos, deleteTodoById, updateTodo };
