import { useRegisters } from '../context/RegisterContext';
import Link from 'next/link';

import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './home.module.scss';

export default function Home() {
  const { registers } = useRegisters();

  return (
    <section className={styles.homepage}>
      {registers.length < 1 ? ( 
        <p>Nenhum prontuário cadastrado.</p> 
        ) : (
          <div className={styles.homepage__list}>
            {registers.map(register => {
              return(
                <div key={register._id} className={styles.homepage__listItem}>
                  <div className={styles.homepage__itemDate}>
                    <span>
                      <strong>
                        {
                          format(new Date(register.created_at), 'd', {
                            locale: ptBR,
                          })
                        }
                      </strong>
                      {
                        format(new Date(register.created_at), 'MMM', {
                          locale: ptBR,
                        })
                      }
                      <p>
                        {
                          format(new Date(register.created_at), 'Y', {
                            locale: ptBR,
                          })
                        }
                      </p>
                    </span>
                  </div>
                  <div className={styles.homepage__itemContent}>
                    <p className={styles.homepage__contentHours}>
                      {
                        format(new Date(register.created_at), 'HH:mm', {
                          locale: ptBR,
                        })
                      }
                    </p>
                    <span className={styles.homepage__contentTitle}>Anamnese</span>


                      <div className={styles.homepage__contentBox}>

                        <div className={styles.homepage__boxItem}>
                          <strong>Queixa Principal</strong>
                          <p>{register.queixa.label}</p>
                        </div>

                        <div className={styles.homepage__boxItem}>
                          <strong>Doença Adulto</strong>
                          {register.doencas.map(doenca => { return  <span>{doenca.label}</span>})}
                        </div>

                        <div className={styles.homepage__boxItem}>
                          <strong>Histórico de moléstica</strong>
                          <p>{register.historico}</p>
                        </div>

                      </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      }
      <Link href="/register">
        <a className="button" >Adicionar novo prontuário</a>
      </Link>
    </section>
  );
}
