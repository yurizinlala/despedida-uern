import React from 'react';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';

const WrappedPlaceholder: React.FC = () => {
  const { selectedProfessor } = useUser();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center font-sans">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          BEM-{selectedProfessor?.gender === 'male' ? 'VINDO' : 'VINDA'}, <br/>
          {selectedProfessor?.nickname.toUpperCase()}
        </h1>
        <p className="text-gray-400 mt-4">FASE 2: WRAPPED (Em desenvolvimento)</p>
      </motion.div>
    </div>
  );
};

export default WrappedPlaceholder;
