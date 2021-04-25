import styles from './home.module.scss';

export default function Home() {
  return (
    <section className={styles.homepage}>
      <p>Nenhum prontuário cadastrado.</p>
      <a className="button" href="/cadastro">Adicionar novo prontuário</a>
    </section>
  );
}
