export interface IBook {
   id: string;
   title: string;
   author: string;
   genre: string;
   language: string;
   description: string;
   coverImageFile: string;
   isAvailable: boolean;
   isPremium: boolean;
   rentCount: number; 
}