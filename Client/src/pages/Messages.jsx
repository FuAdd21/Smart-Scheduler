import { useState } from "react";
import { FiSearch, FiSend, FiPaperclip, FiMoreVertical, FiPhone, FiVideo } from "react-icons/fi";

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState(1);
  const [messageInput, setMessageInput] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "S",
      color: "bg-purple-500",
      lastMessage: "Thanks for the appointment!",
      time: "2m ago",
      unread: 2,
      status: "online",
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "M",
      color: "bg-blue-500",
      lastMessage: "Can we reschedule for Tuesday?",
      time: "1h ago",
      unread: 0,
      status: "offline",
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar: "E",
      color: "bg-pink-500",
      lastMessage: "I'll be there a bit early.",
      time: "3h ago",
      unread: 0,
      status: "online",
    },
    {
      id: 4,
      name: "James Rodriguez",
      avatar: "J",
      color: "bg-green-500",
      lastMessage: "Is there parking available?",
      time: "1d ago",
      unread: 0,
      status: "offline",
    },
  ];

  const messages = [
    { id: 1, sender: "user", text: "Hi Sarah, just confirming your appointment for tomorrow at 2 PM.", time: "10:30 AM" },
    { id: 2, sender: "other", text: "Hi! Yes, I'll be there.", time: "10:32 AM" },
    { id: 3, sender: "other", text: "Is there anything I need to bring?", time: "10:32 AM" },
    { id: 4, sender: "user", text: "Just your ID would be great. See you then!", time: "10:35 AM" },
    { id: 5, sender: "other", text: "Perfect, thanks!", time: "10:36 AM" },
    { id: 6, sender: "other", text: "Thanks for the appointment!", time: "10:38 AM" },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    // In a real app, this would send to backend
    console.log("Sending:", messageInput);
    setMessageInput("");
  };

  const activeChat = conversations.find(c => c.id === activeConversation);

  return (
    <div className="flex h-[calc(100vh-2rem)] flex-col gap-4 lg:flex-row lg:gap-8 text-white font-sans overflow-hidden">
      
      {/* Sidebar: Conversation List */}
      <div className="flex w-full flex-col gap-4 lg:w-80 flex-shrink-0 bg-[#10152b] rounded-2xl border border-[#1f2745] p-4 h-full">
        <div className="flex items-center justify-between mb-2">
           <h1 className="text-xl font-bold">Messages</h1>
           <button className="p-2 rounded-lg hover:bg-[#1f2745] text-slate-400 hover:text-white">
             <FiMoreVertical />
           </button>
        </div>

        <div className="relative mb-2">
           <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
           <input 
             type="text" 
             placeholder="Search messages..." 
             className="w-full rounded-xl border border-[#1f2745] bg-[#0b1021] py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-[#4f67ff]"
           />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
           {conversations.map((conv) => (
             <div 
               key={conv.id}
               onClick={() => setActiveConversation(conv.id)}
               className={`p-3 rounded-xl cursor-pointer transition-all flex gap-3 group ${
                 activeConversation === conv.id 
                   ? "bg-[#1f2937] border border-[#4f67ff]/30" 
                   : "hover:bg-[#1f2745] border border-transparent"
               }`}
             >
                <div className="relative">
                   <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${conv.color}`}>
                      {conv.avatar}
                   </div>
                   {conv.status === 'online' && (
                     <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#10152b]"></div>
                   )}
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-baseline mb-1">
                      <h3 className={`font-bold text-sm truncate ${activeConversation === conv.id ? "text-white" : "text-slate-300"}`}>{conv.name}</h3>
                      <span className="text-xs text-slate-500">{conv.time}</span>
                   </div>
                   <p className="text-xs text-slate-400 truncate group-hover:text-slate-300">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                   <div className="flex flex-col justify-center">
                      <div className="w-5 h-5 bg-[#4f67ff] rounded-full flex items-center justify-center text-[10px] font-bold">
                         {conv.unread}
                      </div>
                   </div>
                )}
             </div>
           ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#10152b] rounded-2xl border border-[#1f2745] overflow-hidden h-full">
         
         {/* Chat Header */}
         <div className="p-4 border-b border-[#1f2745] flex items-center justify-between bg-[#161b33]">
            <div className="flex items-center gap-3">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${activeChat?.color}`}>
                  {activeChat?.avatar}
               </div>
               <div>
                  <h2 className="font-bold text-white">{activeChat?.name}</h2>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                     <span className={`w-2 h-2 rounded-full ${activeChat?.status === 'online' ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
                     {activeChat?.status === 'online' ? 'Online' : 'Offline'}
                  </p>
               </div>
            </div>
            <div className="flex items-center gap-2">
               <button className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1f2745] transition">
                  <FiPhone className="w-5 h-5" />
               </button>
               <button className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1f2745] transition">
                  <FiVideo className="w-5 h-5" />
               </button>
               <button className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1f2745] transition">
                  <FiMoreVertical className="w-5 h-5" />
               </button>
            </div>
         </div>

         {/* Messages List */}
         <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#0b1021]">
            <div className="flex justify-center my-4">
               <span className="text-xs text-slate-500 bg-[#1f2745] px-3 py-1 rounded-full">Today</span>
            </div>
            {messages.map((msg) => (
               <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-2xl p-4 ${
                     msg.sender === 'user' 
                       ? 'bg-[#4f67ff] text-white rounded-br-none' 
                       : 'bg-[#1f2745] text-slate-200 rounded-bl-none'
                  }`}>
                     <p className="text-sm leading-relaxed">{msg.text}</p>
                     <p className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-500'}`}>
                        {msg.time}
                     </p>
                  </div>
               </div>
            ))}
         </div>

         {/* Message Input */}
         <div className="p-4 bg-[#161b33] border-t border-[#1f2745]">
            <form onSubmit={handleSendMessage} className="flex gap-3">
               <button type="button" className="p-3 text-slate-400 hover:text-white hover:bg-[#1f2745] rounded-xl transition">
                  <FiPaperclip className="w-5 h-5" />
               </button>
               <input 
                 type="text" 
                 value={messageInput}
                 onChange={(e) => setMessageInput(e.target.value)}
                 placeholder="Type a message..." 
                 className="flex-1 bg-[#0b1021] border border-[#1f2745] rounded-xl px-4 py-3 text-white outline-none focus:border-[#4f67ff] placeholder-slate-500"
               />
               <button 
                 type="submit" 
                 className={`p-3 rounded-xl transition-all ${
                   messageInput.trim() 
                     ? "bg-[#4f67ff] text-white shadow-lg shadow-indigo-500/20 hover:bg-[#4358e0]" 
                     : "bg-[#1f2745] text-slate-500 cursor-not-allowed"
                 }`}
                 disabled={!messageInput.trim()}
               >
                  <FiSend className="w-5 h-5" />
               </button>
            </form>
         </div>

      </div>
    </div>
  );
};

export default Messages;
