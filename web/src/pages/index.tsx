import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "styles/Home.module.css";

const Home: NextPage = () => {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<Head>
				<title>Voting dApp</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Welcome to Voting dApp!</h1>

				<p className={styles.description}>
					Get started by clicking on a tile!
					{/* <code className={styles.code}>pages/index.tsx</code> */}
				</p>

				<div className={styles.grid}>
					<div
						onClick={() => router.push("/cast-vote")}
						className={styles.card}
					>
						<h2>Cast Vote &rarr;</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</div>

					<div onClick={() => router.push("/delegate")} className={styles.card}>
						<h2>Delegate Vote &rarr;</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</div>

					<div
						onClick={() => router.push("/query-winner")}
						className={styles.card}
					>
						<h2>Query Winner &rarr;</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</div>
					<div
						onClick={() => router.push("/mint-tokens")}
						className={styles.card}
					>
						<h2>Mint Tokens &rarr;</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</div>
				</div>
			</main>

			<footer className={styles.footer}>
				<p>Encode Solidity Week 4 Project - Group 2</p>
			</footer>
		</div>
	);
};

export default Home;
