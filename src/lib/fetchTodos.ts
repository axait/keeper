import axios from "axios";

export async function fetchTodos() {
    const res = await axios.post("/api/todo/getAll");
    return res.data.data;
}