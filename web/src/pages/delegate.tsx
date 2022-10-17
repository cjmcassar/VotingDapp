import axios from 'axios';
import type { NextPage } from 'next';
import { useState } from 'react';
import styles from 'styles/Page.module.css';

const Delegate: NextPage = () => {
	const [formData, setFormData] = useState({
		address: '',
	});

	const [success, setSuccess] = useState(false);

	const onSubmit = async () => {
		await axios({
			method: 'post',
			url: 'http://localhost:3000/delegate',
			data: formData,
		});
	};

	return (
		<div className={styles.container}>
			<p className={styles.description}>Delegate a vote!</p>
			<p>Transaction status: {success && 'Success'}</p>
			<div className={styles.grid}>
				<div className={styles.card}>
					<h2>Delegate Vote &rarr;</h2>
					<p></p>
					<form>
						<p>
							<label>
								Delegee Address:{' '}
								<input
									onChange={(e) => setFormData({ address: e.target.value })}
									type='text'
								/>
							</label>
						</p>
						<p>
							<button onClick={onSubmit}>Submit</button>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Delegate;
