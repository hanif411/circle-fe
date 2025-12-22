import api from "../api"; // Pastikan path ke file axios instance kamu benar

// 1. Get Threads berdasarkan User yang sedang Login
export async function getThreadByLogin() {
  try {
    const response = await api.get("/thread/user");
    console.log("Thread Login:", response.data.data);
    return response.data.data;
  } catch (error) {
    throw new Error("Gagal get threads by login");
  }
}

// 2. Get Single Thread berdasarkan ID Thread
export async function getThreadById(id: number) {
  try {
    const response = await api.get(`/thread/${id}`);
    console.log("Thread Detail:", response.data.data);
    return response.data.data;
  } catch (error) {
    throw new Error(`Gagal get thread dengan ID: ${id}`);
  }
}

// 3. Get Semua Threads (Feed Utama)
export async function getAllThreads() {
  try {
    const response = await api.get("/thread");
    // Sesuai JSON response yang kamu kasih sebelumnya: data.threads
    console.log("All Threads:", response.data.data.threads);
    return response.data.data.threads;
  } catch (error) {
    throw new Error("Gagal get all threads");
  }
}

// 4. Post Thread Baru (Mendukung Image/Video via FormData)
export async function postThread(formdata: FormData) {
  try {
    const response = await api.post("/thread", formdata);
    console.log("Post Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Post Thread Error:", error);
    throw error;
  }
}

// 5. Get Threads berdasarkan ID User tertentu
export async function getThreadByUserId(id: number) {
  try {
    const response = await api.get(`/thread/user/${id}`);
    console.log("User Threads:", response.data.data);
    return response.data.data;
  } catch (error) {
    throw new Error(`Gagal get threads user ID: ${id}`);
  }
}
