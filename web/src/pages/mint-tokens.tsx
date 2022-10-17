import React from "react";
import axios from "axios";
import type { NextPage } from "next";
import { useState } from "react";
import styles from "styles/Page.module.css";

const MintTokens = () => {
	const [formData, setFormData] = useState({
		address: "",
		amount: "",
	});

	const [success, setSuccess] = useState(false);

	const onSubmit = async () => {
		await axios({
			method: "post",
			url: "http://localhost:3000/mint-tokens",
			data: formData,
		});
	};

	return (
		<>
			<div className={styles.container}>
				<p className={styles.description}>Make printer go brr</p>

				<div className={styles.grid}>
					<div className={styles.card}>
						<h2>Mint tokens &rarr;</h2>

						<form>
							<p>
								<label>
									Amount:{" "}
									<input
										onChange={(e) =>
											setFormData({ ...formData, amount: e.target.value })
										}
										type="text"
									/>
								</label>
							</p>
							<p>
								<label>
									Address:{" "}
									<input
										onChange={(e) =>
											setFormData({ ...formData, address: e.target.value })
										}
										type="text"
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
		</>
	);
};

export default MintTokens;
