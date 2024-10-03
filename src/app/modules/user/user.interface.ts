export type TUserBasicInfo = {
    userId: string;   
    // name: string;     
    // image: string;    
    // isVerified: boolean;  
  };
  
  export type TSignUp = {
    name: string;
    email: string;
    image: string;
    role: 'user' | 'admin';
    password: string;
    followers: TUserBasicInfo[];  
    following: TUserBasicInfo[]; 
    followersCount: number; 
    followingCount: number;  
    postsCount: number;  
    isVerified: boolean; 
    subscriptionStatus: 'subscribed' | 'not-subscribed'; 
    isDeleted: boolean; 
  }
  