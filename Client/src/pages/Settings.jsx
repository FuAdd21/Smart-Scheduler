import { useState, useEffect, useContext } from "react";
import { FiSave, FiLock, FiGlobe, FiUsers, FiCreditCard, FiLoader, FiCheck } from "react-icons/fi";
import api from "../services/api";
import AuthContext from "../context/AuthContext";

const Settings = () => {
  const { user: authUser, setUser: setAuthUser } = useContext(AuthContext); // to update global state
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    bio: "",
    webhookUrl: "",
    marketingEmails: true
  });

  const tabs = [
    { id: "general", label: "General", icon: FiGlobe },
    { id: "security", label: "Security & Keys", icon: FiLock },
    { id: "billing", label: "Billing", icon: FiCreditCard },
    { id: "team", label: "Team Members", icon: FiUsers },
  ];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/profile/my");
      setFormData({
        name: data.name || "",
        email: data.email || "",
        avatar: data.avatar || "",
        bio: data.bio || "",
        webhookUrl: data.settings?.webhookUrl || "",
        marketingEmails: data.settings?.marketingEmails ?? true
      });
    } catch (err) {
      console.error("Failed to fetch profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        avatar: formData.avatar,
        bio: formData.bio,
        settings: {
          webhookUrl: formData.webhookUrl,
          marketingEmails: formData.marketingEmails
        }
      };

      const { data } = await api.put("/profile/my", payload);
      
      // Update local form state with response to be sure
      setFormData({
        name: data.name,
        email: data.email,
        avatar: data.avatar || "",
        bio: data.bio || "",
        webhookUrl: data.settings?.webhookUrl || "",
        marketingEmails: data.settings?.marketingEmails ?? true
      });

      // Update global auth context if name/email changed
      if (authUser) {
         setAuthUser({ ...authUser, name: data.name, email: data.email });
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  // Helper to split name for UI inputs (if needed, or just use full name)
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState("");

  useEffect(() => {
     if(formData.name) {
        const parts = formData.name.split(" ");
        setFirstName(parts[0]);
        setLastName(parts.slice(1).join(" "));
     }
  }, [formData.name]);

  const handleNameChange = (first, last) => {
     setFirstName(first);
     setLastName(last);
     setFormData(prev => ({ ...prev, name: `${first} ${last}`.trim() }));
  };

  if (loading) return <div className="flex h-full items-center justify-center"><FiLoader className="animate-spin text-white text-3xl" /></div>;

  return (
    <div className="flex h-full flex-col gap-8 text-white font-sans">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="mt-1 text-slate-400">Manage your account preferences and integrations.</p>
         </div>
         <button 
           onClick={handleSave}
           disabled={saving}
           className="flex items-center gap-2 rounded-xl bg-[#4f67ff] px-6 py-2.5 font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-[#4358e0] hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
         >
            {saving ? <FiLoader className="h-5 w-5 animate-spin" /> : success ? <FiCheck className="h-5 w-5" /> : <FiSave className="h-5 w-5" />}
            <span>{saving ? "Saving..." : success ? "Saved!" : "Save Changes"}</span>
         </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
         {/* Sidebar / Tabs */}
         <div className="w-full lg:w-64 flex-shrink-0">
            <div className="rounded-2xl border border-[#1f2745] bg-[#10152b] p-2 space-y-1">
               {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                         activeTab === tab.id 
                           ? "bg-[#1f2937] text-white shadow-[0_0_20px_rgba(79,103,255,0.1)] border border-[#4f67ff]/30" 
                           : "text-slate-400 hover:text-white hover:bg-[#1f2745]"
                      }`}
                    >
                       <Icon className={`w-5 h-5 ${activeTab === tab.id ? "text-[#4f67ff]" : ""}`} />
                       {tab.label}
                    </button>
                  );
               })}
            </div>
         </div>

         {/* Content Area */}
         <div className="flex-1 rounded-2xl border border-[#1f2745] bg-[#10152b] p-6 lg:p-8">
            
            {activeTab === "general" && (
               <div className="space-y-6 max-w-2xl">
                  <div>
                    <h2 className="text-xl font-bold mb-4">Profile Information</h2>
                    <div className="grid grid-cols-1 gap-6">
                       <div className="flex items-center gap-4">
                          <div className="h-20 w-20 rounded-full bg-[#1f2745] flex items-center justify-center text-2xl font-bold text-slate-300 overflow-hidden">
                             {formData.avatar ? <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" /> : formData.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col gap-2">
                             <button className="text-sm font-bold text-[#4f67ff] hover:text-[#6b67ff]">Change Avatar</button>
                             <input 
                               type="text" 
                               placeholder="Avatar URL" 
                               value={formData.avatar}
                               onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                               className="text-xs bg-transparent border-b border-[#1f2745] focus:border-[#4f67ff] outline-none text-slate-400 w-full"
                             />
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                             <label className="block text-sm font-bold text-slate-300 mb-2">First Name</label>
                             <input 
                               type="text" 
                               value={firstName}
                               onChange={(e) => handleNameChange(e.target.value, lastName)}
                               className="w-full rounded-xl border border-[#1f2745] bg-[#0b1021] py-3 px-4 text-white outline-none focus:border-[#4f67ff]" 
                             />
                          </div>
                          <div>
                             <label className="block text-sm font-bold text-slate-300 mb-2">Last Name</label>
                             <input 
                               type="text" 
                               value={lastName}
                               onChange={(e) => handleNameChange(firstName, e.target.value)}
                               className="w-full rounded-xl border border-[#1f2745] bg-[#0b1021] py-3 px-4 text-white outline-none focus:border-[#4f67ff]" 
                             />
                          </div>
                       </div>

                       <div>
                          <label className="block text-sm font-bold text-slate-300 mb-2">Email Address</label>
                          <input 
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full rounded-xl border border-[#1f2745] bg-[#0b1021] py-3 px-4 text-white outline-none focus:border-[#4f67ff]" 
                          />
                       </div>

                       <div>
                          <label className="block text-sm font-bold text-slate-300 mb-2">Bio</label>
                          <textarea 
                            rows="3"
                            value={formData.bio}
                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                            className="w-full rounded-xl border border-[#1f2745] bg-[#0b1021] py-3 px-4 text-white outline-none focus:border-[#4f67ff]"
                          />
                       </div>
                    </div>
                  </div>
               </div>
            )}

            {activeTab === "security" && (
                <div className="space-y-8 max-w-2xl">
                   <div>
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <FiLock className="text-[#4f67ff]" />
                        API Access
                      </h2>
                      <p className="text-sm text-slate-400 mb-4">Manage your API keys for external integrations.</p>
                      
                      <div className="space-y-4">
                         <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2">Live Secret Key</label>
                            <div className="flex gap-2">
                               <input 
                                 type="text" 
                                 value="sk_live_51Mz..." 
                                 readOnly 
                                 className="flex-1 rounded-xl border border-[#1f2745] bg-[#0b1021] py-3 px-4 text-slate-300 font-mono text-sm outline-none" 
                               />
                               <button className="px-4 py-2 rounded-xl border border-[#1f2745] font-bold hover:bg-[#1f2745] transition">Copy</button>
                               <button className="px-4 py-2 rounded-xl border border-red-500/30 text-red-400 font-bold hover:bg-red-500/10 transition">Roll</button>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="pt-6 border-t border-[#1f2745]">
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <FiGlobe className="text-emerald-400" />
                        Webhooks
                      </h2>
                      <p className="text-sm text-slate-400 mb-4">Receive real-time updates for booking events.</p>
                      
                      <div>
                         <label className="block text-sm font-bold text-slate-300 mb-2">Webhook URL</label>
                         <input 
                            type="text" 
                            value={formData.webhookUrl}
                            onChange={(e) => setFormData({...formData, webhookUrl: e.target.value})}
                            placeholder="https://your-api.com/webhooks"
                            className="w-full rounded-xl border border-[#1f2745] bg-[#0b1021] py-3 px-4 text-white outline-none focus:border-[#4f67ff]" 
                         />
                      </div>
                   </div>
                </div>
            )}

            {activeTab === "billing" && (
               <div className="text-center py-20">
                  <div className="w-16 h-16 bg-[#1f2745] rounded-full flex items-center justify-center mx-auto mb-4">
                     <FiCreditCard className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No Active Subscription</h3>
                  <p className="text-slate-400 max-w-md mx-auto mb-6">Upgrade to Pro to unlock unlimited bookings and team management features.</p>
                  <button className="bg-gradient-to-r from-[#4f67ff] to-[#6b67ff] px-8 py-3 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition">Upgrade Now</button>
               </div>
            )}

            {activeTab === "team" && (
               <div className="text-center py-20">
                  <div className="w-16 h-16 bg-[#1f2745] rounded-full flex items-center justify-center mx-auto mb-4">
                     <FiUsers className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Solo Workspace</h3>
                  <p className="text-slate-400 max-w-md mx-auto">You are currently the only member of this workspace.</p>
               </div>
            )}
            
         </div>
      </div>
    </div>
  );
};

export default Settings;
