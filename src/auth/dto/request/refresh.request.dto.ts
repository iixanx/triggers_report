import { User } from '@prisma/client';

export class RefreshRequestDto {
  isRefresh: boolean;
  user: User;
}
