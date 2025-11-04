import React, { useState } from 'react';
import { Search, Send, User, Bot, Circle } from 'lucide-react';

const contacts = [
    { id: 1, name: 'Fatima Hassan', role: 'Zone Incharge', status: 'online' },
    { id: 2, name: 'Omar Rashid', role: 'Zone Incharge', status: 'offline' },
    { id: 3, name: 'Aisha Ibrahim', role: 'Zone Incharge', status: 'online' },
    { id: 4, name: 'Khalid Ibrahim', role: 'Driver', status: 'online' },
    { id: 5, name: 'Noura Saad', role: 'Driver', status: 'break' },
    { id: 6, name: 'Fahad Al-Mutairi', role: 'Driver', status: 'offline' },
];

const initialMessages = {
    '1': [
        { sender: 'me', text: 'Hi Fatima, can you check on the driver shortage in North Zone?', time: '10:30 AM' },
        { sender: 'Fatima Hassan', text: 'On it. I\'m reassigning a driver from a less busy cluster.', time: '10:31 AM' },
    ],
    '4': [
        { sender: 'me', text: 'Khalid, customer for ORD552 is not responding. What is the status?', time: '2:32 PM' },
        { sender: 'Khalid Ibrahim', text: 'I have raised an escalation ticket for it. Waiting at the location.', time: '2:33 PM' },
    ],
};

function ChatInterface() {
    const [selectedContact, setSelectedContact] = useState(contacts[0]);
    const [messages, setMessages] = useState(initialMessages[selectedContact.id] || []);
    const [newMessage, setNewMessage] = useState('');

    const handleSelectContact = (contact) => {
        setSelectedContact(contact);
        setMessages(initialMessages[contact.id] || []);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const newMsg = { sender: 'me', text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
            setMessages([...messages, newMsg]);
            setNewMessage('');
        }
    };

    const StatusIndicator = ({ status }) => {
        const config = {
            online: 'bg-green-500',
            offline: 'bg-gray-400',
            break: 'bg-orange-500',
        };
        return <Circle className={`w-2.5 h-2.5 ${config[status] || 'bg-gray-400'} fill-current`} />;
    };

    return (
        <div className="flex h-[75vh]">
            {/* Contacts List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-taiba-gray w-4 h-4" />
                        <input type="text" placeholder="Search contacts..." className="input-field pl-9 text-sm" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {contacts.map(contact => (
                        <button
                            key={contact.id}
                            onClick={() => handleSelectContact(contact)}
                            className={`w-full flex items-center space-x-3 p-4 text-left transition-colors ${selectedContact.id === contact.id ? 'bg-taiba-blue bg-opacity-10' : 'hover:bg-gray-50'}`}
                        >
                            <div className="relative">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-taiba-gray" />
                                </div>
                                <div className="absolute bottom-0 right-0">
                                    <StatusIndicator status={contact.status} />
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-taiba-gray text-sm">{contact.name}</p>
                                <p className="text-xs text-taiba-gray opacity-75">{contact.role}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className="w-2/3 flex flex-col">
                {selectedContact ? (
                    <>
                        <div className="p-4 border-b flex items-center space-x-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-taiba-gray" />
                                </div>
                                <div className="absolute bottom-0 right-0">
                                    <StatusIndicator status={selectedContact.status} />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-taiba-gray">{selectedContact.name}</h3>
                                <p className="text-sm text-taiba-gray">{selectedContact.role}</p>
                            </div>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex items-end gap-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.sender !== 'me' && <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0"><User className="w-4 h-4" /></div>}
                                    <div className={`max-w-md p-3 rounded-xl ${msg.sender === 'me' ? 'bg-taiba-blue text-white rounded-br-none' : 'bg-white text-taiba-gray rounded-bl-none shadow-sm'}`}>
                                        <p className="text-sm">{msg.text}</p>
                                        <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-blue-200' : 'text-gray-400'}`}>{msg.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-white border-t">
                            <form onSubmit={handleSendMessage} className="relative">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="input-field pr-12"
                                />
                                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-taiba-blue hover:bg-blue-100 rounded-full">
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-center">
                        <div>
                            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-taiba-gray">Select a contact to start chatting</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatInterface;
