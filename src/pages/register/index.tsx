
import { GetStaticProps } from 'next';
import { api } from '../../services/api';

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

  return (
    <section className={styles.medicalRecord}>
      <div className={styles.container}>
        <form className={styles.medicalRecord__form}>
          <span>Anamnese</span>

          <div className={styles.boxForm}>
            <label htmlFor="#mainComplaint">Queixa Principal</label>
            <select id="mainComplaint">
              <option value="" selected disabled hidden>Selecione...</option>
              {optionsToQueixas.map(option => {
                return <option key={option.id} value={option.label} >{option.label}</option>
              })}
            </select>
          </div>

          <div className={styles.boxForm}>
            <label htmlFor="#adultDiseases">Doenças Adulto</label>
            <select id="adultDiseases">
              <option value="" selected disabled hidden>Selecione...</option>
              {optionsToDoencas.map(option => {
                return <option key={option.id} value={option.label} >{option.label}</option>
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
            ></textarea>
          </div>

          <div className={styles.boxForm}>
            <button type="submit" className="button">
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
    revalidate: 60 * 60 * 8, // 8hours
  }
}