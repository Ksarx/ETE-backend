export class CreateUserDto {
  name: string;
  patronymic?: string;
  password: string;
  surname: string;
  work: string;
  imageUrl?: string;
  workspaceId: number;
}
