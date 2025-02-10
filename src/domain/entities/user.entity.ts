export class User {
    id: string;
    name: string;
    email: string;

    constructor(id: string, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    update(data: UpdateUserDto): void {
        if (data.name) {
            this.name = data.name;
        }
        if (data.email) {
            this.email = data.email;
        }
    }
}

export interface UpdateUserDto {
    name?: string;
    email?: string;
}