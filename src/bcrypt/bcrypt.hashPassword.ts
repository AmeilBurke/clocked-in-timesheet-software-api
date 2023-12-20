import * as bcrypt from 'bcrypt';

export const hashGivenPassword = async (unencryptedPassword: string) => {
  const saltOrRounds = 10;
  return await bcrypt.hash(unencryptedPassword, saltOrRounds);
};
