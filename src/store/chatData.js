import { create } from "zustand";

const useChatData = create((set) => ({
  id: "new",
  setId:  (data) => set({ id: data }),

  //chat history data
  chatHistory: null,
  setChatHistory:  (data) => set({ chatHistory: data }),

  //selected chat message data
  chatMessage: null,
  setChatMessage:  (data) => set({ chatMessage: data }),

}));

export default useChatData;
