export interface IApartmentCardProps {
  id: string;
  homeMainPic: string;
  name: string;
  price: number;
  type: string;
  stars: string;
  carouselPic1: string;
  carouselPic2: string;
  carouselPic3: string;
  carouselPic4: string;
  carouselPic5: string;
  location: string;
  pets: boolean;
  latitude: string;
  longitude: string;
}

export interface ICategoryCardProps {
  name: string;
  imageUrl: string;
  isSelected?: boolean;
  handleClick?: () => void;
}
