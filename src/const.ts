const Setting = {
  RentalOffersCount : 312,
  CardsCount: 5,
} as const;

const AppRoute = {
  Main : '/',
  Login : '/login',
  Favorites : '/favorites',
  Offer : '/offer/:id',
} as const;

const AuthorizationStatus = {
  Auth : 'AUTH',
  NoAuth : 'NO_AUTH',
  Unknown : 'UNKNOWN',
} as const;

export { Setting, AppRoute, AuthorizationStatus };

