import styles from './styles.module.scss';

export function Header(){
  return (
    <header>
      <div className={styles.container}>
        <h1 className={styles.title}>Prontuário Eletrônico</h1>
      </div>
    </header>
  );
}