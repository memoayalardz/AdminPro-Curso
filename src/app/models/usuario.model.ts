export class Usuario {
    constructor(
        public email: string,
        public nombre: string,
        public img?: string,
        public password?: string,
        public role?: string,
        public google?: boolean,
        public uid?: string,
    ){}
}