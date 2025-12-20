export const getCommitHash = () => {
	return process.env.GIT_COMMIT_HASH || "development";
};

export function getBaseUrl(): string[] {
	if (process.env.NODE_ENV === "production") {
		return ["https://ksplitter.kazeuta.com"];
	}

	const codespaceNameEnv = process.env.CODESPACE_NAME;
	const codespaceNameFromGitConfig = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN;

	if (codespaceNameEnv && codespaceNameFromGitConfig) {
		return [
			`http://localhost:${process.env.NEXT_PUBLIC_PORT || 3000}`,
			`https://${codespaceNameEnv}-${process.env.NEXT_PUBLIC_PORT || 3000}.${codespaceNameFromGitConfig}`
		];
	}

	return [`http://localhost:${process.env.NEXT_PUBLIC_PORT || 3000}`];
}