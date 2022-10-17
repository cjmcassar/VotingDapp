import axios from 'axios';
import type { NextPage } from 'next';
import { useState } from 'react';
import styles from 'styles/Page.module.css';

const QueryWinner: NextPage = () => {
	const [winnerName, setWinnerName] = useState('');

	const onSubmit = async () => {
		await axios('http://localhost:3000/query-winner').then((res) =>
			setWinnerName(res.data)
		);
	};

	return (
		<div className={styles.container}>
			<p className={styles.description}>Query the winner!</p>
			<p>Winner: {winnerName}</p>
			<div className={styles.grid}>
				<div className={styles.card}>
					<h2>Query Winner &rarr;</h2>
					<p></p>
					<button onClick={onSubmit}>Query</button>
				</div>
			</div>
		</div>
	);
};

export default QueryWinner;
