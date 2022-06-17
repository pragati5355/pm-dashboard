import { environment } from "../../../environments/environment";
const baseUrl = environment.baseUrl

// export class AppConstants {
//     private static AUTH_USER_API = baseUrl;
    
// }
export const AppConstants: ConstantsInterface = {
    BASE_URL: baseUrl,
    AUTH_USER_API: baseUrl
  };
  export interface ConstantsInterface {
    [key: string]: string;
  }
  