Rails.application.routes.draw do
  resources :pricings, only: [:create]
  # resources :wallets
  # resources :coins
  # resources :portfolios
  resources :nfts, only: [:index]
  resources :users, only: [:show, :create, :destroy]

  # User Auth routes
  get "/login", to: "sessions#show"
  post "/login", to: "sessions#create"
  delete "/login", to: "sessions#destroy"

  # Watchlist routes
  get "/watchlist/:user_id", to: "portfolios#show_my_watchlist"
  post "/watchlist", to: "portfolios#add_to_watchlist"
  patch "/watchlist/:id", to: "portfolios#remove_from_watchlist"
end
