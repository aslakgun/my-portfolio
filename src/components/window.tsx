import { useState, useRef, useEffect, ReactNode } from 'react';

interface WindowProps {
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  width?: number;
  height?: number;
  initialX?: number;
  initialY?: number;
  resizable?: boolean;
  active?: boolean;
}

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

const Window: React.FC<WindowProps> = ({ 
  title = "Window", 
  children, 
  onClose, 
  width = 400, 
  height = 300,
  initialX = 100,
  initialY = 100,
  resizable = false,
  active = true
}) => {
  const [position, setPosition] = useState<Position>({ x: initialX, y: initialY });
  const [size, setSize] = useState<Size>({ width, height });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  
  const windowRef = useRef<HTMLDivElement>(null);

  // Handle window dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.title-buttons')) return;
    
    setIsDragging(true);
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    // Keep window within viewport bounds
    const maxX = window.innerWidth - size.width;
    const maxY = window.innerHeight - size.height - 32; // Account for taskbar

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  // Set up global mouse events for dragging
  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragOffset, size]);

  // Prevent text selection during drag
  useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.userSelect = '';
    }
  }, [isDragging]);

  return (
    <div 
      ref={windowRef}
      className={`window ${active ? 'active' : ''}`}
      style={{ 
        left: position.x, 
        top: position.y,
        width: size.width,
        height: size.height
      }}
    >
      <div 
        className={`title-bar ${active ? '' : 'inactive'}`}
        onMouseDown={handleMouseDown}
      >
        <span className="title">{title}</span>
        <div className="title-buttons">
          <button 
            className="title-button" 
            title="Minimize"
            onClick={() => console.log('Minimize clicked')}
          >
            _
          </button>
          <button 
            className="title-button" 
            title="Maximize"
            onClick={() => console.log('Maximize clicked')}
          >
            □
          </button>
          <button 
            className="title-button" 
            title="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
      </div>
      
      <div className="window-content">
        {children}
      </div>
      
      {/* Resize handle (if resizable) */}
      {resizable && (
        <div 
          className="resize-handle"
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 16,
            height: 16,
            cursor: 'nw-resize',
            background: 'linear-gradient(135deg, transparent 50%, #808080 50%)'
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setIsResizing(true);
          }}
        />
      )}
    </div>
  );
};

export default Window;