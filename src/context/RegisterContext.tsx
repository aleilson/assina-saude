import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface Register {
  queixa: string;
  doencas: Array<[]>;
  historico: string;
  created_at?: string;
}

interface ResponseRegister {
  queixa: {
    label: string;
    id: number;
  };
  doencas: [
    {
      label: string;
      id: number;
    }
  ];
  historico: string;
  created_at?: string;
  _id?: string;
}


interface RegisterProviderProps {
  children: ReactNode;
}

interface RegistersContextData {
  registers: ResponseRegister[];
  createRegister: (register: Register) => Promise<void>;
}

const RegisterContext = createContext<RegistersContextData>(
  {} as RegistersContextData
);

export function RegisterProvider({ children }: RegisterProviderProps){
  const [registers, setRegisters] = useState<ResponseRegister[]>([]);

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