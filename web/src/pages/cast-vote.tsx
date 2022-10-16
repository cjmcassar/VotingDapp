import type { NextPage } from 'next';
import styles from 'styles/CastVote.module.css';

const CastVote: NextPage = () => {
	return (
		<div className={styles.container}>
			<p className={styles.description}>Cast a vote!</p>

			<div className={styles.grid}>
				<div className={styles.card}>
					<h2>Cast Vote &rarr;</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</div>
			</div>
		</div>
	);
};

export default CastVote;
