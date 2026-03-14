import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Vanta from 'vanta/dist/vanta.globe.min';

const GlobeEffect = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaRef.current) {
      vantaRef.current = Vanta({
        THREE: THREE,
        el: '#vanta-globe',
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minTemperature: 15,
        maxTemperature: 60,
        speed: 1.5,
        zoom: 1,
        backgroundColor: 0x0,
        color: 0x2563eb,
        color2: 0x3b82f6,
        points: 12,
        maxDistance: 25,
        spacing: 18
      });
    }

    return () => {
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      id="vanta-globe" 
      className="absolute inset-0 z-0"
    />
  );
};

export default GlobeEffect;
