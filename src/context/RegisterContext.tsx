import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface Register {
  queixa: string;
  doencas: Array<[]>;
  historico: string;
}

interface RegisterProviderProps {
  children: ReactNode;
}

interface RegistersContextData {
  registers: Register[];
  createRegister: (register: Register) => Promise<void>;
}

const RegisterContext = createContext<RegistersContextData>(
  {} as RegistersContextData
);

export function RegisterProvider({ children }: RegisterProviderProps){
  const [registers, setRegisters] = useState<Register[]>([]);

  async function createRegister(registerInput: Register){
    const response = await api.post('/prontuario', {
      ...registerInput,
    });

    const register = response.data;

    setRegisters([
      ...registers,
      register,
    ]);
  }

  return (
    <RegisterContext.Provider value={{registers, createRegister}}>
      {children}
    </RegisterContext.Provider>
  );
}

export function useRegisters(){
  const context = useContext(RegisterContext);

  return context;
}