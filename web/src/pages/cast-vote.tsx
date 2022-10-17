import axios from "axios";
import type { NextPage } from "next";
import { useState } from "react";
import styles from "styles/Page.module.css";

const CastVote: NextPage = () => {
	const [formData, setFormData] = useState({
		proposal: "",
		amount: "",
	});

	const onSubmit = async () => {
		await axios({
			method: "post",
			url: "http://localhost:3000/cast-vote",
			data: formData,
		});
	};

	return (
		<div className={styles.container}>
			<p className={styles.description}>Cast a vote!</p>

			<div className={styles.grid}>
				<div className={styles.card}>
					<h2>Cast Vote &rarr;</h2>
					<p></p>
					<form>
						<p>
							<label>
								Proposal index:{" "}
								<input
									onChange={(e) =>
										setFormData({ ...formData, proposal: e.target.value })
									}
									type="number"
								/>
							</label>
						</p>
						<p>
							<label>
								Vote amount:{" "}
								<input
									onChange={(e) =>
										setFormData({ ...formData, amount: e.target.value })
									}
									type="number"
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

export default CastVote;
