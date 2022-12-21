Rails.application.routes.draw do
  # resources :pricings, only: [:create]
  # resources :wallets, only: [:index]
  # resources :coins, only: [:show]
  # resources :portfolios
  resources :nfts, only: [:index, :show]
  resources :users, only: [:show, :create, :destroy]

  # User Auth routes
  get "/login", to: "sessions#show"
  post "/login", to: "sessions#create"
  delete "/login", to: "sessions#destroy"

  # Watchlist routes
  get "/watchlist/:user_id", to: "portfolios#show_my_watchlist"
  post "/watchlist", to: "portfolios#add_to_watchlist"
  patch "/watchlist/:id", to: "portfolios#remove_from_watchlist"

  # Wallet Routes
  get "/wallets/:user_id", to: "wallets#show_my_wallet"

  post "/secret", to: "payment_process#process_payment" 
  get "/coin", to: "coins#show"

  patch "/wallets", to: "wallets#add_to_wallet"
  
  # Pricings
  get "/pricings/:nft_id", to: "pricings#show"
  post "/pricings/:nft_id", to: "pricings#create"

  # Purchase routes
  post "portfolios/:nft_id", to: "portfolios#purchase_nft"

  # Portfolio routes
  get "portfolio/:user_id", to: "portfolios#get_my_portfolio"
end
