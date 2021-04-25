
import { api } from '../../services/api';
import styles from './styles.module.scss';
import { RiArrowDownSLine } from "react-icons/ri";

export default function Register(){
  const listQueixas = api.get('/queixas');

  return (
    <section className={styles.medicalRecord}>
      <div className={styles.container}>
        <form className={styles.medicalRecord__form}>
          <span>Anamnese</span>

          <div className={styles.boxForm}>
            <label htmlFor="#mainComplaint">Queixa Principal</label>
            <select id="mainComplaint">
              <option value="" selected disabled hidden>Selecione...</option>
              <option value="Ford">Ford</option>
              <option value="Volvo">Volvo</option>
              <option value="Fiat">Fiat</option>
            </select>
          </div>

          <div className={styles.boxForm}>
            <label htmlFor="#adultDiseases">Doenças Adulto</label>
            <select id="adultDiseases">
              <option value="" selected disabled hidden>Selecione...</option>
              <option value="Volvo" >Volvo</option>
              <option value="Ford" >Ford</option>
              <option value="Fiat">Fiat</option>
              <RiArrowDownSLine />
            </select>
          </div>

          <div className={styles.boxForm}>
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