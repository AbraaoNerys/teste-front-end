import { useState, type FormEvent } from 'react';
import styles from './Newsletter.module.scss';

interface Feedback {
  kind: 'error' | 'success';
  text: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      setFeedback({ kind: 'error', text: 'Informe seu nome.' });
      return;
    }

    if (!emailPattern.test(email)) {
      setFeedback({ kind: 'error', text: 'Informe um e-mail válido.' });
      return;
    }

    if (!acceptedTerms) {
      setFeedback({ kind: 'error', text: 'Aceite os termos e condições.' });
      return;
    }

    setFeedback({
      kind: 'success',
      text: 'Obrigado! Sua inscrição foi recebida.',
    });
    setName('');
    setEmail('');
    setAcceptedTerms(false);
  }

  return (
    <section className={styles.newsletter} aria-labelledby="newsletter-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 id="newsletter-title">Inscreva-se na nossa newsletter</h2>
          <p>
            Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da
            Econverse.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.fields}>
            <label className={styles.visuallyHidden} htmlFor="newsletter-name">
              Nome
            </label>
            <input
              id="newsletter-name"
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setFeedback(null);
              }}
            />

            <label className={styles.visuallyHidden} htmlFor="newsletter-email">
              E-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setFeedback(null);
              }}
            />

            <button type="submit">Inscrever</button>
          </div>

          <label className={styles.terms}>
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => {
                setAcceptedTerms(event.target.checked);
                setFeedback(null);
              }}
            />
            <span>Aceito os termos e condições</span>
          </label>

          {feedback && (
            <p
              className={styles.feedback}
              role={feedback.kind === 'error' ? 'alert' : 'status'}
            >
              {feedback.text}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
