'use client';

import Button95 from "@/components/button95";
import Window from "@/components/window";
import { useState } from 'react';
import Image from "next/image";


interface WindowData{
  id: number;
  title: string;
  content: React.ReactNode;
  x: number;
  y: number;
}


export default function Home() {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [nextId, setNextId] = useState(1);

  const openWindow = (title: string, content: React.ReactNode) => {
    const newWindow: WindowData = {
      id: nextId,
      title,
      content,
      x: 50 + (nextId * 30),
      y: 50 + (nextId * 30)
    };
    setWindows([...windows, newWindow]);
    setNextId(nextId + 1);
  };

  const closeWindow = (id: number) => {
    setWindows(windows.filter(window => window.id !== id));
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="desktop">
      {/* Desktop Icons */}
      <div 
        className="desktop-icon" 
        style={{ top: 20, left: 20 }}
        onDoubleClick={() => openWindow("About Me", (
          <div>
            <p>Welcome to my retro portfolio!</p>
            <p>Built with Next.js, TypeScript and Windows 95 nostalgia.</p>
            <br />
            <Button95 primary>Contact Me</Button95>
          </div>
        ))}
      >
        <img src="/images/computer.png" alt="About" />
        <span>About Me</span>
      </div>

      <div 
        className="desktop-icon" 
        style={{ top: 100, left: 20 }}
        onDoubleClick={() => openWindow("My Projects", (
          <div>
            <h3>Recent Projects</h3>
            <ul>
              <li>React Dashboard</li>
              <li>E-commerce Site</li>
              <li>API Integration Tool</li>
            </ul>
            <br />
            <Button95>View Details</Button95>
          </div>
        ))}
      >
        <img src="/images/folder.png" alt="Projects" />
        <span>Projects</span>
      </div>

      <div 
        className="desktop-icon" 
        style={{ top: 180, left: 20 }}
        onDoubleClick={() => openWindow("Resume", (
          <div>
            <h3>Get In Touch</h3>
            <p>Email: your@email.com</p>
            <p>LinkedIn: /in/yourprofile</p>
            <p>GitHub: /yourusername</p>
            <br />
            <Button95 primary>Send Message</Button95>
          </div>
        ))}
      >
        <img src="/images/document.png" alt="Resume" />
        <span>Resume</span>
      </div>

      <div 
        className="desktop-icon" 
        style={{ top: 260, left: 20 }}
        onDoubleClick={() => openWindow("Contact", (
          <div>
            <h3>Get In Touch</h3>
            <p>Email: your@email.com</p>
            <p>LinkedIn: /in/yourprofile</p>
            <p>GitHub: /yourusername</p>
            <br />
            <Button95 primary>Send Message</Button95>
          </div>
        ))}
      >
        <img src="/images/contact.png" alt="contact" />
        <span>Contact</span>
      </div>



      {/* Render open windows */}
      {windows.map((window, index) => (
        <Window
          key={window.id}
          title={window.title}
          initialX={window.x}
          initialY={window.y}
          onClose={() => closeWindow(window.id)}
          active={index === windows.length - 1}
        >
          {window.content}
        </Window>
      ))}

      {/* Taskbar */}
      <div className="taskbar">
        <button className="start-button">
          🏁 Start
        </button>
        
        {windows.map(window => (
          <button 
            key={window.id}
            className="btn-95"
            style={{ marginLeft: 8, height: 26 }}
            onClick={() => {
              console.log(`Focusing window: ${window.title}`);
            }}
          >
            {window.title}
          </button>
        ))}

        <div className="taskbar-clock">
          {getCurrentTime()}
        </div>
      </div>
    </div>
  );
}
