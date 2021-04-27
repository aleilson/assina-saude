import { FormEvent, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { api } from '../../services/api';
import { useRouter } from 'next/router'

import { useRegisters } from '../../context/RegisterContext';

import styles from './styles.module.scss';

interface Option {
  label: string;
  id: string;
}

type RegisterOptionsProps = {
  optionsToQueixas: Option[];
  optionsToDoencas: Option[];
}

export default function Register({optionsToQueixas, optionsToDoencas }: RegisterOptionsProps) {
  const { createRegister } = useRegisters();
  const router = useRouter();

  const [queixa, setQueixa] = useState('');
  const [doencas, setDoencas] = useState([]);
  const [historico, setHistorico] = useState('');
  const [isValidButton, setIsValidButton] = useState(true);

  async function handleCreateNewRegister(event: FormEvent){
    event.preventDefault();
    try {
      await createRegister({
        queixa,
        doencas: doencas,
        historico
      });

      setQueixa('');
      setDoencas([]);
      setHistorico('');
      backToHome();
    } catch (error) {
      console.log(error)
    }
  }

  const backToHome = () => {
    router.push('/')
  }

  useEffect(() => {
    if(doencas !== [] && queixa !== '' && (historico !== '' && historico.length > 10)){
      setIsValidButton(false);
    } else {
      setIsValidButton(true);
    }
  }, [doencas, queixa, historico])

  return (
    <section className={styles.medicalRecord}>
      <div className={styles.container}>
        <form className={styles.medicalRecord__form} onSubmit={handleCreateNewRegister}>
          <span>Anamnese</span>

          <div className={styles.boxForm}>
            <label htmlFor="#mainComplaint">Queixa Principal</label>
            <select 
              id="mainComplaint"
              onChange={event => setQueixa(event.target.value)}
            >
              <option value="" selected disabled hidden>Selecione...</option>
              {optionsToQueixas.map(option => {
                return <option key={option.id} value={option.id} onChange={() => setQueixa(option.id)} >{option.label}</option>
              })}
            </select>
          </div>

          <div className={styles.boxForm}>
            <label htmlFor="#adultDiseases">Doenças Adulto</label>
            <select 
              id="adultDiseases"
              onChange={event => setDoencas([event.target.value])}
            >
              <option value="" selected disabled hidden>Selecione...</option>
              {optionsToDoencas.map(option => {
                return <option key={option.id} value={option.id}>{option.label}</option>
              })}
            </select>
          </div>

          <div className={styles.boxForm}>
            <label>Histórico da Moléstia</label>
            <textarea 
              name="descriptionHistory" 
              cols={30} 
              rows={10} 
              placeholder="Digite..."
              value={historico}
              onChange={event => setHistorico(event.target.value)}
            ></textarea>
          </div>

          <div className={styles.boxForm}>
            <button type="submit" className="button" disabled={isValidButton}>
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const optionsQueixas = await api.get('/queixas');
  const optionsDoencas = await api.get('/doencas');

  const optionsToQueixas = optionsQueixas.data.data.map(option => {
    return {
      id: option.id,
      label: option.label
    };
  });
  
  const optionsToDoencas = optionsDoencas.data.data.map(option => {
    return {
      label: option.label,
      id: option.id
    };
  });

  return {
    props: {
      optionsToQueixas,
      optionsToDoencas,
    },
    revalidate: 60 * 60 * 8 // 8hours
  }
}