export interface Credentials {
	email: string;
	password: string;
}

export interface SignUpCredentials extends Credentials {
	passwordConfirmation: string;
}
