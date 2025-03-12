export interface User {
    id: string,
    email: string,
    name: string,
    password: string
}

export interface UserCreate {
    name: string,
    email: string,
    password: string
}

export interface UserRepository {
    create(data: UserCreate): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(email: string): Promise<User | null>;
}