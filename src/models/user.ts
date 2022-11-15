import { UserInfo } from "../dtos/user-info";

export class User  {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;

  validateEntity(): boolean{
    if(this.firstname == null){
      return false;
    }

    if(this.lastname == null){
      return false;
    }

    if(this.username == null){
      return false;
    }

    if(this.password == null){
      return false;
    }

    return true;
  }

  static ConvertToUserInfo(source: User): UserInfo{
    const result = new UserInfo();
    
    result.id = source.id;
    result.firstname = source.firstname;
    result.lastname = source.lastname;
    result.username = source.username;
    result.password = source.password;

    return result;
    }

  static ConvertFromUserInfo(source: UserInfo): User{
      const result = new User();
      
      result.id = source.id;
      result.username = source.username;
      result.firstname = source.firstname;
      result.lastname = source.lastname;
      result.password = source.password;
  
      return result;
      }
  
  static ConvertToUserInfoList(source: User[]): UserInfo[]{
    const result: UserInfo[] = [];

    source.forEach(element => {
      const val = this.ConvertToUserInfo(element);
      result.push(val);
    });

    return result;
  }
};
